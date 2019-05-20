import React, { Component } from "react";
import Card from "./Card"
import axios from 'axios'
import './Game.css'

const BASE_URL = "https://deckofcardsapi.com/api/deck"

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: "",
      cards: [],
      remaining: 52,
      noCardsLeft: false
    }
    this.addCard = this.addCard.bind(this)
  }

  async componentDidMount() {
    let deckResponse = await axios.get(`${BASE_URL}/new/shuffle/`)
    this.setState({
      deckId: deckResponse.data.deck_id
    })
  }

  randomRotation(){
    let angle = Math.random() * 90 - 45;
    let xPosition = Math.random() * 40 - 20;
    let yPosition = Math.random() * 40 - 20;
    return `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg`
  }

  async addCard() {
    if (!this.state.remaining) {
     this.setState({noCardsLeft: true})
     return;
    }
    
    let cardResponse = await axios.get(`${BASE_URL}/${this.state.deckId}/draw/`)
    let card = cardResponse.data.cards[0]
  
    this.setState(state => {
      state.cards.push({
        code: card.code,
        name: `${card.value} of ${card.suit}`,
        image: card.image,
        transform: this.randomRotation()
      })
      state.remaining = cardResponse.data.remaining
      return state
    })
  }

  render() {
    const cardComponents = this.state.cards.map(card => (
      <Card
        key={card.code}
        name={card.name}
        image={card.image}
        transform={card.transform}
      />
    ));
    return (
      <div >
        {cardComponents}
        {this.state.noCardsLeft ? <p>No cards left!</p> : 
        <button onClick={this.addCard}>Gimme Card!</button>}
      </div>
    )
  }
}


export default Game;
