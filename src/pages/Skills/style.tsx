import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
	width: 100%;
	height: calc(100vh - 5rem);
	overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    z-index: 999;
    @media(max-width: 430px) {
        height: auto;
        flex-direction: column;
        justify-content: flex-start;
        align-items: baseline;
    }

    @keyframes object1 {
        50% {
            left: -13%;
            top: 41%;
        }
    }

    @keyframes object1-pad {
        50% {
            left: -27%;
            top: 39%;
        }
    }

    @keyframes object1-mobile {
        50% {
            left: -34%;
            top: 49%;
        }
    }

	&::before {
		position: absolute;
        z-index: -1;
        content: "";
        height: 37.5rem;
        width: 37.5rem;
        left: -12%;
        top: 40%;
        border-radius: 50%;
        background: var(--object-color);
        animation: object1 6s linear infinite;
        @media(max-width: 768px) {
            height: 30rem;
            width: 30rem;
            left: -28%;
            top: 40%;
            animation: object1-pad 6s linear infinite;
        }
        @media(max-width: 430px) {
            height: 15rem;
            width: 15rem;
            left:-35%;
            top: 50%;
            animation: object1-mobile 6s linear infinite;
        }
	}

    @keyframes skills-object2 {
        50% {
            left: 85%;
            top: 10%;
        }
    }

    @keyframes skills-object2-pad {
        50% {
            left: 85%;
            top: 16%;
        }
    }

    @keyframes skills-object2-mobile {
        50% {
            left: 85%;
            top: 16%;
        }
    }

	&::after {
		position: absolute;
        z-index: -1;
        content: "";
        height: 12.5rem;
        width: 12.5rem;
        border-radius: 50%;
        left: 85%;
        top: 12%;
        background: var(--object-color);
        animation: skills-object2 6s linear infinite;
        @media(max-width: 768px) {
            height: 8rem;
            width: 8rem;
            top: 18%;
            animation: skills-object2-pad 6s linear infinite;
        }
        @media(max-width: 430px) {
            height: 6rem;
            width: 6rem;
            left: 90%;
            top: 18%;
            animation: skills-object2-mobile 6s linear infinite;
        }
	}
`;

export const Tree = styled(motion.div)<{$isDarkMode: boolean}>`
    display: flex;
	width: 100%;
	height: calc(100vh - 5rem);
	justify-content: center;
	align-items: center;
	padding: 0 10%;
	overflow-x: hidden;
    overflow-y: hidden;
    position: absolute;
    left: 0;
    top: 0;
    color: var(--main-font-color);
    background: url(${(props) => props.$isDarkMode ? "tree_dark.png" : "tree.png"}) no-repeat center 30%;
    background-size: cover cover;
    z-index: -1;
`;

export const Frontend = styled(motion.section)`
    width: 50%;
    height: 90%;
    display: flex;
    flex-direction: column;
    padding-top: 8%;
    padding-left: 18%;
`;

export const Backend = styled(motion.section)`
    width: 50%;
    height: 90%;
    display: flex;
    flex-direction: column;
    /* padding-top: 8%; */
    padding-right: 18%;
`;

export const SkillCard = styled(motion.div)<{$index: number, $type: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-color);
    /* background-image: linear-gradient(to bottom right, green, #02b202); */
    width: 6em;
    height: 2em;
    font-size: 2em;
    border-radius: 100%;
    box-shadow: black 0 10px 10px 0;
    position: relative;
    z-index: 8888;
    ${(props) => {
        return props.$type === "frontend" ? (props.$index % 2 === 0 ? "align-self: flex-end;" : "align-self: flex-start;") : (props.$index % 2 === 0 ? "align-self: flex-start;" : "align-self: flex-end;");
    }}
    /* align-self: ${(props) => props.$index % 2 === 0 ? "flex-end" : "flex-start"}; */
    ${(props) => props.$index % 2 === 0 ? "margin-right: 5%;" : "margin-left: 5%;"}
    ${(props) => props.$index !== 0 && "margin-top: 8%;"}
`;