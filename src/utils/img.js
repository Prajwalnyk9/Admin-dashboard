export function toSafeImg(url) {
  if (!url) return '';
  try {
    const u = url.replace('http://', 'https://');
    if (u.includes('via.placeholder.com')) {
      const withoutProto = u.replace('https://', '').replace('http://', '');
      return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProto)}`;
    }
    return u;
  } catch {
    return url;
  }
}

export const FALLBACK_THUMB = 'https://placehold.co/150x150?text=No+Image';
export const FALLBACK_LARGE = 'https://placehold.co/800x600?text=No+Image';

export function picsumSeed(idOrSeed, w = 300, h = 300) {
  return `https://picsum.photos/seed/${encodeURIComponent(String(idOrSeed))}/${w}/${h}`;
}


