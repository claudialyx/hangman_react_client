import React from 'react';
import _ from 'underscore';

const ROW_ONE = 'abcdefghijklm'.split('');
const ROW_TWO = 'nopqrstuvwxyz'.split('');
const ROW_THREE = '1234567890'.split('');

export default class Keyboard extends React.Component {

  // if game not over, run checkletter function
  handleClick = (letter) => {
    if (this.props.keyboard_enabled) {
      this.props.checkLetter(letter);
    }
  }

  // make each alphabets into buttons
  getButton = (letter) => {
    let disabled = _.includes(this.props.guesses, letter);
    return (
      <button
        key={letter}
        onClick={this.handleClick.bind(this, letter)}
        disabled={disabled}>
        {letter}
      </button>
    );
  }

  //Keys React are utilised to identify specific Virtual DOM Elements that have changed.
  //doing this will return a b c d e f separately = letter for getButton\

  getRow = (row) => {
    //returns abcdefghijklm & nopqrstuvwxyz
    // console.log('keyboard:', row.join(''))
    return (
      <div className='button-row' key={row.join('')}>
        {row.map(this.getButton)}
        {/* {row.map(alpha => {
          console.log(alpha)
        })} */}
      </div >
    );
  }

  render() {
    return (
      <div className='hangman-keyboard'>
        {[ROW_ONE, ROW_TWO, ROW_THREE].map(this.getRow)}
      </div>
    );
  }
};


// const alpha = 'abcdefghijklmnopqrstuvwxyz';
// const alphabets = [alpha.split('')];

// export default class Keyboard extends React.Component {

//   // if game not over, run checkletter function
//   handleClick = (letter) => {
//     if (this.props.enabled) {
//       this.props.checkLetter(letter);
//     }
//   }

//   // make each alphabets into buttons
//   getButton = (alphabets) => {
//     let disabled = _.includes(this.props.guesses, alphabets);
//     for (var i = 0; i < alphabets.length; i++) {
//       var letter = alphabets[i];
//       return (
//         <button key={letter}
//           onClick={this.handleClick.bind(this, letter)}
//           disabled={disabled}>
//           {letter}
//         </button>
//       )
//     }
//   }

//   render() {
//     return (
//       <div className='hangman-keyboard'>
//         {alphabets.map(this.getButton)}
//       </div>
//     );
//   }
// };
