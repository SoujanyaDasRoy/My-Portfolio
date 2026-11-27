"use client";

import { useRef, type ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Respects the visitor's "reduce motion" setting for everything below it. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Content rises into place the first time it scrolls into view, so the eye follows the reading order. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** The screens inside a project tile move slightly slower than the page, giving the tile depth. */
export function Drift({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}
