import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import LoggedOut from "./LoggedOut/LoggedOut";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";

// Our App's Highest Layer

// Grab peb Clerk key
const PUB_KEY_CLERK = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
	return (
		<ClerkProvider publishableKey={PUB_KEY_CLERK}>
			{/* Return Dashboard when signed in */}
			<SignedIn>
				<Dashboard />
			</SignedIn>
			{/* Return LoggedOut when signed out */}
			<SignedOut>
				<LoggedOut />
			</SignedOut>
		</ClerkProvider>
	);
}

export default App;
