const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/sw.js` : '/sw.js';
    navigator.serviceWorker.register(swUrl).catch(() => {
    });
  });
}
