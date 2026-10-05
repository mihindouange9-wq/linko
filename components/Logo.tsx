import type { CSSProperties, SVGProps } from "react";

/*
  Symbole LINKO — deux pièces congruentes, l'une tournée de 180° autour du centre.
  Grille 120 × 120. Chaque pièce : un point (la personne) et un corps en crochet
  dont la bande oblique (36°) vient se loger contre celle de l'autre.
  Besoin = pièce obsidienne. Compétence = pièce verte.
*/
export const PIECE_PATH = "M21 37 V68 C21 84 38.37 94.88 48.08 87.82 L82.05 63.14";
export const PIECE_DOT = { cx: 21, cy: 15, r: 10.5 };
export const PIECE_STROKE = 19;

type PieceProps = SVGProps<SVGGElement> & { color: string; rotated?: boolean };

export function Piece({ color, rotated, ...rest }: PieceProps) {
  return (
    <g transform={rotated ? "rotate(180 60 60)" : undefined} {...rest}>
      <path d={PIECE_PATH} fill="none" stroke={color} strokeWidth={PIECE_STROKE} strokeLinejoin="round" />
      <circle {...PIECE_DOT} fill={color} />
    </g>
  );
}

type SymbolProps = {
  size?: number | string;
  need?: string;
  skill?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function LinkoSymbol({
  size = 32,
  need = "var(--mark-need)",
  skill = "var(--signal)",
  className,
  style,
  title,
}: SymbolProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <Piece color={skill} />
      <Piece color={need} rotated />
    </svg>
  );
}

/* Mot-symbole : « linko » minuscule, le point du i est un signal vert. */
export function Wordmark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span className={`wordmark ${className ?? ""}`} style={style} aria-label="LINKO">
      <span aria-hidden="true">
        l<span className="wordmark-i">ı<span className="wordmark-dot" /></span>nko
      </span>
    </span>
  );
}

export function Lockup({ symbolSize = 28 }: { symbolSize?: number }) {
  return (
    <span className="lockup">
      <LinkoSymbol size={symbolSize} />
      <Wordmark />
    </span>
  );
}
