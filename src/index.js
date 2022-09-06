import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//  on remplace la class Square par une fonction composant plus simple d'écriture
function Square(props){
  return (
    <button className='square'onClick={props.onClick}>
    {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    // on modifie la méthode pour qu'elle lise l'information du state
     return <Square 
          value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
     />;
  }

  render() {
  

    return (
      <div>
 
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      // pour partir du movement 0
      stepNumber:0,
      xIsNext: true
    };
  }

  handleClick(i) {
    // modification pour certains que pour les retour dans le passé on parte du tour selectionné
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      //  on est sûrs de ne pas rester bloqués sur le tour affiché après avoir choisi une case.
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  //  on définis la méthode jumpTo dans Game pour qu’elle mette à jour stepNumber. on définis aussi xIsNext à true si le numéro de tour que l'on utilise dans stepNumber est pair :
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2)=== 0,
    })
  }
  
  render() {
    const history = this.state.history;
    // on modifie la méthode render du composant Game pour qu’elle n’affiche plus systématiquement le dernier coup, mais plutôt le tour indiqué par stepNumber :
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // je controle l'hystorique 
    // console.log(current);

    //En utilisant la méthode map, on peut transformer notre historique de tours en éléments React représentant des boutons à l’écran, et afficher cette liste de boutons pour « revenir » à des tours passés.
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

