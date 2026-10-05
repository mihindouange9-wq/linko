import Link from "next/link";
import { Lockup, Piece } from "./Logo";
import NeedSearch from "./NeedSearch";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section id="contact" className={`chapter ${styles.section}`} data-theme="ink" aria-labelledby="contact-title">
      <div className={`wrap ${styles.entry}`}>
        {/* La dernière entrée du répertoire : le titre sur sa règle, le symbole posé au bout de la ligne. */}
        <div className={styles.head}>
          <h2 id="contact-title" className={styles.title}>
            Votre prochain professionnel est peut-être déjà sur LINKO.
          </h2>
          {/* Les deux pièces au repos ; quand l'utilisateur s'apprête à agir, la tension se resserre. */}
          <svg className={styles.mark} viewBox="-10 -10 140 140" aria-hidden="true">
            <g className={styles.skill}>
              <Piece color="var(--signal)" />
            </g>
            <g className={styles.need}>
              <Piece color="var(--paper)" rotated />
            </g>
          </svg>
        </div>
        <NeedSearch variant="ink" />
        <p className={styles.pro}>
          Vous êtes professionnel ?{" "}
          <a href="#pros" className={styles.proLink}>
            Créez votre profil
          </a>
        </p>
      </div>

      <footer className={`wrap ${styles.footer}`}>
        <div className={styles.footBrand}>
          <Lockup symbolSize={26} />
          <p className={styles.slogan}>Un besoin. La bonne compétence.</p>
        </div>
        <nav aria-label="Pied de page" className={styles.footNav}>
          <a href="#metiers">Métiers</a>
          <a href="#pros">Professionnels</a>
          <a href="#entreprises">Entreprises</a>
          <Link href="/marque">Plateforme de marque</Link>
        </nav>
        <p className={styles.legal}>
          © 2026 LINKO. Les profils, noms, avis et demandes présentés sur ce site sont fictifs et servent à illustrer le
          fonctionnement du service.
        </p>
      </footer>
    </section>
  );
}
