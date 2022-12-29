import React, { useState, useEffect } from 'react';
import './MyTrips.css';
import TripButtons from './TripButtons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { async } from '@firebase/util';

function MyTrips() {
	const [ profileToggle, setProfileToggle ] = useState(false);
	const [ myTrips, setMyTrips ] = useState([]);
	const [ myId, setMyId ] = useState('');

	const [ tripLocation, setTripLocation ] = useState('');
	const [ tripDates, setTripDates ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isSettingLocation, setIsSettingLocation ] = useState(false);
	const [ isAddingTrip, setIsAddingTrip ] = useState(true);
	const [ isSettingDate, setIsSettingDate ] = useState(false);
	const [ isDeletingTrip, setIsDeletingTrip ] = useState(false);
	const [ value, onChange ] = useState([ new Date(), new Date() ]);
	const [startDate, setStartDate] = useState(value[0])
	const [endDate, setEndDate] = useState(value[1])
	
	

	const Navigate = useNavigate();
	const { search } = useLocation();
	const params = new URLSearchParams(search);

	const logout = async () => {
		await signOut(auth);
	};

	useEffect(() => {
		axios({
			method: 'get',
			url: `http://localhost:3001/person/${auth.currentUser.email}`
		}).then((res) => {
			setMyId(res.data[0].id);
			axios({
				method: 'get',
				url: `http://localhost:3001/personTrips/${res.data[0].id}`
			}).then((res) => {
				setIsLoading(false);
				setMyTrips(res.data);
			});
		});
	}, []);
	const handleSubmit = async (id, location, startDate, endDate) => {
		try {
			let newTrip = await axios.post(`http://localhost:3001/newtrip/${id}`, {
				id: myId,
				startDate: startDate,
				endDate: endDate
			});
			setMyTrips([ ...myTrips, newTrip.data[0] ]);
			setIsAddingTrip(false);
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleDelete = async (id) => {
		try {
			let deleteTrip = await axios.delete(`http://localhost:3001/deletetrip/${id}`, {});
			setMyTrips(myTrips.filter((trip) => trip.id !== id));
		} catch (error) {
			console.log(error.message);
		}
	};
	const closeMenu = () => {
		setIsDeletingTrip(false);
	};

	const changeDateFormat = () => {
	for(let i = 0; i < value.length; i++) {
		let day = value[i].getDate()
		let month = value[i].getMonth()
		let year = value[i].getFullYear()
		let fullYear = `${day}/${month + 1}/${year}`
		if(i === 0) {
			setStartDate(fullYear)
		} else {
			setEndDate(fullYear)
		}
	}
}
	
	console.log(value[0].getDate(), 'this is the month')
	return (
		<div
			onClick={() => {
				closeMenu();
			}}
		>
			{isAddingTrip &&
				(isLoading ? (
					<div className="myTripsWholeScreen">
						<div className="tripContainer">
							<div>Loading</div>
						</div>
					</div>
				) : (
					<div className="wholeScreen">
						<header className="header">
							<div
								onClick={() => {
									Navigate(`/person/${auth.currentUser.uid}`);
								}}
								className="home"
							>
								HOME
							</div>
							<div className="headerButtonContainer">
								<div
									onClick={(event) => {
										setIsSettingLocation(true);
										setIsAddingTrip(false);
									}}
									className="headerItem"
								>
									CREATE A TRIP
								</div>
								<div
									onClick={() => {
										Navigate(`/myTrips/${auth.currentUser.uid}`);
									}}
									className="headerItem"
								>
									MY TRIPS
								</div>
								<div
									onClick={() => {
										Navigate(`/profile/${auth.currentUser.uid}`);
									}}
									className="headerItem"
								>
									MY PROFILE
								</div>
							</div>
						</header>
						<div className="tripContainer">
							<div className="title">CURRENT TRIPS</div>
							{myTrips.length === 0 ? (
								<div>
									<div className="bigTags">Oops looks like you have no trips!</div>
									<div>Create one Here</div>
								</div>
							) : (
								<div>
									{myTrips.map((trip) => {
										console.log(trip);
										return (
											<div className="myTripsContainer">
												<div
													onClick={() => {
														console.log(myTrips);
													}}
													className="tripBox"
												>
													<div
														onClick={() => {
															Navigate(`/trip/${trip.id}`);
														}}
														className="tripLocation"
													>
														<div>{trip.trip_location}</div>
													</div>
													<div
														onClick={() => {
															Navigate(`/trip/${trip.id}`);
														}}
														className="tripDate"
													>
														<div>{trip.trip_dates}</div>
													</div>
													<TripButtons />
												</div>
											</div>
										);
									})}
								</div>
							)}
							<div
								onClick={() => {
									setIsSettingLocation(true);
									setIsAddingTrip(false);
								}}
								className="tripLocation"
							>
								+ NEW TRIP
							</div>
						</div>
					</div>
				))}
			{isSettingLocation && (
				<div className="myTripsWholeScreen">
					<header className="header">
						<div
							onClick={() => {
								Navigate(`/person/${auth.currentUser.uid}`);
							}}
							className="home"
						>
							HOME
						</div>
						<div className="headerButtonContainer">
							<div
								onClick={(event) => {
									setIsSettingLocation(true);
									setIsAddingTrip(false);
								}}
								className="headerItem"
							>
								CREATE A TRIP
							</div>
							<div
								onClick={() => {
									Navigate(`/myTrips/${auth.currentUser.uid}`);
								}}
								className="headerItem"
							>
								MY TRIPS
							</div>
							<div
								onClick={() => {
									Navigate(`/profile/${auth.currentUser.uid}`);
								}}
								className="headerItem"
							>
								MY PROFILE
							</div>
						</div>
					</header>
					<div className="createTripContainer">
						<div className="halfTripContainer">
							<div className="blueBoxWords">Start your journey with us</div>
							<div className="smallBlueBoxWords">Join our community of thousands</div>
						</div>

						<div className="otherHalfContainer">
							<div
								onClick={() => {
									setIsSettingLocation(false);
									setIsAddingTrip(true);
								}}
								className="x"
							>
								x
							</div>
							<div className="backWrapper">
								{/* <button
									onClick={() => {
										setIsAddingTrip(true);
										setIsSettingLocation(false);
									}}
									className="back"
								>
									back
								</button> */}
							</div>
							<div className="createTripInputContainer">
								<div className="myTripInputContainer">
									<div>city</div>
									<input
										className="createTripInput"
										placeholder="City"
										onChange={(event) => {
											setTripLocation(event.target.value);
										}}
										type="text"
									/>
								</div>
								<div>
									<div>State/Country</div>
									<input placeholder="State/Country" type="text" className="createTripInput" />
								</div>
							</div>
							<DateRangePicker onChange={onChange} value={value} className="datePicker" />
							<input className="tripInfo" />
							<button
								className="createButton"
								onClick={() => {
									setIsSettingDate(true);
									setIsSettingLocation(false);
									changeDateFormat()
								}}
							>
								Next!
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default MyTrips;
