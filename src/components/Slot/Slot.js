import React, { forwardRef } from "react";

const slotWrapperStyle = {
  width: 130,
  border: "1px solid grey",
  borderRadius: "2px"
};

const firstTeamStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid grey",
  //borderLeft: "3px solid #e40a0a",
  padding: "0 4px"
};

const secondTeamStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // borderLeft: "3px solid #08a500",
  padding: "0 4px"
};

const loserColor = "3px solid #e40a0a";
const winnerColor = "3px solid #08a500";
//const defaultColor = "1px solid grey";

//    box-shadow: 0 1px 5px 0 rgba(0,0,0,.16), 0 1px 2px 0 rgba(0,0,0,.08), inset 0 0 0 2px #2d6da3;

function getResultColor(teamA, teamB) {
  if (teamA === teamB) return { teamA: 0, teamB: 0 };
  if (teamA > teamB) return { teamA: winnerColor, teamB: loserColor };
  return { teamA: loserColor, teamB: winnerColor };
}

export const Slot = forwardRef((props, ref) => {
  // TODO. define prop data format
  const {
    game = {
      teamA: { name: "Slot 1", result: null },
      teamB: { name: "Slot 2", result: null }
    },
    onHover = (f) => f,
    highlightTeam
  } = props;

  const isMatchEnded =
    !isNaN(game?.teamA?.result) && !isNaN(game?.teamB?.result);

  const { teamA: teamAColor, teamB: teamBColor } = isMatchEnded
    ? getResultColor(game.teamA.result, game.teamB.result)
    : { teamA: 0, teamB: 0 };

  return (
    <div ref={ref} style={slotWrapperStyle}>
      <div
        style={{
          ...firstTeamStyle,
          borderLeft: teamAColor,
          backgroundColor: highlightTeam === game.teamA.name ? "#ededef" : "",
          boxShadow:
            highlightTeam === game.teamA.name
              ? "0 1px 5px 0 rgba(0,0,0,.16), 0 1px 2px 0 rgba(0,0,0,.08), inset 0 0 0 2px #2d6da3"
              : ""
        }}
        onMouseOver={() => onHover(game.teamA.name)}
        onMouseOut={() => onHover(false)}
      >
        <span>{game.teamA.name}</span>
        <span>{game.teamA.result}</span>
      </div>
      <div
        style={{
          ...secondTeamStyle,
          borderLeft: teamBColor,
          backgroundColor: highlightTeam === game.teamB.name ? "#ededef" : "",
          boxShadow:
            highlightTeam === game.teamB.name
              ? "0 1px 5px 0 rgba(0,0,0,.16), 0 1px 2px 0 rgba(0,0,0,.08), inset 0 0 0 2px #2d6da3"
              : ""
        }}
        onMouseOver={() => onHover(game.teamB.name)}
        onMouseOut={() => onHover(false)}
      >
        <span>{game.teamB.name}</span>
        <span>{game.teamB.result}</span>
      </div>
    </div>
  );
});
