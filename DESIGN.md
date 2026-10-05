---
name: LINKO
description: Le répertoire de la ville — une règle relie un besoin à un nom.
colors:
  obsidian: "#111315"
  paper: "#f5f4ef"
  signal: "#20c77a"
  deep: "#087a4b"
  slate: "#667078"
  soft: "#e8eae7"
  rule: "color-mix(in oklab, #111315 13%, #f5f4ef)"
  rule-strong: "color-mix(in oklab, #111315 28%, #f5f4ef)"
  faint: "color-mix(in oklab, #111315 22%, #f5f4ef)"
  ink-2: "#1b1e21"
  ink-rule: "#2b2f33"
  ink-rule-strong: "#464b50"
  ink-slate: "#9ba3a9"
  grey-muted: "#5a636a"
  white: "#ffffff"
  signal-pressed: "#1bb56e"
  black: "#000000"
typography:
  display:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 5.6vw, 6rem)"
    fontWeight: 640
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "wdth 100 (78–90 pendant la mise en colonne)"
  headline:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.1rem, 1.3rem + 3.4vw, 4rem)"
    fontWeight: 640
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "wdth 92"
  title:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.4rem, 1.1rem + 1.1vw, 2rem)"
    fontWeight: 640
    lineHeight: 1
    letterSpacing: "-0.03em"
  entry:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 1rem + 2.2vw, 2.75rem)"
    fontWeight: 560
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontVariation: "wght 320–780 et wdth 82–108 selon la confiance de correspondance"
  lead:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)"
    fontWeight: 420
    lineHeight: 1.45
  body:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 420
    lineHeight: 1.55
  small:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 540
    lineHeight: 1.4
  micro:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 420
    lineHeight: 1.4
  wordmark:
    fontFamily: "Mona Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 760
    lineHeight: 1
    letterSpacing: "-0.045em"
rounded:
  focus: "2px"
  tab: "5px"
  control: "6px"
  plate: "10px"
  bar: "12px"
  spread: "14px"
  pill: "999px"
spacing:
  sp-1: "0.25rem"
  sp-2: "0.5rem"
  sp-3: "0.75rem"
  sp-4: "1rem"
  sp-5: "1.5rem"
  sp-6: "2rem"
  sp-7: "3rem"
  sp-8: "4.5rem"
  sp-9: "clamp(5rem, 3rem + 7vw, 9rem)"
  gutter: "clamp(1rem, 0.5rem + 2.4vw, 2.5rem)"
  index-w: "3rem"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "3rem"
    typography: "{typography.body}"
  button-signal-hover:
    backgroundColor: "{colors.signal-pressed}"
    textColor: "{colors.obsidian}"
  button-ink:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "3rem"
  button-ink-hover:
    backgroundColor: "{colors.black}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "3rem"
  input-entry:
    backgroundColor: "transparent"
    textColor: "{colors.obsidian}"
    rounded: "0"
    padding: "0"
    height: "3rem"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "3rem"
  chip-suggestion:
    backgroundColor: "transparent"
    textColor: "{colors.obsidian}"
    rounded: "0"
    padding: "0 0.85rem"
    height: "2.5rem"
    typography: "{typography.small}"
  index-tab:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.tab}"
    width: "2.25rem"
    height: "clamp(2.6rem, 8vh, 4.75rem)"
  index-tab-active:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.paper}"
    width: "3rem"
  plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    padding: "1rem"
  spread:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.paper}"
    rounded: "{rounded.spread}"
    padding: "{spacing.sp-6}"
  index-bar-mobile:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.paper}"
    rounded: "{rounded.bar}"
    padding: "0.375rem"
---

# Design System: LINKO

## Overview

**Creative North Star: "Le Répertoire"**

LINKO est le carnet d'adresses de la ville, celui où l'on garde le numéro du « bon électricien ». Tout le système découle de ce geste : une page blanc cassé, des règles (filets gris) sur lesquelles on pose des entrées, une encre obsidienne qui écrit, et un vert qui ne décore jamais mais signale (disponible, trouvé, actif, action principale). Le texte repose sur les règles ; la ligne de base est la structure, pas la boîte. Il n'y a pas de cartes qui organisent la page : ce sont les filets, les marges et les planches obsidienne qui découpent l'espace.

La densité est celle d'un index imprimé : grands titres serrés (chasse 92 %, interlettrage négatif), entrées en grande taille, métadonnées en slate. Une seule grotesque variable (Mona Sans, graisse 200–900, chasse 75–125 %) joue tous les rôles, et ses axes sont le vocabulaire de l'interface : la graisse monte quand une correspondance se confirme, s'allège et se décale quand une ligne est écartée. Le mouvement est le mécanisme du produit (séparation → recherche → rapprochement → connexion → stabilisation) et ne bouge que pour l'expliquer. Rejets confirmés par le build : dégradés, verre, blobs, particules, parallaxe, défilement infini, cartes-structure, numéros de section décoratifs, kickers, photos d'ouvriers. Exception voulue par le client : les écrans de l'application sont présentés dans un cadre d'iPhone dessiné en CSS (composant IPhone), jamais en image.

**Key Characteristics:**
- Papier blanc cassé réglé de filets ; obsidienne pour l'encre et les planches ; vert uniquement en signal.
- Une seule famille variable (Mona Sans) ; la graisse et la chasse encodent l'état.
- Les entrées se posent sur des règles (`border-bottom: 1px`), jamais dans des cartes.
- Un index à onglets sur le bord droit avec un témoin vert qui dit où l'on est.
- Mouvement court et physique : 160 / 420 / 900 ms, courbes « settle », « search », « connect ».

## Colors

Un contraste encre-sur-papier presque sans couleur, où le vert n'existe que pour marquer ce qui est vivant ou choisi.

### Primary
- **Vert Signal** (`signal`) : la couleur du lien. Pièce « compétence » du symbole, point du i du mot-symbole, témoin de l'index, pastille `.live`, bouton principal (`btn--signal`, texte obsidienne), caret et sélection de texte, soulignement du terme trouvé (`inset 0 -0.08em 0`). Contraste 2.0:1 sur papier : jamais en texte sur fond clair.
- **Vert Profond** (`deep`) : le vert qui se lit. Texte vert sur papier (4.9:1) : liens « Chercher », terme surligné, anneau de focus (`outline: 2px solid`, décalage 3px). Sur obsidienne, `--accent-text` redevient Signal.

### Neutral
- **Obsidienne** (`obsidian`) : encre de tout le texte sur papier, fond des planches (`data-theme="ink"`), bouton `btn--ink`, onglet actif, barre mobile. Pièce « besoin » du symbole (`--mark-need`, bascule en papier sur fond obsidienne).
- **Papier** (`paper`) : fond de page et de la plupart des chapitres, texte sur obsidienne, fond des planches « écrans ».
- **Slate** (`slate`) : le texte secondaire (4.6:1 sur papier) : chapeaux, exemples, lettres d'index, placeholders. Sur obsidienne, son équivalent est **Slate d'encre** (`ink-slate`) ; sur gris doux, **Gris sourd** (`grey-muted`).
- **Gris doux** (`soft`) : fond du chapitre « Application » (`data-theme="grey"`), fond des onglets au repos, avatars.
- **Règle** (`rule`, 13 % d'encre) et **Règle forte** (`rule-strong`, 28 %) : les filets. Règle pour les entrées et les suggestions, règle forte pour les bordures de champ, la ligne qui porte les écrans et le fantôme (`btn--ghost`). **Faint** (22 %) sert aux traits intermédiaires. Sur obsidienne : `ink-rule` et `ink-rule-strong` ; sur gris doux, les filets sont recalculés à 14 % / 30 % sur le gris.
- **Encre 2** (`ink-2`) et **Blanc** (`white`) : relief minimal à l'intérieur des planches (surface de champ ou de résultat touché).
- **Signal pressé** (`signal-pressed`) et **Noir** (`black`) : uniquement les états hover de `btn--signal` et `btn--ink`.

### Named Rules
**La règle du Signal.** Le vert n'est jamais une structure : pas de fond de section, pas de bordure décorative, pas de titre. Il n'apparaît que sur ce qui est disponible, trouvé, actif ou sur l'action principale ; en texte sur papier, c'est toujours `deep`, jamais `signal`.

**La règle des trois thèmes.** Un chapitre ne connaît que `paper`, `ink` ou `grey`, posés par `data-theme` sur la section ; les composants lisent `--bg`, `--fg`, `--muted`, `--line`, `--line-strong`, `--accent-text` et ne choisissent jamais leur couleur eux-mêmes.

## Typography

**Display Font:** Mona Sans Variable (avec Helvetica Neue, Arial, sans-serif)
**Body Font:** Mona Sans Variable (même famille)
**Label/Mono Font:** aucune ; il n'y a qu'une famille.

**Character:** une grotesque variable unique, chargée avec ses deux axes (`@fontsource-variable/mona-sans/wdth.css`). Les titres sont serrés et un peu étroits (chasse 90–92 %, interlettrage −0.03 à −0.045em) ; le texte courant est posé à 420 de graisse, un cran au-dessus du regular, pour tenir sur les écrans Android de milieu de gamme. Les valeurs de graisse sont non rondes (420, 520, 540, 560, 640, 680, 720, 760) parce qu'elles sont interpolées, pas choisies dans un menu.

### Hierarchy
- **Display** (640, `clamp(2.75rem, 1.4rem + 5.6vw, 6rem)`, 1) : les deux titres du premier écran, chacun posé sur sa règle ; la chasse passe à 78–90 % quand ils glissent en colonne.
- **Headline** (640, chasse 92 %, `clamp(2.1rem, 1.3rem + 3.4vw, 4rem)`, 1) : le titre de chapitre, limité à 16 ch.
- **Title** (640–680, `clamp(1.4rem, 1.1rem + 1.1vw, 2rem)`, 1 à 1.15) : noms de fiche, sous-titres de bloc.
- **Entrée** (560 au repos, `clamp(1.6rem, 1rem + 2.2vw, 2.75rem)`, 1.05) : une ligne du répertoire (métier, contact, candidat). Sa graisse et sa chasse varient avec l'état : 740 / 108 % au survol, 780 pour « Trouvé », 320–360 pour une ligne écartée ou un contact mort.
- **Lead** (420, `clamp(1.125rem, 1rem + 0.45vw, 1.375rem)`, 1.45, slate) : le chapeau, limité à 38 ch.
- **Body** (420, 1.0625rem, 1.55) : texte courant.
- **Small** (540–600, 0.875rem) : libellés de champ, exemples, méta.
- **Micro** (420, 0.8125rem, slate) : notes « démonstration », compteurs.
- **Mot-symbole** (760, 1.5rem, −0.045em) : « linko » en minuscules, le point du ı remplacé par un signal vert (`0.2em`, rayon `0.2em 0.02em`).

### Named Rules
**La règle de la graisse qui juge.** La confiance d'une correspondance se lit dans la graisse : ce qui se confirme s'alourdit (→ 700–780), ce qui est écarté s'amaigrit et se décale (→ 320–360, `x: 28px`). Aucune autre couleur ou icône ne porte ce jugement.

**La règle du bas-de-casse.** Aucun texte en capitales, aucun kicker, aucun label-surtitre : la hiérarchie passe par la taille, la graisse et la position sur la règle.

## Layout

La page est une suite de chapitres pleine largeur (`.chapter`), chacun avec son thème, une gouttière fluide (`clamp(1rem, 0.5rem + 2.4vw, 2.5rem)`) et un contenu borné à 1440px (`.wrap`). À partir de 1024px, une réserve de 3rem (`--index-w`) est ajoutée à droite pour l'index à onglets fixé au bord de l'écran. Chaque chapitre respire de `--sp-9` (5 à 9rem) au-dessus et au-dessous ; l'en-tête de chapitre est une grille 5fr / 6fr (titre à gauche, chapeau à droite) alignée en bas, suivie d'un écart `--sp-8` (4.5rem). Les grilles de contenu reprennent la même asymétrie 6fr / 5fr.

Le premier écran est une scène de `100svh` (680–1100px) sans en-tête fixe : l'en-tête est posé en absolu, les deux titres sont placés à 60 % et 33 % du bas sur leurs règles, et la ligne basse porte l'entrée de recherche. Les listes sont des entrées sur règles : `padding: var(--sp-4) 0; border-bottom: 1px solid var(--rule)`, avec une règle d'encre pleine (`var(--ink)`) en tête de liste. Les points de rupture observés : 1024px (index visible, scène animée), 900px (grilles en une colonne), 720px (liens d'en-tête réduits), 560px (champ de recherche empilé). Le rythme d'espacement est l'échelle `--sp-1..--sp-9` ; les valeurs en rem hors échelle n'apparaissent qu'à l'intérieur des composants.

## Elevation & Depth

Le système est plat : la profondeur vient du contraste de thème (papier → gris doux → obsidienne) et des filets, pas des ombres. Les quelques ombres sont ambiantes, diffuses, très décalées vers le négatif en spread, et n'existent que sous ce qui flotte réellement au-dessus de la page (barre et feuille mobiles) ou sous une planche obsidienne posée en relief.

### Shadow Vocabulary
- **Fiche** (`box-shadow: 0 30px 60px -40px rgb(17 19 21 / 0.6)`) : la planche obsidienne du profil posée sur papier.
- **Barre mobile** (`box-shadow: 0 14px 34px -16px rgb(17 19 21 / 0.55)`) : la barre d'index fixée en bas sur mobile.
- **Feuille mobile** (`box-shadow: 0 20px 40px -20px rgb(17 19 21 / 0.45)`) : la liste des chapitres dépliée au-dessus de la barre.
- **Résultat touché** (`box-shadow: 0 6px 16px -10px rgb(17 19 21 / 0.35)`) : à l'intérieur d'un écran d'application, la ligne en cours de sélection.

### Named Rules
**La règle du filet d'abord.** Une séparation se fait par un filet de 1px (`rule`, `rule-strong`, `ink-rule`) ou par un changement de thème ; une ombre n'est admise que sous un élément fixé ou une planche obsidienne, jamais sous une carte de contenu.

## Shapes

Des angles presque droits. Les contrôles (boutons, champs bordés, planches « écran ») sont à 6px ; l'onglet d'index n'est arrondi que du côté page (`5px 0 0 5px`), comme un onglet imprimé ; les planches qui se détachent (fiche, feuille et barre mobiles, écrans internes) montent à 10–14px ; les pastilles de filtre et l'interrupteur de disponibilité sont les seules formes en 999px et vivent à l'intérieur des planches. Les points (témoin, `.live`, avatar, monogramme) sont des cercles. Les bordures sont toujours de 1px. Le symbole est deux pièces congruentes sur grille 120 × 120, chacune un point (r = 10.5) et un crochet à trait de 19 tourné de 180° autour du centre ; sa géométrie (`PIECE_PATH`) est la seule forme libre du système et n'est jamais redessinée.

## Components

### Buttons
Fermes, bas, sans relief : un rectangle de 3rem à coins de 6px qui se presse physiquement.
- **Shape:** coins doux (6px), bordure 1px de la couleur du fond, `min-height: 3rem`, `padding: 0 1.35rem`, graisse 600, 1rem, −0.01em.
- **Signal (`btn--signal`):** fond vert signal, texte obsidienne ; l'action principale, une fois par chapitre au plus. Hover : `signal-pressed`.
- **Encre (`btn--ink`):** fond `--fg` sur `--bg` (obsidienne sur papier, inversé sur planche obsidienne). Hover : noir.
- **Fantôme (`btn--ghost`):** transparent, bordure `--line-strong`, texte `--fg` ; hover : bordure `--fg`.
- **Flèche de tension (`.tension`):** un trait de 1px et 1.1em terminé par un chevron de 7px ; au survol il s'étire (`scaleX(1.35)`, 420ms, settle). C'est la seule flèche du système.
- **Active:** `scale(0.97) translateY(1px)` en 70ms, courbe press. Désactivé : opacité 0.45.
- **Focus:** anneau `2px solid deep` décalé de 3px (signal sur obsidienne).

### Inputs / Fields
- **L'entrée (`NeedSearch`):** une ligne du répertoire. Pas de boîte : une grille `libellé | champ | bouton` alignée en bas sur une règle d'encre (`border-bottom: 1px solid var(--ink)`), libellé en 560, champ transparent en 1.0625rem / 520, placeholder slate 420, bouton `btn--signal` de 2.5rem posé 0.25rem au-dessus de la règle. Sur obsidienne, la règle devient papier. Sous 560px le libellé passe au-dessus en small/slate.
- **Suggestions :** des entrées tabulaires séparées par des filets verticaux (`border-right: 1px solid rule`), 2.5rem, small 540 ; survol : texte en `deep`.
- **Champ bordé (`Trades`):** quand un champ doit se tenir seul, il est blanc, 3rem, coins 6px, bordure `rule-strong` qui passe à l'encre au focus.
- **Erreur :** `#b3261e` sur papier, `#ff8a80` sur obsidienne, en small.

### Navigation
- **En-tête :** absolu sur la scène du premier écran, lockup à gauche (symbole 28px + mot-symbole), deux liens à droite en 0.9375rem / 540 dont un seul reste sous 720px. Le soulignement est un trait de 1px qui se tend de gauche à droite (420ms, settle).
- **Index à onglets (`ThumbIndex`), ≥ 1024px :** fixé au bord droit, centré verticalement. Chaque chapitre est un onglet de 2.25rem × `clamp(2.6rem, 8vh, 4.75rem)`, fond gris doux, libellé vertical en 0.6875rem / 600, arrondi côté page. Survol 2.75rem, actif 3rem en obsidienne/papier. Un **témoin** vert de 0.4rem glisse le long de la pile (900ms, `cubic-bezier(0.2, 0.9, 0.25, 1.06)`) et dit toujours où l'on est. Sur une planche obsidienne (`data-tone="ink"`), les onglets passent à `#24282b` / papier et l'actif à papier / obsidienne.
- **Barre mobile (< 1024px) :** une barre obsidienne fixée en bas (12px, `padding 0.375rem`, marge 0.75rem + safe-area) avec le point vert, le nom du chapitre et un compteur en micro, plus le CTA. La feuille des chapitres se déplie au-dessus (papier, 12px, bordure `rule`, lignes de 2.75rem sur filets, chapitre courant en 720 avec point vert).

### Témoin de disponibilité (`.live`)
Un point vert de 0.5rem ; un anneau de 1px respire autour (`scale 1 → 2.4`, opacité 0.7 → 0, 3.2s, settle, infini). `.live--off` : cercle vide bordé `line-strong`, sans anneau. Il marque « Disponible » sur les fiches, les résultats et la liste de recherche.

### Pictogramme de la paire (`PairGlyph`)
Les deux pièces du symbole figées dans l'un des quatre états du mécanisme, sur une boîte 250 × 120 : **apart** (séparées, −18° / +24°), **search** (rapprochées, inclinées), **near** (presque jointes), **joined** (le logo). Besoin = `--mark-need` (obsidienne, papier sur planche sombre), compétence = `--signal`. Il remplace toute icône de « méthode » ou d'« étape ».

### Planches
- **Planche réglée (écran d'application) :** `300 × 560`, papier, bordure `rule-strong`, coins 6px ; à l'intérieur, `1rem` de marge, texte 0.8125rem, titres 720, résultats sur filets `rule`, surfaces blanches à 10px pour le champ et le résultat touché, filtres en pastilles 999px bordées `rule-strong` (actif : obsidienne). Les trois planches reposent sur une même règle forte, comme des entrées décalées.
- **Planche obsidienne (fiche de profil) :** fond obsidienne, papier, coins 14px, `padding --sp-6`, ombre « Fiche ». En-tête sur filet `ink-rule`, monogramme papier en cercle 3.5rem / 720, nom 1.5rem / 680, méta en `ink-slate`.

### Entrées de liste (Métiers, Problème, Lien)
Une ligne = `padding --sp-4 0`, filet `rule` dessous, règle d'encre pleine au-dessus de la liste. Colonnes `lettre (2.25rem) | nom | exemples | action` alignées sur la ligne de base ; la lettre A–Z en small / 700 / slate. Le nom est une **Entrée** dont la graisse répond au survol (740 / 108 %) ; les lignes qui ne correspondent plus se referment (`grid-template-rows: 0fr`, 420ms). Dans Problème, un contact mort reçoit un trait barré animé (`scaleX`, search) et sa graisse tombe de 560 à 360. Dans Lien, les lignes s'amaigrissent et se décalent jusqu'à ce que la meilleure, en 780, reçoive son point vert et que « Trouvé. » tombe en dernier (760, chasse 82 %, −0.045em).

### Mouvement
- **Durées :** 160ms (`--t-fast`, couleurs et opacité), 420ms (`--t-mid`, largeur, graisse, soulignement), 900ms (`--t-slow`, témoin).
- **Settle** `cubic-bezier(0.16, 1, 0.3, 1)` : tout ce qui se pose (soulignement, onglet, anneau du témoin, graisse).
- **Press** `cubic-bezier(0.3, 0, 0.2, 1)` : l'enfoncement des boutons.
- **Search** : en CSS `cubic-bezier(0.65, 0, 0.35, 1)` ; en GSAP `linko.search` = `M0,0 C0.55,0 0.35,1 1,1` (départ hésitant, accélération, freinage net) pour les balayages, les traits barrés et l'écartement des lignes.
- **Connect** `linko.connect` = `M0,0 C0.18,0 0.22,1.07 0.48,1.035 0.7,1.005 0.82,1 1,1` : rapprochement avec ~3.5 % de dépassement puis stabilisation ; réservé à la jonction des pièces et au verrouillage de la graisse finale.
- `prefers-reduced-motion` coupe toutes les animations et transitions (0.01ms) ; les séquences GSAP passent à durée 0.

## Do's and Don'ts

### Do:
- **Do** poser toute liste sur des filets de 1px (`rule`) avec une règle d'encre pleine en tête, `padding --sp-4 0`, colonnes alignées sur la ligne de base.
- **Do** encoder l'état d'une entrée dans la graisse et la chasse de Mona Sans (320–780, 82–108 %) plutôt que dans une couleur ou une icône.
- **Do** donner le vert `signal` aux fonds et aux points (bouton principal, témoin, `.live`, pièce compétence) et `deep` à tout texte vert sur papier.
- **Do** choisir le thème au niveau du chapitre (`data-theme="paper|ink|grey"`) et laisser les composants lire `--bg`, `--fg`, `--muted`, `--line`.
- **Do** utiliser les quatre états du `PairGlyph` partout où un pictogramme de méthode est nécessaire, et la flèche `.tension` comme seule flèche.
- **Do** garder les coins à 6px pour les contrôles et 10–14px pour les planches ; 999px seulement pour les pastilles internes aux planches.
- **Do** respirer de `--sp-9` entre chapitres et de `--sp-8` entre l'en-tête de chapitre et son contenu.

### Don't:
- **Don't** utiliser de dégradés, de verre (backdrop-filter), de blobs, de particules, de parallaxe ni de défilement infini.
- **Don't** structurer une page avec des cartes : pas de boîte bordée ou ombrée autour d'un contenu qui peut se poser sur une règle.
- **Don't** mettre `signal` (#20c77a) en texte sur papier ou gris doux (2.0:1), ni en fond de section.
- **Don't** ajouter de kickers, de surtitres, de numéros de section décoratifs ni de texte en capitales.
- **Don't** afficher de photos d'ouvriers ni de coques en image ; les écrans d'application passent par le composant IPhone (cadre CSS : coque obsidienne, îlot, barre d'état, indicateur d'accueil) et nulle part ailleurs.
- **Don't** introduire d'icônes-glyphes ou une seconde famille de caractères ; le symbole, le `PairGlyph`, le point `.live` et la flèche `.tension` sont les seuls signes.
- **Don't** animer ce qui n'explique pas le lien besoin → compétence ; pas de révélation en cascade, pas de fade/slide généralisé.
