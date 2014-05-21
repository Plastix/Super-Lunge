define(function() {

    function getScore() {
        if (!localStorage || localStorage.getItem("highScore") === null) {
            return 0;
        } else {
            return parseFloat(localStorage.getItem("highScore")); //HTML5 Localstorage only stores strings. Make sure to return a number!
        }
    }

    function getTime() {
        if (!localStorage || localStorage.getItem("bestTime") === null) {
            return 0;
        } else {
            return parseFloat(localStorage.getItem("bestTime"));
        }
    }

    function saveScore(score) {
        if (localStorage) {
            localStorage.setItem("highScore", score);
        }
    }

    function saveTime(time) {
        if (localStorage) {
            localStorage.setItem("bestTime", time);

        }
    }

    // Return an object for Require JS
    return {
        getScore: getScore,
        getTime: getTime,
        saveScore: saveScore,
        saveTime: saveTime
    };
});