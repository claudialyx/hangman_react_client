import React, { Component } from 'react';
import HangmanDrawing from './HangmanDrawing';
import LetterSlots from './LetterSlots';
import Keyboard from './Keyboard';
import _ from 'underscore';


export default class HangmanGame extends React.Component {
    state = {
        word: '',
        wordBank: [],
        strikes: 0,
        guesses: [],
        over: false,
        won: false,
    }

    componentDidMount() {
        var results;
        return (
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a345daaf3df75b855cb517049ed48a0b&language=en-US&page=1`)
                .then(
                    results => results.json(),
                    console.log('results:', results)
                )
                .then(
                    data => {
                        var wordBank = data.results.map(result => {
                            // console.log('wordbank:', wordBank)
                            return result.title
                        })
                        this.setState({ wordBank: wordBank })
                    }
                )
                .then(
                    data => {
                        this.setState({ word: this.wordSelected() })
                        // console.log(this.state.word)
                        // debugger
                    })
        )
    }

    wordSelected = () => {
        const { wordBank } = this.state
        const n = Math.floor(Math.random() * wordBank.length)
        const word = wordBank[n]
        // let re = /[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/;
        // let letters_sanitized = letters.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
        const word1 = word.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
        const selectedWord = word1.toLowerCase()
        console.log('selectedword', selectedWord)
        return selectedWord
    }

    checkWin = () => {
        let { word, guesses } = this.state;
        // if guesses contains all letters of word, 
        // returns True (won)
        // will chain ['a', 'p', 'p', 'l', 'e'] to all subsequent rows 
        return !_.chain(word.split(''))
            .filter(letter => letter !== ' ') //remove spaces
            .map(letter => _.contains(guesses, letter)) // returns true if contains letter
            .contains(false)//returns false because true does not contain  false
            .value() // value will be false, but due to ! in the beginning, it will return True
    }

    newGame = () => {
        this.setState({
            word: this.wordSelected(),
            strikes: 0,
            guesses: [],
            over: false,
            won: false
        })
        // console.log(this.state.word);
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
        console.log('guesses:', this.state.guesses, 'letter:', letter)
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
        const { word, strikes, over, guesses, won, wordBank } = this.state
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
                    keyboard_enabled={!over && !won}
                    // keyboard_enabled={!over && !won && playerType == 'guesser'}
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