export default <T extends HTMLElement>(start: HTMLElement, target: T | null) => {
	let parent = start.parentElement;
	while (parent) {
		if (parent !== target) {
			parent = parent.parentElement;
			continue;
		}
		break;
	}
	return parent;
};
