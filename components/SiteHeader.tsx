import Link from "next/link";
import { Lockup } from "./Logo";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({ home = true }: { home?: boolean }) {
  return (
    <header className={`${styles.header} ${home ? "" : styles.plain}`}>
      <Link href="/" className={styles.brand} aria-label="LINKO, accueil">
        <Lockup symbolSize={30} />
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        {home ? (
          <>
            <a href="#pros" className={styles.link}>
              Je suis professionnel
            </a>
            <a href="#entreprises" className={styles.link}>
              Entreprises
            </a>
          </>
        ) : (
          <Link href="/" className={styles.link}>
            Le site
          </Link>
        )}
        <Link href="/marque" className={styles.link}>
          Marque
        </Link>
      </nav>
    </header>
  );
}
