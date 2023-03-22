import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { getResultColor } from "../../utils";
//style
import "./Slot.css";

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
    <div ref={ref} className="slot_wrapper">
      <div
        className="slot_team"
        style={{
          borderBottom: "1px solid grey",
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
          <div className="slot_team--icon">
            {game.teamA.icon}
          </div>
        )}
        <span className="slot_team--name">
          {game.teamA.name}
        </span>
        <span>{game.teamA.result}</span>
      </div>
      <div
        className="slot_team"
        style={{
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
          <div className="slot_team--icon">
            {game.teamB.icon}
          </div>
        )}
        <span className="slot_team--name">
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