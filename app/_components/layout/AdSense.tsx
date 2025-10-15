import Script from 'next/script';

export default function AdSense() {
  return (
    <Script
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3761962265454924"
      crossOrigin="anonymous"
    />
  );
}
