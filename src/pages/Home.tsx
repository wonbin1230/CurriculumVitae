import React from "react";
import { useRef, useEffect } from "react";
import Typed from "typed.js";

export default () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["HTML", "CSS", "Node.js", "OracleDB", "PostgreSQL", "Docker"],
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 1500,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <>
            <div className="wrapper">
                <div className="cols cols0">
                    <span className="topline">Hello</span>
                    <h1>
                        My Skills <br /><span className="multiText" ref={el}></span>
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
                        <img src="splash.png" id="splash" />
                        <img src="yu2.png" id="yu" />
                    </div>
                </div>
            </div>
        </>
    );
};
