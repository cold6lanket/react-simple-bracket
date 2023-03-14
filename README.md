# react-simple-bracket
![image](https://user-images.githubusercontent.com/72103819/225076381-b75e8297-eda8-42fa-9565-f477a26f1504.png)

React component that renders single elimination bracket.

## Installation
```
npm i react-simple-bracket
```

## Usage
To render a bracket, you pass specified data format.
Where Data format must be like:
```
const game = [
  [
    {teamA: { name: "Outsiders", result: 2 }, teamB: { name: "Navi", result: 1 }},
    {teamA: { name: "G2", result: 1 }, teamB: { name: "OG", result: 2 }}
  ],
  [
    {teamA: { name: "Outsiders", result: 2 }, teamB: { name: "OG", result: 1 }}
  ]
];
```
This will show bracket of semi final and final game.

```jsx
import { Bracket } from 'react-simple-bracket';
import { render } from 'react-dom';

render(
  <Bracket games={game} header={["Semi", "Final"]} />, 
  document.getElementById('app')
);
```
