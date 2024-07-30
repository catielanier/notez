import React, { Suspense } from "react";
import { createRoot } from "react-dom/client"
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContextProvider from "./contexts/UserContext";
import LanguageContextProvider from "./contexts/LanguageContext";
import AxiosContextProvider from "./contexts/AxiosContext";
import * as serviceWorker from "./serviceWorker";

import "./i18n";

const main = (
	<Suspense fallback="loading">
		<LanguageContextProvider>
			<AxiosContextProvider>
				<UserContextProvider>
					<App />
				</UserContextProvider>
			</AxiosContextProvider>
		</LanguageContextProvider>
	</Suspense>
);

const container = document.getElementById("root")
const root = createRoot(container);
root.render(main)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
