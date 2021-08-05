export class Grid {
  constructor(width, height = 0) {
    // width and height are integers representing number of cells
    this.width = Math.floor(width);
    // If only one argument is given, make it a square
    this.height = height === 0 ? this.width : height;
    this.height = Math.floor(this.height);

    // Automatically intializes to 0
    this.grid = new Uint8Array(this.width * this.height);

    // These will contain integers for game rules
    // Default is original Conway's config
    this.neighborsToStayAlive = [2, 3];
    this.neighborsToReborn = [3];
    this.randomDensity = 30; // Percentage of alive cells when randomizing
    this.isInfinitePlane = true; // TODO implement this distinction
  }

  populateAtRandom() {
    this.grid.forEach((cell, i, arr) =>
      Math.random() * 100 < this.randomDensity ? arr[i] = 1 : arr[i] = 0);
  }

  indexFromCoords(x, y) {
    return x + y * this.width;
  }

  coordsFromIndex(index) {
    let x = index % this.width;
    let y = Math.floor(index / this.width);
    return [x, y];
  }

  countCells() {
    let alive = 0;
    let dead = 0;
    this.grid.forEach(cell => cell ? alive++ : dead++);
    console.log("Alive: ", alive, " Dead: ", dead);
  }

  update() {
      let tempArray = new Uint8Array(this.grid.length);
      
      // ... for every cell, count alive neighbors...
      for(let i = 0; i < this.grid.length; i++) {
        let aliveNeighbors = 0;
        this.getNeighborsIndexes(i).forEach(val => {
          if(this.grid[val]) aliveNeighbors++;
        });

        // According to either cell alive or dead, apply rules
        if(this.grid[i])
          tempArray[i] = this.neighborsToStayAlive.some(value => value === aliveNeighbors) ? 1 : 0;
        else
          tempArray[i] = this.neighborsToReborn.some(value => value === aliveNeighbors) ? 1 : 0;
      }

      this.grid = tempArray;
  }

  getNeighborsIndexes(i) {
    // Returns an array with the indexes of every neighbor
    let x = this.coordsFromIndex(i)[0];
    let y = this.coordsFromIndex(i)[1];
    let indexes = 
      [ 
        // Sides
        this.indexFromCoords((x + this.width - 1) % this.width, y),
        this.indexFromCoords((x + 1) % this.width, y),
        // Upper row
        this.indexFromCoords((x + this.width - 1) % this.width, (y + this.height - 1) % this.height),
        this.indexFromCoords(x, (y + this.height - 1) % this.height),
        this.indexFromCoords((x + 1) % this.width, (y + this.height - 1) % this.height),
        // Lower row
        this.indexFromCoords((x + this.width - 1) % this.width, (y + 1) % this.height),
        this.indexFromCoords(x, (y + 1) % this.height),
        this.indexFromCoords((x + 1) % this.width, (y + 1) % this.height)
      ];
    return indexes;
  }
}








