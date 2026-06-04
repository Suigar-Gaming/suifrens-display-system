import type { BodyAccessoryProps } from "./AccessorySlot.js";
export type SoccerTeamCountryCode = "GLOBAL" | "AR" | "AU" | "BE" | "BR" | "CA" | "CL" | "CO" | "CR" | "HR" | "DK" | "EC" | "EG" | "GB" | "FR" | "DE" | "GH" | "IT" | "JP" | "KR" | "MX" | "MA" | "NL" | "NG" | "PY" | "PT" | "SA" | "SN" | "RS" | "ZA" | "ES" | "CH" | "TN" | "TR" | "UY" | "US";
export type SoccerTeamSide = "home" | "away";
export type SoccerTeamKit = {
    code: SoccerTeamCountryCode;
    primary: string;
    secondary: string;
    accent: string;
};
declare const DARK_STROKE = "#050916";
export declare const SOCCER_TEAM_KITS: {
    readonly GLOBAL: {
        readonly code: "GLOBAL";
        readonly primary: "#f8fafc";
        readonly secondary: "#0f172a";
        readonly accent: "#38bdf8";
    };
    readonly AR: {
        readonly code: "AR";
        readonly primary: "#74c6ef";
        readonly secondary: "#ffffff";
        readonly accent: "#f6c445";
    };
    readonly AU: {
        readonly code: "AU";
        readonly primary: "#f4c430";
        readonly secondary: "#0f7a43";
        readonly accent: "#ffffff";
    };
    readonly BE: {
        readonly code: "BE";
        readonly primary: "#dc2626";
        readonly secondary: "#111827";
        readonly accent: "#facc15";
    };
    readonly BR: {
        readonly code: "BR";
        readonly primary: "#f9d71c";
        readonly secondary: "#1f8f43";
        readonly accent: "#1d4ed8";
    };
    readonly CA: {
        readonly code: "CA";
        readonly primary: "#ef233c";
        readonly secondary: "#ffffff";
        readonly accent: "#111827";
    };
    readonly CL: {
        readonly code: "CL";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#2563eb";
    };
    readonly CO: {
        readonly code: "CO";
        readonly primary: "#facc15";
        readonly secondary: "#2563eb";
        readonly accent: "#dc2626";
    };
    readonly CR: {
        readonly code: "CR";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#2563eb";
    };
    readonly HR: {
        readonly code: "HR";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#2563eb";
    };
    readonly DK: {
        readonly code: "DK";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#991b1b";
    };
    readonly EC: {
        readonly code: "EC";
        readonly primary: "#facc15";
        readonly secondary: "#1d4ed8";
        readonly accent: "#dc2626";
    };
    readonly EG: {
        readonly code: "EG";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#111827";
    };
    readonly GB: {
        readonly code: "GB";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#1d4ed8";
    };
    readonly FR: {
        readonly code: "FR";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#ef4444";
    };
    readonly DE: {
        readonly code: "DE";
        readonly primary: "#ffffff";
        readonly secondary: "#111827";
        readonly accent: "#facc15";
    };
    readonly GH: {
        readonly code: "GH";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#facc15";
    };
    readonly IT: {
        readonly code: "IT";
        readonly primary: "#2563eb";
        readonly secondary: "#ffffff";
        readonly accent: "#16a34a";
    };
    readonly JP: {
        readonly code: "JP";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#ef4444";
    };
    readonly KR: {
        readonly code: "KR";
        readonly primary: "#ffffff";
        readonly secondary: "#ef4444";
        readonly accent: "#2563eb";
    };
    readonly MX: {
        readonly code: "MX";
        readonly primary: "#0f7a43";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
    };
    readonly MA: {
        readonly code: "MA";
        readonly primary: "#c1121f";
        readonly secondary: "#0f7a43";
        readonly accent: "#ffffff";
    };
    readonly NL: {
        readonly code: "NL";
        readonly primary: "#f97316";
        readonly secondary: "#111827";
        readonly accent: "#ffffff";
    };
    readonly NG: {
        readonly code: "NG";
        readonly primary: "#16a34a";
        readonly secondary: "#ffffff";
        readonly accent: "#0f766e";
    };
    readonly PY: {
        readonly code: "PY";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#2563eb";
    };
    readonly PT: {
        readonly code: "PT";
        readonly primary: "#b91c1c";
        readonly secondary: "#0f7a43";
        readonly accent: "#facc15";
    };
    readonly SA: {
        readonly code: "SA";
        readonly primary: "#16a34a";
        readonly secondary: "#ffffff";
        readonly accent: "#0f766e";
    };
    readonly SN: {
        readonly code: "SN";
        readonly primary: "#16a34a";
        readonly secondary: "#facc15";
        readonly accent: "#dc2626";
    };
    readonly RS: {
        readonly code: "RS";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#2563eb";
    };
    readonly ZA: {
        readonly code: "ZA";
        readonly primary: "#facc15";
        readonly secondary: "#16a34a";
        readonly accent: "#111827";
    };
    readonly ES: {
        readonly code: "ES";
        readonly primary: "#dc2626";
        readonly secondary: "#facc15";
        readonly accent: "#1f2937";
    };
    readonly CH: {
        readonly code: "CH";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#991b1b";
    };
    readonly TN: {
        readonly code: "TN";
        readonly primary: "#ffffff";
        readonly secondary: "#dc2626";
        readonly accent: "#991b1b";
    };
    readonly TR: {
        readonly code: "TR";
        readonly primary: "#dc2626";
        readonly secondary: "#ffffff";
        readonly accent: "#991b1b";
    };
    readonly UY: {
        readonly code: "UY";
        readonly primary: "#60a5fa";
        readonly secondary: "#ffffff";
        readonly accent: "#111827";
    };
    readonly US: {
        readonly code: "US";
        readonly primary: "#1d4ed8";
        readonly secondary: "#ffffff";
        readonly accent: "#dc2626";
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
export declare function SoccerKitMotif({ kit, x, y, width, height, clipId, strokeWidth, patchScale, }: SoccerKitMotifProps): import("react/jsx-runtime").JSX.Element;
export type SoccerTeamAccessoryProps = BodyAccessoryProps & {
    country?: SoccerTeamCountryCode | string;
    side?: SoccerTeamSide;
};
export { DARK_STROKE as SOCCER_TEAM_DARK_STROKE };
