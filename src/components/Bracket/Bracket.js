import React, { useRef, useMemo, useState } from "react";
import { Slot } from "../Slot";

const calculateVerticalStartingPoint = (columnIndex, height) => {
  return 2 ** columnIndex * (height / 2) - height / 2;
};

const columnIncrement = (columnIndex, height) => {
  return 2 ** columnIndex * height;
};

const calculateHeightIncrease = (columnIndex, rowIndex, height) => {
  return columnIncrement(columnIndex, height) * rowIndex;
};

const calculateVerticalPositioning = ({
  rowIdx,
  columnIdx,
  rowHeight: height = 50
}) => {
  return (
    calculateHeightIncrease(columnIdx, rowIdx, height) +
    calculateVerticalStartingPoint(columnIdx, height)
  );
};

export function Bracket({
  games = [],
  slotStyle = {
    width: 130,
    height: 40,
    gap: 30
  },
  renderSlot = undefined,
  header = []
}) {
  // some logic here...
  // const slotRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(false);
  const bracketHeight = slotStyle.height * games[0].length + 20;

  const topPositions = useMemo(() => {
    const result = [];
    let diff = 0;

    for (let i = 0; i < games.length; i++) {
      let inner = [];

      for (let j = 0; j < games[i].length; j++) {
        if (i > 0 && games[i - 1].length === games[i].length) {
          inner = result[i - 1];
          diff++;
          break;
        } else {
          const top = calculateVerticalPositioning({
            rowIdx: j,
            columnIdx: i - diff
          });
          inner.push(top);
        }
      }

      result.push(inner);
    }

    return result;
  }, [games]);

  //console.log(topPositions);

  return (
    <div style={{ display: "flex", gap: slotStyle.gap, height: bracketHeight }}>
      {games.map((column, columnIdx) => {
        return (
          <div>
            {header.length > 0 && <div>{header[columnIdx]}</div>}
            <br />
            <div
              style={{ position: "relative", width: slotStyle.width }}
              key={columnIdx}
            >
              {column.map((row, rowIdx) => {
                const top = topPositions[columnIdx][rowIdx];
                const previousColumn = topPositions[columnIdx - 1] || [];
                const isEqualColumnLength =
                  previousColumn.length === column.length;

                const previousTop = columnIdx > 0 && previousColumn[rowIdx * 2];

                const connectorStart = slotStyle.height / 2 + previousTop;
                const lineHeight =
                  (top - connectorStart + slotStyle.height / 2) * 2;

                return (
                  <>
                    <div
                      key={rowIdx}
                      style={{
                        position: "absolute",
                        top: top + "px",
                        maxHeight: slotStyle.height
                      }}
                    >
                      {typeof renderSlot === "function" ? (
                        renderSlot(row)
                      ) : (
                        <Slot
                          highlightTeam={hoveredItem}
                          onHover={setHoveredItem}
                          game={row}
                        />
                      )}
                    </div>
                    {columnIdx > 0 &&
                      (isEqualColumnLength ? (
                        <div
                          style={{
                            position: "absolute",
                            top: top + slotStyle.height / 2,
                            left: "-19px",
                            width: "10px",
                            borderTop: "1px solid black"
                          }}
                        ></div>
                      ) : (
                        <div
                          style={{
                            width: "5px",
                            height: lineHeight + "px",
                            //color: "black",
                            position: "absolute",
                            top: connectorStart + "px",
                            left: "-19px",
                            borderTop: "1px solid black",
                            borderRight: "1px solid black",
                            borderBottom: "1px solid black"
                          }}
                        ></div>
                      ))}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}