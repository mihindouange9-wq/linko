import PairGlyph from "./PairGlyph";
import styles from "./ForBusiness.module.css";

const NEEDS = [
  { trade: "Frigoriste", slots: [true, true], note: "Chambre froide, maintenance" },
  { trade: "Électricien", slots: [true], note: "Tableau général" },
  { trade: "Agent d'entretien", slots: [true, true, false], note: "Nettoyage quotidien" },
  { trade: "Soudeur", slots: [false], note: "Rack de stockage" },
];

const POINTS = [
  { title: "Plusieurs métiers, une seule demande", text: "Décrivez le site et les besoins ; LINKO cherche chaque compétence en parallèle." },
  { title: "Des profils que vous pouvez comparer", text: "Vérification, avis, expérience et disponibilité, côte à côte." },
  { title: "Rapidement", text: "Les professionnels disponibles près du site apparaissent en premier." },
];

export default function ForBusiness() {
  return (
    <section id="entreprises" className={`chapter ${styles.section}`} data-theme="paper" aria-labelledby="entreprises-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="entreprises-title" className="chapter-title">
            Les compétences qu'il vous faut, quand il les faut.
          </h2>
          <p className="lead">
            Entrepôts, bureaux, commerces, chantiers : trouvez les professionnels qui interviennent près de votre site.
          </p>
          <ul className={styles.points}>
            {POINTS.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--ink">
            Publier une demande d'entreprise
            <span className="tension" aria-hidden="true" />
          </a>
        </div>

        <figure className={styles.sheet}>
          <figcaption className={styles.sheetHead}>
            <span className={styles.sheetTitle}>Demande · Entrepôt Oloumi</span>
            <span className={styles.sheetMeta}>Zone industrielle d'Oloumi, Libreville</span>
          </figcaption>
          <ul>
            {NEEDS.map((n) => {
              const done = n.slots.filter(Boolean).length;
              return (
                <li key={n.trade} className={styles.need}>
                  <div className={styles.needMain}>
                    <span className={styles.trade}>
                      {n.trade} <span className={styles.qty}>× {n.slots.length}</span>
                    </span>
                    <span className={styles.note}>{n.note}</span>
                  </div>
                  <div className={styles.slots} aria-label={`${done} sur ${n.slots.length} trouvé${done > 1 ? "s" : ""}`}>
                    {n.slots.map((s, i) => (
                      <PairGlyph key={i} state={s ? "joined" : "apart"} size={22} className={s ? "" : styles.pending} />
                    ))}
                    <span className={styles.count} data-full={done === n.slots.length || undefined}>
                      {done}/{n.slots.length}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className={styles.legend}>
            <PairGlyph state="joined" size={16} /> trouvé
            <PairGlyph state="apart" size={16} className={styles.pending} /> recherche en cours
          </p>
          <p className="demo-note">Exemple fictif.</p>
        </figure>
      </div>
    </section>
  );
}
