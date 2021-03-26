import React from 'react';
import { nanoid } from 'nanoid';
import 'style/helpers/animations/ripple';

interface RippleProps {
	delRipple: (key: string) => void;
	color: string;
	width: number;
	left: number;
	top: number;
}

const createRipple = ({
	delRipple,
	color,
	width,
	left,
	top,
}: RippleProps) => {
	const key = nanoid();
	return <i
		key={key}
		onAnimationEnd={() => {
			delRipple(key);
		}}
		style={{
			backgroundColor: color,
			borderRadius: '50%',
			position: 'absolute',
			height: width,
			zIndex: 0,
			width,
			left,
			top,
			animation: 'ripple 400ms ease-out'
		}}
	/>;
};

export default createRipple;
