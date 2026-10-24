import type { AccessoryMetadata } from '../../utils/accessoryUtils.js';

// The authored crown paths extend above and left of their original 3009px artboard.
// Match the padded SVG viewport at the original 3000 / 3009 rendering scale.
const CROWN_SCALE = 3000 / 3009;
export const VIP_CROWN_IMAGE_VIEWPORT = {
	x: -200 * CROWN_SCALE,
	y: -600 * CROWN_SCALE,
	width: 3209 * CROWN_SCALE,
	height: 3609 * CROWN_SCALE,
};

export function getSuiFrenViewBox(headAccessory?: AccessoryMetadata) {
	// Keep a square portrait and the existing floor line, with space for crown
	// tips and their head-bound motion even inside overflow-hidden consumers.
	return headAccessory?.category === 'crowns' ? '-300 -800 3600 3600' : '0 -200 3000 3000';
}
