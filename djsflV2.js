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
//expand vector values - rec for use within class scope
function expand(x,y){
	if (x instanceof vector2){
		return [x.x,x.y]
	} else {return [x,y]}
}
	
class vector2 {
    constructor(x,y) {
        this.x = x || 0
        this.y = y || x
    }
	//vector FUNCTIONS
	//add vectors
	add(x,y){
		let [dx, dy] = expand(x,y)
		return new vector2(this.x+dx,this.y+(dy||0))
	}
	//minus vectors
	sub(x,y){
		let [dx, dy] = expand(x,y)
		return new vector2(this.x-dx,this.y-(dy||0))
	}
	//mulitply vectors
	multiply(x,y){
		let [dx, dy] = expand(x,y)
		return new vector2(this.x*dx,this.y*(dy||dx))
	}
	//divide vectors
	div(x,y){
		let [dx, dy] = expand(x,y)
		return new vector2(this.x/dx,this.y/(dy||dx))
	}
	//lerp vectors
	lerp(goal,spd){
		let [dx, dy] = expand(goal.x,goal.y)
		return new vector2((dx-this.x)*spd,(dy-this.y)*spd)
	}
	//get distance of 2 vectors
	dist(x,y){
		let [dx, dy] = expand(goal.x,goal.y)
		return  Math.hypot(this.x-dx, this.y-dy)
	}
}

function vec2(x,y){return new vector2(x,y)} //shortcut for creating a "vector2" class

/**
 @param perWin - 'Percentaged window in vector2 form'
 * range - 0-1
 */
function perWin(x, y) { return new vector2(window.innerWidth * x,window.innerHeight * (y || x)) }



//      /   /   /   /   /   /   /   / RANDOM FUNCTIONS   /   /   /   /   /   /   /
function refById(id){return document.getElementById(id)};// refer to element by id

//retrieve relative size to the window size with desired window ratios (ex 16:9, 4:3)
//while maintaining size within window
function rltvDisp(x, y) {
    const minRatio = Math.min(window.innerWidth / x, window.innerHeight / y)
    return { x: minRatio * x, y: minRatio * y }
};

function ranNumBet(a, b){return a + (b - a) * Math.random(); }// Random number between 2 parameters

const rgb = (r, g, b) => 'rgb(' + r + ',' + g + ',' + b + ')'   //rgb values in string format

function minWin(){ Math.min(window.innerHeight, window.innerWidth)}; //return the min

function lerp(from, to, speed) {return(to - from) * speed; }//lerp number

//Round to nearest decimal
function roundToDec(num, dec){return Math.round((num + Number.EPSILON) * Math.pow(10, dec)) / Math.pow(10, dec)}



//      /   /   /   /   /   /   /   / DJSFLELEMENT HANDLING   /   /   /   /   /   /   /

//create element to document body
//please note to respectively set position as upon creation defaults to 'absolute'
function createElement(type, debug, id) {
    const obj = document.createElement(type);
    const objS = obj.style;
    obj.className = 'djsflElement';
    if (id != undefined) { obj.id = id };

    //element data	
    Object.assign(obj, {
        pos: vec2(), size: vec2(), anchor: vec2(),
        posRatio: vec2(), sizeRatio: vec2(),
        usePosRatio: false, sizeState: 0
    });

    //debug values
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



        //note: pls use separate size property for positioning from resizing as to prevent conlict
        //positioning - anchor applied
        function setPos(x, y) {
            objS.left = x + 'px'
            objS.top = y + 'px'
        }

        let anchor = obj.anchor
        let anchorX = anchor.x * obj.size.x
        let anchorY = anchor.y * obj.size.y

        if (obj.usePosRatio == false || obj.usePosRatio == undefined) {
            //pixel position
            setPos(obj.pos.x - anchorX, obj.pos.y - anchorY)

        } else {
            //ratioed position
            setPos(obj.posRatio.x * windowW - anchorX, obj.posRatio.y * windowH - anchorY)
            //adjust pos to match posRatio for easy value reading
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


