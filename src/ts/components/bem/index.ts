import getBemTag from './getBemTag';
import { tagNames } from './tagNames';
import { BemTag, TagNames } from './types';

const bem: Record<TagNames, BemTag> = 
	tagNames.reduce(
		(prev, curr) => {
			const BemTag: BemTag = getBemTag(curr);
			BemTag.displayName = `bem_${curr}`;
			return {
				...prev,
				[curr]: BemTag
			};
		},
		{} as Record<TagNames, BemTag>
	);

export default bem;
