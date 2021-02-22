import { ForwardRefExoticComponent, PropsWithChildren, AllHTMLAttributes } from 'react';

export interface BemTagProps extends AllHTMLAttributes<any> {
	className: string;
	modifiers?: string[];
	ref?: React.Ref<any>
}
export type BemTag = ForwardRefExoticComponent<PropsWithChildren<BemTagProps>>;
