import { type Meta, type StoryObj } from "@storybook/react";
import { accessories } from "../constants/accessories.js";
import {
  SOCCER_TEAM_KITS,
  type SoccerTeamCountryCode,
} from "./accessories/soccerTeamKit.js";
import { SuiFrenImage } from "./SuiFrenImage.js";
import { SuiFrenImageAssets } from "./SuiFrenImageAssets.js";

const capyAttributes = {
  mainColor: "6FBBEE",
  secondaryColor: "E6FBFF",
  skin: "basic",
  earShape: "default",
  expression: "happy",
} as const;

const bullsharkAttributes = {
  mainColor: "6FBBEE",
  secondaryColor: "E6FBFF",
  skin: "basic",
  finStyle: "classic",
  expression: "happy",
} as const;

const teamShirt = accessories.find(
  (accessory) => accessory.name === "soccer team shirt"
)!;
const teamTrunks = accessories.find(
  (accessory) => accessory.name === "soccer team swim trunks"
)!;
const gothBoots = accessories.find((accessory) => accessory.name === "goth boots")!;

const countries = Object.keys(SOCCER_TEAM_KITS).filter(
  (code) => code !== "GLOBAL"
) as SoccerTeamCountryCode[];

function buildTeamGear(country: SoccerTeamCountryCode, side = "home" as const) {
  return [
    {
      ...teamShirt,
      renderOptions: { ...teamShirt.renderOptions, country, side },
    },
    {
      ...teamTrunks,
      renderOptions: { ...teamTrunks.renderOptions, country, side },
    },
    gothBoots,
  ];
}

const meta = {
  title: "SuiFrenImage/Soccer Team Gear",
  component: SuiFrenImage,
  tags: ["autodocs"],
} satisfies Meta<typeof SuiFrenImage>;

export default meta;

type Story = StoryObj<typeof SuiFrenImage>;

export const AllCountries: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 bg-slate-100 p-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
      {countries.map((country) => (
        <div
          key={country}
          className="rounded-xl border border-slate-300 bg-white p-2 shadow-sm"
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-black text-slate-900">{country}</span>
            <span className="text-[10px] font-bold uppercase text-slate-500">
              Inline
            </span>
          </div>
          <div className="h-36">
            <SuiFrenImage
              attributes={capyAttributes}
              accessories={buildTeamGear(country)}
              shadow
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const InlineAndAssetRenderers: Story = {
  render: () => {
    const showcaseCountries: SoccerTeamCountryCode[] = [
      "AR",
      "BR",
      "FR",
      "GB",
      "JP",
      "MX",
      "US",
    ];

    return (
      <div className="grid grid-cols-1 gap-4 bg-slate-100 p-4 md:grid-cols-2">
        {showcaseCountries.map((country) => (
          <div key={country} className="rounded-xl border border-slate-300 bg-white p-3">
            <h2 className="mb-2 text-sm font-black text-slate-900">{country}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-56">
                <SuiFrenImage
                  attributes={capyAttributes}
                  accessories={buildTeamGear(country)}
                  shadow
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="h-56">
                <SuiFrenImageAssets
                  attributes={bullsharkAttributes}
                  accessories={buildTeamGear(country, "away")}
                  shadow
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
