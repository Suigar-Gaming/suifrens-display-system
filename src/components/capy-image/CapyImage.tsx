import { AccessoryMetadata } from "../../utils/accessoryUtils.js";
import { getThemeFromSkin } from "./theme.js";

import { LeftEar } from "./ears/LeftEar.js";
import { RightEar } from "./ears/RightEar.js";
import { Expression } from "./Expression.js";
import { CapyAttributes } from "./types.js";
import { BodyPattern } from "./body/BodyPattern.js";
import { Body } from "./body/Body.js";
import { LeftArm } from "./arms/left/LeftArm.js";
import { RightArm } from "./arms/right/RightArm.js";
import { LeftLeg } from "./legs/left/LeftLeg.js";
import { RightLeg } from "./legs/right/RightLeg.js";
import { Head } from "./head/Head.js";
import { HeadPattern } from "./head/HeadPattern.js";
import { Nostrils } from "./Nostrils.js";
import { LeftLegPattern } from "./legs/left/LeftLegPattern.js";
import { RightLegPattern } from "./legs/right/RightLegPattern.js";
import { LeftArmPattern } from "./arms/left/LeftArmPattern.js";
import { RightArmPattern } from "./arms/right/RightArmPattern.js";
import { Accessory } from "../accessories/index.js";

export type CapyImageProps = {
  attributes: CapyAttributes;
  accessoriesByType?: Record<string, AccessoryMetadata>;
  incognito?: boolean;
};

export function CapyImage({
  attributes,
  accessoriesByType,
  incognito = false,
}: CapyImageProps) {
  const { mainColor, secondaryColor, skin, earShape, expression } = attributes;
  const colorTheme = getThemeFromSkin(
    skin,
    `#${mainColor}`,
    `#${secondaryColor}`,
    incognito
  );
  const headAccessory = accessoriesByType?.head;
  const showEars = !headAccessory || headAccessory.renderOptions.showEars;

  return (
    <>
      {accessoriesByType?.back?.category === "wings" && (
        <Accessory
          accessory={accessoriesByType.back}
          species="capy"
          lor="left"
        />
      )}

      <RightArm
        fill={colorTheme.arms}
        handProps={{ fill: colorTheme.appendages }}
      />
      {!incognito && <RightArmPattern skin={skin} fill={colorTheme.patterns} />}
      {accessoriesByType?.back?.category === "wings" && (
        <Accessory
          accessory={accessoriesByType.back}
          species="capy"
          lor="right"
        />
      )}
      {accessoriesByType?.torso && (
        <Accessory
          accessory={accessoriesByType.torso}
          species="capy"
          lor="left"
        />
      )}
      {accessoriesByType?.body && (
        <Accessory
          accessory={accessoriesByType.body}
          species="capy"
          lor="left"
        />
      )}

      <RightLeg
        fill={colorTheme.legs}
        footProps={{ fill: colorTheme.appendages }}
      />
      {!incognito && <RightLegPattern skin={skin} fill={colorTheme.patterns} />}

      <Body fill={colorTheme.body} />
      {!incognito && skin && (
        <BodyPattern skin={skin} fill={colorTheme.patterns} />
      )}
      {accessoriesByType?.back &&
        accessoriesByType?.back?.category !== "wings" && (
          <Accessory accessory={accessoriesByType.back} species="capy" />
        )}
      {accessoriesByType?.legs && (
        <Accessory accessory={accessoriesByType.legs} species="capy" body />
      )}
      {accessoriesByType?.torso && (
        <Accessory accessory={accessoriesByType.torso} species="capy" body />
      )}

      <LeftLeg
        fill={colorTheme.legs}
        footProps={{ fill: colorTheme.appendages }}
      />
      {!incognito && <LeftLegPattern skin={skin} fill={colorTheme.patterns} />}

      {accessoriesByType?.feet && (
        <Accessory accessory={accessoriesByType.feet} species="capy" />
      )}
      {accessoriesByType?.legs && (
        <Accessory accessory={accessoriesByType.legs} species="capy" />
      )}
      {accessoriesByType?.body && (
        <Accessory accessory={accessoriesByType.body} species="capy" body />
      )}
      {accessoriesByType?.object && (
        <Accessory accessory={accessoriesByType.object} species="capy" />
      )}

      <LeftArm
        fill={colorTheme.arms}
        handProps={{ fill: colorTheme.appendages }}
      />
      {!incognito && <LeftArmPattern skin={skin} fill={colorTheme.patterns} />}

      {accessoriesByType?.torso && (
        <Accessory
          accessory={accessoriesByType.torso}
          species="capy"
          lor="right"
        />
      )}

      {accessoriesByType?.body && (
        <Accessory
          accessory={accessoriesByType.body}
          species="capy"
          lor="right"
        />
      )}

      {showEars && (
        <RightEar
          earShape={earShape}
          outerEarProps={{ fill: colorTheme.outerEars }}
          innerEarProps={{ fill: colorTheme.innerEars }}
          fill={colorTheme.outerEars}
        />
      )}

      <Head fill={colorTheme.head} />
      <HeadPattern
        skin={skin}
        fill={colorTheme.patterns}
        noseProps={{ fill: colorTheme.nose }}
      />
      {!incognito && <Nostrils />}

      {showEars && (
        <LeftEar
          earShape={earShape}
          outerEarProps={{ fill: colorTheme.outerEars }}
          innerEarProps={{ fill: colorTheme.innerEars }}
          fill={colorTheme.outerEars}
        />
      )}

      {!incognito && <Expression expression={expression} />}
      {accessoriesByType?.head && (
        <Accessory accessory={accessoriesByType.head} species="capy" />
      )}
      {accessoriesByType?.eyes && (
        <Accessory accessory={accessoriesByType.eyes} species="capy" />
      )}
    </>
  );
}
