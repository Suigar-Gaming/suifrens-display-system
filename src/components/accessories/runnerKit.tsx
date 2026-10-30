import type { AccessoryMetadata, SuiFrenSpecies } from '../../utils/accessoryUtils.js';
import type { AccessoryRendererProps } from './AccessorySlot.js';

export type RunnerKitOptions = { color?: string; number?: number; mirrorBib?: boolean };
export const RUNNER_ACCESSORY_NAMES = new Set([
	'runner singlet',
	'runner shorts',
	'runner headband',
	'runner shoes',
]);
const INK = '#273748';
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
		<g id="runner-headband-head" transform={HEAD}>
			<path
				d={
					species === 'bullshark'
						? 'M35 55Q158 13 286 49L328 86Q170 48 20 91Z'
						: 'M28 62Q261 25 534 80L548 117Q261 64 14 101Z'
				}
				fill={color}
				stroke={INK}
				strokeWidth="10"
				strokeLinejoin="round"
			/>
			<path
				d="M30 72L-35 99L-2 116L28 93L-10 142L26 133L48 92"
				fill={color}
				stroke={INK}
				strokeWidth="8"
				strokeLinejoin="round"
			/>
		</g>
	);
}
/** Shared native canvas and transform registration for capys and bullsharks. */
export function RunnerAccessory({ accessory, species, body }: AccessoryRendererProps) {
	const kit = resolveRunnerKit(accessory.renderOptions.runnerKit);
	const name = accessory.name;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 3000" data-runner-kit={name}>
			{name === 'runner headband' && <Headband species={species} color={kit.color} />}
			{name === 'runner singlet' && body && (
				<g id="runner-singlet-body" transform={BODY}>
					<path
						d="M86 19L114 7Q145 40 181 8L210 22Q193 91 270 110L286 188Q153 220 7 185L21 105Q86 95 86 19Z"
						fill={kit.color}
						stroke={INK}
						strokeWidth="10"
						strokeLinejoin="round"
					/>
					<path
						d="M86 22Q98 102 22 110M209 25Q195 95 269 113M114 7Q148 46 181 8"
						fill="none"
						stroke="#fff6df"
						strokeWidth="12"
					/>
					<path
						d="M35 124L44 181M252 127L262 182"
						stroke="#fff6df"
						strokeWidth="10"
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
						strokeWidth="5"
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
			)}
			{name === 'runner shorts' && body && (
				<g id="runner-shorts-body" transform={BODY}>
					<path
						d="M4 186Q148 213 288 189L280 244Q224 283 147 282Q55 279 14 242Z"
						fill={INK}
						stroke={INK}
						strokeWidth="10"
						strokeLinejoin="round"
					/>
					<path d="M10 190Q150 217 284 192" fill="none" stroke={kit.color} strokeWidth="15" />
					<path
						d="M147 211L147 279M26 211L42 251M263 212L249 251"
						stroke="#fff6df"
						strokeWidth="7"
					/>
				</g>
			)}
			{name === 'runner shorts' &&
				!body &&
				LEGS.map((leg) => (
					<g key={leg.id} id={`runner-shorts-${leg.id}`} transform={leg.transform}>
						<path
							d="M-4 103Q48 88 96 103L94 137L65 148L7 139Z"
							fill={INK}
							stroke={INK}
							strokeWidth="9"
							strokeLinejoin="round"
						/>
						<path d="M9 133L66 142L93 132" fill="none" stroke={kit.color} strokeWidth="8" />
					</g>
				))}
			{name === 'runner shoes' &&
				LEGS.map((leg) => (
					<g key={leg.id} id={`runner-shoes-${leg.id}`} transform={leg.transform}>
						<path
							d="M-6 209L72 208L83 223L107 234Q121 257 101 262L-8 262Q-22 247-6 209Z"
							fill="#fff6df"
							stroke={INK}
							strokeWidth="9"
							strokeLinejoin="round"
						/>
						<path
							d="M-11 250L108 250M53 218L75 231M39 218L62 231"
							fill="none"
							stroke={INK}
							strokeWidth="7"
							strokeLinecap="round"
						/>
						<path
							d="M-3 229L31 240L51 232"
							fill="none"
							stroke={kit.color}
							strokeWidth="10"
							strokeLinecap="round"
						/>
					</g>
				))}
		</svg>
	);
}
