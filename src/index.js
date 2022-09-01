import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
//NOTE Les composants React peuvent définir un état local en définissant this.state dans leurs constructeurs. this.state est considéré comme une donnée privée du composant React qui le définit. Stockons donc la valeur courante du Square dans this.state, et changeons-la quand on clique sur la case. 
//NOTE En appelant this.setState depuis un gestionnaire onClick dans la méthode render de Square, nous demandons à React de ré-afficher ce Square dès que le <button> est cliqué. Après la mise à jour, la this.state.value du Square sera 'X', et nous verrons donc X sur le plateau de jeu. Si vous cliquez sur n’importe quel carré, un X devrait s’y afficher.
constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
