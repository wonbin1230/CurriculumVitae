import type { MutableRefObject } from "react";
import type { Variants } from "framer-motion";

import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import { motion } from "framer-motion";
import { treeAnimation } from "../../CONSTANT";

interface IProps {
	parentRef: MutableRefObject<HTMLDivElement>;
	width: number;
	height: number;
}

interface IPoint {
	x: number;
	y: number;
}

const Line = ({ parentRef, width, height }: IProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animatedLineIndex = useRef(0);
	const [points, setPoints] = useState<IPoint[]>([]);

	useEffect(() => {
		if (parentRef.current) {
			const parentRect = parentRef.current.getBoundingClientRect();
			// canvasRef.current.width = parentRect.width;
			// canvasRef.current.height = parentRect.height;
			const frontendsRect = Array.from(parentRef.current.children[0].children)
				.reverse()
				.map((ele) => {
					const rect = ele.getBoundingClientRect();
					return {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2,
					};
				});
			const backendsRect = Array.from(parentRef.current.children[1].children)
				.reverse()
				.map((ele) => {
					const rect = ele.getBoundingClientRect();
					return {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2,
					};
				});

			const pointsConcat = [{ x: canvasRef.current.width / 2, y: canvasRef.current.height }].concat(frontendsRect);
			setPoints(pointsConcat);
		}
	}, [parentRef]);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasRef.current);

		const drawLine = () => {
			const currentPoint: IPoint = points[animatedLineIndex.current];
			const nextPoint: IPoint = points[animatedLineIndex.current + 1];
			if (!currentPoint || !nextPoint) {
				return;
			}

			const line = new fabric.Line([currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y], {
				stroke: "brown",
				strokeWidth: 10,
				selectable: false,
			});

			canvas.add(line);

			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: 500, // 動畫時間（毫秒）
				onChange: function (value) {
					line.set({
						x2: currentPoint.x + (nextPoint.x - currentPoint.x) * value,
						y2: currentPoint.y + (nextPoint.y - currentPoint.y) * value,
					});
					canvas.renderAll();
				},
				onComplete: function () {
                    animatedLineIndex.current++;
					if (animatedLineIndex.current < points.length - 1) {
						drawLine();
					}
				},
			});
		};

		drawLine();
	}, [points]);

	return <Canvas ref={canvasRef} width={width} height={height} initial="hidden" animate="visible" variants={treeAnimation} />;
};

const Canvas = styled(motion.canvas)`
	position: absolute;
    padding: 0 10%;
	left: 0;
	top: 0;
	z-index: 1;
`;

export default Line;
