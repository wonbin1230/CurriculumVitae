import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface IProps {
	width: number;
	height: number;
}

interface ILeaf {
	x: number;
	y: number;
	dx: number;
	dy: number;
	rotation: number;
}

const Leaves = ({ width, height }: IProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const leafColor = "#228B22";
		const leafSpeed = 0.5;
		const fixedWidth = 5;
		const fixedHeight = 10;

		const createLeaf = () => {
			const x = Math.random() * canvas.width;
			const y = -20;
			const dx = Math.random() * leafSpeed - leafSpeed / 2;
			const dy = Math.random() * leafSpeed + 1;
			const rotation = Math.random() * 360;

			return { x, y, dx, dy, rotation };
		};

		const drawLeaf = (leaf: ILeaf) => {
			ctx.beginPath();
			ctx.ellipse(leaf.x, leaf.y, fixedWidth, fixedHeight, leaf.rotation, 0, Math.PI * 2);
			ctx.fillStyle = leafColor;
			ctx.fill();
			ctx.closePath();
		};

		const updateLeaves = (leaves: ILeaf[]) => {
			for (let i = 0; i < leaves.length; i++) {
				const leaf = leaves[i];
				leaf.x += leaf.dx;
				leaf.y += leaf.dy;

				if (leaf.y > canvas.height) {
					leaves.splice(i, 1);
					i--;
				}
			}
		};

		const clearCanvas = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		};

		const leaves: ILeaf[] = [];

		const animate = () => {
			clearCanvas();

			updateLeaves(leaves);
			leaves.forEach(drawLeaf);

			if (Math.random() < 0.02) {
				leaves.push(createLeaf());
			}

			requestAnimationFrame(animate);
		};

        animate();
	}, []);

	return <Canvas ref={canvasRef} width={width} height={height} />;
};

const Canvas = styled.canvas`
    z-index: 1;
`;

export default Leaves;
