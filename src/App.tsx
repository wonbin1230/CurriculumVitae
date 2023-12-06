import type { Dispatch } from "react";

import React, { useState, useEffect } from "react";
import { Container } from "./style";
import Nav from "./components/Nav";
import Home from "./components/Home";

const App = () => {
    const [isDarkMode, setIsDarkMode]: [boolean, Dispatch<boolean>] = useState<boolean>(false);

    const handleTheme = ($isDarkMode: boolean) => {
        if ($isDarkMode) {
            setIsDarkMode(true);
            localStorage.setItem("isDarkMode", "true");
            document.documentElement.style.setProperty("--theme-switcher", "rgb(240 196 32)");
            document.documentElement.style.setProperty("--background-color", "#2F2F2F");
            document.documentElement.style.setProperty("--input-color", "white");
            document.documentElement.style.setProperty("--main-font-color", "white");
            document.documentElement.style.setProperty("--second-font-color", "#94cbea");
            document.documentElement.style.setProperty("--third-font-color", "rgb(0, 151, 238)");
            document.documentElement.style.setProperty("--hover-color", "rgb(0, 151, 238)");
            document.documentElement.style.setProperty("--card-hover-color", "#2F2F2F");
            document.documentElement.style.setProperty("--object-color", "linear-gradient(45deg, #5F5F5F, #D6ECF0)");
        }
        else {
            setIsDarkMode(false);
            localStorage.removeItem("isDarkMode");
            document.documentElement.style.setProperty("--theme-switcher", "rgb(30 48 80)");
            document.documentElement.style.setProperty("--background-color", "#f3f5f8");
            document.documentElement.style.setProperty("--input-color", "black");
            document.documentElement.style.setProperty("--main-font-color", "#3d535f");
            document.documentElement.style.setProperty("--second-font-color", "rgba(128, 0, 255, 0.5)");
            document.documentElement.style.setProperty("--third-font-color", "#7f00ff");
            document.documentElement.style.setProperty("--hover-color", "#7f00ff");
            document.documentElement.style.setProperty("--card-hover-color", "#f3f5f8");
            document.documentElement.style.setProperty("--object-color", "linear-gradient(45deg, #7f00ff, pink)");
        }
    };

    useEffect(() => {
        const localStorageIsDarkMode: string = localStorage.getItem("isDarkMode");
        if (localStorageIsDarkMode) {
            handleTheme(true);
        }
        else {
            handleTheme(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	return (
		<>
			<Container>
				<Nav $isDarkMode={isDarkMode} $handleTheme={handleTheme} />
				<Home $isDarkMode={isDarkMode} />
			</Container>
		</>
	);
};

export default App;
