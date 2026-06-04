import type { SoccerTeamAccessoryProps } from "../soccerTeamKit.js";
import {
  SOCCER_TEAM_DARK_STROKE,
  SoccerKitMotif,
  contrastColor,
  resolveSoccerTeamKit,
} from "../soccerTeamKit.js";
import { useId } from "react";

const SHIRT_SLEEVE_PATH =
  "M15.6,43.5c-.7,1.9-1.4,3.7-2,5.6c25.3,1.4,47.2,7.3,65.9,17.8c4.5-12.3,12.4-25.5,23.6-39.7L49.7,0C33.7,10.8,22.4,25.3,15.6,43.5z";

const SHIRT_SLEEVE_OUTLINE =
  "M79.6,71.9c.6,0,1.2-.1,1.7-.3c1.4-.5,2.5-1.6,3-3c4.3-11.7,12-24.6,22.8-38.4c1.7-2.2,1.3-5.3-.8-7c-2.2-1.7-5.3-1.3-7,.8C89.3,36.7,81.9,48.7,77,59.9c-16.5-8.3-35.4-13.5-56.5-15.4c6.4-16.8,17.2-30.3,32-40.4c2.3-1.5,2.9-4.7,1.3-6.9c-1.5-2.3-4.7-2.9-6.9-1.3C30.1,7.2,18,22.7,10.9,41.7c-.7,1.9-1.4,3.8-2,5.7c-.5,1.5-.3,3.1,.6,4.4c.9,1.3,2.3,2.1,3.9,2.2c24.4,1.3,45.8,7.2,63.8,17.2C77.9,71.7,78.7,71.9,79.6,71.9z";

const SHIRT_BODY_PATH =
  "M251.1,46.7c-1.5-1.5-3-3-4.5-4.5c-6.2-6-13.1-11.5-20.6-16.5c-6.6-4.4-13.6-8.4-21.1-11.9C193.7,8.4,182,4.5,169.7,2.2c-1.4-.3-2.8-.5-4.2-.7c-2.9-.4-5.7-.8-8.6-1.1c-.2,0-.5-.1-.8-.1c-.7,0-1.4-.1-2.1-.1l-2.7-.1c-.2,0-.4,0-.6,0h-1.4c-.3,0-.7,0-1,0H145c-.3,0-.7,0-1.1,0c0,0-.1,0-.1,0h-1.2c-.4,0-.8,0-1.1,0c-1.1,0-2.1,.1-3.2,.1c-.4,0-.8,.1-1.2,.1c-1.5,.1-3,.3-4.4,.5c-2.5,.3-5,.7-7.4,1.1c-1.6,.3-3.2,.6-4.8,.9c-11.1,2.3-21.8,6-32.1,10.9C44.2,34.9,16.9,69,6.4,115.9c-3,20.3-4.9,40.2-5.9,59.6c-.2,3.5-.3,7.1-.4,10.6c-.1,7.8,.3,15.1,1.3,22c.1,1.1,.3,2.1,.5,3.2c106.9,25.4,202.9,27.8,288.2,7.3c1.5-8.2,2.3-14,2.6-17.5c.4-4.8,.6-9.8,.5-15c-.8-22.8-2.9-46.2-6.4-70.2c-2.8-12.3-6.7-23.8-11.8-34.3c-.5-1.1-1.1-2.1-1.6-3.2c-.7-1.3-1.4-2.6-2.1-3.9c-.7-1.3-1.4-2.6-2.2-3.8c-1.6-2.7-3.3-5.3-5.1-7.9c-2.9-4.1-6-8.1-9.2-11.9C253.6,49.5,252.4,48.1,251.1,46.7z";

const SHIRT_BODY_OUTLINE =
  "M6.3,207.2c51.7,12.1,101.4,18.8,147.9,20c46.2,1.2,90.4-3.1,131.6-12.6c1.1-6.3,1.8-11,2-13.9c.4-4.6,.6-9.5,.5-14.4c-.8-22.4-2.9-45.8-6.3-69.4c-2.7-11.8-6.5-22.9-11.3-33c-.5-1-1-2.1-1.5-3.1l-2-3.8c-.7-1.2-1.4-2.4-2.1-3.6c-1.5-2.6-3.2-5.2-4.9-7.7c-2.7-4-5.7-7.8-8.9-11.5c-1.2-1.4-2.5-2.8-3.7-4.1c-1.4-1.5-2.9-2.9-4.3-4.3c-6-5.8-12.7-11.1-19.9-15.9c-6.3-4.2-13.2-8.1-20.5-11.6c-10.8-5.2-22.2-8.9-34-11.1c-1.4-.3-2.7-.5-4.1-.7c-2.8-.4-5.5-.8-8.3-1.1c-.7,0-1.3-.1-1.9-.1L151.1,5c-.2,0-.3,0-.5,0h-8c-.2,0-.4,0-.6,0l-3.1,.1c-.3,0-.7,.1-1.1,.1c-1.4,.1-2.8,.3-4.1,.5c-2.4,.3-4.8,.7-7.1,1.1c-1.5,.2-3,.5-4.5,.9c-10.7,2.2-21.1,5.8-31,10.5c-21.3,10.2-38.7,23.7-51.8,40c-13.1,16.3-22.3,36-27.3,58.6c-2.9,20-4.9,39.8-5.9,58.9c-.2,3.5-.3,7-.4,10.4C4.9,193.6,5.3,200.7,6.3,207.2z";

function svgId(prefix: string, id: string) {
  return `${prefix}-${id.replace(/:/g, "")}`;
}

function renderSleeve(country: unknown, side: unknown, idPrefix: string) {
  const kit = resolveSoccerTeamKit(country, side);
  const stripeColor = contrastColor(kit.primary);
  const clipId = svgId(idPrefix, `shirt-sleeve-${kit.code}`);

  return (
    <g>
      <clipPath id={clipId}>
        <path d={SHIRT_SLEEVE_PATH} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d={SHIRT_SLEEVE_PATH} fill={kit.primary} />
        <path
          d="M27 11 L96 45 L88 62 L17 27Z"
          fill={kit.secondary}
          opacity="0.95"
        />
        <path
          d="M13 45 C35 46 58 52 80 64"
          fill="none"
          stroke={kit.accent}
          strokeLinecap="round"
          strokeWidth="8"
        />
      </g>
      <path
        d={SHIRT_SLEEVE_OUTLINE}
        fill="none"
        stroke={SOCCER_TEAM_DARK_STROKE}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M29 18 L86 46"
        fill="none"
        stroke={stripeColor}
        strokeLinecap="round"
        strokeWidth="4"
        opacity="0.72"
      />
    </g>
  );
}

function renderBody(country: unknown, side: unknown, idPrefix: string) {
  const kit = resolveSoccerTeamKit(country, side);
  const clipId = svgId(idPrefix, `shirt-body-${kit.code}`);

  return (
    <g>
      <clipPath id={clipId}>
        <path d={SHIRT_BODY_PATH} />
      </clipPath>
      <SoccerKitMotif
        kit={kit}
        x={0}
        y={0}
        width={294}
        height={224}
        clipId={clipId}
        strokeWidth={5}
        patchScale={1.24}
      />
      <path
        d="M103 8 C119 -2 176 -3 205 13 L184 45 C161 31 133 31 111 45Z"
        fill={kit.secondary}
        stroke={SOCCER_TEAM_DARK_STROKE}
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M118 34 C142 48 166 48 183 34"
        fill="none"
        stroke={kit.accent}
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d={SHIRT_BODY_OUTLINE}
        fill="none"
        stroke={SOCCER_TEAM_DARK_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </g>
  );
}

export function SoccerTeamShirt(props: SoccerTeamAccessoryProps) {
  const idPrefix = svgId("soccer-team-shirt", useId());

  return (
    <svg
      version="1.1"
      id="shirt_x5F_soccerteam"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 3000 3000"
      xmlSpace="preserve"
    >
      {props.lor === "left" ? (
        <g
          id="shirt_x5F_soccerteam_x5F_backarm"
          transform="matrix(-2.9166107177734375, 0, 0, 2.9166107177734375, 1880.95,1719.3)"
        >
          {renderSleeve(props.country, props.side, idPrefix)}
        </g>
      ) : props.body ? (
        <g
          id="shirt_x5F_soccerteam_x5F_body"
          transform="matrix(2.9166107177734375, 0, 0, 2.9166107177734375, 956.65,1516.1)"
        >
          {renderBody(props.country, props.side, idPrefix)}
        </g>
      ) : props.lor === "right" ? (
        <g
          id="shirt_x5F_soccerteam_x5F_frontarm"
          transform="matrix(2.9166107177734375, 0, 0, 2.9166107177734375, 1002.9,1719.3)"
        >
          {renderSleeve(props.country, props.side, idPrefix)}
        </g>
      ) : null}
    </svg>
  );
}
