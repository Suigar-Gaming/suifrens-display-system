import { AnimatedAccessory } from "../../animation/AnimatedAccessory.js";
import { accessories } from "../../constants/accessories.js";
import type { AnimationPart } from "../../animation/parts.js";
import { Apron } from "./body/Apron.js";
import { Cardigan } from "./body/Cardigan.js";
import { LeatherJacket } from "./body/LeatherJacket.js";
import { Vest } from "./body/Vest.js";
import { BlueSlipons } from "./feet/BlueSlipons.js";
import { Boots } from "./feet/Boots.js";
import { CasualShoes } from "./feet/CasualShoes.js";
import { DressShoes } from "./feet/DressShoes.js";
import { PinkSlipons } from "./feet/PinkSlipons.js";
import { Sneakers } from "./feet/Sneakers.js";
import { BaseballCap } from "./head/BaseballCap.js";
import { Beanie } from "./head/Beanie.js";
import { Beret } from "./head/Beret.js";
import { BowlerHat } from "./head/BowlerHat.js";
import { CowboyHat } from "./head/CowboyHat.js";
import { HairBow } from "./head/HairBow.js";
import { Halo } from "./head/Halo.js";
import { SantaHat } from "./head/SantaHat.js";
import { Snorkel } from "./head/Snorkel.js";
import { BellBottoms } from "./legs/BellBottoms.js";
import { BlueJeans } from "./legs/BlueJeans.js";
import { BusinessSlacks } from "./legs/BusinessSlacks.js";
import { Cutoffs } from "./legs/Cutoffs.js";
import { SwimTrunks } from "./legs/SwimTrunks.js";
import { WhitePants } from "./legs/WhitePants.js";
import { Brush } from "./objects/Brush.js";
import { Lasso } from "./objects/Lasso.js";
import { Palette } from "./objects/Palette.js";
import { Pencil } from "./objects/Pencil.js";
import { BussinessShirt } from "./torso/BusinessShirt.js";
import { CowboyShirt } from "./torso/CowboyShirt.js";
import { HeartShirt } from "./torso/HeartShirt.js";
import { Lifeguard } from "./torso/Lifeguard.js";
import { SkullShirt } from "./torso/SkullShirt.js";
import { StripeShirt } from "./torso/StripeShirt.js";
import { Swimsuit } from "./torso/Swimsuit.js";
import { PunkSkirt } from "./legs/PunkSkirt.js";
import { RockStarRuffle } from "./legs/RockStarRuffle.js";
import { SuperHeroStars } from "./legs/SuperHeroStars.js";
import { MagicWand } from "./objects/MagicWand.js";
import { Microphone } from "./objects/Microphone.js";
import { GothBoots } from "./feet/GothBoots.js";
import { RockStarBoots } from "./feet/RockStarBoots.js";
import { WitchBoots } from "./feet/WitchBoots.js";
import { SuperHeroCape } from "./back/SuperHeroCape.js";
import { WizardRobe } from "./body/WizardRobe.js";
import { BlondeWig } from "./head/BlondeWig.js";
import { CurlyWig } from "./head/CurlyWig.js";
import { Mohawk } from "./head/Mohawk.js";
import { WizardHat } from "./head/WizardHat.js";
import { Glasses8Bit } from "./eyes/Glasses8Bit.js";
import { SuperHeroMask } from "./eyes/SuperHeroMask.js";
import { XRGoggles } from "./head/XRGoggles.js";
import { GlassesY2K } from "./eyes/GlassesY2k.js";
import { Wings } from "./back/Wings.js";
import { SaddleShoes } from "./feet/SaddleShoes.js";

const ACCESSORY_TYPE_BY_NAME = new Map(
  accessories.map((item) => [item.name, item.type])
);

const TYPE_FALLBACK: Partial<Record<string, AnimationPart>> = {
  head: "head",
  eyes: "head",
  body: "body",
  torso: "body",
  back: "body",
  object: "leftArm",
};

const NAME_SPECIFIC_FALLBACK: Partial<Record<string, AnimationPart>> = {
  wings: "body",
  "superhero cape": "body",
};

function resolveFallbackPart(name: string): AnimationPart | undefined {
  const specific = NAME_SPECIFIC_FALLBACK[name];
  if (specific) {
    return specific;
  }
  const type = ACCESSORY_TYPE_BY_NAME.get(name);
  if (!type) {
    return undefined;
  }
  return TYPE_FALLBACK[type];
}

export type BodyAccessoryProps = {
  lor?: "left" | "right";
  body?: boolean;
};

type AccessoryProps = BodyAccessoryProps & {
  accessory: string;
};

export function Accessory(props: AccessoryProps) {
  const fallbackPart = resolveFallbackPart(props.accessory);
  return (
    <>
      {props.accessory === "baseball cap" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BaseballCap />
        </AnimatedAccessory>
      )}
      {props.accessory === "beanie" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Beanie />
        </AnimatedAccessory>
      )}
      {props.accessory === "beret" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Beret />
        </AnimatedAccessory>
      )}
      {props.accessory === "blonde wig" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BlondeWig />
        </AnimatedAccessory>
      )}
      {props.accessory === "curly wig" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <CurlyWig />
        </AnimatedAccessory>
      )}
      {props.accessory === "mohawk" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Mohawk />
        </AnimatedAccessory>
      )}
      {props.accessory === "bowler hat" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BowlerHat />
        </AnimatedAccessory>
      )}
      {props.accessory === "cowboy hat" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <CowboyHat />
        </AnimatedAccessory>
      )}
      {props.accessory === "saddle shoes" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SaddleShoes />
        </AnimatedAccessory>
      )}
      {props.accessory === "hair bow" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <HairBow />
        </AnimatedAccessory>
      )}
      {props.accessory === "halo" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Halo />
        </AnimatedAccessory>
      )}
      {props.accessory === "santa hat" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SantaHat />
        </AnimatedAccessory>
      )}
      {props.accessory === "wizard hat" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <WizardHat />
        </AnimatedAccessory>
      )}
      {props.accessory === "snorkel" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Snorkel />
        </AnimatedAccessory>
      )}
      {props.accessory === "8 bit glasses" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Glasses8Bit />
        </AnimatedAccessory>
      )}
      {props.accessory === "superhero mask" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SuperHeroMask />
        </AnimatedAccessory>
      )}
      {props.accessory === "xr goggles" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <XRGoggles />
        </AnimatedAccessory>
      )}
      {props.accessory === "bug eyes" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <GlassesY2K />
        </AnimatedAccessory>
      )}
      {props.accessory === "apron" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Apron body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "wings" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Wings lor={props.lor} />
        </AnimatedAccessory>
      )}
      {props.accessory === "cardigan" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Cardigan lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "leather jacket" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <LeatherJacket lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "superhero cape" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SuperHeroCape />
        </AnimatedAccessory>
      )}
      {props.accessory === "wizard robe" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <WizardRobe lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "vest" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Vest body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "white pants" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <WhitePants />
        </AnimatedAccessory>
      )}
      {props.accessory === "punk skirt" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <PunkSkirt />
        </AnimatedAccessory>
      )}
      {props.accessory === "rock star ruffle" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <RockStarRuffle />
        </AnimatedAccessory>
      )}
      {props.accessory === "superhero stars" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SuperHeroStars />
        </AnimatedAccessory>
      )}
      {props.accessory === "bell bottoms" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BellBottoms />
        </AnimatedAccessory>
      )}
      {props.accessory === "blue jeans" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BlueJeans />
        </AnimatedAccessory>
      )}
      {props.accessory === "business slacks" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BusinessSlacks />
        </AnimatedAccessory>
      )}
      {props.accessory === "cutoffs" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Cutoffs />
        </AnimatedAccessory>
      )}
      {props.accessory === "swim trunks" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SwimTrunks />
        </AnimatedAccessory>
      )}
      {props.accessory === "palette" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Palette />
        </AnimatedAccessory>
      )}
      {props.accessory === "brush" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Brush />
        </AnimatedAccessory>
      )}
      {props.accessory === "lasso" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Lasso />
        </AnimatedAccessory>
      )}
      {props.accessory === "pencil" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Pencil />
        </AnimatedAccessory>
      )}
      {props.accessory === "magic wand" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <MagicWand />
        </AnimatedAccessory>
      )}
      {props.accessory === "microphone" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Microphone />
        </AnimatedAccessory>
      )}
      {props.accessory === "business shirt" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BussinessShirt lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "cowboy shirt" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <CowboyShirt lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "swimsuit" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Swimsuit body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "heart shirt" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <HeartShirt lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "lifeguard" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Lifeguard lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "skull shirt" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <SkullShirt lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "stripe shirt" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <StripeShirt lor={props.lor} body={props.body} />
        </AnimatedAccessory>
      )}
      {props.accessory === "blue slip ons" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <BlueSlipons />
        </AnimatedAccessory>
      )}
      {props.accessory === "boots" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Boots />
        </AnimatedAccessory>
      )}
      {props.accessory === "casual shoes" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <CasualShoes />
        </AnimatedAccessory>
      )}
      {props.accessory === "dress shoes" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <DressShoes />
        </AnimatedAccessory>
      )}
      {props.accessory === "pink slip ons" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <PinkSlipons />
        </AnimatedAccessory>
      )}
      {props.accessory === "sneakers" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <Sneakers />
        </AnimatedAccessory>
      )}
      {props.accessory === "goth boots" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <GothBoots />
        </AnimatedAccessory>
      )}
      {props.accessory === "rock star boots" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <RockStarBoots />
        </AnimatedAccessory>
      )}
      {props.accessory === "witch boots" && (
        <AnimatedAccessory fallbackPart={fallbackPart}>
          <WitchBoots />
        </AnimatedAccessory>
      )}
    </>
  );
}
