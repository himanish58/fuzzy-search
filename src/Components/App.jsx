import React, { useEffect, useRef } from 'react';

import ListItem from './ListItem';
import DATASET from '../Data/data';
import debounce from '../Utils/debounce';
import useCustomState from '../CustomHooks/useCustomState.js';
import './App.scss';

function App() {
	const searchRef = useRef(null);
	const activeRef = useRef(null);
	const [{ data, active }, customSetState] = useCustomState({
		data: DATASET,
		active: -1,
	});

	useEffect(() => {
		activeRef.current &&
			activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [active]);

	const onChangeHandler = () => {
		const { value } = searchRef.current;
		const lowerCaseValue = value.toLowerCase();
		const valueLen = value.length;
		if (valueLen) {
			let data = [...DATASET]
				.map(({ ...obj }) => {
					let isModified = false;
					for (let key in obj) {
						if (Array.isArray(obj[key])) {
							let isPresent = false;
							for (let e of obj[key]) {
								if (e.toLowerCase().includes(lowerCaseValue)) {
									isPresent = true;
									isModified = true;
								}
							}
							obj[key] = isPresent
								? `<span>${value}</span> is present in items`
								: obj[key];
						} else {
							const str = obj[key];
							const index = str.toLowerCase().indexOf(lowerCaseValue);
							if (index > -1) {
								obj[key] = `${str.slice(0, index)}<span>${str.slice(
									index,
									index + valueLen
								)}</span>${str.slice(index + valueLen)}`;
								isModified = true;
							}
						}
					}
					return isModified ? obj : false;
				})
				.filter((obj) => !!obj);
			customSetState({ data, active: -1 });
		} else {
			customSetState({ data: DATASET, active: -1 });
		}
	};

	const keyDownHandler = (e) => {
		const { keyCode } = e;
		const dataLen = data.length;
		if (keyCode === 40) {
			dataLen - 1 === active
				? customSetState({ active: 0 })
				: customSetState({ active: active + 1 });
		} else if (keyCode === 38 && active >= 0) {
			active === 0
				? customSetState({ active: dataLen - 1 })
				: customSetState({ active: active - 1 });
		}
	};

	const handleMouseEnter = (e, index) => {
		customSetState({ active: index });
	};

	return (
		<div className="container">
			<div className="heading">
				<h1>Fuzzy Search</h1>
				<input
					ref={searchRef}
					type="text"
					placeholder="Search..."
					className="search-box"
					onChange={debounce(onChangeHandler, 300)}
					onKeyDown={keyDownHandler}
				/>
			</div>
			<ul>
				{data.map((item, index) => (
					<ListItem
						item={item}
						key={item.id}
						index={index}
						active={active}
						handleMouseEnter={handleMouseEnter}
						ref={activeRef}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
