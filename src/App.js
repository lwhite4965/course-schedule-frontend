import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import LoggedOut from "./LoggedOut/LoggedOut";
import Dashboard from "./Dashboard/Dashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// Our App's Highest Layer
// Grab peb Clerk key
const PUB_KEY_CLERK = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
    const queryClient = new QueryClient();
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(ClerkProvider, { publishableKey: PUB_KEY_CLERK, children: [_jsx(SignedIn, { children: _jsx(Dashboard, {}) }), _jsx(SignedOut, { children: _jsx(LoggedOut, {}) })] }) }));
}
export default App;
