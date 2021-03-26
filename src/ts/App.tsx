import Tabs from 'components/Tabs';
import React from 'react';

const App = () => {
	return <div>
		<Tabs>
			<Tabs.Tab index={0}>tab 1</Tabs.Tab>
			<Tabs.Tab index={1}>tab 2</Tabs.Tab>
			<Tabs.Tab index={2}>tab 3</Tabs.Tab>
			<Tabs.Panel index={0}> tab1 content </Tabs.Panel>
			<Tabs.Panel index={1}> tab2 content </Tabs.Panel>
			<Tabs.Panel index={2}> tab3 content </Tabs.Panel>
		</Tabs>
		<hr/>
		<Tabs>
			<Tabs.Tab index={0}>tab 1</Tabs.Tab>
			<Tabs.Tab index={1}>tab 2</Tabs.Tab>
			<Tabs.Tab index={2}>tab 3</Tabs.Tab>
			<Tabs.Panel index={0}> tab1 content </Tabs.Panel>
			<Tabs.Panel index={1}> tab2 content </Tabs.Panel>
			<Tabs.Panel index={2}> tab3 content </Tabs.Panel>
		</Tabs>
	</div>;
};

export default App;
