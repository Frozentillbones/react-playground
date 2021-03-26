import React, {
	FC,
	HTMLAttributes,
	PropsWithChildren,
	useMemo,
	useState
} from 'react';
import bem from 'components/bem';
import { TabsContext } from 'contexts/TabsContext';
import Tab, {TabProps} from './Tab';
import Panel, {PanelProps} from './Panel';

interface TabsComposition {
  Tab: React.FC<TabProps>;
  Panel: React.FC<PanelProps>;
}

type TabsProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const { Provider } = TabsContext;
	
const Tabs: FC<TabsProps> & TabsComposition = ({ children, ...props }) => {
	const [ activeTabIndex, setActiveTabIndex ] = useState(0);

	const value = useMemo(
		() => ({
			activeTabIndex,
			setActiveTabIndex,
		}),
		[activeTabIndex, setActiveTabIndex],
	);

	return (
		<Provider value={value}>
			<bem.div {...props}>{children}</bem.div>
		</Provider>
	);
};

Tabs.defaultProps = {
	className: 'tabs'
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
