"use client";

import { useRef } from "react";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import styles from "./Problem.module.css";

const CONTACTS = [
  { name: "Plombier (numéro de Didier)", note: "Ne répond plus" },
  { name: "Électricien Bonabéri", note: "Venu une fois, jamais revenu" },
  { name: "Le monsieur du quartier", note: "Nom inconnu, numéro perdu" },
  { name: "Peintre, cousin de Mariam", note: "Disponible le mois prochain" },
  { name: "Frigoriste vu sur un mur", note: "Numéro à moitié effacé" },
];

export default function Problem() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Chaque contact échoue : le trait barre la ligne au fil de la lecture.
        gsap.utils.toArray<HTMLElement>("[data-contact]").forEach((row) => {
          const strike = row.querySelector("[data-strike]");
          const note = row.querySelector("[data-note]");
          gsap
            .timeline({
              scrollTrigger: { trigger: row, start: "top 72%", end: "top 48%", scrub: 0.6 },
            })
            .fromTo(strike, { scaleX: 0 }, { scaleX: 1, ease: "linko.search" })
            .fromTo(row.querySelector("[data-name]"), { "--g": 560 }, { "--g": 360, ease: "none" }, 0)
            .fromTo(note, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }, 0.4);
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="probleme" ref={root} className={`chapter ${styles.problem}`} data-theme="paper" aria-labelledby="probleme-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="probleme-title" className="chapter-title">
            Trouver la bonne personne ne devrait pas être compliqué.
          </h2>
          <p className="lead">
            Aujourd'hui, on demande autour de soi, on fouille ses contacts, on rappelle. Le bon professionnel existe
            souvent à quelques rues. Le trouver prend des jours.
          </p>
        </div>

        <figure className={styles.book}>
          <figcaption className={styles.bookHead}>
            <span>Contacts</span>
            <span className="muted">« plombier »</span>
          </figcaption>
          <ul>
            {CONTACTS.map((c) => (
              <li key={c.name} className={styles.row} data-contact>
                <span className={styles.name} data-name>
                  {c.name}
                  <span className={styles.strike} data-strike aria-hidden="true" />
                </span>
                <span className={styles.note} data-note>
                  {c.note}
                </span>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
