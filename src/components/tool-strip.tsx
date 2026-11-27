"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import s from "@/app/page.module.css";

/** Slowly scrolling list of tools. Pauses on hover or with the button. */
export function ToolStrip({ tools }: { tools: string[][] }) {
  const [paused, setPaused] = useState(false);
  const label = paused ? "Play tool list" : "Pause tool list";

  return (
    <div className={s.stack} data-paused={paused}>
      <div className={s.stackMask}>
        <div className={s.stackTrack}>
          {/* repeated once so the loop has no seam; screen readers only get the first copy */}
          {[0, 1].map((copy) => (
            <ul key={copy} aria-label={copy === 0 ? "Tools I work with" : undefined} aria-hidden={copy === 1}>
              {tools.map(([name, icon]) => (
                <li key={name}>
                  <Image src={`/tech/${icon}.svg`} alt="" width={22} height={22} />
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button type="button" className={s.pause} onClick={() => setPaused(!paused)} aria-label={label} title={label}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}
