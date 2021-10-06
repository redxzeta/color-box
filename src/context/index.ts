import React from 'react';

interface IAppContext {
	boxesPerRow: number;
	boxIdsNeedChangeColor: number[];
	numberOfBoxes: number;
	requestBoxIdToChangeColour: (id: number) => void;
	completeChangingColor: (id: number) => void;
}

export const AppContext = React.createContext<IAppContext>({
	boxesPerRow: 0,
	boxIdsNeedChangeColor: [],
	numberOfBoxes: 0,
	requestBoxIdToChangeColour: (id: number) => {},
	completeChangingColor: (id: number) => {},
});
