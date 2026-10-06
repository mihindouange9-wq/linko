# LINKO — Un besoin. La bonne compétence.

Site vitrine et plateforme de marque de LINKO, la marketplace de compétences qui relie un besoin à la bonne
personne. Lancement au Gabon (Libreville), puis Afrique francophone.

- **Site en ligne** : https://linko-s3ve.onrender.com
- **Code source** : https://github.com/mihindouange9-wq/linko
- **Hébergement** : Render (déploiement automatique à chaque `git push` sur `main`, voir `render.yaml`)
- **Stack** : Next.js 16 · React 19 · TypeScript · GSAP (ScrollTrigger, Flip, CustomEase) · Mona Sans variable

## Démarrer en local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm start        # sert le build (lit la variable PORT)
```

Les scripts utilisent `--webpack` : sur le poste de développement actuel, le binaire natif SWC/Turbopack est
bloqué par une stratégie Windows. Sur Render (Linux) comme sur toute machine sans cette restriction, c'est
transparent.

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil en onze chapitres : Besoin, Problème, Lien, Méthode, Métiers, Confiance, App, Pros, Tarifs, Entreprises, Contact |
| `/marque` | Plateforme de marque : stratégie, positionnement, voix, logo, couleurs, typographie, système graphique, motion, expérience, design system, développement |

## Organisation du dépôt

```
app/                    pages Next.js (App Router)
  layout.tsx            police auto-hébergée, métadonnées
  page.tsx              accueil
  marque/               plateforme de marque
  globals.css           jetons de design, base, boutons, témoin
components/             un composant + un module CSS par chapitre
  Logo.tsx              géométrie du symbole, mot-symbole, lockup
  IPhone.tsx            cadre d'iPhone dessiné en CSS (écrans de l'app)
  Hero.tsx              scène d'ouverture (ressort + ScrollTrigger)
  MatchSequence.tsx     séquence « Lien », six états pilotés par le défilement
  ProductApp.tsx        l'application écran par écran
  Pricing.tsx           abonnements professionnels (FCFA)
  ThumbIndex.tsx        index à onglets (ordinateur) et barre basse (mobile)
lib/
  data.ts               données de démonstration, chapitres, formules d'abonnement
  match.ts              correspondance besoin → métier
  gsap.ts               plugins et courbes de marque
public/                 favicon
scripts/shoot.mjs       captures de vérification (Chrome headless)
docs/
  brand/                logo d'origine fourni par le client
  captures/             captures personnelles (ignorées par Git)
.impeccable/            contexte de conception (brief de surface, jetons, décision de direction)
PRODUCT.md              vérité produit : publics, marché, modèle économique, engagements de marque
DESIGN.md               système visuel documenté depuis le build
render.yaml             configuration de déploiement Render (Blueprint)
.node-version           Node 22
```

## Déploiement

1. `git push origin main` : Render reconstruit et publie automatiquement.
2. Suivi : https://dashboard.render.com → service **linko** (logs, URL publique, domaine personnalisé).
3. Plan Free : mise en veille après 15 min d'inactivité (premier chargement lent). Passer en Starter pour un site
   toujours chaud.

## Données et contenus

- Tous les profils, diplômes, avis et quartiers affichés sont **fictifs** et signalés comme tels.
- Les tarifs d'abonnement (Essentiel 3 000 FCFA/mois, Pro 8 000 FCFA/mois, premier mois offert) sont des
  **propositions de lancement** à confirmer : une seule liste à modifier, `PLANS` dans `lib/data.ts`.
- Aucun chiffre d'inscrits, de couverture ou de partenaires n'est affiché : à ajouter uniquement avec des données
  réelles.

## Qualité

- Revue de finition indépendante (Impeccable) : disposition **ship** après deux tours de corrections.
- Détecteur d'anti-patterns : aucun anti-pattern ; les écarts restants sont des jetons propres aux écrans d'app.
- Accessibilité : contraste AA, focus visible, rôles ARIA (onglets, interrupteur), `prefers-reduced-motion` complet.
