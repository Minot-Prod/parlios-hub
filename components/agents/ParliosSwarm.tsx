"use client";

import * as React from "react";

type ParliosSwarmProps = {
  activePulse?: boolean;
};

type SwarmAgent = {
  id: number;
  top: number;
  left: number;
  size: number;
  speed: number;
  orbit: number;
  layer: number;
  pulseGroup: number;
};

const AGENT_COUNT = 200;

const AGENTS: SwarmAgent[] = Array.from({ length: AGENT_COUNT }).map((_, i) => {
  const seed = i + 1;
  const top = (seed * 37) % 100;
  const left = (seed * 61) % 100;
  const size = 6 + ((seed * 13) % 18);
  const speed = 0.6 + ((seed * 7) % 14) / 10;
  const orbit = (seed * 47) % 360;
  const layer = seed % 3;
  const pulseGroup = seed % 4;

  return {
    id: seed,
    top,
    left,
    size,
    speed,
    orbit,
    layer,
    pulseGroup,
  };
});

export default function ParliosSwarm({ activePulse = false }: ParliosSwarmProps) {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 520);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {AGENTS.map((agent) => {
        const baseOpacity = agent.layer === 0 ? 0.18 : agent.layer === 1 ? 0.26 : 0.34;
        const tickPhase = tick * agent.speed;
        const angle = agent.orbit + tickPhase * 4;
        const radius = 6 + agent.layer * 4;

        const offsetX = Math.cos((angle * Math.PI) / 180) * radius;
        const offsetY = Math.sin((angle * Math.PI) / 180) * radius;

        const isPulsing =
          activePulse && (tick % 4 === agent.pulseGroup || (tick + 1) % 4 === agent.pulseGroup);

        const glowColor = isPulsing
          ? "radial-gradient(circle, rgba(56,189,248,0.9), transparent)"
          : "radial-gradient(circle, rgba(148,163,184,0.7), transparent)";

        return (
          <div
            key={agent.id}
            className="rounded-full"
            style={{
              position: "absolute",
              width: agent.size,
              height: agent.size,
              top: `calc(${agent.top}% + ${offsetY}px)`,
              left: `calc(${agent.left}% + ${offsetX}px)`,
              backgroundImage: glowColor,
              opacity: isPulsing ? 0.9 : baseOpacity,
              filter: "blur(4px)",
              transition: "opacity 0.18s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}
