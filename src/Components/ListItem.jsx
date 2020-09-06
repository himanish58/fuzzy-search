import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const ListItem = (
	{
		item: { id, name, items, address, pincode },
		index,
		active,
		handleMouseEnter,
	},
	ref
) => (
	<li
		className={`person ${active === index ? 'active' : ''}`}
		key={id}
		ref={active === index ? ref : null}
		onMouseEnter={(e) => handleMouseEnter(e, index)}>
		<div dangerouslySetInnerHTML={{ __html: id }} className="id"></div>
		<div dangerouslySetInnerHTML={{ __html: name }} className="name"></div>
		<div
			dangerouslySetInnerHTML={{
				__html: Array.isArray(items) ? items.join(', ') : items,
			}}
			className="items"></div>
		<div
			dangerouslySetInnerHTML={{ __html: address }}
			className="address"></div>
		<div
			dangerouslySetInnerHTML={{ __html: pincode }}
			className="pincode"></div>
	</li>
);

ListItem.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	address: PropTypes.string,
	pincode: PropTypes.string,
	index: PropTypes.number,
	active: PropTypes.number,
	handleMouseEnter: PropTypes.func,
	activeRef: PropTypes.object,
};

ListItem.displayName = 'ListItem';

export default forwardRef(ListItem);
