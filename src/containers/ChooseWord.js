// import React from 'react';
// import _ from 'underscore';

// // 2 types of player, guesser or chooser
// // if player type is guesser, player will play the game and guess the word
// // if player type is chooser, player can select word for guesser to guess  

// export default class ChooseWord extends React.Component {

//     handleClick = (word) => {
//         this.props.wordSelected(word)
//     }

//     render() {
//         let { wordBank, PlayerType } = this.props
//         console.log('wordBank:', wordBank)
//         // if (PlayerType == 'chooser') {
//         return (
//             <div className="chooser-words-selection">
//                 {wordBank.map((word, index) =>
//                     <button key={index} onClick={this.handleClick.bind(this, word)} className="word-button"> {word}</button>
//                 )}
//             </div>
//         )
//     }
//     // else {
//     //     return (
//     //         <>
//     //         </>
//     //     )
//     // }
// }
// // }
