import { createContext, useContext } from 'react';

interface TabsContext {
  activeTabIndex: number
  setActiveTabIndex: (label: number) => void
}

export const TabsContext = createContext<TabsContext | null>(null);

const useTabs = (): TabsContext => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('This component must be used within a <Tabs> component.');
	}
	return context;
};

export default useTabs;
