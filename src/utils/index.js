export const calculateVerticalStartingPoint = (columnIndex, height) => {
    return 2 ** columnIndex * (height / 2) - height / 2;
  };
  
export const columnIncrement = (columnIndex, height) => {
    return 2 ** columnIndex * height;
};

export const calculateHeightIncrease = (columnIndex, rowIndex, height) => {
    return columnIncrement(columnIndex, height) * rowIndex;
};

export const calculateVerticalPositioning = ({
    rowIdx,
    columnIdx,
    rowHeight: height = 50,
}) => {
    return (
    calculateHeightIncrease(columnIdx, rowIdx, height) +
    calculateVerticalStartingPoint(columnIdx, height)
    );
};

const loserColor = "3px solid #e40a0a";
const winnerColor = "3px solid #08a500";

export function getResultColor(teamA, teamB) {
  if (teamA === teamB) return { teamA: 0, teamB: 0 };
  if (teamA > teamB) return { teamA: winnerColor, teamB: loserColor };
  return { teamA: loserColor, teamB: winnerColor };
}