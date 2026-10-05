# LINKO — Un besoin. La bonne compétence.

Site vitrine et plateforme de marque de LINKO, la marketplace de compétences qui relie un besoin à la bonne personne.

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production (webpack)
npm start
```

Les scripts utilisent `--webpack` : sur cette machine, le binaire natif SWC/Turbopack est bloqué par une stratégie
de contrôle d'application Windows. Sur une machine sans cette restriction, `next dev` / `next build` fonctionnent aussi.

## Pages

- `/` — accueil en onze chapitres : Besoin, Problème, Lien, Méthode, Métiers, Confiance, App (écrans iPhone), Pros, Tarifs (abonnements en FCFA), Entreprises, Contact.
- `/marque` — plateforme de marque : stratégie, positionnement, voix, logo, couleurs, typographie, système graphique,
  motion, expérience, design system, développement.

## Structure

```
app/
  layout.tsx            police (Mona Sans variable, auto-hébergée), métadonnées
  page.tsx              accueil
  marque/page.tsx       plateforme de marque
  globals.css           jetons, base, boutons, témoin de disponibilité
components/             un composant + un module CSS par chapitre
  Logo.tsx              géométrie du symbole, mot-symbole, lockup
  Hero.tsx              scène d'ouverture : ressort + ScrollTrigger
  MatchSequence.tsx     séquence « Lien » (6 états pilotés par le défilement)
  ThumbIndex.tsx        index à onglets (desktop) et barre basse (mobile)
lib/
  data.ts               données de démonstration (fictives)
  match.ts              correspondance besoin → métier
  gsap.ts               enregistrement des plugins et courbes de marque
scripts/shoot.mjs       captures de vérification (Chrome headless)
public/icon.svg         favicon / icône
```

## Contexte de conception

- `PRODUCT.md` — vérité produit (publics, positionnement, engagements de marque, preuves disponibles).
- `DESIGN.md` et `.impeccable/design.json` — système visuel documenté depuis le build.
- `.impeccable/surfaces/app-page-tsx.md` — brief de la page d'accueil et contrat de direction.

## À remplacer avant mise en ligne

Toutes les données (profils, avis, villes, demandes) sont fictives et signalées comme telles sur le site.
Aucun chiffre commercial (nombre d'inscrits, couverture, prix) n'est affiché : à ajouter uniquement avec des données réelles.
