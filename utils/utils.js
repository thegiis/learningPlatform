function isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
};

function getVocabPosition(rect) {
    let position = {}
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const centerX = windowWidth / 2
    const centerY = windowHeight / 2
    const elementX = rect.x + rect.width / 2
    const elementY = rect.y + rect.height / 2
        // check if element lies on left
        // if left
    if (elementX <= centerX) {
        position['left'] = rect.x + "px"
        position['right'] = 'auto'
        if (rect.x > 120) {
            position["transform"] = 'translateX(-50%)'
        } else {
            position["transform"] = "none"
        }
    } else {
        position['left'] = 'auto'
        position['right'] = (windowWidth - (rect.x + rect.width)) + 'px'
        if (windowWidth - rect.x > 120) {
            position["transform"] = 'translateX(50%)'
        } else {
            position["transform"] = "none"
        }
    }
    //check if element lies on top 
    if (elementY <= centerY) {
        position['top'] = (rect.y + rect.height) + "px"
        position['bottom'] = 'auto'
    } else {
        position['top'] = 'auto'
        position['bottom'] = (windowHeight - (rect.y)) + 'px'
    }

    // console.log(position)
    return position
}

export {
    isAlphaNumeric,
    getVocabPosition
}