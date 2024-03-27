import { type SVGProps, type ComponentType } from "react";

import { type BullsharkSkin } from "../types.js";
import { DalmationTailPattern } from "./patterns/DalmationTailPattern.js";

type TailPatternProps = {
  skin: BullsharkSkin;
} & SVGProps<SVGGElement>;

const tailPatternComponents: Record<BullsharkSkin, ComponentType | null> = {
  basic: null,
  cheetah: null,
  fox: null,
  panda: null,
  stripes: null,
  lizard: null,
  snake: null,
  dalmation: DalmationTailPattern,
};

export function TailPattern({ skin, ...svgProps }: TailPatternProps) {
  const TailPatternContent = tailPatternComponents[skin];
  return (
    <g transform="matrix( 2.9166107177734375, 0, 0, 2.9166107177734375, 468.15,1761.65) ">
      <g transform="matrix( 1, 0, 0, 1, 0,0) ">
        {TailPatternContent && (
          <g {...svgProps}>
            <TailPatternContent />
          </g>
        )}
        <path d="M212.3,206.8c-0.8,0-1.5-0.2-2.2-0.5c-1.7-0.8-3.8-1.8-6.2-2.7h-0.1c-14.9-6.3-27.2-11.7-36.7-15.9 c-11.6-5.2-22.9-12.1-33.6-20.5c-7.3-5.8-15.5-13.4-24.4-22.6c-5.8-6-11.4-12.6-16.5-19.5l-0.1-0.1c-5.1-7.3-8.7-12.6-10.7-15.6 c-3.4-4.8-6.3-8.3-8.7-10.4c-2.9-2.6-6.1-4.3-9.7-5.3c-9.7-2.6-21.1-1.9-34,2.1c-6.4,2.3-11,3.8-13.6,4.7 c-5.2,1.7-8.7,2.2-11.4,1.6c-0.1,0-0.1,0-0.2,0C1,100.7-3.1,98-4.6,90.2c-1-4.9,0.2-11.8,3.9-21.8c0-0.1,0.1-0.2,0.1-0.3 c7.7-17,18.3-28.4,31.4-33.8c11.8-4.9,25.7-5,41.4-0.4c1.7-5.3,4.5-10.5,8.4-15.3l0,0C85.2,12.9,91,7.9,97.6,4 c6.8-4,14-6.7,21.6-8.1c8-1.4,15.7-1.1,23,0.8c6.4,1.7,11.9,4.3,16.3,7.6c7.9,6.2,8.2,12.4,7.1,16.6c-1,3.5-3.8,6.7-8.8,9.8 c-0.1,0.1-0.2,0.1-0.4,0.2c-5.2,2.7-9.4,4.8-12.4,6.5l0,0c-5.1,2.8-9.2,5.7-12.1,8.7c-3.8,3.8-6.3,8.1-7.7,13 c-0.4,1.4-0.7,2.5-0.9,3.6c3.7,2.9,7.7,5.7,11.9,8.5c15.7,10.3,32.2,17.8,49,22.3c12.2,3.3,25,5.1,37.9,5.6 c3.2,0.1,7.2,0.2,12,0.2c5.4-0.2,6.7,0,7.5,0.2h0.1c2.9,0.8,5.5,3.1,7.8,6.9c2,3.2,3.6,7.2,4.7,11.8c2.8,11,2.7,22.4-0.3,33.8 c-3.3,12.2-8.4,23-15.3,31.9c-5,6.5-11.3,12.8-18.9,18.6c-1.5,1.1-3,2.2-4.5,3.3C214.4,206.5,213.4,206.8,212.3,206.8z  M207.7,194.3c1.5,0.6,2.8,1.2,4.1,1.7c0.6-0.5,1.3-0.9,1.9-1.4c6.8-5.3,12.6-10.9,17-16.7c6-7.9,10.6-17.5,13.5-28.4 c2.6-9.7,2.7-19.4,0.3-28.8l0,0c-0.9-3.6-2.1-6.6-3.6-9c0,0,0-0.1-0.1-0.1c-0.9-1.5-1.5-2.2-1.8-2.4c-0.6,0-1.9-0.1-4.8,0h-0.1 c-4.9,0-9.1-0.1-12.5-0.2c-13.7-0.5-27.2-2.5-40.1-6c-17.8-4.8-35.3-12.7-51.9-23.6c-5.4-3.6-10.5-7.3-15.2-11 c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.1-0.2-0.2c-4.8-4-6.4-5.7-7.1-6.7c-1.7-2.2-1.3-5.3,0.9-7c2.2-1.7,5.3-1.3,7,0.9 c0,0.1,0.1,0.1,0.2,0.2c1.8-6.1,5.2-11.7,9.9-16.4c3.6-3.6,8.4-7,14.3-10.3c3-1.7,7.3-3.9,12.5-6.6c3.8-2.4,4.2-3.7,4.2-3.8 c0.2-0.7,0.7-2.7-3.6-6.1c-3.3-2.5-7.5-4.5-12.7-5.9l0,0c-5.8-1.6-12.1-1.8-18.7-0.7c-6.3,1.1-12.5,3.4-18.2,6.8 C97,15.9,92.2,20,88.4,24.8c-3.2,4-5.4,8.2-6.8,12.4c2.1,0.8,4.2,1.7,6.4,2.7c2.5,1.1,3.6,4.1,2.5,6.6s-4.1,3.6-6.6,2.5 c-3.4-1.6-6.7-2.9-9.9-4l0,0c-15.4-5.5-28.6-6-39.3-1.5S15.2,57.6,8.6,72.1C4.8,82.3,4.8,86.6,5.1,88.2c0.4,2.2,1.1,3.4,1.6,3.6 c0.4,0,2-0.1,5.9-1.3c2.6-0.8,7.1-2.4,13.5-4.6c0.1,0,0.1,0,0.2-0.1c14.7-4.6,28-5.3,39.6-2.2c5.2,1.4,9.8,4,13.8,7.6 c3,2.7,6.3,6.7,10.2,12.1c0,0,0,0.1,0.1,0.1c2,3,5.6,8.2,10.7,15.6c4.9,6.6,10.2,12.8,15.6,18.5c8.6,8.9,16.5,16.2,23.5,21.8 c10,7.9,20.6,14.4,31.5,19.2C180.6,182.7,192.9,188,207.7,194.3z M238.9,109.2L238.9,109.2L238.9,109.2z" />
      </g>
    </g>
  );
}
