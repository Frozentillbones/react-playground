import React, { useState } from 'react';
import createRipple from 'utils/react/createRipple';
export interface RipplesOptions {
	color?: string;
	className?: string;
};

type UseRipplesReturn = [JSX.Element[], (e: React.MouseEvent<HTMLElement>) => void]

const defaultRipplesOptions: RipplesOptions = {color: '#ffffff', className: 'ripple'};

const useRipples = (options?: RipplesOptions): UseRipplesReturn => {

	const [ ripples, setRipples ] = useState<JSX.Element[]>([]);

	const delRipple = (key: string) => {
		setRipples(currentRipples => currentRipples.filter(currentRipple => currentRipple.key !== key));
	};

	const addRipple = (event: React.MouseEvent<HTMLElement>) => {
		const cfg = options ? options : defaultRipplesOptions;
		const { className, color } = cfg;
		const rect = event.currentTarget.getBoundingClientRect();
		const width = Math.max(rect.width, rect.height);
		const left = event.clientX - rect.left - width / 2;
		const top = event.clientY - rect.top - width / 2;
		const newRipple = createRipple({
			delRipple,
			className,
			color,
			width,
			left,
			top
		});
		setRipples(currentRipples => [...currentRipples, newRipple]);
	};

	return [ripples, addRipple];
};

export default useRipples;
