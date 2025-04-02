/** djsfl.js object properties
 * object which are created with the createElement function has the 'djsflElement' className
 *
 * elementHandler() - function to refresh properties of elements
 *
 * properties:
 * pos - vector2        note: (not position) as conflicts with js
 * size - vector2
 * centerPos - bool     note: does not affect pos just visually
 * mainRatio - bool     note: keeps ratio of pos/size to match window - to be add
 */



//A simulated vector using x,y axises
function vector2(x, y) {
    if (y == undefined) { y = x }
    return {x: x, y: y };
};

//shortcut for the function "vector2"
function vec2(x, y) { return vector2(x, y) };

/**
 @param perWin - 'Percentaged window in vector2 form'
 * range - 0-1
 */
function perWin(x, y) {
    const height = window.innerHeight
    if (y == undefined) { y = height * x } else { y = height * y }
    return { x: window.innerWidth * x, y: y }
}

// refer to element by id
function refById(id) { return document.getElementById(id) };

//create element to document body
function createElement(type, debug, id) {
    const obj = document.createElement(type);
    const objS = obj.style;
    obj.className = 'djsflElement';
    if (id != undefined) { obj.id = id };

    if (debug == true) {
        objS.position = 'absolute';
        objS.background = 'grey';
        obj.size = perWin(.1); obj.pos = vec2(0)
        objS.width = obj.size.x + 'px';
        objS.height = obj.size.y + 'px';
    }; return document.body.appendChild(obj);
};

// Random number between 2 parameters
function ranNumBet(a, b) { return a + (b - a) * Math.random() };

//retrieve relative size to the window size with desired window ratios (ex 16:9, 4:3)
//while maintaining size within window
function rltvDisp(x, y) {
    const minRatio = Math.min(window.innerWidth / x, window.innerHeight / y)
    return { x: minRatio * x, y: minRatio * y }
};

//get rgb values in string format
function rgb(r, g, b) { return 'rgb(' + r + ',' + g + ',' + b + ')' }

function minWin(){
    return Math.min(window.innerHeight,window.innerWidth)
}



/**Handles elements with 'djsflElement' className
 *   refreshes properties such as size/pos
 *   remember to set respective properties 'display' of elements
 */
function elementHandler() {
    Array.from(document.body.getElementsByClassName('djsflElement')).forEach((obj, index) => {
        let objS = obj.style

        //refreshing size
        objS.width = obj.size.x + "px"; objS.height = obj.size.y + "px"

        //refreshing position - note incorporate (document.body.style.down/right)
        if (obj.centerPos != false) {
            objS.left = obj.pos.x - obj.size.x / 2 + 'px'
            objS.top = obj.pos.y - obj.size.y / 2 + 'px'
        } else {
            objS.left = obj.pos.x + 'px'; objS.top = obj.pos.y + "px"
        }

    })
};
