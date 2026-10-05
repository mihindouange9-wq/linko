import { Piece } from "./Logo";

export type PairState = "apart" | "search" | "near" | "joined";

/* Les quatre états de la signature motion, figés en pictogramme. */
const LAYOUT: Record<PairState, { need: [number, number, number]; skill: [number, number, number] }> = {
  apart: { need: [0, 0, -18], skill: [130, 0, 24] },
  search: { need: [22, 6, -10], skill: [108, -6, 14] },
  near: { need: [44, 0, -4], skill: [78, 0, 5] },
  joined: { need: [65, 0, 0], skill: [65, 0, 0] },
};

type Props = {
  state: PairState;
  size?: number;
  className?: string;
  need?: string;
  skill?: string;
  label?: string;
};

export default function PairGlyph({
  state,
  size = 72,
  className,
  need = "var(--mark-need)",
  skill = "var(--signal)",
  label,
}: Props) {
  const l = LAYOUT[state];
  return (
    <svg
      viewBox="0 0 250 120"
      width={(size * 250) / 120}
      height={size}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <g transform={`translate(${l.skill[0]} ${l.skill[1]}) rotate(${l.skill[2]} 60 60)`}>
        <Piece color={skill} />
      </g>
      <g transform={`translate(${l.need[0]} ${l.need[1]}) rotate(${l.need[2]} 60 60)`}>
        <Piece color={need} rotated />
      </g>
    </svg>
  );
}
