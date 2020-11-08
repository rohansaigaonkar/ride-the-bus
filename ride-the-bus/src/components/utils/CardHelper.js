// Utility class to help with:
// cards -> numerical value
// Cards -> color
export function getColor(cardSuit) {
    switch (cardSuit) {
        case 'CLUBS':
        case 'SPADES':
            return 'black'
        case 'DIAMONDS':
        case 'HEARTS':
            return 'red'
        default:
            return -1
    }
}

export function isHighOrLow(currCard, prevCard, button) {
    return (
        (button === 'high' && toNumValue(currCard.value) >= toNumValue(prevCard.value)) ||
        (button === 'low' && toNumValue(currCard.value) <= toNumValue(prevCard.value))
    )
}

export function toNumValue(stringValue) {
    if (stringValue === 'JACK') {return 11}
    if (stringValue === 'QUEEN') {return 12}
    if (stringValue === 'KING') {return 13}
    if (stringValue === 'ACE') {return 1}
    return stringValue
}

export function isInBetweenOrOutside(cardsList, step, button) {
    const currCardVal = toNumValue(cardsList[step].value)
    const prevCardVal = toNumValue(cardsList[step - 1].value)
    const twoPrevCardVal = toNumValue(cardsList[step - 2].value)

    return (button === 'in_between' && (currCardVal-prevCardVal) * (currCardVal-twoPrevCardVal) <= 0)
    || (button === 'outside' && (currCardVal-prevCardVal) * (currCardVal-twoPrevCardVal) >= 0)
}

