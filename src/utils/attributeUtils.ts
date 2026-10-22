import type { BullsharkAttributes } from '../components/bullshark-image/types.js';
import type { CapyAttributes } from '../components/capy-image/types.js';
import { type SuiFrenAttributes, SuiFrenType } from '../components/types.js';
import { earGeneToEarShape } from '../constants/attributes.js';

export function parseSuiFrenAttributes(
	suiFrenType: SuiFrenType,
	[skin, mainColor, secondaryColor, expression, ...otherAttributes]: Array<string>,
): SuiFrenAttributes {
	if (suiFrenType === SuiFrenType.CAPY) {
		return {
			skin,
			mainColor,
			secondaryColor,
			expression,
			earShape: earGeneToEarShape[otherAttributes[0]],
		} as CapyAttributes;
	}
	return {
		skin,
		mainColor,
		secondaryColor,
		expression,
		finStyle: otherAttributes[0],
	} as BullsharkAttributes;
}
