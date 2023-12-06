import React, { useRef } from "react";

interface ItemProps {
    to: string,
    text: string,
    subLink?: boolean,
    subTitle?: string,
}

const Item = ({ to, text, subLink = false, subTitle = "" }: ItemProps) => {
    return (
        <>
            {!subLink ? (
                <li>
                    <a href={to}>{text}</a>
                </li>
            ) : (
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