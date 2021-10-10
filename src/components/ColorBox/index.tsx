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

const getBoxId = (row: number, column: number, boxesPerRow: number): number => boxesPerRow * row + column;

const getBoxPos = (elem: HTMLDivElement) => ({
	row: elem.offsetTop / BOX_SIZE,
	column: elem.offsetLeft / BOX_SIZE,
});

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

	React.useEffect(() => {
		const elem = divRef.current;
		const handleContextMenuClick = (e: Event) => {
			e.preventDefault();

			if (elem) {
				const {row, column} = getBoxPos(elem);
				const totalRows = Math.floor(numberOfBoxes / boxesPerRow);

				const boxIdsToChange = [
					...Array(totalRows)
						.fill(0)
						.map((_, index) => getBoxId(index, column, boxesPerRow)),
					...Array(boxesPerRow)
						.fill(0)
						.map((_, index) => getBoxId(row, index, boxesPerRow)),
				];

				requestBoxIdsToChangeColour(boxIdsToChange);
			}

		};

		if (elem) {
			elem.addEventListener('contextmenu', handleContextMenuClick);
		}

		return (() => {
			if (elem) {
				elem.removeEventListener('contextmenu', handleContextMenuClick);
			}
		})
	}, [divRef, numberOfBoxes, boxesPerRow, requestBoxIdsToChangeColour]);

	const handleBoxClick = React.useCallback(() => {
		if (divRef.current) {
			const elem = divRef.current;

			const {row, column} = getBoxPos(elem);

			const totalRows = Math.floor(numberOfBoxes / boxesPerRow);

			const adjacentBoxIds = [];
			if (row > 0) {
				adjacentBoxIds.push(getBoxId(row - 1, column, boxesPerRow));
			}
			if (row < totalRows) {
				adjacentBoxIds.push(getBoxId(row + 1, column, boxesPerRow));
			}
			if (column > 0) {
				adjacentBoxIds.push(getBoxId(row, column - 1, boxesPerRow));
			}
			if (column < boxesPerRow - 1) {
				adjacentBoxIds.push(getBoxId(row, column + 1, boxesPerRow));
			}

			const randomId = adjacentBoxIds[Math.round(Math.random() * (adjacentBoxIds.length - 1))];
			requestBoxIdsToChangeColour([randomId, boxId]);
		}

	}, [boxId, divRef, boxesPerRow, numberOfBoxes, requestBoxIdsToChangeColour]);

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
