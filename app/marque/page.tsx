import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { LinkoSymbol, Lockup, Piece, PIECE_DOT } from "@/components/Logo";
import PairGlyph from "@/components/PairGlyph";
import SignatureDemo from "@/components/SignatureDemo";
import NeedSearch from "@/components/NeedSearch";
import s from "./marque.module.css";

export const metadata: Metadata = {
  title: "Plateforme de marque — LINKO",
  description: "Stratégie, identité, motion, expérience et système de design de LINKO.",
};

const TOC = [
  ["strategie", "Stratégie"],
  ["positionnement", "Positionnement"],
  ["personnalite", "Personnalité et voix"],
  ["nom", "Nom et signature"],
  ["logo", "Logo"],
  ["couleurs", "Couleurs"],
  ["typographie", "Typographie"],
  ["systeme", "Système graphique"],
  ["motion", "Motion"],
  ["experience", "Expérience"],
  ["design-system", "Design system"],
  ["developpement", "Développement"],
] as const;

const COLORS = [
  { name: "Obsidian", hex: "#111315", role: "Structure, texte, fonds sombres", ratio: "16,9 : 1 sur Off White", ink: true },
  { name: "Off White", hex: "#F5F4EF", role: "Fond principal, texte sur obsidienne", ratio: "16,9 : 1 sous Obsidian" },
  { name: "Link Green", hex: "#20C77A", role: "Signal : disponible, connecté, action principale", ratio: "8,4 : 1 sur Obsidian · décoratif seulement sur clair (2,0 : 1)" },
  { name: "Deep Green", hex: "#087A4B", role: "Texte vert sur fond clair, focus, validation", ratio: "4,9 : 1 sur Off White", ink: true },
  { name: "Slate", hex: "#667078", role: "Texte secondaire sur clair", ratio: "4,6 : 1 sur Off White", ink: true },
  { name: "Soft Grey", hex: "#E8EAE7", role: "Surfaces calmes, onglets, zones de repos", ratio: "Fond uniquement" },
];

const TYPE = [
  { name: "Display", spec: "clamp 44 → 96 px · 640 · largeur 100 % → 90 %", sample: "Un besoin.", size: "var(--display)", w: 640 },
  { name: "Titre de chapitre", spec: "clamp 34 → 64 px · 640 · largeur 92 %", sample: "LINKO crée le lien.", size: "var(--h2)", w: 640 },
  { name: "Titre 3", spec: "clamp 22 → 32 px · 560–740 selon l'état", sample: "Disponible aujourd'hui", size: "var(--h3)", w: 600 },
  { name: "Chapô", spec: "18 → 22 px · 420 · Slate", sample: "Vous décrivez votre besoin, LINKO fait le lien.", size: "var(--lead)", w: 420 },
  { name: "Texte", spec: "17 px · 420 · interlignage 1,55", sample: "Comparez les profils : expérience, avis, disponibilité.", size: "var(--body)", w: 420 },
  { name: "Petit", spec: "14 px · 500", sample: "Profil vérifié · 37 avis", size: "var(--small)", w: 500 },
];

const EASES = [
  { name: "settle", curve: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Arrivée, stabilisation, ouverture d'une fiche", time: "420–900 ms" },
  { name: "search", curve: "C .55 0 .35 1", use: "Balayage, filtrage : départ hésitant, freinage net", time: "600–1000 ms" },
  { name: "connect", curve: "dépassement 3,5 % puis retour", use: "Emboîtement des deux pièces, uniquement", time: "800–950 ms" },
  { name: "press", curve: "cubic-bezier(0.3, 0, 0.2, 1)", use: "Boutons, interrupteurs, puces", time: "70–160 ms" },
];

const FLOWS = [
  {
    who: "Particulier",
    steps: ["Décrit son besoin", "Voit les profils disponibles près de lui", "Compare avis, expérience, distance", "Contacte", "Note après l'intervention"],
  },
  {
    who: "Professionnel",
    steps: ["Crée son profil", "Ajoute compétences, réalisations, zone", "Se signale disponible", "Reçoit des demandes", "Gagne des avis"],
  },
  {
    who: "Entreprise",
    steps: ["Décrit le site et les métiers", "Reçoit les correspondances par métier", "Compare et sélectionne", "Suit chaque besoin jusqu'à l'intervention"],
  },
];

export default function MarquePage() {
  return (
    <>
      <SiteHeader home={false} />
      <main id="contenu" className={s.page}>
        <header className={s.hero}>
          <div className={s.heroInner}>
            <h1 className={s.title}>Plateforme de marque</h1>
            <p className={s.intro}>
              LINKO relie un besoin à la bonne compétence. Ce document décrit comment la marque pense, parle, se dessine et
              bouge, puis comment le produit est construit. Chaque règle sert une seule idée : la connexion.
            </p>
          </div>
          <div className={s.heroMark}>
            <LinkoSymbol size="100%" />
          </div>
        </header>

        <div className={s.layout}>
          <nav className={s.toc} aria-label="Sommaire">
            <ol>
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={s.content}>
            {/* ── Stratégie ── */}
            <section id="strategie" className={s.block}>
              <h2>Stratégie</h2>
              <dl className={s.defs}>
                <div>
                  <dt>Mission</dt>
                  <dd>Que personne ne reste bloqué faute de connaître la bonne personne.</dd>
                </div>
                <div>
                  <dt>Vision</dt>
                  <dd>Chaque compétence de la ville trouvable en quelques secondes, chaque professionnel visible pour ce qu'il sait faire.</dd>
                </div>
                <div>
                  <dt>Promesse</dt>
                  <dd>Un besoin. La bonne compétence.</dd>
                </div>
                <div>
                  <dt>Publics</dt>
                  <dd>
                    Les particuliers qui ont un problème à régler maintenant. Les entreprises qui ont besoin d'un métier
                    précis pour un site. Les professionnels qui veulent être trouvés et gagner des clients.
                  </dd>
                </div>
                <div>
                  <dt>Marché</dt>
                  <dd>Lancement au Gabon, Libreville d'abord, puis Port-Gentil et Franceville ; ensuite l'Afrique francophone.</dd>
                </div>
                <div>
                  <dt>Modèle</dt>
                  <dd>
                    Gratuit pour les clients. Les professionnels s'abonnent pour figurer dans le répertoire : Essentiel
                    3 000 FCFA par mois, Pro 8 000 FCFA par mois, premier mois offert, paiement par mobile money (tarifs de
                    lancement proposés).
                  </dd>
                </div>
                <div>
                  <dt>Valeurs</dt>
                  <dd>
                    <strong>Connexion</strong> : nous existons pour le lien, pas pour le catalogue. <strong>Confiance</strong> :
                    on montre, on ne promet pas. <strong>Disponibilité</strong> : le bon professionnel est celui qui peut venir.{" "}
                    <strong>Action</strong> : chaque écran mène à un geste.
                  </dd>
                </div>
              </dl>
            </section>

            {/* ── Positionnement ── */}
            <section id="positionnement" className={s.block}>
              <h2>Positionnement</h2>
              <p className={s.statement}>
                Pour ceux qui ont un besoin concret, LINKO est le répertoire vivant de la ville : il ne liste pas des
                métiers, il relie une demande à la personne disponible, vérifiée et proche qui sait y répondre.
              </p>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th scope="col">Aujourd'hui</th>
                    <th scope="col">Force</th>
                    <th scope="col">Limite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Bouche-à-oreille</th>
                    <td>Confiance du proche</td>
                    <td>Lent, aléatoire, numéros perdus</td>
                  </tr>
                  <tr>
                    <th scope="row">Annuaires, affiches</th>
                    <td>Nombreux contacts</td>
                    <td>Muets : ni avis, ni disponibilité</td>
                  </tr>
                  <tr>
                    <th scope="row">Groupes et réseaux sociaux</th>
                    <td>Réactifs</td>
                    <td>Aucune vérification, aucune trace</td>
                  </tr>
                  <tr className={s.us}>
                    <th scope="row">LINKO</th>
                    <td>La bonne personne, disponible, vérifiée</td>
                    <td>Doit mériter la confiance à chaque intervention</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* ── Personnalité ── */}
            <section id="personnalite" className={s.block}>
              <h2>Personnalité et voix</h2>
              <ul className={s.traits}>
                <li>
                  <h3>Calme</h3>
                  <p>Face à l'urgence, LINKO ne s'agite pas. Il prend la situation en main.</p>
                </li>
                <li>
                  <h3>Précise</h3>
                  <p>Des faits : distance, disponibilité, nombre d'avis. Pas d'adjectifs vides.</p>
                </li>
                <li>
                  <h3>Humaine</h3>
                  <p>Des prénoms, des quartiers, des métiers. Jamais « ressources » ni « prestataires ».</p>
                </li>
                <li>
                  <h3>Directe</h3>
                  <p>Phrases courtes, verbes d'action. Chaque bouton dit ce qu'il fait.</p>
                </li>
              </ul>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th scope="col">On dit</th>
                    <th scope="col">On évite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>« Grâce est disponible aujourd'hui, à 1,4 km. »</td>
                    <td>« Découvrez nos experts qualifiés près de chez vous ! »</td>
                  </tr>
                  <tr>
                    <td>« Contacter Grâce »</td>
                    <td>« En savoir plus »</td>
                  </tr>
                  <tr>
                    <td>« Aucun électricien libre ce soir. Demain, 3 sont disponibles. »</td>
                    <td>« Oups ! Aucun résultat. »</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* ── Nom ── */}
            <section id="nom" className={s.block}>
              <h2>Nom et signature</h2>
              <p>
                <strong>LINKO</strong> vient de <em>link</em>, le lien, et se termine par un <em>o</em> qui boucle, comme
                une connexion fermée. Deux syllabes, prononçables partout en Afrique francophone, sans accent ni ambiguïté.
                Le mot s'écrit en minuscules dans le logotype et en capitales dans le texte courant.
              </p>
              <p className={s.signature}>Un besoin. La bonne compétence.</p>
              <p className={s.note}>
                La signature tient en deux phrases nominales : la première pose le problème, la seconde la réponse. Elle ne se
                traduit pas en slogan publicitaire ; elle se dit.
              </p>
            </section>

            {/* ── Logo ── */}
            <section id="logo" className={s.block}>
              <h2>Logo</h2>
              <p>
                Le symbole est fait de deux pièces identiques, la seconde tournée de 180°. Chacune est une personne : un
                point, un corps en crochet. La bande oblique à 36° de l'une vient se loger contre celle de l'autre. La pièce
                obsidienne est le besoin, la pièce verte la compétence. Séparées, elles cherchent ; emboîtées, elles forment
                LINKO. Le logo est donc aussi l'animation de la marque.
              </p>
              <figure className={s.construct}>
                <svg viewBox="-20 -20 160 160" aria-label="Construction du symbole sur une grille de 120 unités" role="img">
                  <defs>
                    <pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M10 0H0V10" fill="none" stroke="var(--rule)" strokeWidth=".4" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="120" height="120" fill="url(#g)" stroke="var(--rule-strong)" strokeWidth=".5" />
                  <line x1="0" y1="60" x2="120" y2="60" stroke="var(--rule-strong)" strokeWidth=".4" strokeDasharray="2 2" />
                  <line x1="60" y1="0" x2="60" y2="120" stroke="var(--rule-strong)" strokeWidth=".4" strokeDasharray="2 2" />
                  <Piece color="var(--signal)" opacity={0.92} />
                  <Piece color="var(--ink)" rotated opacity={0.92} />
                  <circle cx={PIECE_DOT.cx} cy={PIECE_DOT.cy} r={PIECE_DOT.r + 3} fill="none" stroke="var(--deep)" strokeWidth=".6" strokeDasharray="1.5 1.5" />
                  <text x="34" y="13" className={s.svgLabel}>
                    point = la personne · Ø 21
                  </text>
                  <text x="62" y="58" className={s.svgLabel}>
                    centre de rotation 180°
                  </text>
                  <text x="0" y="134" className={s.svgLabel}>
                    grille 120 · trait 19 · bande à 36°
                  </text>
                </svg>
                <figcaption>Construction. Les deux pièces sont congruentes ; seul le centre de rotation les relie.</figcaption>
              </figure>

              <div className={s.variants}>
                <div className={s.variant}>
                  <Lockup symbolSize={40} />
                  <span>Couleur sur Off White</span>
                </div>
                <div className={`${s.variant} ${s.variantInk}`} data-theme="ink">
                  <Lockup symbolSize={40} />
                  <span>Couleur sur Obsidian</span>
                </div>
                <div className={s.variant}>
                  <LinkoSymbol size={48} need="var(--ink)" skill="var(--ink)" />
                  <span>Monochrome</span>
                </div>
                <div className={s.variant}>
                  <span className={s.appIcon}>
                    <LinkoSymbol size={46} need="var(--paper)" />
                  </span>
                  <span>Icône d'application</span>
                </div>
              </div>

              <div className={s.rules}>
                <div>
                  <h3>Lisible en 16 px</h3>
                  <p className={s.sizes}>
                    <LinkoSymbol size={16} />
                    <LinkoSymbol size={24} />
                    <LinkoSymbol size={32} />
                    <LinkoSymbol size={48} />
                  </p>
                  <p className={s.note}>Taille minimale : 16 px à l'écran, 6 mm à l'impression.</p>
                </div>
                <div>
                  <h3>Zone de protection</h3>
                  <p>Autour du symbole, un espace libre égal au diamètre du point. Rien n'y entre.</p>
                </div>
                <div>
                  <h3>À ne pas faire</h3>
                  <p>
                    Pas de dégradé, d'ombre ni de contour. Ne pas inverser les couleurs des pièces, ne pas faire pivoter le
                    symbole, ne jamais y ajouter d'outil, de maison ou de main.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Couleurs ── */}
            <section id="couleurs" className={s.block}>
              <h2>Couleurs</h2>
              <p>
                L'obsidienne et l'off-white portent la structure. Le vert est un signal : il signifie disponible, connecté,
                validé, ou désigne l'action principale. S'il est partout, il ne signifie plus rien. Repère : moins de 5 % de
                vert sur une page.
              </p>
              <ul className={s.swatches}>
                {COLORS.map((c) => (
                  <li key={c.hex}>
                    <span className={s.chip} style={{ background: c.hex }} />
                    <span className={s.swName}>{c.name}</span>
                    <code>{c.hex}</code>
                    <span className={s.swRole}>{c.role}</span>
                    <span className={s.swRatio}>{c.ratio}</span>
                  </li>
                ))}
              </ul>
              <div className={s.proportion} aria-label="Proportions indicatives">
                <span style={{ flex: 58, background: "var(--paper)" }} />
                <span style={{ flex: 27, background: "var(--ink)" }} />
                <span style={{ flex: 8, background: "var(--soft)" }} />
                <span style={{ flex: 4, background: "var(--slate)" }} />
                <span style={{ flex: 3, background: "var(--signal)" }} />
              </div>
              <p className={s.note}>Proportions indicatives sur l'ensemble d'un parcours.</p>
            </section>

            {/* ── Typographie ── */}
            <section id="typographie" className={s.block}>
              <h2>Typographie</h2>
              <p>
                Une seule famille : <strong>Mona Sans</strong>, grotesque variable libre (SIL OFL) à deux axes, graisse
                200–900 et largeur 75–125 %. Une famille unique, c'est un seul fichier à charger et un système qui
                s'exprime par la graisse et la largeur plutôt que par l'accumulation de polices.
              </p>
              <ul className={s.specimen}>
                {TYPE.map((t) => (
                  <li key={t.name}>
                    <span className={s.specMeta}>
                      <strong>{t.name}</strong>
                      {t.spec}
                    </span>
                    <span className={s.specSample} style={{ fontSize: t.size, fontWeight: t.w }}>
                      {t.sample}
                    </span>
                  </li>
                ))}
              </ul>
              <div className={s.axes}>
                <p>
                  <span style={{ fontWeight: 300 }}>confiance faible</span>
                  <span style={{ fontWeight: 520 }}>correspondance</span>
                  <span style={{ fontWeight: 780 }}>la bonne</span>
                </p>
                <p className={s.note}>
                  La graisse traduit la confiance : dans les listes, ce qui correspond s'épaissit, ce qui ne correspond pas
                  s'amincit. La largeur se resserre pendant un déplacement et se relâche à l'arrivée.
                </p>
              </div>
              <p className={s.note}>
                Interdits : capitales espacées en surtitre, italique décoratif, plus de deux graisses dans un même bloc de
                texte courant.
              </p>
            </section>

            {/* ── Système graphique ── */}
            <section id="systeme" className={s.block}>
              <h2>Système graphique</h2>
              <p>
                Le monde visuel de LINKO est celui du répertoire : le carnet où chacun garde le numéro du bon électricien.
                Cinq éléments suffisent à le reconnaître sans logo.
              </p>
              <ul className={s.elements}>
                <li>
                  <div className={s.elRule}>
                    <span>Un besoin.</span>
                  </div>
                  <h3>La ligne</h3>
                  <p>Un filet de 1 px sur lequel le texte se pose. Elle devient grille, liste, fiche.</p>
                </li>
                <li>
                  <div className={s.elTabs}>
                    <i />
                    <i data-on />
                    <i />
                  </div>
                  <h3>L'onglet</h3>
                  <p>L'index en bord d'écran : on navigue comme on ouvre un carnet à la bonne lettre.</p>
                </li>
                <li>
                  <div className={s.elTemoin}>
                    <span className="live" />
                  </div>
                  <h3>Le témoin</h3>
                  <p>Un seul point vert par zone : où vous êtes, ou qui est disponible.</p>
                </li>
                <li>
                  <div className={s.elEntry}>
                    <strong>Plombière</strong>
                    <span>Grâce N.</span>
                    <span className="live" />
                  </div>
                  <h3>L'entrée</h3>
                  <p>Une ligne du répertoire : métier, personne, lieu, disponibilité.</p>
                </li>
                <li>
                  <div className={s.elPair}>
                    <PairGlyph state="near" size={30} />
                  </div>
                  <h3>La paire</h3>
                  <p>Les deux pièces du logo, utilisées comme pictogramme d'état d'une recherche.</p>
                </li>
              </ul>
              <p className={s.note}>
                Exclus du système : dégradés, verre dépoli, formes organiques, particules, photos génériques de
                travailleurs, cartes identiques en grille.
              </p>
            </section>

            {/* ── Motion ── */}
            <section id="motion" className={s.block}>
              <h2>Motion</h2>
              <p>
                Une seule question avant d'animer : pourquoi cette chose bouge-t-elle ? Si le mouvement n'apporte ni
                information, ni émotion, ni fonction, il n'existe pas.
              </p>
              <SignatureDemo />
              <ol className={s.principles}>
                <li>
                  <h3>Narratif</h3>
                  <p>Chaque mouvement raconte une étape du lien : séparation, recherche, rapprochement, connexion, stabilisation.</p>
                </li>
                <li>
                  <h3>Physique</h3>
                  <p>Masse, inertie, friction. Les pièces suivent un ressort, jamais une interpolation linéaire.</p>
                </li>
                <li>
                  <h3>Typographique</h3>
                  <p>Le texte bouge par la graisse, la largeur, le masque et l'alignement, pas par fondu et glissement.</p>
                </li>
                <li>
                  <h3>Réversible</h3>
                  <p>Le défilement choisit l'état ; l'animation l'interprète. Remonter rejoue l'histoire à l'envers.</p>
                </li>
                <li>
                  <h3>Sobre</h3>
                  <p>Un moment signature par chapitre au plus. Le reste est immobile et lisible.</p>
                </li>
              </ol>

              <h3 className={s.sub}>Courbes</h3>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Courbe</th>
                    <th scope="col">Usage</th>
                    <th scope="col">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {EASES.map((e) => (
                    <tr key={e.name}>
                      <th scope="row">
                        <code>linko.{e.name}</code>
                      </th>
                      <td>
                        <code>{e.curve}</code>
                      </td>
                      <td>{e.use}</td>
                      <td>{e.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className={s.sub}>Chorégraphie du site</h3>
              <table className={s.table}>
                <tbody>
                  <tr>
                    <th scope="row">Besoin</th>
                    <td>
                      Deux pièces dérivent séparément. Le curseur entre elles révèle leur relation (lien pointillé, rotation qui
                      s'aligne). Le défilement les emboîte ; les deux lignes du titre glissent le long de leur règle jusqu'à la
                      même colonne : le titre devient la signature du logo.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Problème</th>
                    <td>Les contacts d'aujourd'hui se barrent un à un, au rythme de la lecture.</td>
                  </tr>
                  <tr>
                    <th scope="row">Lien</th>
                    <td>
                      Six états pilotés par le défilement : besoin seul, balayage du répertoire, écart des mauvaises
                      correspondances, affirmation de la bonne par la graisse, tracé du lien et emboîtement, « Trouvé. » et
                      ouverture de la fiche.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Méthode</th>
                    <td>Un témoin parcourt la règle ; chaque étape s'allume à son passage.</td>
                  </tr>
                  <tr>
                    <th scope="row">Métiers</th>
                    <td>Filtrer referme les lignes qui ne correspondent pas : la liste se réorganise d'elle-même.</td>
                  </tr>
                  <tr>
                    <th scope="row">Confiance</th>
                    <td>La fiche se précise sous le curseur ; chaque annotation allume le champ qu'elle décrit.</td>
                  </tr>
                  <tr>
                    <th scope="row">Pros</th>
                    <td>L'interrupteur « disponible » déplace le profil dans la liste vue par le client (FLIP).</td>
                  </tr>
                </tbody>
              </table>

              <h3 className={s.sub}>Micro-interactions</h3>
              <ul className={s.micro}>
                <li>
                  <strong>Bouton</strong> : compression de 3 % à l'appui, la flèche se tend au survol. Aucun halo.
                </li>
                <li>
                  <strong>Disponibilité</strong> : un point vert dont l'anneau respire toutes les 3,2 s, et seulement là où
                  c'est vrai.
                </li>
                <li>
                  <strong>Recherche</strong> : les suggestions lancent directement la séquence avec le métier choisi.
                </li>
                <li>
                  <strong>Interrupteur</strong> : le bouton s'allonge pendant l'appui puis rebondit légèrement en place.
                </li>
                <li>
                  <strong>Appel à l'action final</strong> : à l'approche du champ, les deux pièces resserrent leur écart.
                </li>
              </ul>

              <h3 className={s.sub}>Selon l'appareil</h3>
              <table className={s.table}>
                <tbody>
                  <tr>
                    <th scope="row">Ordinateur</th>
                    <td>Scène d'ouverture épinglée, alignement typographique, lentille au curseur, index à onglets.</td>
                  </tr>
                  <tr>
                    <th scope="row">Tablette</th>
                    <td>Pas d'épinglage ; les pièces s'emboîtent au premier défilement ; pas d'effet au survol.</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile</th>
                    <td>
                      Mise en page propre (pas une réduction) : séquence en une colonne, écrans de l'application à onglets,
                      barre basse avec le chapitre en cours et l'action principale.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Illustrations de l'app</th>
                    <td>
                      Les écrans sont présentés dans un cadre d'iPhone dessiné en CSS (coque, îlot, barre d'état), sans
                      image matricielle : nets à toutes les tailles, modifiables comme du texte.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Mouvement réduit</th>
                    <td>Tous les états finaux sont affichés sans transition ; le contenu reste entièrement disponible.</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* ── Expérience ── */}
            <section id="experience" className={s.block}>
              <h2>Expérience</h2>
              <h3 className={s.sub}>Plan du site</h3>
              <ul className={s.tree}>
                <li>
                  Accueil
                  <ul>
                    <li>Besoin : scène d'ouverture et recherche</li>
                    <li>Problème</li>
                    <li>Lien : la séquence de correspondance</li>
                    <li>Méthode</li>
                    <li>Métiers : le répertoire filtrable</li>
                    <li>Confiance</li>
                    <li>Application</li>
                    <li>Professionnels</li>
                    <li>Tarifs : abonnements Essentiel et Pro</li>
                    <li>Entreprises</li>
                    <li>Contact</li>
                  </ul>
                </li>
                <li>
                  Produit (à concevoir)
                  <ul>
                    <li>Recherche et résultats</li>
                    <li>Profil professionnel : diplômes vérifiés, avis, disponibilités</li>
                    <li>Réservation d'un créneau</li>
                    <li>Demande et suivi</li>
                    <li>Espace professionnel : profil, agenda, demandes, abonnement</li>
                    <li>Espace entreprise : demandes multi-métiers</li>
                  </ul>
                </li>
                <li>Plateforme de marque (cette page)</li>
              </ul>

              <h3 className={s.sub}>Parcours</h3>
              <div className={s.flows}>
                {FLOWS.map((f) => (
                  <div key={f.who} className={s.flow}>
                    <h4>{f.who}</h4>
                    <ol>
                      {f.steps.map((st) => (
                        <li key={st}>{st}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Design system ── */}
            <section id="design-system" className={s.block}>
              <h2>Design system</h2>
              <div className={s.ds}>
                <div>
                  <h3>Actions</h3>
                  <div className={s.row}>
                    <button className="btn btn--signal" type="button">
                      Trouver
                      <span className="tension" aria-hidden="true" />
                    </button>
                    <button className="btn btn--ink" type="button">
                      Publier une demande
                    </button>
                    <button className="btn btn--ghost" type="button">
                      Voir le profil
                    </button>
                    <button className="btn btn--ink" type="button" disabled>
                      Indisponible
                    </button>
                  </div>
                  <p className={s.note}>
                    Vert : une seule action principale par écran. Obsidienne : action importante. Contour : action
                    secondaire. Hauteur minimale 48 px, cible tactile 44 px.
                  </p>
                </div>
                <div>
                  <h3>Recherche</h3>
                  <NeedSearch compact />
                </div>
                <div>
                  <h3>Statuts</h3>
                  <div className={s.row}>
                    <span className={s.status}>
                      <span className="live" /> Disponible
                    </span>
                    <span className={s.status}>
                      <span className="live live--off" /> Demain
                    </span>
                    <span className={`${s.status} ${s.ok}`}>
                      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                        <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                      Vérifié
                    </span>
                  </div>
                </div>
                <div>
                  <h3>Jetons</h3>
                  <table className={s.table}>
                    <tbody>
                      <tr>
                        <th scope="row">Espacement</th>
                        <td>4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 80–144 px (chapitres)</td>
                      </tr>
                      <tr>
                        <th scope="row">Rayons</th>
                        <td>6 px (contrôles) · 10–14 px (fiches) · 40 px (téléphone)</td>
                      </tr>
                      <tr>
                        <th scope="row">Filets</th>
                        <td>1 px · Obsidian 13 % (règle) · Obsidian 100 % (début de liste)</td>
                      </tr>
                      <tr>
                        <th scope="row">Grille</th>
                        <td>Colonnes 5/6/7 sur 12 · gouttière 16–40 px · largeur max 1440 px</td>
                      </tr>
                      <tr>
                        <th scope="row">Focus</th>
                        <td>Contour 2 px Deep Green (Link Green sur fond sombre), décalé de 3 px</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ── Développement ── */}
            <section id="developpement" className={s.block}>
              <h2>Développement</h2>
              <table className={s.table}>
                <tbody>
                  <tr>
                    <th scope="row">Next.js, React, TypeScript</th>
                    <td>Pages pré-rendues statiquement, composants serveur par défaut, JavaScript client limité aux chapitres interactifs.</td>
                  </tr>
                  <tr>
                    <th scope="row">GSAP + ScrollTrigger</th>
                    <td>
                      Pour les timelines réversibles pilotées par le défilement et l'épinglage de la scène d'ouverture.
                      CustomEase définit les courbes de marque ; Flip anime le changement de groupe des profils.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">CSS</th>
                    <td>Toutes les interactions simples : survols, interrupteurs, repli des lignes (grid-template-rows), respiration du témoin.</td>
                  </tr>
                  <tr>
                    <th scope="row">WebGL : non retenu</th>
                    <td>
                      Le concept repose sur deux formes planes et une ligne. SVG et transformations GPU les rendent nettes à
                      toutes les tailles, sans moteur 3D, sans repli à prévoir et sans coût sur les téléphones d'entrée de
                      gamme.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Performance</th>
                    <td>
                      Une seule police variable auto-hébergée, aucune image matricielle, animations limitées à transform,
                      opacity et variables de police, écoute du défilement en requestAnimationFrame.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Accessibilité</th>
                    <td>
                      Titres et repères structurés, contraste AA, focus visible, interrupteur ARIA, onglets ARIA, légende de la
                      séquence annoncée, chemin complet en mouvement réduit.
                    </td>
                  </tr>
                </tbody>
              </table>
              <pre className={s.tree2}>
{`app/
  layout.tsx          police, métadonnées
  page.tsx            accueil, 10 chapitres
  marque/page.tsx     plateforme de marque
  globals.css         jetons, base, boutons, témoin
components/
  Logo.tsx            géométrie du symbole, mot-symbole
  Hero.tsx            scène d'ouverture (ressort + ScrollTrigger)
  MatchSequence.tsx   séquence « Lien »
  ThumbIndex.tsx      index à onglets, barre mobile
  …                   un composant + un module CSS par chapitre
lib/
  data.ts             données de démonstration
  match.ts            correspondance besoin → métier
  gsap.ts             plugins et courbes de marque`}
              </pre>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
