/* eslint-disable @next/next/no-img-element */
export function Brand({href='/'}:{href?:string}) {
  return <a className="brand" href={href} aria-label="Benê RH — página inicial">
    <img src="/bene-logo-optimized.webp" width="210" height="68" alt="Benê RH" decoding="async" />
  </a>;
}
