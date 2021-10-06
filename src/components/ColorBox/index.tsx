import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context';

interface IStyleBox {
	bg: string;
}

interface IProps {
	boxId: number;
}

export const BOX_SIZE = 60;

const Box = styled.div<IStyleBox>`
  width: ${BOX_SIZE}px;
  height: ${BOX_SIZE}px;
  background-color: ${(props) => props.bg};
  text-align: center;
  vertical-align: middle;
  line-height: ${BOX_SIZE}px;
  user-select: none;
`;

export const ColorBox = (props: IProps) => {
	const {
		boxId,
	} = props;

	const divRef = React.createRef<HTMLDivElement>();

	const {
		boxesPerRow,
		boxIdsNeedChangeColor,
		numberOfBoxes,
		requestBoxIdsToChangeColour,
		completeChangingColor,
	} = React.useContext(AppContext);

	const getRandomColor = React.useCallback(() => {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return `rgb(${r}, ${g}, ${b})`;
	}, []);

	const [color, setColor] = React.useState(getRandomColor());

	React.useEffect(() => {
		if (boxIdsNeedChangeColor.includes(boxId)) {
			setColor(getRandomColor());
			completeChangingColor(boxId);
		}
	}, [
		boxIdsNeedChangeColor,
		boxId,
		getRandomColor,
		completeChangingColor,
	]);

	const handleBoxClick = React.useCallback(() => {
		if (divRef.current) {
			const elem = divRef.current;

			const row = elem.offsetTop / BOX_SIZE;
			const column = elem.offsetLeft / BOX_SIZE;

			const totalRows = Math.floor(numberOfBoxes / boxesPerRow);

			const getBoxId = (row: number, column: number): number => boxesPerRow * row + column;

			const adjacentBoxIds = [];
			if (row > 0) {
				adjacentBoxIds.push(getBoxId(row - 1, column));
			}
			if (row < totalRows) {
				adjacentBoxIds.push(getBoxId(row + 1, column));
			}
			if (column > 0) {
				adjacentBoxIds.push(getBoxId(row, column - 1));
			}
			if (column < boxesPerRow - 1) {
				adjacentBoxIds.push(getBoxId(row, column + 1));
			}

			const randomId = adjacentBoxIds[Math.round(Math.random() * (adjacentBoxIds.length - 1))];
			const boxId = getBoxId(row, column);
			requestBoxIdsToChangeColour([randomId, boxId]);
		}

	}, [divRef, boxesPerRow, numberOfBoxes, requestBoxIdsToChangeColour]);

	return (
		<Box
			bg={color}
			ref={divRef}
			onClick={handleBoxClick}
		>
            {boxId}
		</Box>
	)
}
