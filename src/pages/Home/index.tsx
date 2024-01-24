import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import { Wrapper } from "./style";
import { viewBoxFadeIn } from "../../CONSTANT";

interface IProps {
	$isDarkMode: boolean;
}

const Home = (props: IProps) => {
	const typeRef = useRef(null);

	useEffect(() => {
		const typed: Typed = new Typed(typeRef.current, {
			// strings: ["HTML", "CSS", "SASS", "Node.js", "React.js", "AngularJS", "OracleDB", "PostgreSQL", "Docker", "Nginx"],
			strings: ["Shao Yu Chen"],
			loop: true,
			typeSpeed: 100,
			backSpeed: 80,
			backDelay: 1500,
		});

		return () => {
			typed.destroy();
		};
	}, []);

	return (
		<>
			<Wrapper initial="hidden" animate="visible" variants={viewBoxFadeIn}>
				<div className="cols cols0">
					<span className="topline">Hello</span>
					<h1>
						I&apos;m <br />
						<span className="multiText" ref={typeRef}></span>
					</h1>
					<p>
						曾任數化專案管理組長，因職務需求而接觸OracleDB及store procedure，發覺對於軟體相關程式有非常濃厚的興趣。
						<br />
						進而開始自學網頁相關技能並在一個月內轉職為軟體工程師，並參與開發及維運各縣市<b>建築管理系統</b>、<b>施工勘驗網路申報系統</b>，從中學習除了基本的HTML、CSS、JS之外，還有React.js、AngularJS、Node.js、Docker、Nginx等等技能並應用在自己的SideProjects中。
					</p>
					{/* <div className="btns">
						<button>Download CV</button>
						<button
							onClick={() => {
								window.open("https://github.com/wonbin1230", "_blank");
							}}>
							GitHub
						</button>
					</div> */}
				</div>
				<div className="cols cols1">
					<div className="imgbox">
						<img src={props.$isDarkMode ? "splash_dark.png" : "splash.png"} id="splash" />
						<img src="yu2.png" id="yu" />
					</div>
				</div>
			</Wrapper>
		</>
	);
};

export default Home;
