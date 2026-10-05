import { DIRECTORY, TRADES, type Entry } from "./data";

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z\s'-]/g, " ")
    .trim();

/* Racine courte : « plombière », « plomberie », « plombier » → « plomb » */
const stem = (word: string) => normalize(word).slice(0, 5);

const SYNONYMS: Record<string, string> = {
  fuite: "plomb",
  robinet: "plomb",
  evier: "plomb",
  courant: "elect",
  prise: "elect",
  panne: "elect",
  clim: "frigo",
  climatisation: "frigo",
  frigo: "frigo",
  voiture: "mecan",
  moteur: "mecan",
  peinture: "peint",
  mur: "macon",
  ordinateur: "infor",
  wifi: "infor",
};

export type Resolution = {
  tradeLabel: string;
  matches: Entry[];
  best: Entry;
  fallback: boolean;
};

export function resolveNeed(query: string): Resolution {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  for (const w of words) {
    const s = SYNONYMS[w] ?? stem(w);
    if (s.length < 3) continue;
    const matches = DIRECTORY.filter((e) => stem(e.trade) === s);
    if (matches.length) {
      const trade = TRADES.find((t) => stem(t.name) === s);
      const ranked = [...matches].sort(
        (a, b) => Number(b.available) - Number(a.available) || parseFloat(b.rating.replace(",", ".")) - parseFloat(a.rating.replace(",", ".")),
      );
      return {
        tradeLabel: (trade?.name ?? matches[0].trade).toLowerCase(),
        matches,
        best: ranked[0],
        fallback: false,
      };
    }
  }
  const fallback = resolveNeed("plombier");
  return { ...fallback, fallback: words.length > 0 };
}
