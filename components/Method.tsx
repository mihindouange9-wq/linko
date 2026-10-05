"use client";

import { useRef } from "react";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import PairGlyph, { type PairState } from "./PairGlyph";
import styles from "./Method.module.css";

const STEPS: { verb: string; text: string; state: PairState }[] = [
  {
    verb: "Recherche",
    text: "Vous décrivez votre besoin en quelques mots ou vous choisissez un métier.",
    state: "apart",
  },
  {
    verb: "Sélection",
    text: "Vous comparez les profils : diplômes vérifiés, expérience, avis, disponibilité, distance. Vous choisissez.",
    state: "search",
  },
  {
    verb: "Connexion",
    text: "Vous réservez un créneau libre ou vous contactez le professionnel depuis son profil.",
    state: "near",
  },
  {
    verb: "Intervention",
    text: "Le travail est fait. Votre avis rejoint le profil et guide les personnes suivantes.",
    state: "joined",
  },
];

export default function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Le témoin suit la lecture le long de la règle ; chaque étape s'allume à son passage.
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
        gsap
          .timeline({
            scrollTrigger: { trigger: "[data-rail]", start: "top 78%", end: "bottom 40%", scrub: 0.7 },
          })
          .fromTo("[data-progress]", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: 1 })
          .fromTo(
            steps,
            { "--on": 0 },
            { "--on": 1, ease: "power2.out", duration: 0.2, stagger: 0.8 / (steps.length - 1) },
            0,
          );
      });
    },
    { scope: root },
  );

  return (
    <section id="methode" ref={root} className={`chapter ${styles.section}`} data-theme="paper" aria-labelledby="methode-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="methode-title" className="chapter-title">
            Comment ça marche.
          </h2>
          <p className="lead">Quatre gestes, du besoin à l'intervention. Chacun rapproche un peu plus les deux côtés.</p>
        </div>

        <div className={styles.railWrap}>
          <span className={styles.progress} data-progress aria-hidden="true" />
          <ol className={styles.rail} data-rail>
          {STEPS.map((s, i) => (
            <li key={s.verb} className={styles.step} data-step>
              <PairGlyph state={s.state} size={44} className={styles.glyph} />
              <h3 className={styles.verb}>
                <span className="sr-only">Étape {i + 1} : </span>
                {s.verb}
              </h3>
              <p className={styles.text}>{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
