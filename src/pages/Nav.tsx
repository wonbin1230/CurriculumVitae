import type { RefObject } from "react";

import React, { useRef } from "react";
import { Outlet, Link } from "react-router-dom";

const Nav = () => {
    const navItemsMobileRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        if (navItemsMobileRef.current) {
            const currentDisplay: string = navItemsMobileRef.current.style.display;
            navItemsMobileRef.current.style.display = currentDisplay === "none" || !currentDisplay ? "block" : "none";
        }
    };

	return (
		<>
			<nav>
				<div className="logo">
					<Link to="/">Yu<b>.</b></Link>
				</div>
				<ul className="navItems">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">Skills</a>
					</li>
					<li id="showDetail">
						<a href="#">SideProjects</a>
						<ul>
							<li>
                                <Link to="/ytdl">YouTube Downloader</Link>
							</li>
						</ul>
					</li>
				</ul>
				<div className="links">
					<a href="#">
						<i className="fab fa-linkedin"></i>
					</a>
					<a href="#">
						<i className="fab fa-instagram"></i>
					</a>
					<a href="#">
						<i className="fab fa-twitter"></i>
					</a>
				</div>
                <div className="menuIconMobile">
                    <a id="menu" href="#" onClick={toggleMenu}><i className="fa fa-bars"></i></a>
                </div>
			</nav>
            <div className="navItemsMobile" ref={navItemsMobileRef}>
                <ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">Skills</a>
					</li>
					<li id="showDetail">
						<a href="#">SideProjects</a>
						<ul>
							<li>
								<a href="/ytdl">YouTube Downloader</a>
							</li>
						</ul>
					</li>
				</ul>
            </div>

			<Outlet />
		</>
	);
};

export default Nav;