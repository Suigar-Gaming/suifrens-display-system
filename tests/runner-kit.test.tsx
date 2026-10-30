// @vitest-environment happy-dom
import { act } from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { AnimatedAccessory } from '../src/animation/AnimatedAccessory.js';
import { AnimationStore } from '../src/animation/AnimationStore.js';
import {
	buildRunnerAccessories,
	resolveRunnerKit,
	RunnerAccessory,
} from '../src/components/accessories/runnerKit.js';
import { createTestRoot } from './helpers/react-dom.js';
const context = vi.hoisted(() => ({ store: null as AnimationStore | null }));
vi.mock('../src/animation/AnimationContext.js', () => ({ useAnimationStore: () => context.store }));
let view: ReturnType<typeof createTestRoot> | undefined;
afterEach(async () => {
	await view?.unmount();
	view = undefined;
	context.store = null;
});
test('validates kit inputs and keeps fins and ears visible', () => {
	expect(resolveRunnerKit({ color: 'url(bad)', number: 0 })).toEqual({
		color: '#ef8fae',
		number: 1,
		mirrorBib: false,
	});
	expect(resolveRunnerKit({ color: '#12ABef', number: 99, mirrorBib: true })).toEqual({
		color: '#12ABef',
		number: 99,
		mirrorBib: true,
	});
	for (const item of buildRunnerAccessories({ color: '#123456', number: 9 })) {
		expect(item.renderOptions.runnerKit?.number).toBe(9);
		expect(item.renderOptions.showEars).toBe(true);
		expect(item.renderOptions.showFin).toBe(true);
	}
});
test.each(['runner shorts', 'runner shoes'])(
	'%s registers both legs independently in the native animation store',
	async (name) => {
		view = createTestRoot();
		context.store = new AnimationStore();
		const accessory = buildRunnerAccessories().find((item) => item.name === name)!;
		await view.render(
			<svg>
				<AnimatedAccessory fallbackPart="body">
					<RunnerAccessory accessory={accessory} species="bullshark" />
				</AnimatedAccessory>
			</svg>,
		);
		const front = view.container.querySelector('[id$="frontleg"]')!;
		const back = view.container.querySelector('[id$="backleg"]')!;
		const frontBefore = front.getAttribute('transform'),
			backBefore = back.getAttribute('transform');
		await act(async () => {
			context.store!.setPose('leftLeg', { rotate: 24 });
		});
		expect(front.getAttribute('transform')).not.toBe(frontBefore);
		expect(back.getAttribute('transform')).toBe(backBefore);
		await act(async () => {
			context.store!.setPose('rightLeg', { rotate: -24 });
		});
		expect(back.getAttribute('transform')).not.toBe(backBefore);
	},
);

// Each extracted limb must retain its own clipping definition: animated wrappers
// and generated external SVG symbols can move or render a leg independently.
test('shoe details keep local, distinct clip targets for every racer and limb', async () => {
	view = createTestRoot();
	const accessory = buildRunnerAccessories().find((item) => item.name === 'runner shoes')!;
	await view.render(
		<svg>
			{['capy', 'bullshark'].map((species) => (
				<RunnerAccessory
					key={species}
					accessory={accessory}
					species={species as 'capy' | 'bullshark'}
				/>
			))}
		</svg>,
	);
	const legs = view.container.querySelectorAll('[id^="runner-shoes-"]');
	expect(legs).toHaveLength(4);
	const ids = new Set<string>();
	for (const leg of legs) {
		const definition = leg.querySelector('clipPath')!;
		const id = definition.getAttribute('id')!;
		expect(ids.has(id)).toBe(false);
		ids.add(id);
		expect(leg.querySelector('[clip-path]')?.getAttribute('clip-path')).toBe(`url(#${id})`);
	}
});
