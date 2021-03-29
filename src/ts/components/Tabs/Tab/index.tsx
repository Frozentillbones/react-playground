import React, { FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import { BemProps } from 'components/bem/types';
import useTabs from 'contexts/TabsContext';
import Button from 'components/Button';

export interface TabProps extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>>{
  index: number;
	ripple?: boolean;
}

const Tab: FC<TabProps & BemProps> = ({ children, index, ...props }) => {
	const {activeTabIndex, setActiveTabIndex} = useTabs();

	const modifiers = useMemo(() => {
		return activeTabIndex === index ? ['active'] : undefined;
	}, [activeTabIndex, index]);

	return (
		<Button 
			onClick={() => setActiveTabIndex(index)}
			modifiers={modifiers}
			{...props}
		>
				{children}
		</Button>
	);
};

Tab.defaultProps = {
	className: 'tab',
	ripple: true
};

export default Tab;
