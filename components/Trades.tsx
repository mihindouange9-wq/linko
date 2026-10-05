"use client";

import { useId, useMemo, useState } from "react";
import { TRADES } from "@/lib/data";
import { normalize } from "@/lib/match";
import { submitNeed } from "./NeedSearch";
import styles from "./Trades.module.css";

function highlight(name: string, q: string) {
  if (!q) return name;
  const n = normalize(name);
  const i = n.indexOf(q);
  if (i < 0) return name;
  return (
    <>
      {name.slice(0, i)}
      <mark className={styles.mark}>{name.slice(i, i + q.length)}</mark>
      {name.slice(i + q.length)}
    </>
  );
}

export default function Trades() {
  const id = useId();
  const [q, setQ] = useState("");
  const nq = normalize(q);

  const visible = useMemo(
    () => new Set(TRADES.filter((t) => !nq || normalize(t.name).includes(nq) || normalize(t.examples).includes(nq)).map((t) => t.slug)),
    [nq],
  );

  let lastLetter = "";

  return (
    <section id="metiers" className={`chapter ${styles.section}`} data-theme="paper" aria-labelledby="metiers-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.side}>
          <h2 id="metiers-title" className="chapter-title">
            Les professionnels.
          </h2>
          <p className="lead">
            Les métiers du quotidien, de l'urgence et de l'entreprise. Chacun avec des personnes qui le pratiquent près
            de chez vous.
          </p>
          <div className={styles.filter}>
            <label htmlFor={id} className={styles.filterLabel}>
              Filtrer le répertoire
            </label>
            <input
              id={id}
              type="text"
              className={styles.input}
              placeholder="ex. clim, portail, fuite"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            <p className={styles.count} aria-live="polite">
              {visible.size === TRADES.length
                ? `${TRADES.length} métiers`
                : visible.size === 0
                  ? "Aucun métier"
                  : `${visible.size} sur ${TRADES.length}`}
            </p>
          </div>
        </div>

        <div>
          <ul className={styles.list}>
            {TRADES.map((t) => {
              const letter = normalize(t.name)[0].toUpperCase();
              const showLetter = letter !== lastLetter;
              lastLetter = letter;
              const on = visible.has(t.slug);
              return (
                <li key={t.slug} className={styles.item} data-on={on || undefined} aria-hidden={!on || undefined}>
                  <div className={styles.inner}>
                    <button
                      type="button"
                      className={styles.row}
                      tabIndex={on ? 0 : -1}
                      onClick={() => submitNeed(t.name)}
                    >
                      <span className={styles.letter} aria-hidden="true">
                        {showLetter ? letter : ""}
                      </span>
                      <span className={styles.name}>{highlight(t.name, nq)}</span>
                      <span className={styles.examples}>{t.examples}</span>
                      <span className={styles.go} aria-hidden="true">
                        Voir des profils
                      </span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          {visible.size === 0 && (
            <div className={styles.empty}>
              <p>Ce métier n'est pas encore dans le répertoire. Décrivez votre besoin : LINKO cherchera la bonne compétence.</p>
              <button type="button" className="btn btn--ink" onClick={() => submitNeed(q)}>
                Décrire mon besoin
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
