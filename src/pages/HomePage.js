import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos, nextPhoto, prevPhoto, setPhotoIndex } from "../store/photosSlice";

// This is the home page. It shows a photo carousel that gets its images from Redux state.
function HomePage() {
  const dispatch = useDispatch();
  const { items: photos, loading, error, index } = useSelector((state) => state.photos);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(() => {
    if (!photos.length) return;
    const id = setInterval(() => dispatch(nextPhoto()), 3000);
    return () => clearInterval(id);
  }, [photos.length, dispatch]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") dispatch(prevPhoto());
      if (e.key === "ArrowRight") dispatch(nextPhoto());
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dispatch]);

  return (
    <div>
      <h2
        className="mb-16"
        style={{
          textTransform: 'uppercase',
          textAlign: 'center',
          marginTop: '10vh',
          marginBottom: '4vh',
        }}
      >
        Welcome Dashboard
      </h2>
      {loading && <p className="muted" aria-live="polite">Loading photos…</p>}
      {error && <p className="error" aria-live="assertive">{error}</p>}
      {photos.length > 0 && (
        <div className="carousel">
          <button aria-label="Previous" className="carousel-btn" onClick={() => dispatch(prevPhoto())}>◀</button>
          <div className="carousel-frame">
            <img className="carousel-img" src={photos[index].safeUrl} alt={photos[index].title} />
            <div className="carousel-indicators">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`carousel-dot ${i === index ? 'active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  tabIndex={0}
                  onClick={() => dispatch(setPhotoIndex(i))}
                  onKeyPress={(e) => { if (e.key === "Enter") dispatch(setPhotoIndex(i)); }}
                ></span>
              ))}
            </div>
          </div>
          <button aria-label="Next" className="carousel-btn" onClick={() => dispatch(nextPhoto())}>▶</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
