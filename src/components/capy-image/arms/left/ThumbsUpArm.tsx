import { AnimatedAccessory } from '../../../../animation/AnimatedAccessory.js';

type ThumbsUpArmProps = {
	armColor: string;
	handColor: string;
};

/** A raised native mitten with a clear upright thumb, attached at the left shoulder. */
export function ThumbsUpArm({ armColor, handColor }: ThumbsUpArmProps) {
	return (
		<AnimatedAccessory fallbackPart="leftArm">
			<g
				data-suifren-gesture="thumbs-up"
				stroke="#000"
				strokeWidth={29}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path
					fill={armColor}
					d="M 1218 1745 C 1135 1828 1010 1795 930 1724 C 871 1671 830 1609 803 1540 L 937 1484 C 969 1552 1013 1610 1076 1637 C 1112 1652 1151 1658 1181 1649"
				/>
				<path
					fill={handColor}
					d="M 783 1546 C 739 1533 710 1505 701 1468 L 683 1387 C 677 1357 690 1336 716 1330 L 740 1324 L 730 1240 C 721 1205 736 1188 763 1190 C 790 1190 804 1215 808 1240 L 837 1310 L 882 1303 C 911 1299 933 1316 940 1342 L 966 1441 C 977 1486 953 1528 911 1540 L 853 1555 C 828 1561 803 1558 783 1546 Z"
				/>
				<path
					fill="none"
					d="M 744 1369 L 848 1344 M 754 1420 L 861 1394 M 767 1470 L 871 1446"
					strokeWidth={19}
				/>
			</g>
		</AnimatedAccessory>
	);
}
