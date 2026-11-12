import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page introuvable — LINKO",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader home={false} />
      <main id="contenu" className={styles.page}>
        <p className={styles.code}>Erreur 404</p>
        <h1 className="chapter-title">Cette page n'existe pas.</h1>
        <p className="lead">L'adresse a peut-être changé. Revenez à l'accueil pour décrire votre besoin.</p>
        <Link href="/" className="btn btn--ink">
          Retour à l'accueil
          <span className="tension" aria-hidden="true" />
        </Link>
      </main>
    </>
  );
}
