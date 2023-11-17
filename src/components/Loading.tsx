import React from "react";
import { Puff } from "react-loading-icons";

interface Props {
    width?: number,
    height?: number,
    text?: string,
}
const Loading = ({ width, height, text }: Props) => {
	return (
		<>
			<div className="loading">
				<Puff stroke="red" width={width} height={height} />
                <div style={{color: "black", fontSize: "2em", fontWeight: "bold"}}>
                    {text}
                </div>
			</div>
		</>
	);
};

export default Loading;