"use client";

import { useRef } from "react";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import { Piece } from "./Logo";
import NeedSearch from "./NeedSearch";
import styles from "./Hero.module.css";

/*
  Scène d'ouverture. Deux pièces indépendantes : le besoin (obsidienne) et la
  compétence (verte). Elles cherchent, se détectent quand l'utilisateur
  interagit, se rapprochent et s'emboîtent : la composition devient LINKO.
  Les positions sont calculées par un ressort (masse, inertie, friction) ;
  le défilement ne fixe qu'une cible.
*/

type Vec = { x: number; y: number; r: number };

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const stage = root.current!.querySelector<HTMLElement>("[data-stage]")!;
      const need = stage.querySelector<SVGSVGElement>("[data-piece='need']")!;
      const skill = stage.querySelector<SVGSVGElement>("[data-piece='skill']")!;
      const needTag = stage.querySelector<HTMLElement>("[data-tag='need']")!;
      const skillTag = stage.querySelector<HTMLElement>("[data-tag='skill']")!;
      const link = stage.querySelector<SVGLineElement>("[data-link]")!;
      const line1 = stage.querySelector<HTMLElement>("[data-line='1']")!;
      const line2 = stage.querySelector<HTMLElement>("[data-line='2']")!;
      const text1 = stage.querySelector<HTMLElement>("[data-text='1']")!;
      const text2 = stage.querySelector<HTMLElement>("[data-text='2']")!;
      const status = stage.querySelector<HTMLElement>("[data-status]")!;

      const mm = gsap.matchMedia();

      mm.add(
        {
          // `all` garantit que le contexte s'exécute toujours ; les deux autres informent seulement.
          all: "(min-width: 0px)",
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };

          // ── Mesures ──
          let W = 0,
            H = 0,
            S = 0;
          let baseNeed: Vec, baseSkill: Vec, finalPos: { x: number; y: number };
          let col = 0,
            lift = 0,
            x2Start = 0,
            gutter = 0,
            text2Left = 0,
            needTagMaxY = 0,
            tagPos = { need: { x: 0, y: 0 }, skill: { x: 0, y: 0 } };

          const measure = () => {
            W = stage.clientWidth;
            H = stage.clientHeight;
            const fs = parseFloat(getComputedStyle(text1).fontSize);
            const rule = (l: HTMLElement) => l.offsetTop + l.offsetHeight;
            gutter = text1.offsetLeft;
            const tagH = Math.max(needTag.offsetHeight, skillTag.offsetHeight) || 44;
            if (desktop) {
              const r1 = rule(line1);
              const r2 = rule(line2);
              // la pièce « besoin » vit entre la première règle et le haut de la seconde ligne
              const band = line2.offsetTop - r1;
              S = Math.min(fs * 1.95, H * 0.26, band * 0.98);
              lift = r1 + fs * 1.06 - r2;
              col = text1.offsetLeft + S * 1.12;
              // la ligne 2 part alignée à droite, puis rejoint la colonne
              if (!reduce) stage.dataset.anchored = "true";
              x2Start = line2.clientWidth - text1.offsetLeft * 2 - text2.offsetWidth;
              const top = r1 - fs * 0.74;
              const bottom = r1 + fs * 1.06;
              finalPos = { x: text1.offsetLeft + S * 0.46, y: (top + bottom) / 2 };
              // l'étiquette « Besoin » se lit à gauche de la pièce, dans la marge sous « Un besoin. »
              baseNeed = { x: gutter + needTag.offsetWidth + 14 + S / 2, y: (r1 + line2.offsetTop) / 2 + S * 0.04, r: -16 };
              baseSkill = { x: W * 0.79, y: H * 0.255, r: 22 };
              text2Left = line2.clientWidth - gutter - text2.offsetWidth;
              needTagMaxY = line2.offsetTop - tagH - 6;
            } else {
              const r1 = rule(line1);
              const r2 = line2.offsetTop; // haut du texte de la seconde ligne
              const band = r2 - r1;
              S = Math.max(80, Math.min(W * 0.34, band - tagH - 24));
              finalPos = { x: W * 0.5, y: (r1 + r2) / 2 };
              baseNeed = { x: W * 0.27, y: finalPos.y - S * 0.08, r: -16 };
              baseSkill = { x: W * 0.73, y: finalPos.y + S * 0.08, r: 22 };
              // étiquettes à poste fixe, entre les deux règles
              tagPos = {
                skill: { x: line2.clientWidth - gutter, y: r1 + 8 },
                need: { x: gutter, y: r2 - tagH - 8 },
              };
            }
            need.style.width = need.style.height = `${S}px`;
            skill.style.width = skill.style.height = `${S}px`;
          };
          measure();

          // ── Défilement : timeline typographique + cible de connexion ──
          let pTarget = reduce ? 1 : 0;
          let p = pTarget;

          if (!reduce) {
            const tl = gsap.timeline({
              defaults: { ease: "power3.inOut" },
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: desktop ? "+=115%" : "+=60%",
                pin: desktop,
                scrub: 0.5,
                invalidateOnRefresh: true,
                onRefresh: measure,
                onUpdate: (self) => {
                  pTarget = self.progress;
                },
              },
            });

            tl.to([needTag, skillTag], { clipPath: "inset(0% 100% 0% 0%)", duration: 0.18, ease: "power2.in" }, 0.06);

            if (desktop) {
              // Alignement cinétique : les deux lignes rejoignent la même colonne.
              tl.to(text1, { x: () => col - text1.offsetLeft, duration: 0.42 }, 0.34)
                .to(line2, { y: () => lift, duration: 0.42 }, 0.34)
                .fromTo(text2, { x: () => x2Start }, { x: () => col - text1.offsetLeft, duration: 0.46 }, 0.36)
                .to([text1, text2], { "--w": 78, duration: 0.2, ease: "power2.in" }, 0.34)
                .to([text1, text2], { "--w": 90, "--g": 700, duration: 0.26, ease: "linko.connect" }, 0.56);
            }
            tl.fromTo(status, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.16, ease: "power2.out" }, 0.8);
            tl.to({}, { duration: 0.04 }, 0.96);
          } else {
            gsap.set([needTag, skillTag], { autoAlpha: 0 });
            gsap.set(status, { clipPath: "none" });
            if (desktop) {
              gsap.set(text1, { x: col - text1.offsetLeft, "--w": 90, "--g": 700 });
              gsap.set(line2, { y: lift });
              gsap.set(text2, { x: col - text2.offsetLeft, "--w": 90, "--g": 700 });
            }
          }

          // ── Curseur : la relation est détectée ──
          let pointer = { x: -1, y: -1, active: false };
          let attraction = 0;
          const onMove = (e: PointerEvent) => {
            const b = stage.getBoundingClientRect();
            pointer = { x: e.clientX - b.left, y: e.clientY - b.top, active: true };
          };
          const onLeave = () => (pointer.active = false);
          if (!reduce) {
            stage.addEventListener("pointermove", onMove);
            stage.addEventListener("pointerleave", onLeave);
          }

          // ── Ressort ──
          const state = {
            need: { x: baseNeed!.x, y: baseNeed!.y, r: baseNeed!.r, vx: 0, vy: 0, vr: 0 },
            skill: { x: baseSkill!.x, y: baseSkill!.y, r: baseSkill!.r, vx: 0, vy: 0, vr: 0 },
          };
          if (reduce) {
            Object.assign(state.need, { x: finalPos!.x, y: finalPos!.y, r: 0 });
            Object.assign(state.skill, { x: finalPos!.x, y: finalPos!.y, r: 0 });
          }

          const setNeed = gsap.quickSetter(need, "css");
          const setSkill = gsap.quickSetter(skill, "css");
          const place = (el: HTMLElement, x: number, y: number) => {
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          };

          const ease = (t: number) => {
            const c = Math.min(Math.max(t, 0), 1);
            return c * c * (3 - 2 * c);
          };

          let t0 = performance.now();
          const tick = () => {
            const t = (performance.now() - t0) / 1000;
            p += (pTarget - p) * 0.14;
            const join = ease((p - 0.12) / 0.58);
            const wanderAmt = (1 - join) * (reduce ? 0 : 1);

            // Attraction quand le curseur est entre les deux pièces
            const mid = {
              x: (state.need.x + state.skill.x) / 2,
              y: (state.need.y + state.skill.y) / 2,
            };
            const near = pointer.active
              ? Math.max(0, 1 - Math.hypot(pointer.x - mid.x, pointer.y - mid.y) / (W * 0.42))
              : 0;
            attraction += (near - attraction) * 0.06;
            const pull = attraction * 0.16 * (1 - join);
            // le rapprochement se fait surtout en hauteur : le besoin ne glisse pas sous le titre
            const dx = (baseSkill.x - baseNeed.x) * 0.45;
            const dy = baseSkill.y - baseNeed.y;
            const amp = desktop ? 1 : 0.5;

            const targets = {
              need: {
                x: baseNeed.x + Math.sin(t * 0.37) * 11 * amp * wanderAmt + dx * pull * 0.6,
                y: baseNeed.y + Math.cos(t * 0.29) * 9 * amp * wanderAmt + dy * pull * 0.5,
                r: baseNeed.r * (1 - attraction * 0.55) + Math.sin(t * 0.23) * 3 * wanderAmt,
              },
              skill: {
                x: baseSkill.x + Math.sin(t * 0.31 + 2) * 11 * amp * wanderAmt - dx * pull,
                y: baseSkill.y + Math.cos(t * 0.41 + 1) * 9 * amp * wanderAmt - dy * pull,
                r: baseSkill.r * (1 - attraction * 0.55) + Math.sin(t * 0.19 + 1) * 3 * wanderAmt,
              },
            };

            (["need", "skill"] as const).forEach((k) => {
              const s = state[k];
              const tg = targets[k];
              const fx = tg.x + (finalPos.x - tg.x) * join;
              const fy = tg.y + (finalPos.y - tg.y) * join;
              const fr = tg.r * (1 - join);
              if (reduce) {
                s.x = fx;
                s.y = fy;
                s.r = fr;
                return;
              }
              // masse / raideur / friction : léger dépassement puis stabilisation
              s.vx = (s.vx + (fx - s.x) * 0.085) * 0.76;
              s.vy = (s.vy + (fy - s.y) * 0.085) * 0.76;
              s.vr = (s.vr + (fr - s.r) * 0.07) * 0.74;
              s.x += s.vx;
              s.y += s.vy;
              s.r += s.vr;
            });

            setNeed({ x: state.need.x - S / 2, y: state.need.y - S / 2, rotation: state.need.r });
            setSkill({ x: state.skill.x - S / 2, y: state.skill.y - S / 2, rotation: state.skill.r });
            if (desktop) {
              const tx = Math.min(state.need.x - S / 2 - 14 - needTag.offsetWidth, text2Left - needTag.offsetWidth - 8);
              const ty = Math.min(state.need.y - needTag.offsetHeight / 2 + S * 0.05, needTagMaxY);
              place(needTag, tx, ty);
              place(skillTag, state.skill.x - S * 0.36, state.skill.y - S * 0.42);
            } else {
              place(needTag, tagPos.need.x, tagPos.need.y);
              place(skillTag, tagPos.skill.x, tagPos.skill.y);
            }

            // Le lien apparaît quand la relation est détectée, disparaît une fois joint
            const linkAlpha = Math.max(attraction * 1.2, Math.min(join * 3, 1)) * (1 - ease((join - 0.55) / 0.3));
            link.setAttribute("x1", state.need.x.toFixed(1));
            link.setAttribute("y1", state.need.y.toFixed(1));
            link.setAttribute("x2", state.skill.x.toFixed(1));
            link.setAttribute("y2", state.skill.y.toFixed(1));
            link.style.opacity = linkAlpha.toFixed(3);
            stage.dataset.joined = join > 0.98 ? "true" : "false";
          };

          gsap.ticker.add(tick);
          tick();
          const onResize = () => measure();
          window.addEventListener("resize", onResize);

          return () => {
            gsap.ticker.remove(tick);
            delete stage.dataset.anchored;
            window.removeEventListener("resize", onResize);
            stage.removeEventListener("pointermove", onMove);
            stage.removeEventListener("pointerleave", onLeave);
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="besoin" ref={root} className={`chapter ${styles.hero}`} data-theme="paper" aria-labelledby="hero-title">
      <div className={styles.stage} data-stage>
        <h1 id="hero-title" className={styles.title}>
          <span className={`${styles.line} ${styles.line1}`} data-line="1">
            <span className={styles.text} data-text="1">
              Un besoin.
            </span>
          </span>
          <span className={`${styles.line} ${styles.line2}`} data-line="2">
            <span className={`${styles.text} ${styles.text2}`} data-text="2">
              La bonne compétence.
            </span>
          </span>
        </h1>

        <svg className={styles.linkLayer} aria-hidden="true">
          <line data-link className={styles.link} />
        </svg>

        <svg className={styles.piece} data-piece="skill" viewBox="0 0 120 120" aria-hidden="true">
          <Piece color="var(--signal)" />
        </svg>
        <svg className={styles.piece} data-piece="need" viewBox="0 0 120 120" aria-hidden="true">
          <Piece color="var(--ink)" rotated />
        </svg>

        <p className={`${styles.tag} ${styles.tagNeed}`} data-tag="need" aria-hidden="true">
          <span className={styles.tagKey}>Besoin</span>
          Fuite sous l'évier, Akanda
        </p>
        <p className={`${styles.tag} ${styles.tagSkill}`} data-tag="skill" aria-hidden="true">
          <span className={styles.tagKey}>Compétence</span>
          Plomberie, CAP, 9 ans, disponible
        </p>

        <div className={styles.bottom}>
          <p className={styles.status} data-status>
            <span className="live" aria-hidden="true" />
            LINKO met en relation ceux qui ont un besoin et ceux qui ont la compétence.
          </p>
          <NeedSearch />
        </div>
      </div>
    </section>
  );
}
