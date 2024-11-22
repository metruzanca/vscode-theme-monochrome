import { createSignal } from "solid-js";
import AccentGradient from "./components";

function App() {
	const [shift, setShift] = createSignal(0);

	const hueShift = (hue: number) => (hue + shift()) % 360;

	return (
		<div
			style={{
				height: "100vh",
				background: "black",
				color: "white",
				"font-family": "sans-serif"
			}}
		>
			<label>
				{/* <div
					style={{
						height: "10px",
						width: "10px",
						background: `hsl(${shift()} 100% 50%)`
					}}
				/> */}
				Hue Shift
				<input
					type="number"
					min={0}
					max={360}
					step={1}
					value={shift()}
					onInput={(e) => setShift(+e.target.value)}
				/>
			</label>
			fg:
			<AccentGradient color={{ luma: [6, 90], chroma: [2, 2], hue: hueShift(240) }} />
			bg:
			<AccentGradient color={{ luma: [6, 90], chroma: [2, 2], hue: hueShift(240) }} />
			coShades:
			<AccentGradient color={{ luma: [6, 90], chroma: [16, 16], hue: hueShift(240) }} />
			accent:
			<AccentGradient color={{ luma: [6, 90], chroma: [42, 36], hue: hueShift(227) }} />
			coAccent:
			<AccentGradient color={{ luma: [6, 90], chroma: [42, 36], hue: hueShift(195) }} />
		</div>
	);
}

export default App;
