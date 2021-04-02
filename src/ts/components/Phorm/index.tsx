import React, {
	createContext,
	useContext,
	FC,
	FormHTMLAttributes,
	useState,
	useCallback,
	useEffect,
} from 'react';
import { BemProps } from 'components/bem/types';
import bem from 'components/bem';
import useSetState, { SetState } from 'hooks/useSetState';
import { TextInputProps, PTextInput } from './TextInput';
import { CheckableProps, PCheckable } from './Checkable';
import { TextareaProps, PTextarea } from './Textarea';
import { PSelect, SelectProps } from './Select/Index';
import storageWorker from 'utils/storageWorker';

export interface CommonInputProps {
	name: string;
	id: string;
	label?: string | boolean;
	errors?: ValidationError[];
}

export interface PhormState {
	[k: string]: string | number | string[] | readonly string[] | undefined;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

interface PhormProps extends FormHTMLAttributes<HTMLFormElement> {
	type?: 'form-data' | 'query';
	save?: boolean;
	name: string;
	handleSubmit: (state: FormData | PhormState) => void;
}

interface PhormContext {
	isLoading: boolean;
	state: PhormState;
	setState: SetState<PhormState>;
	onInputChange: (e: InputChangeEvent) => void;
	onTextareaChange: (e: TextareaChangeEvent) => void;
	onSelectChange: (e: SelectChangeEvent) => void;
}

interface PhormComposition {
	TextInput: FC<TextInputProps>
	Checkable: FC<CheckableProps>
	Textarea: FC<TextareaProps>
	Select: FC<SelectProps>
}

interface ValidationError {
	type: string;
	message: string;
}

const PhormContext = createContext<PhormContext | null>(null);
const { Provider } = PhormContext;

export const usePhormContext = (): PhormContext => {
	const context = useContext(PhormContext);
	if (!context) {
		throw new Error('This component must be used within a <Phorm> component.');
	}
	return context;
};

const Phorm: FC<PhormProps & BemProps> & PhormComposition = 
({children, type, handleSubmit, save, ...props}) => {
	const { name } = props;
	const defaultState = save 
		? storageWorker.getSavedForm(name) 
		: {};
	const [ state, setState ] = useSetState<PhormState>(defaultState);
	const [ isLoading, setIsLoading ] = useState(false);
	
	const onInputChange = useCallback(
		({ currentTarget }: InputChangeEvent) => {
			const { name, value, type, checked } = currentTarget;
			switch (type) {
				case 'checkbox':
					if (checked) {
						setState(state => ({
							...state,
							[name]: [...(state[name] as string[]), value]
						}));
						return;
					}
					setState(state => ({
						...state,
						[name]: (state[name] as string[]).filter(v => v !== value)
					}));
					break;
				case 'radio': 
					if (checked) {
						setState({[name]: value});
					}
				break;
				default:
					setState({[name]: value});
					break;
			}
		},
		[setState]
	);

	const onTextareaChange = useCallback(
		({currentTarget}: TextareaChangeEvent) => {
			const { name, value } = currentTarget;
			setState({[name]: value});
		},
		[setState]
	);

	const onSelectChange = useCallback(
		({currentTarget}: SelectChangeEvent) => {
			const { name, multiple, selectedOptions } = currentTarget;
			const values = [...selectedOptions].map(option => (
				option.value || option.textContent
			));
			const valueToSet = (values as string[]);
			setState({[name]: multiple ? valueToSet : valueToSet[0]});
		},
		[setState]
	);

	const onSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const data = type === 'form-data' ? new FormData(event.currentTarget) : state;
			setIsLoading(true);
			try {
        handleSubmit(data);
      } catch (err) {
        console.error('[Phorm::handleSubmit] ERROR:', err);
      } finally {
        setIsLoading(false);
      }
		},
		[type, state, setIsLoading, handleSubmit]
	);
	
	useEffect(() => {
		if (save) {
			storageWorker.saveForm(name, state);
		}
	}, [save, name, state]);

	return (
		<Provider value={{
			state,
			setState,
			isLoading,
			onInputChange,
			onTextareaChange,
			onSelectChange,
		}}>
			<bem.form {...props} onSubmit={onSubmit}>
				{children}
			</bem.form>
		</Provider>
	);
};

Phorm.TextInput = PTextInput;
Phorm.Checkable = PCheckable;
Phorm.Textarea = PTextarea;
Phorm.Select = PSelect;

Phorm.defaultProps = {
	noValidate: true,
	type: 'query'
};

export default Phorm;
