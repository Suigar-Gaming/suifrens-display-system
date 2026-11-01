import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';
import { SuiFrenImage } from '../src/components/SuiFrenImage.js';
import { SuiFrenImageAssets } from '../src/components/SuiFrenImageAssets.js';
import { accessories } from '../src/constants/accessories.js';

const capy = {
	mainColor: 'A87C4C',
	secondaryColor: 'D5CBB1',
	skin: 'basic',
	expression: 'bigSmile',
	earShape: 'default',
} as const;
const restingArm = '1002.9,1719.3';

describe.each([
	['inline', SuiFrenImage],
	['asset', SuiFrenImageAssets],
] as const)('%s capy thumbs up', (_name, Image) => {
	test('uses one foreground hand and leaves the resting pose unchanged by default', () => {
		const resting = renderToStaticMarkup(<Image attributes={capy} />);
		const raised = renderToStaticMarkup(<Image attributes={capy} capyGesture="thumbsUp" />);
		expect(resting).not.toContain('data-suifren-gesture');
		expect(resting).toContain(restingArm);
		expect(raised.match(/data-suifren-gesture="thumbs-up"/g)).toHaveLength(1);
		expect(raised).not.toContain(restingArm);
		expect(raised).toContain('viewBox="0 -200 3000 3000"');
		expect(raised.indexOf('data-suifren-gesture')).toBeGreaterThan(
			raised.indexOf('data-suifren-animation-part="head"'),
		);
	});
	test('does not change a head portrait or bullshark', () => {
		expect(
			renderToStaticMarkup(<Image attributes={capy} detail="head" capyGesture="thumbsUp" />),
		).toBe(renderToStaticMarkup(<Image attributes={capy} detail="head" />));
		const shark = {
			mainColor: 'A87C4C',
			secondaryColor: 'D5CBB1',
			skin: 'basic',
			expression: 'happy',
			finStyle: 'classic',
		} as const;
		expect(renderToStaticMarkup(<Image attributes={shark} capyGesture="thumbsUp" />)).toBe(
			renderToStaticMarkup(<Image attributes={shark} />),
		);
	});
	test('preserves the grip when holding an object', () => {
		const object = accessories.find((accessory) => accessory.name === 'microphone')!;
		const props = { attributes: capy, accessories: [object] };
		expect(renderToStaticMarkup(<Image {...props} capyGesture="thumbsUp" />)).toBe(
			renderToStaticMarkup(<Image {...props} />),
		);
	});
});
