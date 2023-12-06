import type { RefObject, Dispatch } from "react";

import React, { useRef } from "react";
import { NavBar, Logo, ItemList, Community, MenuIconMobile, ItemListMobile, ThemeSwitcer } from "./style";
import Item from "./widgets/Item";

interface IProps {
    $isDarkMode: boolean,
    $handleTheme: ($darkMode: boolean) => void,
}

const Nav = (props: IProps) => {
    const navItemsMobileRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        if (navItemsMobileRef.current) {
            const currentDisplay: string = navItemsMobileRef.current.style.display;
            navItemsMobileRef.current.style.display = currentDisplay === "none" || !currentDisplay ? "block" : "none";
        }
    };

	return (
		<>
			<NavBar>
				<Logo>
                    <a href="https://yu-website.duckdns.org/">Yu<b>.</b></a>
				</Logo>
				<ItemList>
                    <Item to="https://yu-website.duckdns.org/" text="Home" />
                    <Item to="#" text="About" />
                    <Item to="#" text="Skills" />
                    <Item to="https://yu-website.duckdns.org/ytdl" text="YouTube Downloader" subLink subTitle="SideProjects" />
				</ItemList>
				<Community>
					<a href="https://www.linkedin.com/in/wonbin1230/" target="_blank" rel="noreferrer">
						<i className="fab fa-linkedin"></i>
					</a>
					<a href="https://www.instagram.com/yu___1230/" target="_blank" rel="noreferrer">
						<i className="fab fa-instagram"></i>
					</a>
				</Community>
                <MenuIconMobile>
                    <a id="menu" href="#" onClick={toggleMenu}><i className="fa fa-bars"></i></a>
                </MenuIconMobile>
                <ThemeSwitcer>
                    {!props.$isDarkMode ? (
                        <i className="fa-solid fa-moon"
                            onClick={() => {
                                props.$handleTheme(true);
                            }}>
                        </i>
                    ) : (
                        <i className="fa-solid fa-sun"
                            onClick={() => {
                                props.$handleTheme(false);
                            }}>
                        </i>
                    )}
                </ThemeSwitcer>
			</NavBar>
            <ItemListMobile ref={navItemsMobileRef}>
                <ul>
                    <Item to="/" text="Home" />
					<Item to="#" text="About" />
                    <Item to="#" text="Skills" />
                    <Item to="ytdl" text="YouTube Downloader" subLink subTitle="SideProjects" />
				</ul>
            </ItemListMobile>
		</>
	);
};

export default Nav;