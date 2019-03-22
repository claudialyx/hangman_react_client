import React, { Component } from 'react';
import HangmanDrawing from './HangmanDrawing';
import LetterSlots from './LetterSlots';
import Keyboard from './Keyboard';
import _ from 'underscore';


const wordBank = {
    fruits: ["apple", "orange", "dragonfruit", "guava", "banana"],
    occupation: ["teacher", "electrician", "engineer", "mechanics", "accountant"],
    animals: ["horse", "tiger", "panda", "zebra", "boar"]
}

const fruits = ['apple', 'banana', 'carrot']
// const fruits = ['spaghettiagliooilio', 'dreamscapes', 'informationoverloaded']

export default class HangmanGame extends React.Component {
    state = {
        word: _.sample(fruits),
        strikes: 0,
        guesses: [],
        over: false,
        won: false,
    }

    checkWin = () => {
        let { word, guesses } = this.state;
        // if guesses contains all letters of word, 
        // returns True (won)
        //will chain ['a', 'p', 'p', 'l', 'e'] to all subsequent rows 
        return !_.chain(word.split(''))
            .map(letter => _.contains(guesses, letter)) // returns true if contains letter
            .contains(false)//returns false because true does not contain  false
            .value() // value will be false, but due to ! in the beginning, it will return True
    }

    newGame = () => {
        this.setState({
            word: _.sample(fruits),
            strikes: 0,
            guesses: [],
            over: false,
            won: false
        })
        console.log(this.state.word);
    }

    checkLetter = (letter) => {
        let { word, strikes, guesses, over, won } = this.state;
        // if word contains the letter, will return True
        if (_.contains(word, letter)) {
        } else {
            strikes++;
        }
        guesses.push(letter);
        // check if won
        won = this.checkWin();
        // if strikes reached maximum display full diagram image
        if (strikes >= 6) {
            strikes = 6;
            over = true;
        }
        //only setState at the end otherwise it will re-render the virtual DOM
        this.setState({ strikes, guesses, over, won });
    }

    getTitle = () => {
        if (this.state.won) {
            return 'YOU WON!';
        } else if (this.state.over) {
            return 'Game Over';
        } else {
            return 'Hang Man';
        }
    }

    render() {
        const { word, strikes, over, guesses, won } = this.state
        return (
            <div>
                <h1>{this.getTitle()}</h1>

                <HangmanDrawing
                    won={won}
                    strikes={strikes} />

                <LetterSlots
                    word={word}
                    over={over}
                    guesses={guesses} />

                <Keyboard
                    checkLetter={this.checkLetter}
                    enabled={!over && !won}
                    guesses={guesses} />

                <button
                    disabled={!over && !won}
                    onClick={this.newGame}>
                    New Game
            </button>
            </div>
        )
    }
}