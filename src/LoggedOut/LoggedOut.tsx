import "./LoggedOut.css";
import { SignUpButton, SignInButton } from "@clerk/clerk-react";

export const LoggedOut = () => {
	return (
		<div className={"vertParent"}>
			<p className="helperText">Returning?</p>
			<SignInButton mode="modal">
				<button className="authBtn">Log In</button>
			</SignInButton>
			<p className={"helperText"}>New User?</p>
			<SignUpButton>
				<button className="authBtn">Sign Up</button>
			</SignUpButton>
		</div>
	);
};

export default LoggedOut;
