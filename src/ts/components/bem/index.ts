import getBemTag from './getBemTag';
import { tagNames } from './tagNames';
import { BemTag } from './types';

const bem: Record<string, BemTag> = 
	tagNames.reduce(
		(prev, curr) => {
			const BemTag: BemTag = getBemTag(curr);
			BemTag.displayName = `bem_${curr}`;
			return {
				...prev,
				[curr]: BemTag
			};
		},
		{} as Record<string, BemTag>
	);

export default bem;
