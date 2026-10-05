"use client";

import { useState } from "react";
import { LinkoSymbol } from "./Logo";
import IPhone from "./IPhone";
import styles from "./ProductApp.module.css";

const SCREENS = [
  { id: "recherche", label: "Rechercher", title: "Vous cherchez un métier", text: "Un mot suffit. LINKO affiche les professionnels près de vous, les disponibles en premier." },
  { id: "profil", label: "Profil", title: "Vous lisez le profil", text: "Diplômes vérifiés, années de métier, note et avis : tout ce qu'il faut pour choisir est là." },
  { id: "disponibilite", label: "Disponibilités", title: "Vous voyez quand la personne est libre", text: "Le professionnel tient son agenda à jour. Vous réservez un créneau sans appeler dix fois." },
  { id: "contact", label: "Contact", title: "Vous la contactez", text: "Appel ou message depuis l'application. Après l'intervention, vous laissez un avis." },
] as const;
type ScreenId = (typeof SCREENS)[number]["id"];

const Check = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Back = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M10 2.5L4.5 8 10 13.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

function SearchScreen() {
  const results = [
    { n: "Grâce Nzue", d: "CAP Installateur sanitaire · 9 ans", k: "1,4 km · 4,9", a: "Disponible", on: true, tap: true },
    { n: "Aimé Bouanga", d: "Formation CFPP · 8 ans", k: "3,6 km · 4,6", a: "Ce soir", on: false },
    { n: "Rodrigue Mba", d: "CAP Installateur sanitaire · 6 ans", k: "9,2 km · 4,5", a: "Demain", on: false },
  ];
  return (
    <>
      <p className={styles.appTitle}>Rechercher</p>
      <div className={styles.query}>
        <span className={styles.queryLabel}>J'ai besoin d'un</span>
        <span className={styles.queryValue}>plombier</span>
      </div>
      <div className={styles.filters} aria-hidden="true">
        <span data-on>Disponible</span>
        <span>Moins de 5 km</span>
        <span>Diplômé</span>
      </div>
      <p className={styles.groupLabel}>3 plombiers près d'Akanda</p>
      <ul className={styles.results}>
        {results.map((r) => (
          <li key={r.n} className={styles.result} data-tap={r.tap || undefined}>
            <span className={styles.avatar}>
              {r.n
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            <span className={styles.resultMain}>
              <span className={styles.resultName}>{r.n}</span>
              <span className={styles.resultMeta}>{r.d}</span>
              <span className={styles.resultMeta}>{r.k}</span>
            </span>
            <span className={styles.resultAvail}>
              <span className={`live ${r.on ? "" : "live--off"}`} />
              {r.a}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProfileScreen() {
  return (
    <>
      <p className={styles.nav}>
        <Back /> Plombiers
      </p>
      <div className={styles.profileHead}>
        <span className={`${styles.avatar} ${styles.avatarLg}`}>GN</span>
        <div>
          <p className={styles.profileName}>Grâce Nzue</p>
          <p className={styles.profileMeta}>Plombière · Akanda, Libreville</p>
          <p className={styles.badges}>
            <span className={styles.badgeOk}>
              <Check /> Vérifiée
            </span>
            <span>
              <span className="live" /> Disponible
            </span>
          </p>
        </div>
      </div>
      <dl className={styles.stats}>
        <div>
          <dt>Note</dt>
          <dd>4,9</dd>
        </div>
        <div>
          <dt>Avis</dt>
          <dd>37</dd>
        </div>
        <div>
          <dt>Métier</dt>
          <dd>9 ans</dd>
        </div>
      </dl>
      <p className={styles.groupLabel}>Diplômes et certifications</p>
      <ul className={styles.diplomas}>
        <li>
          <span>CAP Installateur sanitaire</span>
          <span className={styles.ok}>
            <Check /> Vérifié
          </span>
        </li>
        <li>
          <span>Habilitation gaz · 2023</span>
          <span className={styles.ok}>
            <Check /> Vérifié
          </span>
        </li>
      </ul>
      <p className={styles.groupLabel}>Dernier avis</p>
      <p className={styles.review}>
        « Fuite réparée en une heure, prix annoncé à l'avance. »<span>Marlène, Angondjé</span>
      </p>
      <span className={`btn btn--signal ${styles.cta}`} data-tap>
        Voir ses disponibilités
      </span>
    </>
  );
}

function AvailabilityScreen() {
  const days = [
    { d: "Lun", n: 6, slots: 0 },
    { d: "Mar", n: 7, slots: 2, on: true },
    { d: "Mer", n: 8, slots: 3 },
    { d: "Jeu", n: 9, slots: 1 },
    { d: "Ven", n: 10, slots: 0 },
    { d: "Sam", n: 11, slots: 2 },
    { d: "Dim", n: 12, slots: 0 },
  ];
  const times = ["8 h – 10 h", "10 h – 12 h", "14 h – 16 h", "16 h – 18 h"];
  return (
    <>
      <p className={styles.nav}>
        <Back /> Grâce Nzue
      </p>
      <p className={styles.appTitle}>Disponibilités</p>
      <p className={styles.sub}>Octobre · Akanda et environs</p>
      <ul className={styles.week}>
        {days.map((x) => (
          <li key={x.d} data-on={x.on || undefined} data-free={x.slots > 0 || undefined}>
            <span>{x.d}</span>
            <strong>{x.n}</strong>
            <i />
          </li>
        ))}
      </ul>
      <p className={styles.groupLabel}>Mardi 7 · créneaux libres</p>
      <ul className={styles.slots}>
        {times.map((t, i) => (
          <li key={t} data-on={i === 1 || undefined} data-off={i === 0 || i === 3 || undefined}>
            {t}
            {i === 0 || i === 3 ? <span>pris</span> : i === 1 ? <span>choisi</span> : <span>libre</span>}
          </li>
        ))}
      </ul>
      <span className={`btn btn--signal ${styles.cta}`} data-tap>
        Réserver mardi, 10 h – 12 h
      </span>
    </>
  );
}

function ContactScreen() {
  return (
    <>
      <div className={styles.connectBody}>
        <LinkoSymbol size={60} />
        <p className={styles.connectTitle}>Demande envoyée</p>
        <p className={styles.connectText}>Grâce a reçu votre demande et vous confirme le créneau.</p>
      </div>
      <dl className={styles.summary}>
        <div>
          <dt>Besoin</dt>
          <dd>Fuite sous l'évier</dd>
        </div>
        <div>
          <dt>Lieu</dt>
          <dd>Akanda, Libreville</dd>
        </div>
        <div>
          <dt>Quand</dt>
          <dd>Mardi 7, 10 h – 12 h</dd>
        </div>
      </dl>
      <div className={styles.connectActions}>
        <span className="btn btn--ink">Appeler</span>
        <span className="btn btn--ghost">Message</span>
      </div>
    </>
  );
}

const RENDER: Record<ScreenId, () => React.ReactElement> = {
  recherche: SearchScreen,
  profil: ProfileScreen,
  disponibilite: AvailabilityScreen,
  contact: ContactScreen,
};

export default function ProductApp() {
  const [current, setCurrent] = useState<ScreenId>("recherche");

  return (
    <section id="application" className={`chapter ${styles.section}`} data-theme="grey" aria-labelledby="app-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="app-title" className="chapter-title">
            L'application, écran par écran.
          </h2>
          <p className="lead">
            Vous cherchez un travailleur. LINKO vous montre les caractéristiques de chacun, ses diplômes et ses
            disponibilités. Vous choisissez, vous contactez. Gratuit pour les clients.
          </p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Écrans de l'application">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={current === s.id}
              aria-controls={`screen-${s.id}`}
              className={styles.tab}
              onClick={() => setCurrent(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ol className={styles.phones}>
          {SCREENS.map((s, i) => {
            const Comp = RENDER[s.id];
            return (
              <li
                key={s.id}
                id={`screen-${s.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${s.id}`}
                className={styles.step}
                data-current={current === s.id || undefined}
              >
                <IPhone>
                  <Comp />
                </IPhone>
                <div className={styles.caption}>
                  <span className={styles.num}>{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="demo-note">Écrans de démonstration. Noms, diplômes et profils fictifs.</p>
      </div>
    </section>
  );
}
