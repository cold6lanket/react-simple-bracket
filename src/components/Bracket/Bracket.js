import React, { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Slot } from "../Slot";
import { calculateVerticalPositioning } from "../../utils";

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
  const [hoveredItem, setHoveredItem] = useState(false);
  const bracketHeight = games.length > 0 ? slotStyle.height * games[0].length + 20 : 0;

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

  return (
    <div style={{ display: "flex", gap: slotStyle.gap, height: bracketHeight }}>
      {games.map((column, columnIdx) => {
        return (
          <div key={`${columnIdx}`}>
            {header.length > 0 && <div style={{textAlign: "center"}}>{header[columnIdx] || "Header"}</div>}
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
                  <Fragment key={`${columnIdx}-${rowIdx}`}>
                    <div
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
                            position: "absolute",
                            top: connectorStart + "px",
                            left: "-19px",
                            borderTop: "1px solid black",
                            borderRight: "1px solid black",
                            borderBottom: "1px solid black"
                          }}
                        ></div>
                      ))}
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Bracket.propTypes = {
  games: PropTypes.array,
  slotStyle: PropTypes.object,
  renderSlot: PropTypes.func,
  header: PropTypes.array
};