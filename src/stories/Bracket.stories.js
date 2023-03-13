import React from "react";
import { storiesOf } from "@storybook/react";

import { Bracket } from "../components/Bracket";

const stories = storiesOf("Bracket test", module);

const game = {
    teamA: { name: "Outsiders", result: 2 },
    teamB: { name: "Navi", result: 1 }
  };
  const game1 = {
    teamA: { name: "G2", result: 1 },
    teamB: { name: "OG", result: 2 }
  };
  const game2 = {
    teamA: { name: "forze", result: 1 },
    teamB: { name: "Falcons", result: 2 }
  };
  const game3 = {
    teamA: { name: "BIG", result: 1 },
    teamB: { name: "Vitality", result: 2 }
  };
  const game4 = {
    teamA: { name: "Outsiders", result: 2 },
    teamB: { name: "OG", result: 1 }
  };
  const game5 = {
    teamA: { name: "Falcons", result: 1 },
    teamB: { name: "Vitality", result: 2 }
  };
  const game6 = {
    teamA: { name: "Outsiders", result: 2 },
    teamB: { name: "Vitality", result: 1 }
  };
  
  const example = [
    [game, game1, game2, game3],
    //[game, game],
    [game4, game5],
    [game6]
  ];

stories.add("Bracket", () => {
    return <div><Bracket header={["Quarter", "Semi", "Final"]} games={example}  /></div>;
});