import Image from "next/image";
import s from "@/app/page.module.css";

/** Slowly scrolling list of tools. Stops while hovered or pressed, and stays still for reduced motion. */
export function ToolStrip({ tools }: { tools: string[][] }) {
  return (
    <div className={s.stack}>
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
    </div>
  );
}
