import { Grid } from "./grid.js";

// Main config
const ALIVE_COLOR = 'yellow';
const DEAD_COLOR = 'grey';
const CANVAS_BACKGROUND_COLOR = 'black';
const ANIMATION_MS_INTERVAL = 50; // milliseconds

const performanceInfo = {times: []};
let cycles = 0;




// Canvas
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth //* 0.6;
canvas.height = window.innerHeight //* 0.8;

// Grid
const grid = new Grid(canvas.width / 10, canvas.height / 10);
grid.populateAtRandom();
let cellSize = Math.min(canvas.width, canvas.height) / Math.min(grid.width, grid.height);

function drawGrid(grid, ctx) {
  let aliveColor = ALIVE_COLOR;
  let deadColor = DEAD_COLOR;

  // TODO implement dead cells coloring?

  ctx.fillStyle = aliveColor;
  grid.grid.forEach((cell, i) => {
    if(cell) {
      let coords = grid.coordsFromIndex(i);
      let x = coords[0] * cellSize;
      let y = coords[1] * cellSize;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  });

  // Old implementation:
  // grid.grid.forEach((cell, i) => {
  //   let coords = grid.coordsFromIndex(i);
  //   let x = coords[0] * cellSize;
  //   let y = coords[1] * cellSize;
  //   // ctx.beginPath();
  //   ctx.fillStyle = cell ? aliveColor : deadColor;
  //   ctx.fillRect(x, y, cellSize, cellSize);
  // });
}


// Animation
let msPassed = 0;
let interval = ANIMATION_MS_INTERVAL; 
let lastTimestamp = 0;

function animate(timestamp) {
  let dT = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  msPassed += dT;
  
  if(msPassed >= interval) {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    msPassed = 0;
    grid.update();
    drawGrid(grid, ctx);
  }


  // Very homebrew performance testing
  // cycles++;
  // performanceInfo.times.push(dT);
  // if(cycles > 1000) {
  //   console.log("max iterations reached");
  //   performanceInfo.size = grid.grid.length;
  //   performanceInfo.mean = performanceInfo.times.reduce((acc, value, i) => {
  //     if(i > 1) { 
  //       return acc + value;
  //     }
  //     return acc;
  //   }, 0) / (performanceInfo.times.length - 2);

  //   console.log(performanceInfo)
  //   return;
  // }



  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);




// let index = 0;
// console.log(grid.coordsFromIndex(index));
// console.log(grid.indexFromCoords(...grid.coordsFromIndex(index)))
// console.log(grid.getNeighborsIndexes(index));