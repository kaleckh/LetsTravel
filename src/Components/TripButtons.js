import React, { useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import './TripButtons.css';

export default function TripButton() {
	console.log('render');
	const [ isDeletingTrip, setIsDeletingTrip ] = useState(false);
	// useClickOutside(
	//     setIsDeletingTrip(false)    )
	return (
		<div className="deleteButtons">
			{isDeletingTrip ? (
				<div>
					<button className="deleteItems">Edit</button>
					<button className="deleteItems">Delete</button>
				</div>
			) : (
				<button
					className="deleteItems"
					onClick={(event) => {
						setIsDeletingTrip(true);
					}}
				>
					...
				</button>
			)}
		</div>
	);
}
