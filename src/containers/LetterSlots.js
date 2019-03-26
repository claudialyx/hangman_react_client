import React from 'react';
import _ from 'underscore';


export default class LetterSlots extends React.Component {

    getSlot = (letter, index) => {
        let { guesses, over } = this.props;
        let classNames = ['letter-slot'];
        // console.log('getSlot:', letter)
        let contents = _.contains(guesses, letter) ? letter : ' ';
        // if letters contain whitespace, do not display underline
        if (letter == ' ') {
            classNames.push('show');
        }
        // if game is over and content is not filled up, reveal the entire word
        if (contents === ' ' && over) {
            classNames.push('revealed');
            contents = letter;
        }
        // let a = classNames.join(' ')
        // // returns letter-slot and revealed
        // console.log('here:', a)

        return (
            <div
                key={index}
                className={classNames.join(' ')}>
                {contents}
            </div>
        );
    }

    // this will return all the letters individually 
    getSlots() {
        let { word } = this.props;
        let letters = word.split('');
        // console.log('letters:', letters)
        // console.log('letters:', letters, 'typeof:', typeof (letters));
        return letters.map(this.getSlot);
        // return letters.map(alpha => {
        //     console.log('here:', alpha)
        // });
    }

    render() {
        return (
            <div className='letter-slots'>
                {this.getSlots()}
            </div>
        );
    }

};
