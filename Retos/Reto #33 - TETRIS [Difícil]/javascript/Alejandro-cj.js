class Tetris {
    constructor() {
      this.board = Array.from({ length: 10 }, () => Array(10).fill('🔲'));
      this.piece = [
        [1, 0],
        [1, 1],
        [1, 2],
        [0, 1]
      ];
      this.position = { x: 0, y: 0 };
      this.render();
    }
  
    render() {
      const boardCopy = this.board.map(row => [...row]);
      for (const [dy, dx] of this.piece) {
        const x = this.position.x + dx;
        const y = this.position.y + dy;
        if (y >= 0 && y < 10 && x >= 0 && x < 10) {
          boardCopy[y][x] = '🔳';
        }
      }
      console.clear();
      boardCopy.forEach(row => console.log(row.join('')));
    }
  
    move(direction) {
      const { x, y } = this.position;
      switch (direction) {
        case 'derecha':
          if (this.canMoveTo(x + 1, y)) this.position.x++;
          break;
        case 'izquierda':
          if (this.canMoveTo(x - 1, y)) this.position.x--;
          break;
        case 'abajo':
          if (this.canMoveTo(x, y + 1)) this.position.y++;
          break;
        case 'rotar':
          this.rotatePiece();
          break;
        default:
          console.log('Acción no válida');
      }
      this.render();
    }
  
    canMoveTo(newX, newY) {
      return this.piece.every(([dy, dx]) => {
        const x = newX + dx;
        const y = newY + dy;
        return y >= 0 && y < 10 && x >= 0 && x < 10 && this.board[y][x] === '🔲';
      });
    }
  
    rotatePiece() {
      const newPiece = this.piece.map(([dy, dx]) => [-dx, dy]);
      const originalPiece = this.piece;
      this.piece = newPiece;
      if (!this.canMoveTo(this.position.x, this.position.y)) {
        this.piece = originalPiece;
      }
    }
  }
  
  const tetris = new Tetris();
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowRight':
        tetris.move('derecha');
        break;
      case 'ArrowLeft':
        tetris.move('izquierda');
        break;
      case 'ArrowDown':
        tetris.move('abajo');
        break;
      case 'ArrowUp':
        tetris.move('rotar');
        break;
    }
  });
  