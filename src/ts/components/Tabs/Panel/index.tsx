import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { BemProps } from 'components/bem/types';
import useTabs from 'contexts/TabsContext';
import bem from 'components/bem';

export interface PanelProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>>{
  index: number;
}
const Panel: FC<PanelProps & BemProps> = ({children, index, ...props}) => {
	const {activeTabIndex } = useTabs();
	return activeTabIndex === index ? <bem.div {...props}>{children}</bem.div> : null;
};

Panel.defaultProps = {
	className: 'panel'
};

export default Panel;
