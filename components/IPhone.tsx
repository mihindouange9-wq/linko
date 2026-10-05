import type { ReactNode } from "react";
import styles from "./IPhone.module.css";

/* Icônes de la barre d'état iOS, dessinées en SVG : réseau, Wi-Fi, batterie. */
const Cellular = () => (
  <svg viewBox="0 0 18 12" width="18" height="12" aria-hidden="true">
    <rect x="0" y="8" width="3" height="4" rx="0.8" fill="currentColor" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill="currentColor" />
    <rect x="10" y="3" width="3" height="9" rx="0.8" fill="currentColor" />
    <rect x="15" y="0" width="3" height="12" rx="0.8" fill="currentColor" />
  </svg>
);

const Wifi = () => (
  <svg viewBox="0 0 16 12" width="16" height="12" aria-hidden="true">
    <path d="M1 4.2a10.5 10.5 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3.6 6.9a6.6 6.6 0 0 1 8.8 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6.1 9.5a3 3 0 0 1 3.8 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="11.1" r="1" fill="currentColor" />
  </svg>
);

const Battery = () => (
  <svg viewBox="0 0 27 12" width="27" height="12" aria-hidden="true">
    <rect x="0.75" y="0.75" width="22.5" height="10.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <rect x="2.5" y="2.5" width="19" height="7" rx="1.6" fill="currentColor" />
    <path d="M25 4.2v3.6a1.9 1.9 0 0 0 0-3.6z" fill="currentColor" opacity="0.5" />
  </svg>
);

/* Cadre d'iPhone dessiné en CSS : coque, îlot, barre d'état, indicateur d'accueil. */
export default function IPhone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      <div className={styles.screen}>
        <div className={styles.status} aria-hidden="true">
          <span className={styles.time}>9:41</span>
          <span className={styles.island} />
          <span className={styles.icons}>
            <Cellular />
            <Wifi />
            <Battery />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
        <span className={styles.home} aria-hidden="true" />
      </div>
    </div>
  );
}
