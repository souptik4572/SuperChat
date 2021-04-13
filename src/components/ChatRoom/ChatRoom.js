import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage/ChatMessage';

const ChatRoom = (props) => {
	const { firestore, firebase, auth } = props;
	const dummy = useRef();
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(25);
	const [messages] = useCollectionData(query, { idField: 'id' });
	const [formValue, setFormValue] = useState('');
	const sendMessage = async (event) => {
		event.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});
		setFormValue('');
		dummy.current.scrollIntoView({ behaivour: 'smooth' });
	};
	return (
		<>
			<main>
				{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} auth={auth} />)}
				<span ref={dummy}></span>
			</main>
			<form onSubmit={sendMessage}>
				<input
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder='say something nice'
				/>
				<button type='submit' disabled={!formValue}>
					<i class='fas fa-paper-plane fa-lg'></i>
				</button>
			</form>
		</>
	);
};

export default ChatRoom;
