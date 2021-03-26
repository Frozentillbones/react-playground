import React, { useState } from 'react';
import isTooGreen from 'utils/color/isTooGreen';
import isTooYellow from 'utils/color/isTooYellow';
import rgbToHex from 'utils/color/rgbToHex';
import shade from 'utils/color/shade';
import createRipple from 'utils/react/createRipple';

type UseRipplesReturn = [JSX.Element[], (e: React.MouseEvent<HTMLElement>) => void]

const useRipples = (): UseRipplesReturn => {

	const [ ripples, setRipples ] = useState<JSX.Element[]>([]);

	const delRipple = (key: string) => {
		setRipples(currentRipples => currentRipples.filter(currentRipple => currentRipple.key !== key));
	};

	const addRipple = (event: React.MouseEvent<HTMLElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const parentColor = window.getComputedStyle(event.currentTarget).backgroundColor;
		const width = Math.max(rect.width, rect.height);
		const left = event.clientX - rect.left - width / 2;
		const top = event.clientY - rect.top - width / 2;
		const newRipple = createRipple({
			delRipple,
			color: shade(
				rgbToHex(parentColor),
				isTooGreen(parentColor) && !isTooYellow(parentColor)
					? 200 : isTooYellow(parentColor) ? -200 : 200
			),
			width,
			left,
			top
		});
		setRipples(currentRipples => [...currentRipples, newRipple]);
	};

	return [ripples, addRipple];
};

export default useRipples;
