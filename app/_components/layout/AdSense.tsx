import Script from 'next/script';

// Ads are not needed for the page to be usable: load the ad script once the
// browser is idle instead of competing with the page's own scripts.
export default function AdSense() {
  return (
    <Script
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3761962265454924"
      crossOrigin="anonymous"
    />
  );
}
