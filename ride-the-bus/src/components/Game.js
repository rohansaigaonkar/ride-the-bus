import React, {Component} from 'react';
import FetchCard from "./FetchCard";

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            deckId: null,
            response: null
        }
    }

    async componentDidMount() {
        this.fetchDeck()
            .then(res => this.setState({
                loading: false,
                deckId: res.deck_id
            })).catch(err => console.log(err))
    }

    fetchDeck = async () => {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        const response = await fetch(url)
        const body = await response.json()

        if (response.status !== 200) {
            throw Error(body.message)
        }

        /** Logs the response */
        console.log(body)
        return body;
    }

    render() {
        return (
            <div>
                <h1>Ride The Bus!</h1>
                {this.state.loading ? <p>loading...</p> : <FetchCard deckId={this.state.deckId}/>}
            </div>
        );
    }
}

export default Game;
