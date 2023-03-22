import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { getResultColor } from "../../utils";

const slotWrapperStyle = {
  width: 130,
  border: "1px solid grey",
  borderRadius: "2px"
};

const firstTeamStyle = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid grey",
  padding: "0 4px"
};

const secondTeamStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0 4px"
};

export const Slot = forwardRef((props, ref) => {
  const {
    game = {
      teamA: { name: "Slot 1", result: null, icon: null },
      teamB: { name: "Slot 2", result: null, icon: null }
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
              : "",
        }}
        onMouseOver={() => onHover(game.teamA.name)}
        onMouseOut={() => onHover(false)}
      >
        {game.teamA.icon && (
          <div
            style={{
              width: "16px",
              height: "16px",
              display: "flex",
              marginRight: "5px",
            }}
          >
            {game.teamA.icon}
          </div>
        )}
        <span
          style={{
            flex: "1 auto",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {game.teamA.name}
        </span>
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
              : "",
        }}
        onMouseOver={() => onHover(game.teamB.name)}
        onMouseOut={() => onHover(false)}
      >
        {game.teamB.icon && (
          <div
            style={{
              width: "16px",
              height: "16px",
              display: "flex",
              marginRight: "5px",
            }}
          >
            {game.teamB.icon}
          </div>
        )}
        <span
          style={{
            flex: "1 auto",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {game.teamB.name}
        </span>
        <span>{game.teamB.result}</span>
      </div>
    </div>
  );
});

Slot.propTypes = {
  game: PropTypes.object,
  onHover: PropTypes.func,
  highlightTeam: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
};