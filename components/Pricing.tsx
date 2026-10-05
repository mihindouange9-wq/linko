import { PLANS, fcfa } from "@/lib/data";
import IPhone from "./IPhone";
import styles from "./Pricing.module.css";

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* Écran « Mon abonnement », côté professionnel */
function ProScreen() {
  return (
    <>
      <p className={styles.appTitle}>Mon abonnement</p>
      <div className={styles.planBox}>
        <span className={styles.planBoxName}>Pro</span>
        <span className={styles.planBoxState}>
          <span className="live" /> Actif jusqu'au 5 novembre
        </span>
        <span className={styles.planBoxPrice}>{fcfa(8000)} / mois</span>
      </div>
      <p className={styles.groupLabel}>Ce mois-ci</p>
      <dl className={styles.kpis}>
        <div>
          <dt>Vues</dt>
          <dd>214</dd>
        </div>
        <div>
          <dt>Demandes</dt>
          <dd>17</dd>
        </div>
        <div>
          <dt>Réponse</dt>
          <dd>92 %</dd>
        </div>
      </dl>
      <p className={styles.groupLabel}>Paiement</p>
      <ul className={styles.pay}>
        <li>
          <span>Airtel Money · 07 •• •• 41</span>
          <span className={styles.ok}>
            <Check /> Prélevé
          </span>
        </li>
        <li>
          <span>Prochain paiement</span>
          <span>5 novembre</span>
        </li>
      </ul>
      <span className={`btn btn--ink ${styles.cta}`}>Gérer mon abonnement</span>
    </>
  );
}

export default function Pricing() {
  return (
    <section id="tarifs" className={`chapter ${styles.section}`} data-theme="paper" aria-labelledby="tarifs-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="tarifs-title" className="chapter-title">
            Un abonnement simple pour être visible.
          </h2>
          <p className="lead">
            L'application est gratuite pour les clients. Les professionnels qui veulent figurer dans le répertoire
            choisissent une formule mensuelle, payable par mobile money.
          </p>
        </div>

        <div className={styles.grid}>
          <ol className={styles.plans}>
            {PLANS.map((p) => (
              <li key={p.id} className={styles.plan} data-best={p.best || undefined}>
                <div className={styles.planHead}>
                  <h3 className={styles.planName}>
                    {p.name}
                    {p.best && <span className={styles.badge}>Recommandé</span>}
                  </h3>
                  <p className={styles.pitch}>{p.pitch}</p>
                </div>
                <p className={styles.price}>
                  <strong>{fcfa(p.monthly)}</strong>
                  <span>par mois</span>
                </p>
                <p className={styles.yearly}>
                  ou {fcfa(p.yearly)} par an, deux mois offerts
                </p>
                <ul className={styles.features}>
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${p.best ? "btn--signal" : "btn--ink"}`}>
                  Choisir {p.name}
                </a>
              </li>
            ))}
          </ol>

          <div className={styles.side}>
            <IPhone>
              <ProScreen />
            </IPhone>
            <dl className={styles.terms}>
              <div>
                <dt>Premier mois</dt>
                <dd>Offert, sans engagement.</dd>
              </div>
              <div>
                <dt>Paiement</dt>
                <dd>Airtel Money, Moov Money, carte bancaire.</dd>
              </div>
              <div>
                <dt>Résiliation</dt>
                <dd>À tout moment, depuis l'application.</dd>
              </div>
              <div>
                <dt>Clients</dt>
                <dd>Toujours gratuit : chercher, comparer, contacter.</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="demo-note">Tarifs de lancement proposés pour le Gabon, en francs CFA (XAF). À confirmer avant la mise en ligne.</p>
      </div>
    </section>
  );
}
