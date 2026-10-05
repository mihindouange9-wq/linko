"use client";

import { useId, useState, type FormEvent } from "react";
import { SUGGESTIONS } from "@/lib/data";
import styles from "./NeedSearch.module.css";

export const NEED_EVENT = "linko:need";

export function submitNeed(query: string) {
  const q = query.trim();
  if (!q) return;
  window.dispatchEvent(new CustomEvent(NEED_EVENT, { detail: q }));
  const target = document.getElementById("lien");
  if (target) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
}

type Props = { variant?: "paper" | "ink"; compact?: boolean };

export default function NeedSearch({ variant = "paper", compact = false }: Props) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      setError(true);
      return;
    }
    setError(false);
    submitNeed(value);
  }

  return (
    <form
      className={`${styles.form} ${variant === "ink" ? styles.ink : ""} ${compact ? styles.compact : ""}`}
      onSubmit={onSubmit}
      role="search"
      noValidate
    >
      <div className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          J'ai besoin d'un·e
        </label>
        <input
          id={id}
          className={styles.input}
          type="text"
          inputMode="search"
          autoComplete="off"
          enterKeyHint="search"
          placeholder="plombier, électricien…"
          value={value}
          aria-invalid={error || undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
        />
        <button type="submit" className={`btn btn--signal ${styles.submit}`}>
          Trouver
          <span className="tension" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className={styles.error} role="alert">
          Écrivez un métier ou décrivez votre besoin, par exemple « fuite d'eau ».
        </p>
      )}
      {!compact && (
        <ul className={styles.suggestions} aria-label="Suggestions">
          {SUGGESTIONS.map((s) => (
            <li key={s}>
              <button
                type="button"
                className={styles.chip}
                onClick={() => {
                  setValue(s.toLowerCase());
                  setError(false);
                  submitNeed(s);
                }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
