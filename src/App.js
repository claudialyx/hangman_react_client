import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react';
import './App.css'
import HangmanGame from './containers/HangmanGame';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }


  render() {
    return (
      <div>
        <Grid columns={3} style={{ marginTop: 0 }} >
          <Grid.Row stretched>
            <Grid.Column style={{ width: "17vw", marginLeft: "2vw" }}>
              <Segment style={{ height: "95vh", display: "flex", flexDirection: "column" }}>
                <div>1 player one </div>
              </Segment>
            </Grid.Column>
            <Grid.Column style={{ width: "55vw" }}>
              <Segment style={{ height: "95vh" }}>
                <div>2 hangman here</div>
                <HangmanGame />
              </Segment>
            </Grid.Column>
            <Grid.Column style={{ width: "17vw", marginRight: "2w" }}>
              <Segment style={{ height: "95vh", display: "flex", flexDirection: "column" }}>
                <div>3 player two </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default App