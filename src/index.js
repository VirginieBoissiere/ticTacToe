import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
//NOTE Les composants React peuvent définir un état local en définissant this.state dans leurs constructeurs. this.state est considéré comme une donnée privée du composant React qui le définit. Stockons donc la valeur courante du Square dans this.state, et changeons-la quand on clique sur la case. 
//NOTE En appelant this.setState depuis un gestionnaire onClick dans la méthode render de Square, nous demandons à React de ré-afficher ce Square dès que le <button> est cliqué. Après la mise à jour, la this.state.value du Square sera 'X', et nous verrons donc X sur le plateau de jeu. Si vous cliquez sur n’importe quel carré, un X devrait s’y afficher.
// constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

  render() {
    return (
      <button
        className="square"
        //Quand on clique sur un Square, la fonction onClick fournie par le Board est appelée.
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
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
