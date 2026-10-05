"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  // Signature : rapprochement, léger dépassement, stabilisation.
  CustomEase.create("linko.connect", "M0,0 C0.18,0 0.22,1.07 0.48,1.035 0.7,1.005 0.82,1 1,1");
  // Recherche : départ hésitant, accélération, freinage net.
  CustomEase.create("linko.search", "M0,0 C0.55,0 0.35,1 1,1");
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
