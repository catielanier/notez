import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContextProvider from "./contexts/UserContext";
import LanguageContextProvider from "./contexts/LanguageContext";
import * as serviceWorker from "./serviceWorker";

import "./i18n";

ReactDOM.render(
	<Suspense fallback="loading">
		<LanguageContextProvider>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</LanguageContextProvider>
	</Suspense>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
