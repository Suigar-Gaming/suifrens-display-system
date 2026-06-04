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
import { AccessorySlot } from "../accessories/AccessorySlot.js";

export type CapyImageProps = {
  attributes: CapyAttributes;
  accessoriesByType?: Record<string, AccessoryMetadata>;
  detail?: "full" | "head";
  incognito?: boolean;
};

export function CapyImage({
  attributes,
  accessoriesByType,
  detail = "full",
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

  if (detail === "head") {
    return (
      <>
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
          <AccessorySlot accessory={accessoriesByType.head} species="capy" />
        )}
        {accessoriesByType?.eyes && (
          <AccessorySlot accessory={accessoriesByType.eyes} species="capy" />
        )}
      </>
    );
  }

  return (
    <>
      {accessoriesByType?.back?.category === "wings" && (
        <AccessorySlot
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
        <AccessorySlot
          accessory={accessoriesByType.back}
          species="capy"
          lor="right"
        />
      )}
      {accessoriesByType?.torso && (
        <AccessorySlot
          accessory={accessoriesByType.torso}
          species="capy"
          lor="left"
        />
      )}
      {accessoriesByType?.body && (
        <AccessorySlot
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
          <AccessorySlot accessory={accessoriesByType.back} species="capy" />
        )}
      {accessoriesByType?.legs && (
        <AccessorySlot accessory={accessoriesByType.legs} species="capy" body />
      )}
      {accessoriesByType?.torso && (
        <AccessorySlot
          accessory={accessoriesByType.torso}
          species="capy"
          body
        />
      )}

      <LeftLeg
        fill={colorTheme.legs}
        footProps={{ fill: colorTheme.appendages }}
      />
      {!incognito && <LeftLegPattern skin={skin} fill={colorTheme.patterns} />}

      {accessoriesByType?.rightFeet && (
        <AccessorySlot accessory={accessoriesByType.rightFeet} species="capy" />
      )}
      {accessoriesByType?.leftFeet && (
        <AccessorySlot accessory={accessoriesByType.leftFeet} species="capy" />
      )}
      {!accessoriesByType?.rightFeet &&
        !accessoriesByType?.leftFeet &&
        accessoriesByType?.feet && (
          <AccessorySlot accessory={accessoriesByType.feet} species="capy" />
        )}
      {accessoriesByType?.legs && (
        <AccessorySlot accessory={accessoriesByType.legs} species="capy" />
      )}
      {accessoriesByType?.body && (
        <AccessorySlot accessory={accessoriesByType.body} species="capy" body />
      )}
      {accessoriesByType?.object && (
        <AccessorySlot accessory={accessoriesByType.object} species="capy" />
      )}

      <LeftArm
        fill={colorTheme.arms}
        handProps={{ fill: colorTheme.appendages }}
      />
      {!incognito && <LeftArmPattern skin={skin} fill={colorTheme.patterns} />}

      {accessoriesByType?.torso && (
        <AccessorySlot
          accessory={accessoriesByType.torso}
          species="capy"
          lor="right"
        />
      )}

      {accessoriesByType?.body && (
        <AccessorySlot
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
        <AccessorySlot accessory={accessoriesByType.head} species="capy" />
      )}
      {accessoriesByType?.eyes && (
        <AccessorySlot accessory={accessoriesByType.eyes} species="capy" />
      )}
    </>
  );
}
