import React, { FC } from 'react';
import * as sprite from 'images/svg/icons-sprite.svg';
import './reset';

interface IconProps {
	className: string
	src: string,
	id: string
}

const Icon: FC<IconProps> = ({
	src,
	id,
	className
}) => {

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
