import React, { useState, useRef, useEffect } from "react";
import { viewBoxFadeIn, treeAnimation, skillCardsAnimation } from "../../CONSTANT";
import { Wrapper, Tree, Frontend, Backend, SkillCard } from "./style";
import Line from "../../components/Line";
import Leaves from "../../components/Leaves";

interface IProps {
	$isDarkMode: boolean;
}

const Skills = (props: IProps) => {
	const frontends: string[] = ["HTML", "CSS", "SASS", "React.js", "AngularJS"];
	const backends: string[] = ["Node.js", "OracleDB", "TypeScript", "PostgreSQL", "Docker", "Nginx"];

    const treeRef = useRef(null);

	return (
		<>
			<Wrapper initial="hidden" animate="visible" variants={viewBoxFadeIn}>
				<Leaves width={window.innerWidth} height={window.innerHeight} />
                {/* <Line
                    parentRef={treeRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                /> */}
				<Tree
                    ref={treeRef}
					$isDarkMode={props.$isDarkMode}
					initial="hidden"
					animate="visible"
                    variants={treeAnimation}
                >
					<Frontend>
						{frontends.map((frontend: string, index: number) => {
							return (
								<SkillCard
                                    key={index}
                                    $index={index}
                                    $type={"frontend"}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.3 }}
                                    variants={skillCardsAnimation}
                                >
									{frontend}
								</SkillCard>
							);
						})}
					</Frontend>
					<Backend>
						{backends.map((backend: string, index: number) => {
							return (
								<SkillCard
                                    key={index}
                                    $index={index}
                                    $type={"backend"}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.3 }}
                                    variants={skillCardsAnimation}
                                >
									{backend}
								</SkillCard>
							);
						})}
					</Backend>
				</Tree>
			</Wrapper>
		</>
	);
};

export default Skills;
