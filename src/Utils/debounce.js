const debounce = (fn, delay) => {
	let inDebounce;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => fn.apply(context, args), delay);
	};
};

export default debounce;
