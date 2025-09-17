import { useEffect, useState } from "react";
import { picsumSeed } from "../../utils/img";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const key = "albums_all";
    const cached = localStorage.getItem(key);
    if (cached) {
      try { setAlbums(JSON.parse(cached)); } catch {}
    }
      fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        localStorage.setItem(key, JSON.stringify(data));
      })
      .catch(() => setError("Failed to load albums"))
      .finally(() => {
        setLoading(false);
        setInitialLoad(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedAlbum) return;
    setError("");
    const key = `photos_album_${selectedAlbum.id}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      try { setPhotos(JSON.parse(cached)); } catch {}
    }
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbum.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        localStorage.setItem(key, JSON.stringify(data));
      })
      .catch(() => setError("Failed to load photos"));
  }, [selectedAlbum]);

  const filtered = albums.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '16px' }}>
      <h2 className="mb-16" style={{ textAlign: 'center', fontWeight: 700, textTransform: 'uppercase' }}>Albums</h2>
      <div className="row mb-16" style={{ justifyContent: 'center' }}>
        <input
          className="input"
          placeholder="Search by album title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 320, width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />
      </div>
      {initialLoad && loading && <p className="muted" style={{ textAlign: 'center' }}>Loading…</p>}
      {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}
      <div className="photo-grid">
        {filtered.map((a) => (
					<div key={a.id} className="photo-item card" style={{ cursor: 'pointer', border: selectedAlbum && selectedAlbum.id === a.id ? '2px solid #2563eb' : 'none' }} onClick={() => setSelectedAlbum(a)}>
						<img src={picsumSeed(a.id, 150, 120)} alt={a.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
						<div style={{ fontWeight: 600, marginTop: 8 }}>{a.title}</div>
					</div>
				))}
			</div>
					{selectedAlbum && (
						<div className="album-header mt-16 card" style={{ marginTop: 32, padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
							<div className="album-preview">
								<div style={{ fontWeight: 700, fontSize: 18 }}>{selectedAlbum.title}</div>
								<span className="muted" style={{ marginLeft: 12 }}>Album ID: {selectedAlbum.id}</span>
							</div>
							<div className="thumbs-row">
								{photos.map((p) => (
									<img
										key={p.id}
										src={picsumSeed(p.id, 72, 72)}
										alt={p.title}
										className={`thumb${previewPhoto && previewPhoto.id === p.id ? ' active' : ''}`}
										onClick={() => setPreviewPhoto(p)}
										style={{ border: previewPhoto && previewPhoto.id === p.id ? '2px solid #2563eb' : '2px solid transparent', cursor: 'pointer' }}
									/>
								))}
							</div>
							{previewPhoto && (
								<div className="album-preview-frame mt-12" style={{ marginTop: 18, width: '100%', maxWidth: 520 }}>
									<img src={picsumSeed(previewPhoto.id, 520, 320)} alt={previewPhoto.title} className="album-preview-img" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 8 }} />
									<div style={{ fontWeight: 600, marginTop: 8 }}>{previewPhoto.title}</div>
								</div>
							)}
						</div>
					)}
				</div>
			);
		}

		export default AlbumsPage;



