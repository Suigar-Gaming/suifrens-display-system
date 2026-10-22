import type { JSX } from 'react';
import { AnimatedAccessory } from '../../../animation/AnimatedAccessory.js';
import { assertUnreachable } from '../../../utils/assertUnreachable.js';
import { type DefaultLeftEarProps, DefaultLeftEar } from './left/DefaultLeftEar.js';
import { type MischievousLeftEarProps, MischievousLeftEar } from './left/MichievousLeftEar.js';
import { type QuietLeftEarProps, QuietLeftEar } from './left/QuietLeftEar.js';
import { type WildLeftEarProps, WildLeftEar } from './left/WildLeftEar.js';

type LeftEarProps =
	| DefaultLeftEarProps
	| WildLeftEarProps
	| MischievousLeftEarProps
	| QuietLeftEarProps;

export function LeftEar({ ...props }: LeftEarProps) {
	let content: JSX.Element;
	switch (props.earShape) {
		case 'default':
			content = <DefaultLeftEar earShape={props.earShape} fill={props.fill} />;
			break;
		case 'wild':
			content = (
				<WildLeftEar
					earShape={props.earShape}
					innerEarProps={props.innerEarProps}
					outerEarProps={props.outerEarProps}
				/>
			);
			break;
		case 'mischievous':
			content = <MischievousLeftEar earShape={props.earShape} fill={props.fill} />;
			break;
		case 'quiet':
			content = <QuietLeftEar earShape={props.earShape} fill={props.fill} />;
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
