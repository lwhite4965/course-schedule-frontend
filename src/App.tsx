import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import LoggedOut from "./LoggedOut/LoggedOut";
import Dashboard from "./Dashboard/Dashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Our App's Highest Layer

// Grab peb Clerk key
const PUB_KEY_CLERK = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}

export default App;
