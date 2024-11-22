import { For, createMemo } from "solid-js";
// import { Grade } from '../../src/color/grade'
const DEGREE = Math.PI / 180;

function mix(a: number, s: number, b: number) {
	return a + s * (b - a);
}

function lchToRgb(l: number, c: number, h: number): string {
	// This is a placeholder function. Use a proper LCH to RGB conversion in production.
	const rgb = [
		Math.round(Math.min(255, Math.max(0, l + c * Math.cos(h)))),
		Math.round(Math.min(255, Math.max(0, l + c * Math.sin(h)))),
		Math.round(Math.min(255, Math.max(0, l)))
	];
	return `rgb(${rgb.join(", ")})`;
}

type SimpleGrade = { luma: [number, number]; chroma: [number, number]; hue: number };

export const AccentGradient = (props: { color: SimpleGrade }) => {
	const steps = 10;
	const colors = createMemo(() => {
		const colors = [];
		for (let step = 0; step <= steps; step++) {
			const scaleChroma = step / steps;
			const scaleLuma = Math.pow(scaleChroma, 1); // Assuming power is 1 for simplicity.
			const luma = mix(props.color.luma[0], scaleLuma, props.color.luma[1]);
			const chroma = mix(props.color.chroma[0], scaleChroma, props.color.chroma[1]);
			const hue = props.color.hue * DEGREE;
			colors.push(lchToRgb(luma, chroma, hue));
		}
		return colors;
	});

	return (
		<div style={{ display: "flex", gap: "4px", margin: "20px" }}>
			<span style={{ "font-size": "12px" }}>hue: {props.color.hue}</span>
			<For each={colors()}>
				{(color) => (
					<div
						style={{
							width: "30px",
							height: "100px",
							"background-color": color
						}}
					/>
				)}
			</For>
		</div>
	);
};

export default AccentGradient;
