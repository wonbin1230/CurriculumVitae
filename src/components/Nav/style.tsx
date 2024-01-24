import styled from "styled-components";

export const NavBar = styled.nav`
    display: flex;
    position: relative;
	width: 100%;
	justify-content: space-around;
	line-height: 5rem;
	z-index: 999;
    background-color: var(--background-color);
`;

export const Logo = styled.div`
    display: flex;
	font-size: 2.5rem;
	font-weight: 800;
	color: var(--main-font-color);
	letter-spacing: .1875rem;
	cursor: pointer;
	text-transform: uppercase;
    @media(max-width: 768px) {
        font-size: 2rem;
    }

    a {
        color: var(--main-font-color);
        text-decoration: none;
    }

    b {
		font-size: 4.375rem;
		color: var(--third-font-color);
        @media(max-width: 768px) {
            font-size: 4rem;
        }
	}
`;

export const ItemList = styled.ul`
    display: flex;
    @media(max-width: 768px) {
        width: 30rem;
    }
    @media(max-width: 430px) {
        display: none;
    }

    li {
		list-style: none;
		margin: 0 0.9rem;

		a {
			font-size: 1.5625rem;
			color: var(--main-font-color);
			letter-spacing: .1875rem;
			text-decoration: none;
			text-transform: capitalize;
            @media(max-width: 768px) {
                font-size: 1.3rem;
            }

			&:hover {
				color: var(--hover-color);
			}
		}
	}

    #showDetail {
		li,
		li a {
			line-height: 0;
			visibility: hidden;
			opacity: 0;
			letter-spacing: .1875rem;
			text-decoration: none;
			transform: rotate(720deg);
			transition: all 0.5s linear;
		}

		&:hover {
			li,
			li a {
                line-height: 1;
                font-size: 1.5625rem;
				visibility: visible;
				opacity: 1;
				color: var(--main-font-color);
				text-decoration: none;
				transform: rotate(0deg);
                @media(max-width: 768px) {
                    line-height: 1;
                    font-size: 1.3rem;
                }

                &:hover {
                    color: var(--hover-color);
                }
			}
		}
	}
`;

export const Community = styled.div`
    white-space: nowrap;

    > a {
        color: var(--main-font-color);
        font-size: 1.875rem;
        margin: .15625rem .625rem;
        @media(max-width: 768px) {
            font-size: 1.5rem;
            margin: .15625rem .4375rem;
        }

        &:hover {
            color: var(--hover-color);
        }
    }
`;

export const MenuIconMobile = styled.div`
    display: none;
    > a {
        color: var(--main-font-color);
    }
    @media(max-width: 430px) {
        display: block;
        font-size: 1.5rem;
    }
`;

export const ItemListMobile = styled.div`
    @keyframes navItemsMobile {
        0% {
            top: -10%;
        }
        100% {
            top: 8%;
        }
    }

    display: none;
    position: absolute;
    width: 100%;
    background-color: var(--background-color);
    z-index: 999;
    animation: navItemsMobile 0.1s linear;

    li {
        list-style: none;
        padding-left: 20%;
    }

    a {
        color: var(--main-font-color);
		text-decoration: none;
		text-transform: capitalize;

        &:hover {
            color: var(--hover-color);
        }
    }

    #showDetail {
        li,
        li a {
            line-height: 0;
            visibility: hidden;
            opacity: 0;
            text-decoration: none;
            transform: rotate(720deg);
            transition: all 0.5s linear;
            padding-left: 5%;
        }

        &:hover {
            li,
            li a {
                line-height: 1;
                visibility: visible;
                opacity: 1;
                color: var(--main-font-color);
                text-decoration: none;
                transform: rotate(0deg);
            }

            &:hover {
                color: var(--hover-color);
            }
        }
    }
`;

export const ThemeSwitcer = styled.div`
    font-size: 1.875rem;
    cursor: pointer;
    > i {
        min-width: 30px;
        color: var(--theme-switcher);
        transform: rotate(0deg);
        transition: transform 0.5s linear;
        &:hover {
            transform: rotate(360deg);
        }
    }
`;