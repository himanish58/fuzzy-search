import React, { useState } from 'react';

const useCustomState = (state) => {
	const [customState, setState] = useState({ ...state });
	const setCustomState = (updatedValues) => {
		const updatedState = { ...customState };
		for (let key in updatedValues) {
			updatedState[key] = updatedValues[key];
		}
		setState(updatedState);
	};
	return [customState, setCustomState];
};

export default useCustomState;
