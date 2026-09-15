'use client';
import {useEffect, useState} from 'react';

/**
 * Load GSAP → ScrollTrigger → storefront runtime in order.
 * Next.js conditional <Script> can race; sequential DOM scripts keep motion reliable.
 */
function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[data-assia-src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', () => resolve(), {once: true});
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.assiaSrc = src;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function Storefront() {
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadScript('/vendor/gsap.min.js');
        await loadScript('/vendor/ScrollTrigger.min.js');
        await loadScript('/storefront-runtime.js');
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div id="app">
        <p style={{padding: 40, textAlign: 'center'}}>
          {error ? 'Impossible de charger la boutique. Rechargez la page.' : 'Le royaume se prépare…'}
        </p>
      </div>
      <div id="toast" role="status" aria-live="polite" />
      <noscript>Activez JavaScript pour découvrir la boutique interactive.</noscript>
    </>
  );
}
