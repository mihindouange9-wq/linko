"use client";

import { useEffect, useState } from "react";
import { CHAPTERS } from "@/lib/data";
import styles from "./ThumbIndex.module.css";

/*
  Index à onglets, comme le bord d'un répertoire.
  Un seul témoin vert indique toujours le chapitre en cours.
*/
export default function ThumbIndex() {
  const [active, setActive] = useState<string>(CHAPTERS[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    let raf = 0;
    const measure = () => {
      raf = 0;
      const probe = window.innerHeight * 0.45;
      let current = sections[0]?.id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= probe) current = s.id;
      }
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activeIndex = Math.max(0, CHAPTERS.findIndex((c) => c.id === active));
  const activeChapter = CHAPTERS[activeIndex];
  const tone = activeChapter.theme === "ink" ? "ink" : "paper";

  return (
    <>
      <nav className={styles.index} data-tone={tone} aria-label="Chapitres">
        <ol>
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className={styles.tab} aria-current={c.id === active ? "location" : undefined}>
                <span className={styles.label}>{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
        <span className={styles.temoin} aria-hidden="true" style={{ ["--active" as string]: activeIndex }} />
      </nav>

      {/* Mobile : barre basse, chapitre en cours + action principale */}
      <div className={styles.bar} data-tone={tone}>
        <button
          type="button"
          className={styles.barIndex}
          aria-expanded={open}
          aria-controls="index-sheet"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.barDot} aria-hidden="true" />
          <span className={styles.barLabel}>{activeChapter.label}</span>
          <span className={styles.barCount}>
            {activeIndex + 1}/{CHAPTERS.length}
          </span>
        </button>
        <a className={`btn btn--signal ${styles.barCta}`} href="#besoin" onClick={() => setOpen(false)}>
          Décrire un besoin
        </a>
      </div>

      <div id="index-sheet" className={styles.sheet} hidden={!open}>
        <ol>
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={c.id === active ? "location" : undefined} onClick={() => setOpen(false)}>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
