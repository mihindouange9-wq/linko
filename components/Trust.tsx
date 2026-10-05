"use client";

import { useEffect, useRef, useState } from "react";
import { LinkoSymbol } from "./Logo";
import styles from "./Trust.module.css";

type Key = "verif" | "diplome" | "avis" | "exp" | "dispo";

const NOTES: { key: Key; title: string; text: string }[] = [
  {
    key: "verif",
    title: "Vérifié",
    text: "Chaque profil affiche son statut de vérification. Vous savez qui vous accueillez chez vous.",
  },
  {
    key: "diplome",
    title: "Diplômes",
    text: "CAP, Bac pro, BTS, certifications : le professionnel les déclare, LINKO vérifie le justificatif et l'affiche.",
  },
  {
    key: "avis",
    title: "Avis",
    text: "Les clients notent après l'intervention. La note et les commentaires restent visibles.",
  },
  {
    key: "exp",
    title: "Expérience",
    text: "Années de métier et réalisations, présentées par le professionnel lui-même.",
  },
  {
    key: "dispo",
    title: "Disponibilité",
    text: "Le professionnel la met à jour d'un geste. Le vert veut dire : disponible maintenant.",
  },
];

export default function Trust() {
  const [active, setActive] = useState<Key | null>(null);
  const fiche = useRef<HTMLDivElement>(null);

  // Les informations se précisent là où passe le curseur (graisse et contraste).
  useEffect(() => {
    const el = fiche.current;
    if (!el || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-field]"));
    let raf = 0;
    let y = -9999;
    const apply = () => {
      raf = 0;
      for (const r of rows) {
        const b = r.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - y);
        const k = Math.max(0, 1 - d / 140);
        r.style.setProperty("--near", k.toFixed(3));
      }
    };
    const onMove = (e: PointerEvent) => {
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      y = -9999;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.dataset.lens = "true";
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const field = (key: Key | null) => ({
    "data-field": true,
    "data-active": active && key === active ? true : undefined,
    onPointerEnter: key ? () => setActive(key) : undefined,
  });

  return (
    <section id="confiance" className={`chapter ${styles.section}`} data-theme="paper" aria-labelledby="confiance-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="confiance-title" className="chapter-title">
            La confiance se lit sur le profil.
          </h2>
          <p className="lead">
            Pas de promesse en l'air : diplômes, expérience, avis et disponibilité sont affichés au même endroit, pour chaque
            professionnel.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.fiche} ref={fiche} onPointerLeave={() => setActive(null)}>
            <div className={styles.ficheHead}>
              <span className={styles.monogram} aria-hidden="true">
                PN
              </span>
              <div>
                <p className={styles.name}>Pamela Nguema</p>
                <p className={styles.meta}>Électricienne · Libreville, Louis</p>
              </div>
              <LinkoSymbol size={32} style={{ ["--mark-need" as string]: "var(--paper)" }} />
            </div>

            <dl className={styles.fields}>
              <div className={styles.field} {...field("verif")}>
                <dt>Identité</dt>
                <dd className={styles.ok}>
                  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  Profil vérifié
                </dd>
              </div>
              <div className={styles.field} {...field("diplome")}>
                <dt>Diplômes</dt>
                <dd>
                  Bac pro Électrotechnique
                  <span className={styles.sub}>Habilitation électrique basse tension · 2024 · vérifiée</span>
                </dd>
              </div>
              <div className={styles.field} {...field("avis")}>
                <dt>Avis</dt>
                <dd>
                  <span className={styles.big}>4,9</span> / 5 · 52 avis
                  <q className={styles.quote}>Tableau remis aux normes en une matinée, explications claires.</q>
                  <span className={styles.by}>Thierry, Nzeng-Ayong</span>
                </dd>
              </div>
              <div className={styles.field} {...field("exp")}>
                <dt>Expérience</dt>
                <dd>
                  <span className={styles.big}>11</span> ans de métier
                  <span className={styles.sub}>Tableaux électriques, éclairage, mise aux normes</span>
                </dd>
              </div>
              <div className={styles.field} {...field("dispo")}>
                <dt>Disponibilité</dt>
                <dd className={styles.dispo}>
                  <span className="live" aria-hidden="true" />
                  Aujourd'hui, à partir de 14 h
                </dd>
              </div>
              <div className={styles.field} {...field(null)}>
                <dt>Zone</dt>
                <dd>Libreville, Akanda, Owendo</dd>
              </div>
            </dl>
            <p className={styles.demo}>Profil fictif, à titre de démonstration.</p>
          </div>

          <ul className={styles.notes}>
            {NOTES.map((n) => (
              <li
                key={n.key}
                className={styles.note}
                data-active={active === n.key || undefined}
                onPointerEnter={() => setActive(n.key)}
                onPointerLeave={() => setActive(null)}
              >
                <h3 className={styles.noteTitle}>{n.title}</h3>
                <p className={styles.noteText}>{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
