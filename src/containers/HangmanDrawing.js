import React from 'react';
import _ from 'underscore';

const WINNING_LEVEL = -1;
const LOSING_LEVEL = 6;
const LEVEL_MAP = {
  'strike-0': 0,
  'strike-1': 1,
  'strike-2': 2,
  'strike-3': 3,
  'strike-4': 4,
  'strike-5': 5,

  gameover: LOSING_LEVEL,
  gamewon: WINNING_LEVEL
};

export default class HangmanDrawing extends React.Component {

  level() {
    // if won, set strikes to -1, else set strikes to show attempts left or 6(if game ends) 
    if (this.props.won) {
      return WINNING_LEVEL;
    }
    else {
      return Math.min(
        LOSING_LEVEL,
        Number(this.props.strikes)
      );
    }
  }

  getClass(label, strikes) {
    //returns strike-0, strike-1 .... 
    // console.log('label:', label)
    //returns 0 1 2 3 4 5 6 -1
    // console.log('strikes:', strikes)
    let current = '';
    // if strikes value matches the strikes count, return classname "current"
    if (strikes === this.level()) {
      current = 'current';
    }
    //  .hangman-sprites .strike-0 
    return `${label} ${current}`;
  }

  getSprites() {
    return _.map(LEVEL_MAP, (strikes, label) => {
      return (
        <div
          key={label}
          className={this.getClass(label, strikes)}
        />
      );
    });
  }

  render() {
    return (
      <div className='hangman-sprites'>
        {this.getSprites()}
      </div>
    );
  }

};
