import React from 'react';

const SignIn = (props) => {
    const { firebase, auth } = props;
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};
	return (
		<div className='SignIn'>
			<button className='sign-in' onClick={signInWithGoogle}>
				Sign in with <i class='fab fa-google'></i>
			</button>
			<p>Please be considerate towards all members of our community</p>
		</div>
	);
};

export default SignIn;