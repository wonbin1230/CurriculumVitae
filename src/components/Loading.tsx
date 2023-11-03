import React from "react";
import { Puff } from "react-loading-icons";

interface Props {
    width?: number,
    height?: number,
}
const Loading = ({ width, height }: Props) => {
	return (
		<>
			<div className="loading">
				<Puff stroke="red" width={width} height={height} />
			</div>
		</>
	);
};

export default Loading;