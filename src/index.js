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
  // en ajoutant un constructor et on defini son etat initial à raison d'un tableau de 9 null qui correspond aux 9cases
  constructor(props){
    super(props);
      this.state ={
        squares:Array(9).fill(null)
      };

  }
  // on definie le handle click de la fonction onClick du square 
  handleClick(i){
    // on utilise slice pour créer une copie du tableau squares a modifier au lieu de travailler sur le tableau initial
    const squares =this.state.squares.slice();
    squares[i] = 'x';
    this.setState({squares:squares});
  }
  renderSquare(i) {
    // on modifie la méthode pour qu'elle lise l'information du state
     return <Square value={this.state.squares[i]} 
        onClick={()=>this.handleClick(i)}
     />;
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
