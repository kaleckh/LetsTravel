import './Person.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
function Home() {
	const Navigate = useNavigate();
	const [ tripLocation, setTripLocation ] = useState('');
	const [ people, setPeople ] = useState([]);
	const [ tripDates, setTripDates ] = useState('');
	const [ createTrip, setCreateTrip ] = useState(true);
	const [ profileToggle, setProfileToggle ] = useState(false);
	const [ isSettingLocation, setIsSettingLocation ] = useState(false);
	const [ isAddingTrip, setIsAddingTrip ] = useState(false);
	const [ isSettingDate, setIsSettingDate ] = useState(false);
	const [ myTrips, setMyTrips ] = useState([]);
	const [ myId, setMyId ] = useState('');
	const [tripCity, setTripCity] = useState("");
  const [tripState, setTripState] = useState("");
  const [value, onChange] = useState([new Date(), new Date()]);
	const handleSubmit = async (id, location, dates) => {
		try {
			let newTrip = await axios.post('http://localhost:3001/newtrip', {
				id: myId,
				location: tripLocation,
				dates: tripDates
			});
			setMyTrips([ ...myTrips, newTrip.data[0] ]);
			setIsAddingTrip(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	let changedData = people.map((person) => {
		return {
			value: person.id,
			label: `${person.firstname}`
		};
	});

	useEffect(() => {
		axios({
			method: 'get',
			url: `http://localhost:3001/personTrips/${auth.currentUser.displayName}`
		}).then((res) => {
			setPeople()
		});
	}, []);

	return (
		<div>
			<div />

			{createTrip ? (
				<div className="wholeScreen">
					<header className="header">
						<div
							onClick={() => {
								Navigate(`/person/${auth.currentUser.uid}`);
							}}
							className="home"
						>
							Home
						</div>
						<div className="headerButtonContainer">
							<div
								onClick={(event) => {
									setIsSettingLocation(true);
									setIsAddingTrip(false);
									setCreateTrip(false);
								}}
								className="headerItem"
							>
								CREATE A TRIP
							</div>
							<div
								className="headerItem"
								onClick={() => {
									Navigate(`/myTrips/${auth.currentUser.uid}`);
								}}
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
					<div className="mainBox">
						<div className="title">Where do you want to go?</div>
						<Select className="mainInput" options={changedData} onChange={(obj) => {}} />
					</div>
					<div className="bottomContainer">
						<div className="bubble">Meet new Friends!</div>
						<div className="bubble">Check reviews on previous experiences from people</div>
						<div className="bubble">Travel the world</div>
					</div>
				</div>
			) : (
				<div>
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
							<div className="smallBlueBoxWords">
							  Join our community of thousands
							</div>
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
									setTripCity(event.target.value);
								  }}
								  type="text"
								/>
							  </div>
							  <div>
								<div>State/Country</div>
								<input
								  onChange={(event) => {
									setTripState(event.target.value);
								  }}
								  placeholder="State/Country"
								  type="text"
								  className="createTripInput"
								/>
							  </div>
							</div>
							<DateRangePicker
							  onChange={onChange}
							  value={value}
							  className="datePicker"
							/>
							<input className="tripInfo" />
							<button
							  className="createButton"
							  onClick={() => {
								Promise.all([handleSubmit(), setIsSettingDate(false)]).then(
								  () => {
									setIsAddingTrip(true);
								  }
								);
							  }}
							>
							  Next!
							</button>
						  </div>
						</div>
					  </div>
					)}
					{isSettingDate && (
						<div className="mainContainer">
							<div className="mainBox">
								<div className="backWrapper">
									<button
										onClick={() => {
											setIsSettingDate(false);
											setIsSettingLocation(true);
										}}
										className="back"
									>
										back
									</button>
								</div>
								<input
									placeholder="What are the dates?"
									onChange={(event) => {
										setTripDates(event.target.value);
									}}
									type="text"
								/>
								<button
									onClick={() => {
										Promise.all([ setIsSettingDate(false), handleSubmit() ]).then(() => {
											setIsAddingTrip(true);
										});
									}}
								>
									Create Trip!
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
