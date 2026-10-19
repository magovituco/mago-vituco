import { useState } from 'react';

// Muestra primero la imagen local (public/images). Si no existe, prueba la URL remota.
export default function Img({ src, fallback, alt, fit = 'cover', position = '50% 50%', className = '' }) {
  const [url, setUrl] = useState(src);
  return (
    <img
      src={url}
      alt={alt}
      draggable={false}
      onError={() => {
        if (fallback && url !== fallback) setUrl(fallback);
      }}
      className={className}
      style={{ objectFit: fit, objectPosition: position }}
    />
  );
}
