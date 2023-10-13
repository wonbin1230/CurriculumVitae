import React from "react";
import { Puff } from "react-loading-icons";

interface Props {
    width?: number,
    height?: number,
}

export default (props: Props) => {
	return (
		<>
			<div className="loading">
				<Puff stroke="red" width={props.width} height={props.height} />
			</div>
		</>
	);
};
