export default (value: any) => {
	return typeof value === 'string' ||
				 typeof value === 'number' ||
				 typeof value === 'boolean';
};
