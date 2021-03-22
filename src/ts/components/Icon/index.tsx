import React from 'react';
import * as sprite from 'images/svg/icons-sprite.svg';
import './reset';

interface IconProps {
	className: string
	src: string,
	id: string
}

const Icon = ({
	src,
	id,
	className
}: IconProps) => {

	return (
		<svg className={className}>
			<use href={`${src}#${id}`} />
		</svg>
	);
};

Icon.defaultProps = {
	src: sprite,
	className: 'icon'
};

export default Icon;
