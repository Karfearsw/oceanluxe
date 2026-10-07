import React from 'react';
import IconBase from './IconBase';

interface IconProps {
  className?: string;
}

/** Two clasped hands — the deal, the agreement, the handshake close. */
export function HandshakeIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      {/* cuffs */}
      <path d="M4 18h9v12H4z" />
      <path d="M44 18h-9v12h9z" />
      {/* backs of hands meeting */}
      <path d="M13 20l10 8" />
      <path d="M35 20l-10 8" />
      {/* interlaced fingers */}
      <path d="M23 28l-5 5a3 3 0 0 0 4.2 4.2l5.3-5.3" />
      <path d="M27 30l4 4" />
    </IconBase>
  );
}

/** A skeleton key — the fast, as-is sale: hand over the keys, walk away clean. */
export function KeyIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="15" cy="15" r="7" />
      <circle cx="15" cy="15" r="2.2" />
      <path d="M20 20l16 16" />
      <path d="M29 29l5-5" />
      <path d="M33 33l5-5" />
    </IconBase>
  );
}

/** A notary seal with ribbon — every document signed, sealed, and done right. */
export function NotarySealIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="24" cy="19" r="11" />
      <circle cx="24" cy="19" r="7.5" />
      <path d="M24 13.5l1.8 3.7 3.7 1.8-3.7 1.8-1.8 3.7-1.8-3.7-3.7-1.8 3.7-1.8z" />
      <path d="M16 27.5l-5 14.5 7-3.5L24 44l6-5.5 7 3.5-5-14.5" />
    </IconBase>
  );
}

/** A crown — the luxury standard, applied to every deal at every price. */
export function CrownIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M9 33l-2-15 8 5.5L24 11l9 12.5L41 18l-2 15z" />
      <path d="M9 37.5h30" />
      <circle cx="7" cy="15.5" r="1.5" />
      <circle cx="24" cy="8.5" r="1.5" />
      <circle cx="41" cy="15.5" r="1.5" />
      <circle cx="24" cy="26" r="1.6" />
    </IconBase>
  );
}

/** Three rolling waves — the Ocean Luxe brand mark. */
export function WaveIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M6 17q6-9 12 0t12 0t12 0" />
      <path d="M6 25q6-9 12 0t12 0t12 0" />
      <path d="M6 33q6-9 12 0t12 0t12 0" />
    </IconBase>
  );
}
