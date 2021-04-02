import { PhormState } from 'components/Phorm';

class StorageWorker {
	getSavedForm(name: string): PhormState {
		try {
			const form = sessionStorage.getItem(name);
			const parsedForm = form ? JSON.parse(form) : {};
			return parsedForm;
		} catch (error) {
			return {};
		}
	}

	saveForm(name: string, state: PhormState) {
		sessionStorage.setItem(name, JSON.stringify(state));
	}
}

const storageWorker = new StorageWorker();

export default storageWorker;
