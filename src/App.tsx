import React from 'react';
import "./app.css";
import { BOX_SIZE, ColorBox } from './components/ColorBox';
import { AppContext } from './context';

const column = Math.floor(document.body.clientWidth / BOX_SIZE);
const rows = Math.floor(window.innerHeight / BOX_SIZE);
function App() {
	const [boxesPerRow, setBoxesPerRow] = React.useState<number>(0);
	const [boxIdsNeedChangeColor, setBoxIdsNeedChangeColor] = React.useState<number[]>([]);

	React.useEffect(() => {
		window.addEventListener('resize', () => {
			setBoxesPerRow(Math.floor(document.body.clientWidth / BOX_SIZE));
		});
		window.dispatchEvent(new Event('resize'));
	}, []);

	const numberOfBoxes = column * rows;

	const requestBoxIdToChangeColour = React.useCallback((id: number) => {
		setBoxIdsNeedChangeColor((currentValue) => [...currentValue, id]);
	}, []);

	const removeBoxIdFromBoxIdNeedChangeColor = React.useCallback((id: number) => {
		setBoxIdsNeedChangeColor((currentValue) => currentValue.filter((value) => value !== id));
	}, []);

	const appContextValue = React.useMemo(() => ({
		boxesPerRow,
		boxIdsNeedChangeColor,
		numberOfBoxes,
		requestBoxIdToChangeColour,
		completeChangingColor: removeBoxIdFromBoxIdNeedChangeColor,
	}), [
		boxesPerRow,
		boxIdsNeedChangeColor,
		numberOfBoxes,
		removeBoxIdFromBoxIdNeedChangeColor,
		requestBoxIdToChangeColour,
	]);

	return (
		<AppContext.Provider value={appContextValue}>
			<main>
				{
					Array(numberOfBoxes).fill(0).map((_, i) => (
						<ColorBox
							key={i}
							boxId={i}
						/>
					))
				}
			</main>
		</AppContext.Provider>
	);
}


export default App;
