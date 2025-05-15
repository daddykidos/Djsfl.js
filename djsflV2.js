/** djsfl.js object properties
  object which are created with the createElement function has the 'djsflElement' className

  elementHandler() - function to refresh properties of elements

  properties:
  pos - vector2       note: (not position) as conflicts with js
  size - vector2
  anchor - vector2    note: default vec2(0,0) - top left

  posRatio - vector2
  sizeRatio - vector2

  usePosRatio - bool  note: false - pixel pos | true - ratioed pos
  sizeState - number  note: 0-pixel | 1-width | 2-height | 3-own axis
 */



//      /   /   /   /   /   /   /   / VECTOR FUNCTIONS   /   /   /   /   /   /   /
//A simulated vector using x,y axises
function vector2(x, y) {
    if (x == undefined) { x = 0 }
    if (y == undefined) { y = x }
    return { x: x, y: y };
};

const vec2 = (x, y)=>vector2(x, y); //shortcut for the function "vector2"

/**
 @param perWin - 'Percentaged window in vector2 form'
 * range - 0-1
 */
function perWin(x, y) {
    const height = window.innerHeight
    if (y == undefined) { y = height * x } else { y = height * y }
    return { x: window.innerWidth * x, y: y }
}



//      /   /   /   /   /   /   /   / RANDOM FUNCTIONS   /   /   /   /   /   /   /
const refById = (id) => document.getElementById(id);// refer to element by id

//retrieve relative size to the window size with desired window ratios (ex 16:9, 4:3)
//while maintaining size within window
function rltvDisp(x, y) {
    const minRatio = Math.min(window.innerWidth / x, window.innerHeight / y)
    return { x: minRatio * x, y: minRatio * y }
};

const ranNumBet = (a, b)=> a + (b - a) * Math.random(); // Random number between 2 parameters

const rgb = (r, g, b) => 'rgb(' + r + ',' + g + ',' + b + ')'   //rgb values in string format

const minWin = () =>Math.min(window.innerHeight, window.innerWidth); //return the min

const lerp = (from,to,speed)=>(to-from)*speed; //lerp number
//Round to nearest decimal
const roundToDec = (num,dec) => Math.round((num+Number.EPSILON)*Math.pow(10,dec))/Math.pow(10,dec)



//      /   /   /   /   /   /   /   / DJSFLELEMENT HANDLING   /   /   /   /   /   /   /

//create element to document body
//please note to respectively set position as upon creation defaults to 'absolute'
function createElement(type, debug, id) {
    const obj = document.createElement(type);
    const objS = obj.style;
    obj.className = 'djsflElement';
    if (id != undefined) { obj.id = id };

    //element data
    obj.pos = vec2(); obj.anchor = vec2(); obj.size = vec2()
    obj.posRatio = vec2(); obj.sizeRatio = vec2()
	obj.usePosRatio = false; obj.sizeState = 0

    if (debug == true) {
        Object.assign(objS, {
            position: 'absolute',
            background: 'gray',
            width: obj.size.x + 'px',
            height: obj.size.y + 'px'
        });
        obj.size = perWin(.1);

    }; return document.body.appendChild(obj);
};



/**Handles elements with 'djsflElement' className
 *   refreshes properties such as size/pos
 *   remember to set respective properties 'display' of elements
 */
function elementHandler() {
    Array.from(document.body.getElementsByClassName('djsflElement')).forEach((obj, index) => {
        let objS = obj.style

        //element resizing
        let sizeState = obj.sizeState
        let sizeRatio = obj.sizeRatio
        let size = obj.size
        let windowW = window.innerWidth; windowH = window.innerHeight

        function setSize(x, y) {
            objS.width = x + "px"
            objS.height = y + 'px'
            obj.size = vec2(x, y)
        }

        if (sizeState == 0 || sizeState == undefined) {
            //pixel size
            setSize(size.x, size.y)

        } else if (sizeState == 1) {
            //width ratio size
            setSize(sizeRatio.x * windowW, sizeRatio.y * windowW)

        } else if (sizeState == 2) {
            //heigh ratio size
            setSize(sizeRatio.x * windowH, sizeRatio.y * windowH)

        } else if (sizeState == 3) {
            //own axis ratio size
            setSize(sizeRatio.x * windowW, sizeRatio.y * windowH)

        }



        //positioning - anchor applied
        function setPos(x, y) {
            objS.left = x + 'px'
            objS.top = y + 'px'
        }

        let anchorX = obj.anchor.x * obj.size.x
        let anchorY = obj.anchor.y * obj.size.y
        if (obj.usePosRatio == false || obj.usePosRatio == undefined) {
            //pixel position
            setPos(obj.pos.x - anchorX, obj.pos.y - anchorY)

        } else {
            //ratioed position
            setPos(obj.posRatio.x * windowW - anchorX, obj.posRatio.y * windowH - anchorY)
			obj.pos.x = obj.posRatio.x * windowW - anchorX
			obj.pos.y = obj.posRatio.y * windowH - anchorY
        }

    })
};



//assign properties of djsflElement
/**
*
* @paragraph Assign properties to djsflElement, a shorthand to quickly assign values to djsflElements
*
*
*/
function elementAssign(obj, pos, usePosRatio, size, sizeState, anchor) {
    //position constructor
    obj.usePosRatio = usePosRatio
    if (usePosRatio == true) { obj.posRatio = pos } else { obj.pos = pos }
    //size constructor
    obj.sizeState = sizeState
    if (sizeState > 0) { obj.sizeRatio = size } else { obj.size = size }
    //anchoring
    obj.anchor = anchor
}


