import React, { useRef } from "react";
import { Link } from "react-router-dom";

interface ItemProps {
	to: string;
	text: string;
	routerLink?: boolean;
	subLink?: boolean;
	subTitle?: string;
}

const Item = ({ to, text, routerLink = false, subLink = false, subTitle = "" }: ItemProps) => {
	return (
		<>
			{routerLink && !subLink && (
				<li>
					<Link to={to} replace>
						{text}
					</Link>
				</li>
			)}
			{!routerLink && !subLink && (
				<li>
					<a href={to}>{text}</a>
				</li>
			)}
			{!routerLink && subLink && (
				<li id="showDetail">
					<a href="#">{subTitle}</a>
					<ul>
						<li>
							<a href={to}>{text}</a>
						</li>
					</ul>
				</li>
			)}
		</>
	);
};

export default Item;
