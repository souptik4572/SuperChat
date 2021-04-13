import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignOut from './components/SignOut/SignOut';

firebase.initializeApp({
	apiKey: 'AIzaSyDLFl7zGbe8tOV7Yoc3YpUrHIJJEHqRwes',
	authDomain: 'superchat-d952f.firebaseapp.com',
	projectId: 'superchat-d952f',
	storageBucket: 'superchat-d952f.appspot.com',
	messagingSenderId: '394105402378',
	appId: '1:394105402378:web:9cdfb7929caa76bf845bf3',
	measurementId: 'G-R4BM411BZ1',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	const [user] = useAuthState(auth); // returns an object containing user data if signed in, otherwise return null
	return (
		<div className='App'>
			<header>
				<h1>Welcome to SuperChat</h1>
				<SignOut auth={auth} />
			</header>
			<section>
				{user ? (
					<ChatRoom firestore={firestore} firebase={firebase} auth={auth} />
				) : (
					<SignIn firebase={firebase} auth={auth} />
				)}
			</section>
		</div>
	);
}

export default App;
