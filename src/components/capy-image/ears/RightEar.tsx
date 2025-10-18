import { AnimatedAccessory } from "../../../animation/AnimatedAccessory.js";
import { assertUnreachable } from "../../../utils/assertUnreachable.js";
import {
  DefaultRightEar,
  DefaultRightEarProps,
} from "./right/DefaultRightEar.js";
import {
  MischievousRightEar,
  MischievousRightEarProps,
} from "./right/MichievousRightEar.js";
import { QuietRightEar, QuietRightEarProps } from "./right/QuietRightEar.js";
import { WildRightEar, WildRightEarProps } from "./right/WildRightEar.js";

type RightEarProps =
  | DefaultRightEarProps
  | WildRightEarProps
  | MischievousRightEarProps
  | QuietRightEarProps;

export function RightEar({ ...props }: RightEarProps) {
  let content: JSX.Element;
  switch (props.earShape) {
    case "default":
      content = <DefaultRightEar earShape={props.earShape} fill={props.fill} />;
      break;
    case "wild":
      content = (
        <WildRightEar
          earShape={props.earShape}
          innerEarProps={props.innerEarProps}
          outerEarProps={props.outerEarProps}
        />
      );
      break;
    case "mischievous":
      content = (
        <MischievousRightEar earShape={props.earShape} fill={props.fill} />
      );
      break;
    case "quiet":
      content = <QuietRightEar earShape={props.earShape} fill={props.fill} />;
      break;
    default:
      assertUnreachable(props);
  }
  return (
    <AnimatedAccessory fallbackPart="head">
      <g>{content}</g>
    </AnimatedAccessory>
  );
}
