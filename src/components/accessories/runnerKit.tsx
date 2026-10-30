import { useId } from 'react';
import type { AccessoryMetadata, SuiFrenSpecies } from '../../utils/accessoryUtils.js';
import type { AccessoryRendererProps } from './AccessorySlot.js';
import { RUNNER_BODY_CONTOUR, RUNNER_FOOT_CONTOUR } from './runnerKitGeometry.js';

export type RunnerKitOptions = { color?: string; number?: number; mirrorBib?: boolean };
export const RUNNER_ACCESSORY_NAMES = new Set([
	'runner singlet',
	'runner shorts',
	'runner headband',
	'runner shoes',
]);
const INK = '#000000';
const SHORTS = '#30465d';
const BODY = 'matrix(2.9166107177734375, 0, 0, 2.9166107177734375, 956.65,1516.1)';
const HEAD = 'matrix(2.9166107177734375, 0, 0, 2.9166107177734375, 848.15,585.65)';
const LEGS = [
	{
		id: 'backleg',
		transform: 'matrix(2.9166107177734375, 0, 0, 2.9166107177734375, 1463.45,1961.9)',
	},
	{
		id: 'frontleg',
		transform: 'matrix(2.9166107177734375, 0, 0, 2.9166107177734375, 1042.6,1961.9)',
	},
];
export function resolveRunnerKit(value: unknown): Required<RunnerKitOptions> {
	const options = value && typeof value === 'object' ? (value as RunnerKitOptions) : {};
	return {
		color:
			typeof options.color === 'string' && /^#[0-9a-f]{6}$/i.test(options.color)
				? options.color
				: '#ef8fae',
		number:
			Number.isInteger(options.number) && options.number! >= 1 && options.number! <= 99
				? options.number!
				: 1,
		mirrorBib: options.mirrorBib === true,
	};
}
export function buildRunnerAccessories(options: RunnerKitOptions = {}): Array<AccessoryMetadata> {
	const runnerKit = resolveRunnerKit(options);
	return [...RUNNER_ACCESSORY_NAMES].map((name) => ({
		name,
		type:
			name === 'runner singlet'
				? 'torso'
				: name === 'runner shorts'
					? 'legs'
					: name === 'runner headband'
						? 'head'
						: 'feet',
		category: 'runner',
		collection: 'runner',
		description: 'Athletics kit with native animated limb registration.',
		price: 0,
		quantity: null,
		renderOptions: { runnerKit, showEars: true, showFin: true },
	}));
}
function Headband({ species, color }: { species: SuiFrenSpecies; color: string }) {
	return (
		<g
			id="runner-headband-head"
			transform={HEAD}
			fill={color}
			stroke={INK}
			strokeWidth="8"
			strokeLinejoin="round"
			strokeLinecap="round"
		>
			<path d="M30 78Q-2 79-23 98L7 101L40 88Z" />
			<path d="M30 82Q7 102 8 123L31 115L45 83Z" />
			<path
				d={
					species === 'bullshark'
						? 'M39 51Q157 19 279 49L309 72Q166 43 26 78Z'
						: 'M28 66Q263 32 535 83L546 107Q268 60 17 93Z'
				}
			/>
		</g>
	);
}
/** Clothing shares the native silhouette; accents are clipped within the fabric. */
export function RunnerAccessory({ accessory, species, body }: AccessoryRendererProps) {
	const kit = resolveRunnerKit(accessory.renderOptions.runnerKit);
	const name = accessory.name;
	const id = `runner-${useId().replace(/:/g, '')}`;
	const bodyClip = `${id}-body`,
		footClip = `${id}-foot`;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 3000" data-runner-kit={name}>
			{name === 'runner headband' && <Headband species={species} color={kit.color} />}
			{(name === 'runner singlet' || name === 'runner shorts') && body && (
				<defs>
					<clipPath id={bodyClip}>
						<path d={RUNNER_BODY_CONTOUR} />
					</clipPath>
				</defs>
			)}
			{name === 'runner singlet' && body && (
				<g id="runner-singlet-body" transform={BODY}>
					<g clipPath={`url(#${bodyClip})`}>
						<path d="M-10-10H305V194Q147 215-10 192Z" fill={kit.color} />
						<path
							d="M85 20Q96 85 26 109M208 20Q197 85 269 110M113 7Q147 41 181 7"
							fill="none"
							stroke="#fff6df"
							strokeWidth="8"
							strokeLinecap="round"
						/>
						<path
							d="M30 118L38 177M260 118L254 177"
							fill="none"
							stroke="#fff6df"
							strokeWidth="7"
							strokeLinecap="round"
						/>
						<path
							d="M-8 194Q146 215 301 194"
							fill="none"
							stroke={INK}
							strokeWidth="7"
							strokeLinecap="round"
						/>
						<rect
							x="153"
							y="93"
							width="87"
							height="67"
							rx="8"
							fill="#fff6df"
							stroke={INK}
							strokeWidth="6"
						/>
						<g transform={kit.mirrorBib ? 'translate(393 0) scale(-1 1)' : undefined}>
							<text
								x="196.5"
								y="143"
								textAnchor="middle"
								fill={INK}
								fontFamily="sans-serif"
								fontSize="48"
								fontWeight="800"
							>
								{kit.number}
							</text>
						</g>
					</g>
				</g>
			)}
			{name === 'runner shorts' && body && (
				<g id="runner-shorts-body" transform={BODY}>
					<g clipPath={`url(#${bodyClip})`}>
						<path d="M-10 184H305V310H-10Z" fill={SHORTS} />
						<path
							d="M147 219Q142 253 147 291"
							fill="none"
							stroke={INK}
							strokeWidth="5"
							strokeLinecap="round"
						/>
					</g>
				</g>
			)}
			{name === 'runner shorts' &&
				!body &&
				LEGS.map((leg) => (
					<g key={leg.id} id={`runner-shorts-${leg.id}`} transform={leg.transform}>
						<path d="M8 104Q47 93 94 103L91 144Q46 152 5 140Z" fill={SHORTS} />
						<path
							d="M8 104L5 140Q46 152 91 144L94 103"
							fill="none"
							stroke={INK}
							strokeWidth="8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M13 135Q47 146 84 139"
							fill="none"
							stroke={kit.color}
							strokeWidth="5"
							strokeLinecap="round"
						/>
					</g>
				))}
			{name === 'runner shoes' &&
				LEGS.map((leg) => (
					<g key={leg.id} id={`runner-shoes-${leg.id}`} transform={leg.transform}>
						<defs>
							<clipPath id={`${footClip}-${leg.id}`}>
								<path d={RUNNER_FOOT_CONTOUR} />
							</clipPath>
						</defs>
						<path
							d={RUNNER_FOOT_CONTOUR}
							fill="#fff6df"
							stroke={INK}
							strokeWidth="10"
							strokeLinejoin="round"
						/>
						<g clipPath={`url(#${footClip}-${leg.id})`}>
							<path
								d="M1 210Q14 232 40 231H88Q104 229 115 216"
								fill="none"
								stroke={INK}
								strokeWidth="5"
								strokeLinecap="round"
							/>
							<path
								d="M11 182L30 201L49 190"
								fill="none"
								stroke={kit.color}
								strokeWidth="8"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M59 178L74 193M72 178L86 191"
								fill="none"
								stroke={INK}
								strokeWidth="5"
								strokeLinecap="round"
							/>
						</g>
					</g>
				))}
		</svg>
	);
}
