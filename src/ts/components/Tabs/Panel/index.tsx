import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import useTabs from 'contexts/TabsContext';
import bem from 'components/bem';

export interface PanelProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>>{
  index: number;
}
const Panel: FC<PanelProps> = ({children, index, ...props}) => {
	const {activeTabIndex } = useTabs();
	return activeTabIndex === index ? <bem.div {...props}>{children}</bem.div> : null;
};

Panel.defaultProps = {
	className: 'panel'
};

export default Panel;
