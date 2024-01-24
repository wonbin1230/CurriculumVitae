import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
    display: flex;
	width: 100%;
	height: calc(100vh - 5rem);
	justify-content: center;
	align-items: center;
	padding: 0 10%;
	overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    z-index: 888;
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

    @keyframes object2 {
        50% {
            left: 35%;
            top: 10%;
        }
    }

    @keyframes object2-pad {
        50% {
            left: 35%;
            top: 16%;
        }
    }

    @keyframes object2-mobile {
        50% {
            left: 85%;
            top: 16%;
        }
    }

	&::after {
		position: absolute;
        content: "";
        height: 12.5rem;
        width: 12.5rem;
        border-radius: 50%;
        left: 35%;
        top: 12%;
        background: var(--object-color);
        animation: object2 6s linear infinite;
        @media(max-width: 768px) {
            height: 8rem;
            width: 8rem;
            top: 18%;
            animation: object2-pad 6s linear infinite;
        }
        @media(max-width: 430px) {
            height: 6rem;
            width: 6rem;
            left: 90%;
            top: 18%;
            animation: object2-mobile 6s linear infinite;
        }
	}

	.cols {
		width: 50%;
	}

	.cols0 {
		width: 70%;
		z-index: 5;
        @media(max-width: 430px) {
            width: 100%;
        }

		.topline {
			display: block;
			position: relative;
			font-size: 2.1875rem;
			list-style: .3125rem;
			color: var(--main-font-color);

			&::after {
				position: absolute;
				content: "";
				height: .25rem;
				width: 2.8125rem;
				bottom: .625rem;
				background-color: var(--third-font-color);
			}
		}

		h1 {
			display: block;
			font-size: 6vw;
			font-weight: 900;
			color: var(--main-font-color);

			> .muiltiText {
				color: var(--main-font-color);
				text-transform: capitalize;
			}
		}

		p {
			display: block;
			width: 90%;
			font-size: 1.2rem;
			color: var(--main-font-color);
            @media(max-width: 768px) {
                font-size: 1rem;
            }
            @media(max-width: 430px) {
                font-size: .8rem;
            }
		}

		button {
			outline: none;
			border: none;
			cursor: pointer;
			font-size: 1.5625rem;
			font-weight: 400;
			color: #fff;
			background-color: #3d535f;
			padding: .5rem .875rem;
			margin: 2.5rem .3125rem;
			letter-spacing: .125rem;
			text-transform: capitalize;
			box-shadow: 0 .9375rem .625rem rgba(0, 0, 0, 0.4);
            @media(max-width: 768px) {
                font-size: 1.2rem;
            }
            @media(max-width: 430px) {
                font-size: .8rem;
                margin: .5rem .5rem;
            }

			&:hover {
				background-color: var(--hover-color);
			}
		}

		.btns {
			width: 100%;
            @media(min-width: 769px) {
                position: relative;
            }
		}
	}

	.cols1 {
		.imgbox {
			position: relative;
			width: 100%;
			height: 100%;
            @media(max-width: 1280px) {
                width: 130%;
            }
            @media(max-width: 768px) {
                width: 160%;
            }
            @media(max-width: 430px) {
                width: 200%;
            }

            @keyframes animate {
                50% {
                    top: 49%;
                    left: 51%;
                    width: 155%;
                }
            }

            @keyframes animate-mobile {
                50% {
                    top: 49%;
                    left: 51%;
                    width: 95%;
                }
            }

			#splash {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(-35deg);
				width: 160%;
				filter: saturate(200%);
				animation: animate 4s linear infinite;
                @media(max-width: 430px) {
                    width: 100%;
                    transform: translate(-45%, -45%) rotate(0deg);
                    animation: animate-mobile 4s linear infinite;
                }
			}
		}

        @keyframes splash {
            50% {
                right: 1.875rem;
                top: -5.625rem;
            }
        }

		#splash {
			position: relative;
			height: 100%;
			width: calc(140% - 5rem);
			top: -8.75rem;
			right: 3.125rem;
			transform: rotateY(180deg);
			animation: splash 4s linear infinite;
		}

		#yu {
			position: relative;
			height: 100%;
			width: calc(100% - 5rem);
			top: -1.25rem;
			right: 1.875rem;
            @media(max-width: 430px) {
                width: 100%;
                top: 0;
                right: 5%;
            }
		}
	}
`;