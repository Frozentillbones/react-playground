import React, { useCallback } from 'react';
import bem from 'components/bem';

export default (id: string, label?: string | boolean, className?: string) => {
	return useCallback(
		() => {
			if (!label) {
				return null;
			}
			if (label === true) {
				return <bem.label htmlFor={id} className='label' elementOf={className} />;
			}
			return (
				<bem.label htmlFor={id} className='label' elementOf={className}>
					{label}
				</bem.label>
			);
		},
		[label, id, className]
	);
};
