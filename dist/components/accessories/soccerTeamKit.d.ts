import type { BodyAccessoryProps } from "./AccessorySlot.js";
export type SoccerTeamCountryCode = "GLOBAL" | "AR" | "AT" | "AU" | "BA" | "BE" | "BR" | "CA" | "CD" | "CH" | "CI" | "CO" | "CV" | "CW" | "CZ" | "DE" | "DZ" | "EC" | "EG" | "ES" | "FR" | "GB" | "GH" | "HT" | "HR" | "IQ" | "IR" | "JP" | "JO" | "KR" | "MA" | "MX" | "NL" | "NO" | "NZ" | "PA" | "PY" | "PT" | "QA" | "SA" | "SCT" | "SE" | "SN" | "TN" | "TR" | "US" | "UY" | "UZ" | "ZA";
export type SoccerTeamSide = "home" | "away";
export type SoccerTeamPattern = "vertical" | "horizontal" | "cross" | "diagonal" | "sash" | "quarters" | "hoops" | "canton" | "sun" | "chevron";
export type SoccerTeamKit = {
    code: SoccerTeamCountryCode;
    primary: string;
    secondary: string;
    accent: string;
    pattern: SoccerTeamPattern;
};
declare const DARK_STROKE = "#050916";
export declare const SOCCER_TEAM_KITS: {
    readonly GLOBAL: {
        readonly code: "GLOBAL";
        readonly primary: "#f8fafc";
        readonly secondary: "#0f172a";
        readonly accent: "#38bdf8";
        readonly pattern: "cross";
    };
    readonly MX: {
        readonly code: "MX";
        readonly primary: "#0f7a43";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
        readonly pattern: "vertical";
    };
    readonly ZA: {
        readonly code: "ZA";
        readonly primary: "#facc15";
        readonly secondary: "#16a34a";
        readonly accent: "#111827";
        readonly pattern: "chevron";
    };
    readonly KR: {
        readonly code: "KR";
        readonly primary: "#ffffff";
        readonly secondary: "#ef4444";
        readonly accent: "#2563eb";
        readonly pattern: "sun";
    };
    readonly CZ: {
        readonly code: "CZ";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#2563eb";
        readonly pattern: "chevron";
    };
    readonly CA: {
        readonly code: "CA";
        readonly primary: "#ef233c";
        readonly secondary: "#ffffff";
        readonly accent: "#111827";
        readonly pattern: "vertical";
    };
    readonly BA: {
        readonly code: "BA";
        readonly primary: "#2563eb";
        readonly secondary: "#facc15";
        readonly accent: "#ffffff";
        readonly pattern: "diagonal";
    };
    readonly QA: {
        readonly code: "QA";
        readonly primary: "#7f1d1d";
        readonly secondary: "#ffffff";
        readonly accent: "#b91c1c";
        readonly pattern: "chevron";
    };
    readonly CH: {
        readonly code: "CH";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#991b1b";
        readonly pattern: "cross";
    };
    readonly BR: {
        readonly code: "BR";
        readonly primary: "#f9d71c";
        readonly secondary: "#1f8f43";
        readonly accent: "#1d4ed8";
        readonly pattern: "sun";
    };
    readonly HT: {
        readonly code: "HT";
        readonly primary: "#1d4ed8";
        readonly secondary: "#dc2626";
        readonly accent: "#ffffff";
        readonly pattern: "horizontal";
    };
    readonly MA: {
        readonly code: "MA";
        readonly primary: "#c1121f";
        readonly secondary: "#0f7a43";
        readonly accent: "#ffffff";
        readonly pattern: "sun";
    };
    readonly SCT: {
        readonly code: "SCT";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#0f172a";
        readonly pattern: "diagonal";
    };
    readonly US: {
        readonly code: "US";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
        readonly pattern: "canton";
    };
    readonly AU: {
        readonly code: "AU";
        readonly primary: "#f4c430";
        readonly secondary: "#0f7a43";
        readonly accent: "#ffffff";
        readonly pattern: "diagonal";
    };
    readonly PY: {
        readonly code: "PY";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#2563eb";
        readonly pattern: "horizontal";
    };
    readonly TR: {
        readonly code: "TR";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#991b1b";
        readonly pattern: "sun";
    };
    readonly DE: {
        readonly code: "DE";
        readonly primary: "#ffffff";
        readonly secondary: "#111827";
        readonly accent: "#facc15";
        readonly pattern: "horizontal";
    };
    readonly CW: {
        readonly code: "CW";
        readonly primary: "#2563eb";
        readonly secondary: "#facc15";
        readonly accent: "#ffffff";
        readonly pattern: "hoops";
    };
    readonly CI: {
        readonly code: "CI";
        readonly primary: "#f97316";
        readonly secondary: "#ffffff";
        readonly accent: "#16a34a";
        readonly pattern: "vertical";
    };
    readonly EC: {
        readonly code: "EC";
        readonly primary: "#facc15";
        readonly secondary: "#1d4ed8";
        readonly accent: "#dc2626";
        readonly pattern: "horizontal";
    };
    readonly NL: {
        readonly code: "NL";
        readonly primary: "#f97316";
        readonly secondary: "#111827";
        readonly accent: "#ffffff";
        readonly pattern: "sash";
    };
    readonly JP: {
        readonly code: "JP";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#ef4444";
        readonly pattern: "sun";
    };
    readonly SE: {
        readonly code: "SE";
        readonly primary: "#2563eb";
        readonly secondary: "#facc15";
        readonly accent: "#0f172a";
        readonly pattern: "cross";
    };
    readonly TN: {
        readonly code: "TN";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#991b1b";
        readonly pattern: "sun";
    };
    readonly BE: {
        readonly code: "BE";
        readonly primary: "#dc2626";
        readonly secondary: "#111827";
        readonly accent: "#facc15";
        readonly pattern: "vertical";
    };
    readonly EG: {
        readonly code: "EG";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#111827";
        readonly pattern: "horizontal";
    };
    readonly IR: {
        readonly code: "IR";
        readonly primary: "#16a34a";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
        readonly pattern: "horizontal";
    };
    readonly NZ: {
        readonly code: "NZ";
        readonly primary: "#111827";
        readonly secondary: "#2563eb";
        readonly accent: "#ef4444";
        readonly pattern: "canton";
    };
    readonly ES: {
        readonly code: "ES";
        readonly primary: "#dc2626";
        readonly secondary: "#facc15";
        readonly accent: "#1f2937";
        readonly pattern: "horizontal";
    };
    readonly CV: {
        readonly code: "CV";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
        readonly pattern: "hoops";
    };
    readonly SA: {
        readonly code: "SA";
        readonly primary: "#16a34a";
        readonly secondary: "#ffffff";
        readonly accent: "#0f766e";
        readonly pattern: "sash";
    };
    readonly UY: {
        readonly code: "UY";
        readonly primary: "#60a5fa";
        readonly secondary: "#ffffff";
        readonly accent: "#f6c445";
        readonly pattern: "canton";
    };
    readonly FR: {
        readonly code: "FR";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#ef4444";
        readonly pattern: "vertical";
    };
    readonly SN: {
        readonly code: "SN";
        readonly primary: "#16a34a";
        readonly secondary: "#facc15";
        readonly accent: "#dc2626";
        readonly pattern: "vertical";
    };
    readonly IQ: {
        readonly code: "IQ";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#111827";
        readonly pattern: "horizontal";
    };
    readonly NO: {
        readonly code: "NO";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#1d4ed8";
        readonly pattern: "cross";
    };
    readonly AR: {
        readonly code: "AR";
        readonly primary: "#74c6ef";
        readonly secondary: "#ffffff";
        readonly accent: "#f6c445";
        readonly pattern: "horizontal";
    };
    readonly AT: {
        readonly code: "AT";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#991b1b";
        readonly pattern: "horizontal";
    };
    readonly DZ: {
        readonly code: "DZ";
        readonly primary: "#ffffff";
        readonly secondary: "#16a34a";
        readonly accent: "#dc2626";
        readonly pattern: "vertical";
    };
    readonly JO: {
        readonly code: "JO";
        readonly primary: "#111827";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
        readonly pattern: "chevron";
    };
    readonly PT: {
        readonly code: "PT";
        readonly primary: "#b91c1c";
        readonly secondary: "#0f7a43";
        readonly accent: "#facc15";
        readonly pattern: "vertical";
    };
    readonly CO: {
        readonly code: "CO";
        readonly primary: "#facc15";
        readonly secondary: "#2563eb";
        readonly accent: "#dc2626";
        readonly pattern: "horizontal";
    };
    readonly UZ: {
        readonly code: "UZ";
        readonly primary: "#38bdf8";
        readonly secondary: "#ffffff";
        readonly accent: "#16a34a";
        readonly pattern: "horizontal";
    };
    readonly CD: {
        readonly code: "CD";
        readonly primary: "#38bdf8";
        readonly secondary: "#facc15";
        readonly accent: "#dc2626";
        readonly pattern: "sash";
    };
    readonly GB: {
        readonly code: "GB";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#1d4ed8";
        readonly pattern: "cross";
    };
    readonly HR: {
        readonly code: "HR";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#2563eb";
        readonly pattern: "quarters";
    };
    readonly GH: {
        readonly code: "GH";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#facc15";
        readonly pattern: "horizontal";
    };
    readonly PA: {
        readonly code: "PA";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#2563eb";
        readonly pattern: "quarters";
    };
};
export declare const SOCCER_TEAM_ACCESSORY_NAMES: Set<string>;
export declare function resolveSoccerCountryCode(country?: unknown): SoccerTeamCountryCode;
export declare function resolveSoccerTeamSide(side?: unknown): SoccerTeamSide;
export declare function resolveSoccerTeamKit(country?: unknown, side?: unknown): SoccerTeamKit;
export declare function isLightHex(value: string): boolean;
export declare function contrastColor(value: string): "#050916" | "#ffffff";
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
type SoccerKitPatternProps = {
    kit: SoccerTeamKit;
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function SoccerKitPattern({ kit, x, y, width, height, }: SoccerKitPatternProps): import("react/jsx-runtime").JSX.Element;
export declare function SoccerKitMotif({ kit, x, y, width, height, clipId, strokeWidth, patchScale, }: SoccerKitMotifProps): import("react/jsx-runtime").JSX.Element;
export type SoccerTeamAccessoryProps = BodyAccessoryProps & {
    country?: SoccerTeamCountryCode | string;
    side?: SoccerTeamSide;
};
export { DARK_STROKE as SOCCER_TEAM_DARK_STROKE };
