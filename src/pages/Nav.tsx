import React from "react";
import { Outlet, Link } from "react-router-dom";

const navBar = () => {
	return (
		<>
			<nav>
				<div className="logo">
					Yu<b>.</b>
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
								<a href="/ytdl">YouTube Downloader</a>
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
			</nav>

			<Outlet />
		</>
	);
};

export default navBar;