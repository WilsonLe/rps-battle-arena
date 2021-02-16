import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// import socketIOClient from 'socket.io-client';

// Components
import WebcamComponent from './component/Webcam';

const App = ({ socket }) => {
	const [finding, setFinding] = useState(false);
	const [found, setFound] = useState(false);

	const startHandler = (e) => {
		socket.emit('startFinding');
		console.log('start finding...');
		setFinding(true);
	};

	const stopHandler = (e) => {
		socket.emit('stopFinding');
		console.log('stop finding...');
		setFinding(false);
	};

	useEffect(() => socket.on('matchFound', () => setFound(true)), [socket]);

	return (
		<AppContainer>
			<GlobalStyle />
			<Title>Rock Paper Scissors Battle Arena</Title>
			{finding ? (
				found ? (
					<Button disabled>Match found ...</Button>
				) : (
					<Button onClick={stopHandler}>Stop</Button>
				)
			) : (
				<Button onClick={startHandler}>Start</Button>
			)}
			{/* {found ? <WebcamComponent /> : null} */}
			<WebcamComponent />
		</AppContainer>
	);
};

const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	body {
		font-family: "Roboto", sans-serif;
		overflow: scroll;
	}
`;

const AppContainer = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: '#f6f6f6';
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 1.75rem;
	text-align: center;
	margin: 1.75rem;
	color: black;
`;

const Button = styled.button`
	font-size: 1.75rem;
	margin: 1.75rem;
	padding: 1rem;
`;

export default App;
