import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// The app's main injection point..... we shouldn't have to touch this at all
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
