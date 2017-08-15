import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
      super();
      this.state = {
          turn: 'X',
          winner: undefined
      };
      this.gameState = {
          board: Array(9).fill(''),
          totalMoves: 0,
          gameEnded: false
      }
  }
  clicked(event){
      if(this.gameState.gameEnded == true ) return;
      if(this.gameState.board[event.target.dataset.square] == "") {
          this.gameState.board[event.target.dataset.square] = this.state.turn;
          event.target.innerText = this.state.turn;
          this.setState({
              turn: this.state.turn == 'X' ? 'O' : 'X',
              board: this.gameState.board,
              totalMoves: this.gameState.totalMoves++
          });
      }
      var result = this.checkWinner();
      if(result=='X'){
          this.gameState.gameEnded = true;
          this.setState({
             winner: 'X',
             winnerLine: "Match won by X"
          });
          console.log("okk");
      } else if(result=='O'){
          this.gameState.gameEnded = true;
          this.setState({
              winner: 'O',
              winnerLine: "Match won by O"
          });
      } else if(result=='draw'){
          this.gameState.gameEnded = true;
          this.setState({
              winner:'draw',
              winnerLine: "Match is drawn"
          });
      }

      if(this.gameState.turn == 'O' && !this.gameState.gameEnded) {
          this.gameState.gameLocked = true;
          setTimeout(()=> {
              do {
                  var random = Math.floor(Math.random()*9);
              } while(this.gameState.board[random] != '');
              this.gameState.gameLocked = false;
              this.clicked(document.querySelectorAll('.square')[random]);
          }, 1000);

      }
      //console.log(this.state.gameEnded);
  }

  checkWinner(){
    var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var board = this.gameState.board;
    for (let i=0; i<moves.length; i++){
        if(board[moves[i][0]]==board[moves[i][1]] && board[moves[i][1]]==board[moves[i][2]]){
            return board[moves[i][0]];
        }
    }
    if(this.gameState.totalMoves == 9){
        return 'draw';
    }
  }

  render(){
    return (
      <div id="game">

          <div id="head">
              <h4>This is muhib's Tic Tac Toe</h4>
          </div>
          <div id="board" onClick={(e)=>this.clicked(e)}>
              <div className="square" data-square="0"></div>
              <div className="square" data-square="1"></div>
              <div className="square" data-square="2"></div>
              <div className="square" data-square="3"></div>
              <div className="square" data-square="4"></div>
              <div className="square" data-square="5"></div>
              <div className="square" data-square="6"></div>
              <div className="square" data-square="7"></div>
              <div className="square" data-square="8"></div>
          </div>
          <div id="status">{this.state.winnerLine}</div>

      </div>
    );
  }
}

export default App;
