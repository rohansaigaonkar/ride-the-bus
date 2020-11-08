const AnswerSection = ({
                           step,
                           playHandler,
                           resetHandler
                       }) => {
    const stepOneJsx = (
        <div>
            <button onClick={() => playHandler("red")}>Red</button>
            <button onClick={() => playHandler("black")}>Black</button>
        </div>
    )
    const stepTwoJsx = (
        <div>
            <button onClick={() => playHandler("high")}>High</button>
            <button onClick={() => playHandler("low")}>Low</button>
        </div>
    )
    const stepThreeJsx = (
        <div>
            <button onClick={() => playHandler("in_between")}>In Between</button>
            <button onClick={() => playHandler("outside")}>Outside</button>
        </div>
    )
    const stepFourJsx = (
        <div>
            <button onClick={() => playHandler("CLUBS")}>Club</button>
            <button onClick={() => playHandler("DIAMONDS")}>Diamond</button>
            <button onClick={() => playHandler("HEARTS")}>Heart</button>
            <button onClick={() => playHandler("SPADES")}>Spade</button>
        </div>
    )

    const youWinJsx = (
        <div>
            <h3>You Win!</h3>
        </div>
    )
    switch (step) {
        case 0:
            return stepOneJsx;
        case 1:
            return stepTwoJsx;
        case 2:
            return stepThreeJsx;
        case 3:
            return stepFourJsx;
        case 4:
            return youWinJsx;
        default:
            return (
                <div className={'answerSection'}>
                    <p>u goofed up boi</p>
                    <button onClick={() => resetHandler() }>Reset</button>
                </div>
            )
    }
}
export default AnswerSection;
