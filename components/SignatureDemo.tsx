"use client";

import { useRef, useState } from "react";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import { Piece } from "./Logo";
import styles from "./SignatureDemo.module.css";

const PHASES = ["Séparation", "Recherche", "Rapprochement", "Connexion", "Stabilisation"];

/* La signature motion, jouée à la demande : chaque phase est nommée pendant qu'elle a lieu. */
export default function SignatureDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [phase, setPhase] = useState(4);

  useGSAP(
    () => {
      ensureGsap();
      const need = "[data-demo='need']";
      const skill = "[data-demo='skill']";
      const decoy = gsap.utils.toArray<SVGGElement>("[data-demo='decoy']");
      const t = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });
      const at = (n: number) => () => setPhase(n);

      t.set(need, { x: -150, y: 18, rotation: -20, svgOrigin: "60 60" })
        .set(skill, { x: 150, y: -18, rotation: 26, svgOrigin: "60 60", opacity: 0.25 })
        .set(decoy, { opacity: 0.25 })
        .call(at(0))
        .to({}, { duration: 0.5 })
        // recherche : plusieurs compétences se présentent, les mauvaises s'écartent
        .call(at(1))
        .to(decoy, { opacity: 1, duration: 0.3, stagger: 0.12 })
        .to(decoy[0], { y: -70, opacity: 0, duration: 0.6, ease: "linko.search" }, "+=0.2")
        .to(decoy[1], { y: 70, opacity: 0, duration: 0.6, ease: "linko.search" }, "<0.08")
        .to(skill, { opacity: 1, duration: 0.3 }, "<0.2")
        // rapprochement
        .call(at(2))
        .to(need, { x: -60, y: 6, rotation: -8, duration: 0.7 })
        .to(skill, { x: 60, y: -6, rotation: 10, duration: 0.7 }, "<")
        // connexion
        .call(at(3))
        .to([need, skill], { x: 0, y: 0, rotation: 0, duration: 0.8, ease: "linko.connect" })
        // stabilisation
        .call(at(4))
        .to("[data-demo='ring']", { scale: 1.6, opacity: 0, duration: 0.9, ease: "power2.out", svgOrigin: "60 60" }, "-=0.25")
        .set("[data-demo='ring']", { scale: 1, opacity: 0 });
      tl.current = t;
    },
    { scope: root },
  );

  const play = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!tl.current) return;
    if (reduce) {
      tl.current.progress(1);
      setPhase(4);
    } else tl.current.restart();
  };

  return (
    <div className={styles.demo} ref={root}>
      <svg viewBox="-200 -60 520 240" className={styles.stage} aria-hidden="true">
        <line x1="-200" x2="320" y1="170" y2="170" className={styles.rule} />
        <circle data-demo="ring" cx="60" cy="60" r="62" className={styles.ring} opacity="0" />
        <g data-demo="decoy" transform="translate(220 -40) scale(.45)" opacity="0">
          <Piece color="var(--faint)" />
        </g>
        <g data-demo="decoy" transform="translate(230 100) scale(.45)" opacity="0">
          <Piece color="var(--faint)" />
        </g>
        <g data-demo="skill">
          <Piece color="var(--signal)" />
        </g>
        <g data-demo="need">
          <Piece color="var(--ink)" rotated />
        </g>
      </svg>
      <ol className={styles.phases}>
        {PHASES.map((p, i) => (
          <li key={p} data-on={i === phase || undefined} data-past={i < phase || undefined}>
            {p}
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn--ink" onClick={play}>
        Rejouer la signature
      </button>
    </div>
  );
}
