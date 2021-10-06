import React from 'react';

interface IAppContext {
	boxesPerRow: number;
	boxIdsNeedChangeColor: number[];
	numberOfBoxes: number;
	requestBoxIdsToChangeColour: (ids: number[]) => void;
	completeChangingColor: (id: number) => void;
}

export const AppContext = React.createContext<IAppContext>({
	boxesPerRow: 0,
	boxIdsNeedChangeColor: [],
	numberOfBoxes: 0,
	requestBoxIdsToChangeColour: (ids: number[]) => {},
	completeChangingColor: (id: number) => {},
});
