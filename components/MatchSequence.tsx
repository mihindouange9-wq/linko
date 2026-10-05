"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DIRECTORY } from "@/lib/data";
import { resolveNeed } from "@/lib/match";
import { ensureGsap, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { LinkoSymbol, Piece } from "./Logo";
import { NEED_EVENT } from "./NeedSearch";
import styles from "./MatchSequence.module.css";

/*
  Séquence « Lien » : séparation → recherche → filtrage → correspondance →
  connexion → stabilisation. Le défilement choisit l'étape ; la timeline
  l'interprète avec ses propres courbes, dans les deux sens.
*/

const STEPS = 6;

export default function MatchSequence() {
  const root = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("plombier");
  const [layoutKey, setLayoutKey] = useState(0);
  const [step, setStep] = useState(0);

  const res = useMemo(() => resolveNeed(query), [query]);
  const matchIds = useMemo(() => new Set(res.matches.map((m) => m.id)), [res]);
  const best = res.best;
  const firstName = best.name.split(" ")[0];

  const captions = [
    "Un besoin est formulé.",
    "LINKO parcourt les compétences autour de vous.",
    "Celles qui ne correspondent pas s'écartent.",
    `${res.matches.length > 1 ? `${res.matches.length} profils correspondent` : "Un profil correspond"}. Le plus proche et disponible s'affirme.`,
    "Le besoin et la compétence se rejoignent.",
    "Trouvé.",
  ];

  useEffect(() => {
    const onNeed = (e: Event) => setQuery((e as CustomEvent<string>).detail);
    window.addEventListener(NEED_EVENT, onNeed);
    let to = 0;
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastW) return; // ignore la barre d'adresse mobile
      lastW = window.innerWidth;
      clearTimeout(to);
      to = window.setTimeout(() => setLayoutKey((k) => k + 1), 220);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener(NEED_EVENT, onNeed);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useGSAP(
    () => {
      ensureGsap();
      const el = root.current!;
      const stage = el.querySelector<HTMLElement>("[data-stage]")!;
      const list = el.querySelector<HTMLElement>("[data-list]")!;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
      const bestRow = el.querySelector<HTMLElement>("[data-best='true']")!;
      const others = rows.filter((r) => r !== bestRow);
      const nonMatch = rows.filter((r) => r.dataset.match !== "true");
      const otherMatches = rows.filter((r) => r.dataset.match === "true" && r !== bestRow);
      const scan = el.querySelector<HTMLElement>("[data-scan]")!;
      const overlay = el.querySelector<SVGSVGElement>("[data-overlay]")!;
      const path = overlay.querySelector<SVGLineElement>("[data-path]")!;
      const pNeed = overlay.querySelector<SVGGElement>("[data-p='need']")!;
      const pSkill = overlay.querySelector<SVGGElement>("[data-p='skill']")!;
      const needAnchor = el.querySelector<HTMLElement>("[data-anchor='need']")!;
      const skillAnchor = bestRow.querySelector<HTMLElement>("[data-anchor='skill']")!;
      const detail = bestRow.querySelector<HTMLElement>("[data-detail]")!;
      const bestDot = bestRow.querySelector<HTMLElement>("[data-dot]")!;
      const found = el.querySelector<HTMLElement>("[data-found]")!;
      const caption = el.querySelector<HTMLElement>("[data-caption]")!;

      // ── Calque de connexion : mesuré en direct, il suit toujours les ancres réelles ──
      const prox = { skillIn: 0, draw: 0, join: 0 };
      const lerp = (x: number, y: number, t: number) => x + (y - x) * t;
      const renderLink = () => {
        const sb = stage.getBoundingClientRect();
        overlay.setAttribute("viewBox", `0 0 ${sb.width} ${sb.height}`);
        const center = (n: HTMLElement) => {
          const r = n.getBoundingClientRect();
          return { x: r.left - sb.left + r.width / 2, y: r.top - sb.top + r.height / 2, w: r.width };
        };
        const a = center(needAnchor);
        const b = center(skillAnchor);
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const k = (a.w || 36) / 120;
        const j = prox.join;
        const place = (g: SVGGElement, from: { x: number; y: number }, rot: number) => {
          const x = lerp(from.x, mid.x, j);
          const y = lerp(from.y, mid.y, j);
          const sc = lerp(k, k * 1.8, Math.min(j, 1));
          g.setAttribute(
            "transform",
            `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(rot * (1 - j)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(-60 -60)`,
          );
        };
        place(pNeed, a, -18);
        place(pSkill, b, 24);
        pSkill.style.opacity = String(prox.skillIn);
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        path.setAttribute("x1", `${a.x}`);
        path.setAttribute("y1", `${a.y}`);
        path.setAttribute("x2", `${b.x}`);
        path.setAttribute("y2", `${b.y}`);
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len * (1 - prox.draw)}`;
        path.style.opacity = String(prox.draw > 0 ? 1 - 0.75 * Math.min(j, 1) : 0);
      };
      renderLink();

      gsap.set(detail, { height: 0 });
      gsap.set(found, { autoAlpha: 0 });
      gsap.set(rows, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(scan, { y: 0, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });
      tl.addLabel("s0")
        // 1 — recherche : une seule ligne de balayage parcourt le répertoire
        .to(scan, { autoAlpha: 1, duration: 0.05 })
        .to(scan, { y: () => list.offsetHeight, duration: 1, ease: "linko.search" }, "<")
        .to(rows, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.22, ease: "power2.out", stagger: 0.78 / rows.length }, "<0.04")
        .to(scan, { autoAlpha: 0, duration: 0.1 })
        .addLabel("s1")
        // 2 — filtrage : les mauvaises correspondances s'écartent et s'amincissent
        .to(nonMatch, { x: 28, "--g": 320, "--fade": 1, duration: 0.8, ease: "linko.search", stagger: 0.025 })
        .to(otherMatches.concat(bestRow), { "--g": 600, duration: 0.6 }, "<")
        .addLabel("s2")
        // 3 — correspondance : la graisse suit la confiance
        .to(bestRow, { "--g": 780, "--lift": 1, duration: 0.7, ease: "linko.connect" })
        .to(otherMatches, { "--g": 470, duration: 0.5 }, "<")
        .fromTo(bestDot, { scale: 0 }, { scale: 1, duration: 0.4, ease: "power3.out" }, "<0.2")
        .to(prox, { skillIn: 1, duration: 0.3, onUpdate: renderLink }, "<")
        .addLabel("s3")
        // 4 — connexion : le lien se trace, les deux pièces s'emboîtent
        .to(prox, { draw: 1, duration: 0.6, ease: "power2.inOut", onUpdate: renderLink })
        .to(prox, { join: 1, duration: 0.95, ease: "linko.connect", onUpdate: renderLink }, "-=0.15")
        .addLabel("s4")
        // 5 — stabilisation : la connexion devient une interface réelle
        .to(overlay, { autoAlpha: 0, duration: 0.25 })
        .to(others, { height: 0, paddingTop: 0, paddingBottom: 0, borderBottomWidth: 0, autoAlpha: 0, duration: 0.55 }, "<")
        .to(bestRow, { "--inv": 1, duration: 0.35, ease: "power2.out" }, "<0.15")
        .to(detail, { height: "auto", duration: 0.6, ease: "power3.out" }, "<")
        .to(caption, { autoAlpha: 0, duration: 0.12 }, "<")
        .fromTo(found, { autoAlpha: 0, scale: 1.16 }, { autoAlpha: 1, scale: 1, duration: 0.16, ease: "power4.out" }, ">-0.2")
        .addLabel("s5");

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let current = 0;
      let mover: gsap.core.Tween | null = null;

      const go = (n: number) => {
        if (n === current) return;
        current = n;
        setStep(n);
        mover?.kill();
        if (reduce) {
          tl.seek(`s${n}`);
          return;
        }
        const from = tl.time();
        const to = tl.labels[`s${n}`];
        mover = tl.tweenTo(`s${n}`, {
          duration: Math.min(1.6, Math.max(0.55, Math.abs(to - from) * 0.75)),
          ease: "power1.inOut",
        });
      };

      const st = ScrollTrigger.create({
        trigger: el.querySelector("[data-track]"),
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => go(Math.min(STEPS - 1, Math.floor(self.progress * STEPS * 0.999 + 0.12))),
        onRefresh: renderLink,
      });
      document.fonts?.ready.then(renderLink);
      // état initial cohérent si l'on arrive au milieu de la séquence
      const initial = Math.min(STEPS - 1, Math.floor(st.progress * STEPS * 0.999 + 0.12));
      current = initial;
      tl.seek(`s${initial}`);
      setStep(initial);

      return () => {
        mover?.kill();
        st.kill();
        tl.kill();
      };
    },
    { scope: root, dependencies: [res, layoutKey], revertOnUpdate: true },
  );

  return (
    <section id="lien" ref={root} className={`chapter ${styles.section}`} data-theme="paper" aria-labelledby="lien-title">
      <div className={`wrap ${styles.intro}`}>
        <h2 id="lien-title" className="chapter-title">
          LINKO crée le lien.
        </h2>
        <p className="lead">
          Vous décrivez votre besoin. LINKO cherche, écarte ce qui ne convient pas et vous relie à la personne qui sait
          faire.
        </p>
      </div>

      <div className={styles.track} data-track>
        <div className={styles.stage} data-stage>
          <div className={`wrap ${styles.grid}`}>
            <div className={styles.left}>
              <p className={styles.need}>
                <span className={styles.anchor} data-anchor="need" aria-hidden="true" />
                <span>
                  J'ai besoin d'un {res.tradeLabel}
                  <span className={styles.place}>, Akanda.</span>
                </span>
              </p>
              {res.fallback && (
                <p className={styles.fallback}>
                  « {query} » n'est pas encore dans cette démonstration. Exemple avec « plombier ».
                </p>
              )}

              <div className={styles.narration}>
                <p className={styles.caption} data-caption aria-live="polite">
                  {captions[Math.min(step, 4)]}
                </p>
                <p className={styles.found} data-found aria-hidden={step < 5}>
                  Trouvé.
                </p>
              </div>

              <ol className={styles.steps} aria-hidden="true" style={{ ["--step" as string]: step }}>
                {Array.from({ length: STEPS }).map((_, i) => (
                  <li key={i} data-on={i <= step || undefined} />
                ))}
              </ol>
            </div>

            <div className={styles.right}>
              <div className={styles.listHead} aria-hidden="true">
                <span>Métier</span>
                <span className={styles.hideXs}>Professionnel</span>
                <span className={styles.hideSm}>Secteur</span>
                <span>Dispo.</span>
              </div>
              <ul className={styles.list} data-list>
                {DIRECTORY.map((e) => {
                  const isMatch = matchIds.has(e.id);
                  const isBest = e.id === best.id;
                  return (
                    <li
                      key={e.id}
                      className={styles.row}
                      data-row
                      data-match={isMatch || undefined}
                      data-best={isBest || undefined}
                    >
                      <div className={styles.rowMain}>
                        <span className={styles.trade}>{e.trade}</span>
                        <span className={styles.name}>{e.name}</span>
                        <span className={`${styles.where} ${styles.hideSm}`}>{e.place}</span>
                        <span className={styles.avail}>
                          {isBest ? (
                            <span className="live" data-dot aria-hidden="true" />
                          ) : (
                            <span className={`live ${e.available ? "" : "live--off"}`} aria-hidden="true" />
                          )}
                          <span className={styles.availText}>{e.availability}</span>
                        </span>
                        {isBest && <span className={styles.anchor} data-anchor="skill" aria-hidden="true" />}
                      </div>
                      {isBest && (
                        <div className={styles.detail} data-detail>
                          <div className={styles.fiche}>
                            <div className={styles.ficheHead}>
                              <span className={styles.monogram} aria-hidden="true">
                                {e.name
                                  .split(" ")
                                  .map((w) => w[0])
                                  .join("")}
                              </span>
                              <div>
                                <p className={styles.ficheName}>{e.name}</p>
                                <p className={styles.ficheMeta}>
                                  {e.trade} · {e.place}
                                </p>
                              </div>
                              <LinkoSymbol size={34} className={styles.ficheMark} />
                            </div>
                            <dl className={styles.facts}>
                              <div>
                                <dt>Avis</dt>
                                <dd>
                                  {e.rating} / 5 · {e.reviews} avis
                                </dd>
                              </div>
                              <div>
                                <dt>Expérience</dt>
                                <dd>{e.years} ans</dd>
                              </div>
                              <div>
                                <dt>Diplôme</dt>
                                <dd>{e.diploma}</dd>
                              </div>
                              <div>
                                <dt>Profil</dt>
                                <dd className={styles.check}>
                                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                                    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                                  </svg>
                                  Vérifié
                                </dd>
                              </div>
                            </dl>
                            <div className={styles.ficheActions}>
                              <a href="#application" className="btn btn--signal" tabIndex={step === 5 ? 0 : -1}>
                                Contacter {firstName}
                              </a>
                              <a href="#confiance" className={`btn btn--ghost ${styles.ghostInk}`} tabIndex={step === 5 ? 0 : -1}>
                                Voir le profil
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <span className={styles.scan} data-scan aria-hidden="true" />
              <p className="demo-note">Profils fictifs, à titre de démonstration.</p>
            </div>
          </div>

          <svg className={styles.overlay} data-overlay aria-hidden="true">
            <line data-path className={styles.path} />
            <g data-p="skill">
              <Piece color="var(--signal)" />
            </g>
            <g data-p="need">
              <Piece color="var(--ink)" rotated />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
