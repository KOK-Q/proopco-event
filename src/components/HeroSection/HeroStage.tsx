import type { CSSProperties } from "react";

/**
 * Hero stage — two logo tiles lit from above, matching the prototype.
 *
 * Structure per the design:
 *   - back light beams (behind the tiles)
 *   - ProopCo tile + Parsian Bourse tile, each built from stacked depth
 *     slices, a lit face, and a glowing cut-out gold logo
 *   - front light beams (a faint copy in front of the tiles)
 *
 * All positioning / tilt / timing lives in the `.hero-stage` CSS in globals.css.
 */

// Seven stacked slices give each tile its 3D thickness (front → back).
const DEPTHS = [7, 6, 5, 4, 3, 2, 1];

function TileDepths() {
  return (
    <>
      {DEPTHS.map((i) => (
        <i key={i} className="tile-depth" style={{ "--i": i } as CSSProperties} />
      ))}
    </>
  );
}

function Beams({ front = false }: { front?: boolean }) {
  return (
    <div
      className={front ? "hero-beams hero-beams--front" : "hero-beams"}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

export function HeroStage() {
  return (
    <>
      <Beams />

      <div className="hero-stage">
        <div className="tile tile--proopco">
        <div className="tile-body">
          <TileDepths />
          <div className="tile-face">
            <span className="tile-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/proopco-gold.svg" width={415} height={344} alt="لوگوی پراپکو" />
            </span>
          </div>
        </div>
      </div>

      <div className="tile tile--parsian">
        <div className="tile-body">
          <TileDepths />
          <div className="tile-face">
            <span className="tile-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/parsian-bourse.png"
                width={1612}
                height={2520}
                alt="لوگوی پارسیان بورس"
              />
            </span>
          </div>
        </div>
      </div>

      </div>

      <Beams front />
    </>
  );
}
