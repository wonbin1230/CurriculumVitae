import type { RefObject } from "react";

import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import { Wrapper } from "./style";

interface IProps {
    $isDarkMode: boolean,
}

const Home = (props: IProps) => {
    const typeRef: RefObject<HTMLElement> = useRef(null);

    useEffect(() => {
        const typed: Typed = new Typed(typeRef.current, {
            strings: ["HTML", "CSS", "Node.js", "OracleDB", "PostgreSQL", "Docker"],
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
            <Wrapper>
                <div className="cols cols0">
                    <span className="topline">Hello</span>
                    <h1>
                        My Skills <br /><span className="multiText" ref={typeRef}></span>
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo itaque rerum et qui dicta voluptatum
                        molestiae, omnis assumenda voluptas nostrum impedit
                        nesciunt distinctio natus ullam aliquid at, est quam
                        consequuntur.
                    </p>
                    <div className="btns">
                        <button>Download CV</button>
                        <button>Hire Me</button>
                    </div>
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