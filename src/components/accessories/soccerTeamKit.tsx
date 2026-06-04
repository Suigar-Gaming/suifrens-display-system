import type { BodyAccessoryProps } from "./AccessorySlot.js";

export type SoccerTeamCountryCode =
  | "GLOBAL"
  | "AR"
  | "AU"
  | "BE"
  | "BR"
  | "CA"
  | "CL"
  | "CO"
  | "CR"
  | "HR"
  | "DK"
  | "EC"
  | "EG"
  | "GB"
  | "FR"
  | "DE"
  | "GH"
  | "IT"
  | "JP"
  | "KR"
  | "MX"
  | "MA"
  | "NL"
  | "NG"
  | "PY"
  | "PT"
  | "SA"
  | "SN"
  | "RS"
  | "ZA"
  | "ES"
  | "CH"
  | "TN"
  | "TR"
  | "UY"
  | "US";

export type SoccerTeamSide = "home" | "away";

export type SoccerTeamKit = {
  code: SoccerTeamCountryCode;
  primary: string;
  secondary: string;
  accent: string;
};

const DARK_STROKE = "#050916";

export const SOCCER_TEAM_KITS = {
  GLOBAL: { code: "GLOBAL", primary: "#f8fafc", secondary: "#0f172a", accent: "#38bdf8" },
  AR: { code: "AR", primary: "#74c6ef", secondary: "#ffffff", accent: "#f6c445" },
  AU: { code: "AU", primary: "#f4c430", secondary: "#0f7a43", accent: "#ffffff" },
  BE: { code: "BE", primary: "#dc2626", secondary: "#111827", accent: "#facc15" },
  BR: { code: "BR", primary: "#f9d71c", secondary: "#1f8f43", accent: "#1d4ed8" },
  CA: { code: "CA", primary: "#ef233c", secondary: "#ffffff", accent: "#111827" },
  CL: { code: "CL", primary: "#dc2626", secondary: "#ffffff", accent: "#2563eb" },
  CO: { code: "CO", primary: "#facc15", secondary: "#2563eb", accent: "#dc2626" },
  CR: { code: "CR", primary: "#dc2626", secondary: "#ffffff", accent: "#2563eb" },
  HR: { code: "HR", primary: "#ffffff", secondary: "#dc2626", accent: "#2563eb" },
  DK: { code: "DK", primary: "#dc2626", secondary: "#ffffff", accent: "#991b1b" },
  EC: { code: "EC", primary: "#facc15", secondary: "#1d4ed8", accent: "#dc2626" },
  EG: { code: "EG", primary: "#dc2626", secondary: "#ffffff", accent: "#111827" },
  GB: { code: "GB", primary: "#ffffff", secondary: "#dc2626", accent: "#1d4ed8" },
  FR: { code: "FR", primary: "#1d4ed8", secondary: "#ffffff", accent: "#ef4444" },
  DE: { code: "DE", primary: "#ffffff", secondary: "#111827", accent: "#facc15" },
  GH: { code: "GH", primary: "#ffffff", secondary: "#dc2626", accent: "#facc15" },
  IT: { code: "IT", primary: "#2563eb", secondary: "#ffffff", accent: "#16a34a" },
  JP: { code: "JP", primary: "#1d4ed8", secondary: "#ffffff", accent: "#ef4444" },
  KR: { code: "KR", primary: "#ffffff", secondary: "#ef4444", accent: "#2563eb" },
  MX: { code: "MX", primary: "#0f7a43", secondary: "#ffffff", accent: "#dc2626" },
  MA: { code: "MA", primary: "#c1121f", secondary: "#0f7a43", accent: "#ffffff" },
  NL: { code: "NL", primary: "#f97316", secondary: "#111827", accent: "#ffffff" },
  NG: { code: "NG", primary: "#16a34a", secondary: "#ffffff", accent: "#0f766e" },
  PY: { code: "PY", primary: "#dc2626", secondary: "#ffffff", accent: "#2563eb" },
  PT: { code: "PT", primary: "#b91c1c", secondary: "#0f7a43", accent: "#facc15" },
  SA: { code: "SA", primary: "#16a34a", secondary: "#ffffff", accent: "#0f766e" },
  SN: { code: "SN", primary: "#16a34a", secondary: "#facc15", accent: "#dc2626" },
  RS: { code: "RS", primary: "#dc2626", secondary: "#ffffff", accent: "#2563eb" },
  ZA: { code: "ZA", primary: "#facc15", secondary: "#16a34a", accent: "#111827" },
  ES: { code: "ES", primary: "#dc2626", secondary: "#facc15", accent: "#1f2937" },
  CH: { code: "CH", primary: "#dc2626", secondary: "#ffffff", accent: "#991b1b" },
  TN: { code: "TN", primary: "#ffffff", secondary: "#dc2626", accent: "#991b1b" },
  TR: { code: "TR", primary: "#dc2626", secondary: "#ffffff", accent: "#991b1b" },
  UY: { code: "UY", primary: "#60a5fa", secondary: "#ffffff", accent: "#111827" },
  US: { code: "US", primary: "#1d4ed8", secondary: "#ffffff", accent: "#dc2626" },
} as const satisfies Record<SoccerTeamCountryCode, SoccerTeamKit>;

export const SOCCER_TEAM_ACCESSORY_NAMES = new Set([
  "soccer team shirt",
  "soccer team swim trunks",
]);

export function resolveSoccerCountryCode(
  country?: unknown
): SoccerTeamCountryCode {
  const normalized =
    typeof country === "string" ? country.trim().toUpperCase() : "US";
  return normalized in SOCCER_TEAM_KITS
    ? (normalized as SoccerTeamCountryCode)
    : "US";
}

export function resolveSoccerTeamSide(side?: unknown): SoccerTeamSide {
  return side === "away" ? "away" : "home";
}

export function resolveSoccerTeamKit(
  country?: unknown,
  side?: unknown
): SoccerTeamKit {
  const kit = SOCCER_TEAM_KITS[resolveSoccerCountryCode(country)];
  if (resolveSoccerTeamSide(side) === "away") {
    return {
      code: kit.code,
      primary: kit.secondary,
      secondary: kit.primary,
      accent: kit.accent,
    };
  }
  return kit;
}

export function isLightHex(value: string) {
  const hex = value.replace(/^#/, "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) {
    return false;
  }
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 >= 196;
}

export function contrastColor(value: string) {
  return isLightHex(value) ? DARK_STROKE : "#ffffff";
}

type SoccerKitMotifProps = {
  kit: SoccerTeamKit;
  x: number;
  y: number;
  width: number;
  height: number;
  clipId?: string;
  strokeWidth?: number;
  patchScale?: number;
};

export function SoccerKitMotif({
  kit,
  x,
  y,
  width,
  height,
  clipId,
  strokeWidth = 6,
  patchScale = 1,
}: SoccerKitMotifProps) {
  const code = kit.code === "GLOBAL" ? "GLO" : kit.code;
  const textSize = code.length > 2 ? 28 : 35;
  const patchWidth = 56 * patchScale;
  const patchHeight = 39 * patchScale;
  const patchX = x + width * 0.5 - patchWidth * 0.5;
  const patchY = y + height * 0.5 - patchHeight * 0.5;
  const textLength = patchWidth * (code.length > 2 ? 0.74 : 0.68);
  const motif = (
    <>
      <rect x={x} y={y} width={width} height={height} fill={kit.primary} />
      <rect
        x={x + width * 0.42}
        y={y}
        width={width * 0.16}
        height={height}
        fill={kit.secondary}
      />
      <rect
        x={x}
        y={y + height * 0.56}
        width={width}
        height={height * 0.16}
        fill={kit.accent}
      />
      <rect
        x={x + width * 0.16}
        y={y}
        width={width * 0.08}
        height={height}
        fill={kit.secondary}
        opacity="0.58"
      />
      <rect
        x={x + width * 0.74}
        y={y}
        width={width * 0.08}
        height={height}
        fill={kit.secondary}
        opacity="0.58"
      />
      <rect
        x={patchX}
        y={patchY}
        width={patchWidth}
        height={patchHeight}
        rx={7 * patchScale}
        fill="#ffffff"
        stroke={DARK_STROKE}
        strokeWidth={strokeWidth}
      />
      <text
        x={patchX + patchWidth / 2}
        y={patchY + patchHeight * 0.68}
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={textSize * patchScale}
        fontWeight="900"
        letterSpacing="0"
        textLength={textLength}
        lengthAdjust="spacingAndGlyphs"
        fill={DARK_STROKE}
      >
        {code}
      </text>
    </>
  );

  return clipId ? <g clipPath={`url(#${clipId})`}>{motif}</g> : <>{motif}</>;
}

export type SoccerTeamAccessoryProps = BodyAccessoryProps & {
  country?: SoccerTeamCountryCode | string;
  side?: SoccerTeamSide;
};

export { DARK_STROKE as SOCCER_TEAM_DARK_STROKE };
