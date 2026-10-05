// Données de démonstration. Tous les noms, avis et profils sont fictifs.
// Lancement : Gabon (Libreville d'abord).

export type Trade = {
  slug: string;
  name: string;
  examples: string;
};

export const TRADES: Trade[] = [
  { slug: "agent-entretien", name: "Agent d'entretien", examples: "Bureaux, fin de chantier, vitres" },
  { slug: "carreleur", name: "Carreleur", examples: "Sol, faïence, terrasse" },
  { slug: "electricien", name: "Électricien", examples: "Panne, tableau, mise aux normes" },
  { slug: "frigoriste", name: "Frigoriste", examples: "Climatisation, chambre froide" },
  { slug: "informaticien", name: "Informaticien", examples: "Réseau, ordinateur, logiciel" },
  { slug: "jardinier", name: "Jardinier", examples: "Entretien, taille, arrosage" },
  { slug: "macon", name: "Maçon", examples: "Mur, dalle, fissure, extension" },
  { slug: "mecanicien", name: "Mécanicien", examples: "Diagnostic, vidange, freins" },
  { slug: "menuisier", name: "Menuisier", examples: "Porte, placard, charpente" },
  { slug: "peintre", name: "Peintre", examples: "Intérieur, façade, enduit" },
  { slug: "plombier", name: "Plombier", examples: "Fuite, chauffe-eau, débouchage" },
  { slug: "soudeur", name: "Soudeur", examples: "Portail, grille, structure métallique" },
  { slug: "technicien", name: "Technicien", examples: "Électroménager, groupe électrogène" },
];

export type Entry = {
  id: string;
  trade: string;
  name: string;
  place: string;
  availability: string;
  available: boolean;
  rating: string;
  reviews: number;
  years: number;
  diploma: string;
};

// Le répertoire parcouru dans la séquence « Lien » (Libreville).
export const DIRECTORY: Entry[] = [
  { id: "e1", trade: "Électricien", name: "Landry Obame", place: "Nzeng-Ayong", availability: "Disponible", available: true, rating: "4,7", reviews: 41, years: 7, diploma: "Bac pro Électrotechnique" },
  { id: "e2", trade: "Peintre", name: "Chantal Moussavou", place: "Glass", availability: "Demain", available: false, rating: "4,6", reviews: 23, years: 5, diploma: "Formation CFPP Peinture" },
  { id: "e3", trade: "Plombier", name: "Rodrigue Mba", place: "Owendo · 9,2 km", availability: "Demain", available: false, rating: "4,5", reviews: 18, years: 6, diploma: "CAP Installateur sanitaire" },
  { id: "e4", trade: "Menuisier", name: "Stéphane Ndong", place: "PK8", availability: "Disponible", available: true, rating: "4,8", reviews: 35, years: 12, diploma: "CAP Menuiserie" },
  { id: "e5", trade: "Plombière", name: "Grâce Nzue", place: "Akanda · 1,4 km", availability: "Disponible", available: true, rating: "4,9", reviews: 37, years: 9, diploma: "CAP Installateur sanitaire" },
  { id: "e6", trade: "Frigoriste", name: "Yannick Koumba", place: "Lalala", availability: "Lundi", available: false, rating: "4,4", reviews: 12, years: 4, diploma: "BT Froid et climatisation" },
  { id: "e7", trade: "Maçon", name: "Jean-Claude Ekomi", place: "Okala", availability: "Disponible", available: true, rating: "4,6", reviews: 29, years: 15, diploma: "CAP Maçonnerie" },
  { id: "e8", trade: "Plombier", name: "Aimé Bouanga", place: "Angondjé · 3,6 km", availability: "Ce soir", available: false, rating: "4,6", reviews: 26, years: 8, diploma: "Formation CFPP Plomberie" },
  { id: "e9", trade: "Informaticienne", name: "Mireille Ntoutoume", place: "Louis", availability: "Disponible", available: true, rating: "4,9", reviews: 44, years: 6, diploma: "BTS Informatique" },
  { id: "e11", trade: "Mécanicien", name: "Patrick Allogho", place: "Nkembo", availability: "Disponible", available: true, rating: "4,7", reviews: 31, years: 11, diploma: "CAP Mécanique automobile" },
  { id: "e10", trade: "Soudeur", name: "Hervé Mintsa", place: "Oloumi", availability: "Mercredi", available: false, rating: "4,3", reviews: 9, years: 10, diploma: "CQP Soudure" },
];

export const CHAPTERS = [
  { id: "besoin", label: "Besoin", theme: "paper" },
  { id: "probleme", label: "Problème", theme: "paper" },
  { id: "lien", label: "Lien", theme: "paper" },
  { id: "methode", label: "Méthode", theme: "paper" },
  { id: "metiers", label: "Métiers", theme: "paper" },
  { id: "confiance", label: "Confiance", theme: "paper" },
  { id: "application", label: "App", theme: "grey" },
  { id: "pros", label: "Pros", theme: "ink" },
  { id: "tarifs", label: "Tarifs", theme: "paper" },
  { id: "entreprises", label: "Entreprises", theme: "paper" },
  { id: "contact", label: "Contact", theme: "ink" },
] as const;

export const SUGGESTIONS = ["Plombier", "Électricien", "Frigoriste", "Peintre", "Mécanicien"];

/*
  Abonnements professionnels — tarifs de lancement PROPOSÉS pour le Gabon, à valider.
  Repères : SMIG 80 000 FCFA, revenu minimum mensuel 150 000 FCFA ; un abonnement doit
  rester inférieur au prix d'une seule petite intervention.
*/
export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  pitch: string;
  features: string[];
  best?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    monthly: 3000,
    yearly: 30000,
    pitch: "Être trouvé.",
    features: [
      "Profil visible dans les recherches",
      "Un métier, une ville",
      "Disponibilité mise à jour d'un geste",
      "Avis clients et note",
      "Demandes illimitées",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 8000,
    yearly: 80000,
    pitch: "Être choisi.",
    best: true,
    features: [
      "Tout Essentiel",
      "Jusqu'à trois métiers, plusieurs villes",
      "Diplômes et certifications vérifiés, affichés avec le badge",
      "Mise en avant quand vous êtes disponible",
      "Galerie de réalisations (photos)",
      "Statistiques : vues, demandes, taux de réponse",
    ],
  },
];

export const fcfa = (n: number) => `${n.toLocaleString("fr-FR").replace(/[  ]/g, " ")} FCFA`;
