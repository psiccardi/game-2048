function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}


class Number2048 {
  remove() {
    this.element.remove();
  }

  adjustPosition(Y,X) {
    this.position           = [Y,X];
    this.element.style.top  = (8+(48+8)*this.position[0])+'px';
    this.element.style.left = (8+(48+8)*this.position[1])+'px';
  }

  constructor(num, el, position) {
    this.element                    = document.createElement('div');
    this.element.className          = 'grid-number';
    this.element.style.position     = 'absolute';
    this.element.style.width        = '48px';
    this.element.style.height       = '48px';
    this.element.style.borderRadius = '5px';
    this.element.style.top          = (8+(48+8)*position[0])+'px';
    this.element.style.left         = (8+(48+8)*position[1])+'px';
    this.element.style.lineHeight   = '48px';
    const len = ''+(num).length;
    this.element.style.fontSize  = (48/len)+'px';
    this.element.innerHTML       = num;
    this.element.style.textAlign = 'center';
    switch (num) {
      case 2:
        this.element.style.backgroundColor = '#FFF2D1';
        this.element.style.color           = 'black';
        break;
      case 4:
        this.element.style.backgroundColor = '#FBE5C2';
        this.element.style.color           = 'black';
        break;
      case 8:
        this.element.style.backgroundColor = '#F7D8B3';
        this.element.style.color           = 'black';
        break;
      case 16:
        this.element.style.backgroundColor = '#F3CBA4';
        this.element.style.color           = 'black';
        break;
      case 32:
        this.element.style.backgroundColor = '#EEBD95';
        this.element.style.color           = 'black';
        break;
      case 64:
          this.element.style.backgroundColor = '#E6A377';
          this.element.style.color           = 'black';
          break;
      case 128:
        this.element.style.backgroundColor = '#DE9168';
        this.element.style.color           = 'black';
        break;
      case 256:
          this.element.style.backgroundColor = '#D57F59';
          this.element.style.color           = 'white';
          break;
      case 1024:
        this.element.style.backgroundColor = '#CD6D4A';
        this.element.style.color           = 'white';
        break;
      case 2048:
        this.element.style.backgroundColor = '#C45A3B';
        this.element.style.color           = 'white';
        break;
      default:
        this.element.style.backgroundColor = '#B3361D';
        this.element.style.color           = 'white';
        break;
    }
    el.appendChild(this.element);
    this.number = num;
    this.position = position;
  }
}

class Game2048 {

  initGrid () {
    this.element.style.backgroundColor = '#d6d2c4';
    this.element.style.margin          = '20px auto';
    this.element.style.borderRadius    = '5px';
    this.element.style.width           = (8+(8+48)*this.size) + 'px';
    this.element.style.height          = (8+(8+48)*this.size) + 'px';
    this.element.style.position        = 'relative';
    this.grid = [];
    for (let y=0; y<this.size;y++) {
      this.grid[y] = [];
      for (let x=0; x<this.size;x++) {
        this.grid[y][x] = document.createElement('div');
        this.grid[y][x].style.backgroundColor = '#968c83';
        this.grid[y][x].style.width           = '48px';
        this.grid[y][x].style.marginTop       = '8px';
        this.grid[y][x].style.marginLeft      = '8px';
        this.grid[y][x].style.width           = '48px';
        this.grid[y][x].style.height          = '48px';
        this.grid[y][x].style.borderRadius    = '5px';
        this.grid[y][x].style.display         = 'inline-block';
        this.element.appendChild(this.grid[y][x]);
      }
    }
  }

  constructor(id, size) {
    this.element = document.getElementById(id);
    this.cells = [];
    this.size = size;
    this.initGrid();
    this.generateRandomNumber();
    this.generateRandomNumber();
    let self = this;
    $(document).keyup((event) => {
      switch (event.code) {
        case "ArrowUp":
          self.up();
          break;
        case "ArrowDown":
          self.down();
          break;
        case "ArrowLeft":
          self.left();
          break;
        case "ArrowRight":
          self.right();
          break;
      }
    });
  }

  up() {
    let tempCells = this.cells;
    let moved = false;
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (tempCells[y] && tempCells[y][x] instanceof Number2048) {
          tempCells[y] = tempCells[y] || [];
          for (let w = y - 1; w >= 0; w--) {
            if (tempCells[w] && tempCells[w][x] instanceof Number2048) {
              if (tempCells[w][x].number === this.cells[w + 1][x].number) {
                if (!tempCells[w][x].merged) {
                  let newNumber = tempCells[w][x].number * 2;
                  tempCells[w + 1][x].adjustPosition(w,x);
                  let u = tempCells[w + 1][x];
                  setTimeout(() => {
                    u.remove();
                  },200);
                  tempCells[w + 1][x] = undefined;
                  tempCells[w][x].remove();
                  tempCells[w][x] = new Number2048(newNumber, this.element, [w, x]);
                  tempCells[w][x].merged = true;
                  moved = true;
                }
              }
              break;
            } else {
              tempCells[w] = tempCells[w] || [];
              tempCells[w][x] = tempCells[w + 1][x];
              tempCells[w][x].adjustPosition(w,x);
              tempCells[w + 1][x] = undefined;
              moved = true;
            }
          }
        }
      }
    }
    this.applyMove(tempCells, moved);
  }

  down() {
    let tempCells = this.cells;
    let moved = false;
    for (let y = this.size - 1; y >= 0; y--) {
      for (let x = 0; x < this.size; x++) {
        if (tempCells[y] && tempCells[y][x] instanceof Number2048) {
          for (let w = y + 1; w < this.size; w++) {
            if (tempCells[w] && tempCells[w][x] instanceof Number2048) {
              if (tempCells[w][x].number === tempCells[w - 1][x].number) {
                if (!tempCells[w][x].merged) {
                  let newNumber = tempCells[w][x].number * 2;
                  tempCells[w - 1][x].adjustPosition(w,x);
                  let u = tempCells[w - 1][x];
                  setTimeout(() => {
                    u.remove();
                  },200);
                  //tempCells[w - 1][x].remove();
                  tempCells[w][x].remove();
                  tempCells[w - 1][x] = undefined;
                  tempCells[w][x] = new Number2048(newNumber, this.element, [w, x]);
                  tempCells[w][x].merged = true;
                  moved = true;
                }
              }
              break;
            } else {
              tempCells[w] = tempCells[w] || [];
              tempCells[w][x] = tempCells[w - 1][x];
              tempCells[w][x].adjustPosition(w,x);
              tempCells[w - 1][x] = undefined;
              moved = true;
            }
          }
        }
      }
    }
    this.applyMove(tempCells, moved);
  }

  left() {
    let tempCells = this.cells;
    let moved = false;
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (tempCells[y] && tempCells[y][x] instanceof Number2048) {
          tempCells[y] = tempCells[y] || [];
          for (let w = x - 1; w >= 0; w--) {
            if (tempCells[y] && tempCells[y][w] instanceof Number2048) {
              if (tempCells[y][w].number === this.cells[y][w + 1].number) {
                if (!tempCells[y][w].merged) {
                  let newNumber = tempCells[y][w].number * 2;
                  tempCells[y][w + 1].adjustPosition(y,w);
                  let u = tempCells[y][w + 1];
                  setTimeout(() => {
                    u.remove();
                  },200);
                  //tempCells[y][w + 1].remove();
                  tempCells[y][w].remove();
                  tempCells[y][w + 1] = undefined;
                  tempCells[y][w] = new Number2048(newNumber, this.element, [y, w]);
                  tempCells[y][w].merged = true;
                  moved = true;
                }
              }
              break;
            } else {
              tempCells[y][w] = tempCells[y][w + 1];
              tempCells[y][w].adjustPosition(y,w);
              tempCells[y][w + 1] = undefined;
              moved = true;
            }
          }
        }
      }
    }
    this.applyMove(tempCells, moved);
  }

  right() {
    let tempCells = this.cells;
    let moved = false;
    for (let y = 0; y < this.size; y++) {
      for (let x = this.size - 1; x >= 0; x--) {
        if (tempCells[y] && tempCells[y][x] instanceof Number2048) {
          tempCells[y] = tempCells[y] || [];
          for (let w = x + 1; w < this.size; w++) {
            if (tempCells[y] && tempCells[y][w] instanceof Number2048) {
              if (tempCells[y][w].number === this.cells[y][w - 1].number) {
                if (!tempCells[y][w].merged) {
                  let newNumber = tempCells[y][w].number * 2;
                  tempCells[y][w - 1].adjustPosition(y,w);
                  let u = tempCells[y][w - 1];
                  setTimeout(() => {
                    u.remove();
                  },200);
                  tempCells[y][w].remove();
                  //tempCells[y][w - 1].remove();
                  tempCells[y][w - 1] = undefined;
                  tempCells[y][w] = new Number2048(newNumber, this.element, [y, w]);
                  tempCells[y][w].merged = true;
                  moved = true;
                }
              }
              break;
            } else {
              tempCells[y][w] = tempCells[y][w - 1];
              tempCells[y][w].adjustPosition(y,w);
              tempCells[y][w - 1] = undefined;
              moved = true;
            }
          }
        }
      }
    }
    this.applyMove(tempCells, moved);
  }

  applyMove(tempCells, moved) {
    this.cells = tempCells.map((el) => {
      el = el.map(el2 => {
        if (el2 !== undefined)
        el2.merged = false;
        return el2;
      })
      return el;
    });
    if (moved) {
      this.generateRandomNumber();
    }
    this.print();
  }

  filled() {
    let filled = true;
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.cells[y] && this.cells[y][x] instanceof Number2048) {
          continue;
        } else {
          filled = false;
          break;
        }
      }
    }
    return filled;
  }

  generateRandomNumber() {
    let positionX, positionY;
    do {
      positionX = Math.floor(Math.random() * this.size);
      positionY = Math.floor(Math.random() * this.size);
    } while (
      this.cells[positionY] &&
      this.cells[positionY][positionX] &&
      !this.filled()
    );

    let num = Math.floor(Math.random() * 2 + 1) * 2;
    if (!this.cells[positionY]) {
      this.cells[positionY] = [];
    }
    this.cells[positionY][positionX] = new Number2048(num, this.element, [
      positionY,
      positionX,
    ]);
  }

  print() {
    let text = "";
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.cells[y] && this.cells[y][x] instanceof Number2048) {
          text += "| " + this.cells[y][x].number + " |";
        } else {
          text += "|   |";
        }
      }
      text += "\n";
    }
    console.log(text);
  }
}
