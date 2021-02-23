import { nanoid } from 'nanoid';
import React, { useState } from 'react';

export type RipplesOptions = {
	color?: string;
	className?: string;
};

interface RippleProps extends RipplesOptions {
	width: string;
	left: string;
	top: string;
}

const defaultRipplesOptions = {color: '#ffffff', className: 'ripple'};

const useRipples = (options?: RipplesOptions): [JSX.Element[], (e: React.MouseEvent<HTMLElement>) => void] => {

	const [ ripples, setRipples ] = useState<JSX.Element[]>([]);

	const createRipple = ({
		className,
		color,
		width,
		left,
		top,
	}: RippleProps) => {
		const key = nanoid();
		return <span
			className={className}
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
			}}
		/>;
	};

	const addRipple = (event: React.MouseEvent<HTMLElement>) => {
		const cfg = options ? options : defaultRipplesOptions;
		const { className, color } = cfg;
		const rect = event.currentTarget.getBoundingClientRect();
		const width = Math.max(rect.width, rect.height);
		const left = event.pageX - rect.left - width / 2 + 'px';
		const top = event.pageY - rect.top - width / 2 + 'px';
		const newRipple = createRipple({className, color, width: `${width}px`, left, top});
		setRipples(currentRipples => [...currentRipples, newRipple]);
	};

	const delRipple = (key: string) => {
		setRipples(currentRipples => currentRipples.filter(currentRipple => currentRipple.key !== key));
	};

	return [ripples, addRipple];
};

export default useRipples;
