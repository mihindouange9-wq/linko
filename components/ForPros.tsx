"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import styles from "./ForPros.module.css";

const BENEFITS = [
  { title: "Montrez votre métier", text: "Compétences, réalisations, années d'expérience : votre profil parle pour vous." },
  { title: "Choisissez votre zone", text: "Vous recevez des demandes là où vous intervenez, pas ailleurs." },
  { title: "Signalez-vous disponible", text: "Un geste suffit pour remonter dans les recherches du moment." },
  { title: "Gagnez des clients", text: "Chaque intervention réussie ajoute un avis et renforce votre profil." },
];

type Pro = { id: string; name: string; meta: string; me?: boolean; avail: boolean; when: string };

export default function ForPros() {
  const [on, setOn] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const pros: Pro[] = [
    { id: "p1", name: "Landry O.", meta: "Électricien · 2,1 km", avail: true, when: "Disponible" },
    { id: "me", name: "Vous · Pamela N.", meta: "Électricienne · 1,4 km", me: true, avail: on, when: on ? "Disponible" : "Demain" },
    { id: "p2", name: "Christelle M.", meta: "Électricienne · 5,8 km", avail: false, when: "Jeudi" },
    { id: "p3", name: "Brice O.", meta: "Électricien · 7,0 km", avail: false, when: "Lundi" },
  ];
  const now = pros.filter((p) => p.avail).sort((a, b) => Number(!!b.me) - Number(!!a.me));
  const later = pros.filter((p) => !p.avail);

  const toggle = () => {
    if (list.current) {
      gsap.registerPlugin(Flip);
      flipState.current = Flip.getState(list.current.querySelectorAll("[data-flip]"));
    }
    setOn((v) => !v);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    Flip.from(flipState.current, {
      duration: reduce ? 0 : 0.75,
      ease: "power3.inOut",
      absolute: false,
      nested: true,
    });
    flipState.current = null;
  }, [on]);

  const row = (p: Pro) => (
    <li key={p.id} className={styles.pro} data-flip data-flip-id={p.id} data-me={p.me || undefined}>
      <span className={styles.proName}>{p.name}</span>
      <span className={styles.proMeta}>{p.meta}</span>
      <span className={styles.proWhen}>
        <span className={`live ${p.avail ? "" : "live--off"}`} aria-hidden="true" />
        {p.when}
      </span>
    </li>
  );

  return (
    <section id="pros" className={`chapter ${styles.section}`} data-theme="ink" aria-labelledby="pros-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="pros-title" className="chapter-title">
            Votre savoir-faire mérite d'être trouvé.
          </h2>
          <p className="lead">
            Plombiers, soudeurs, frigoristes, jardiniers, informaticiens : à Libreville puis dans tout le Gabon, LINKO vous
            met en face des personnes qui ont besoin de vous, aujourd'hui.
          </p>
          <ul className={styles.benefits}>
            {BENEFITS.map((b) => (
              <li key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a href="#contact" className="btn btn--signal">
              Créer mon profil professionnel
              <span className="tension" aria-hidden="true" />
            </a>
            <a href="#tarifs" className={styles.pricesLink}>
              Abonnement à partir de 3 000 FCFA par mois, premier mois offert
            </a>
          </div>
        </div>

        <div className={styles.demo}>
          <div className={styles.panel}>
            <div className={styles.switchRow}>
              <div>
                <p className={styles.switchLabel} id="dispo-label">
                  Disponible aujourd'hui
                </p>
                <p className={styles.switchHint}>{on ? "Les clients vous voient en premier." : "Activez pour remonter dans les recherches."}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-labelledby="dispo-label"
                className={styles.switch}
                onClick={toggle}
              >
                <span className={styles.knob} />
              </button>
            </div>
          </div>

          <div className={styles.panel} ref={list}>
            <p className={styles.panelTitle}>Ce que voit un client qui cherche « électricien »</p>
            <p className={styles.group}>Disponibles maintenant</p>
            <ul className={styles.pros}>{now.map(row)}</ul>
            <p className={styles.group}>Plus tard</p>
            <ul className={styles.pros}>{later.map(row)}</ul>
          </div>
          <p className={styles.note}>Démonstration interactive. Profils fictifs.</p>
        </div>
      </div>
    </section>
  );
}
