export function PowerRing() {
  return (
    <div className="power-ring" aria-hidden="true">
      <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="ring-outer">
          <circle
            cx="350"
            cy="350"
            r="320"
            stroke="rgba(200,146,42,0.2)"
            strokeWidth="1"
          />
          <circle
            cx="350"
            cy="350"
            r="310"
            stroke="rgba(200,146,42,0.1)"
            strokeWidth="0.5"
            strokeDasharray="8 12"
          />
          <circle cx="350" cy="30" r="6" fill="#C8922A" opacity=".7" />
          <circle cx="350" cy="670" r="4" fill="#C8922A" opacity=".4" />
          <circle cx="30" cy="350" r="4" fill="#C8922A" opacity=".4" />
          <circle cx="670" cy="350" r="6" fill="#C8922A" opacity=".7" />
        </g>
        <g className="ring-mid">
          <circle
            cx="350"
            cy="350"
            r="240"
            stroke="rgba(24,95,165,0.15)"
            strokeWidth="1"
          />
          <circle
            cx="350"
            cy="350"
            r="230"
            stroke="rgba(24,95,165,0.08)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          <circle cx="350" cy="110" r="5" fill="#185FA5" opacity=".5" />
          <circle cx="590" cy="350" r="5" fill="#185FA5" opacity=".5" />
          <circle cx="350" cy="590" r="5" fill="#185FA5" opacity=".5" />
          <circle cx="110" cy="350" r="5" fill="#185FA5" opacity=".5" />
        </g>
        <g className="ring-pulse">
          <circle
            cx="350"
            cy="350"
            r="160"
            stroke="rgba(200,146,42,0.25)"
            strokeWidth="1.5"
          />
          <circle
            cx="350"
            cy="350"
            r="120"
            fill="rgba(200,146,42,0.06)"
            stroke="rgba(200,146,42,0.3)"
            strokeWidth="1"
          />
          <circle
            cx="350"
            cy="350"
            r="70"
            fill="rgba(200,146,42,0.08)"
            stroke="rgba(200,146,42,0.35)"
            strokeWidth="1"
          />
          <circle cx="350" cy="350" r="30" fill="rgba(200,146,42,0.2)" />
          <circle cx="350" cy="350" r="12" fill="#C8922A" opacity=".8" />
        </g>
        <line
          x1="350"
          y1="180"
          x2="350"
          y2="520"
          stroke="rgba(200,146,42,0.1)"
          strokeWidth="0.5"
        />
        <line
          x1="180"
          y1="350"
          x2="520"
          y2="350"
          stroke="rgba(200,146,42,0.1)"
          strokeWidth="0.5"
        />
        <rect x="344" y="26" width="12" height="2" fill="rgba(200,146,42,0.5)" />
        <rect
          x="344"
          y="672"
          width="12"
          height="2"
          fill="rgba(200,146,42,0.5)"
        />
        <rect x="26" y="344" width="2" height="12" fill="rgba(200,146,42,0.5)" />
        <rect
          x="672"
          y="344"
          width="2"
          height="12"
          fill="rgba(200,146,42,0.5)"
        />
      </svg>
    </div>
  );
}
