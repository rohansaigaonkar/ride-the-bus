import React, {Component} from 'react';
import Card from "./Card";
import AnswerSection from "./AnswerSection";
import {getColor, isHighOrLow, isInBetween, isInBetweenOrOutside} from "./utils/CardHelper";

/**
 * This component handles the drawing a new card. It is responsible which step the user is on
 * As well as checking if their guess was correct.
 *
 * @param drawCard
 * @returns {JSX.Element}
 * @constructor
 */
class FetchCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            loading: true,
            cards: []
        }
        this.handleDraw = this.handleDraw.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.drawCallback = this.drawCallback.bind(this)
        this.handleCorrect = this.handleCorrect.bind(this)
        this.handleIncorrect = this.handleIncorrect.bind(this)
    }

    handleDraw = async (button) => {
        console.log("Drawing Card")
        this.fetchCard()
            .then(res => this.setState({
                loading: false,
                cards: this.state.cards.concat(res.cards[0])
            }, () => this.drawCallback(button))).catch(err => console.log(err + "wassap kiddo u dun goofed"))
    }
    fetchCard = async () => {
        const url = `https://deckofcardsapi.com/api/deck/${this.props.deckId}/draw?count=1`
        const response = await fetch(url)
        const body = await response.json()

        if (response.status !== 200) {
            throw Error(body.message)
        }

        /** Logs the response */
        console.log(body)
        return body;
    }

    handleReset() {
        this.setState({
            step: 0,
            loading: false,
            cards: []
        })
    }

    drawCallback(button) {
        console.log(button)
            const step = this.state.step
            const currCard = this.state.cards[step]
            switch (this.state.step) {
                case 0:
                    if (getColor(currCard.suit) === button) {
                        this.handleCorrect()
                    } else {
                        this.handleIncorrect()
                    }
                    break;
                case 1:
                    if (isHighOrLow(currCard, this.state.cards[step - 1], button)) {
                        this.handleCorrect()
                    } else {
                        this.handleIncorrect()
                    }
                    break;
                case 2:
                    if (isInBetweenOrOutside(this.state.cards, step, button)) {
                        this.handleCorrect()
                    } else {
                        this.handleIncorrect()
                    }

                    break;
                case 3:
                    if (currCard.suit === button) {
                        this.handleCorrect()
                    } else {
                        this.handleIncorrect()
                    }
                    break;
                default:

            }
    }

    handleCorrect() {
        this.setState({
            step: this.state.step + 1
        })
    }

    handleIncorrect() {
        console.log("loser")
        this.setState({
            step: -1
        })
    }

    render() {
        return (
            <div>
                <div className={'cards_box'}>{this.state.cards.map(card => <Card url={card.image}>{card.image}</Card>)}</div>
                <AnswerSection
                    step={this.state.step}
                    playHandler={this.handleDraw}
                    resetHandler={this.handleReset}/>
            </div>
        );
    }
}

export default FetchCard;
