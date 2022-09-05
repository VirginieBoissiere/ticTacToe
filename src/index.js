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
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history;
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
      xIsNext: !this.state.xIsNext,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    // je controle l'hystorique 
    console.log(current);

    //En utilisant la méthode map, on peut transformer notre historique de tours en éléments React représentant des boutons à l’écran, et afficher cette liste de boutons pour « revenir » à des tours passés.
    const moves =history.map((step,move)=>{
      const desc=move ?
      'revenir au tou n°'+move:
      'revenir au debut de la partie';
      return(
        <li>
          <button onclick ={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
