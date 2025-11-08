/** djsfl.js object properties
  object which are created with the createElement function has the 'djsflElement' className

TABLE OF CONTENTS
- VECTOR SECTION
- RANDOM SECTION
- DJSFLELEMENT SECTION
- FUNCTION BATCH LOOP SECTION
 */



//      /   /   /   /   /   /   /   / VECTOR FUNCTIONS   /   /   /   /   /   /   / VECTOR SECTION
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
        this.y = y || this.x
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
	scale(x,y){
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
		let [dx, dy] = expand(x,y)
		return  Math.hypot(this.x-dx, this.y-dy)
	}
}

function vec2(x,y){return new vector2(x,y)} //shortcut for creating a "vector2" class

/**
 @param perWin - 'Percentaged window in vector2 form'
 * range - 0-1
 */
function perWin(x, y) { 
	let [dx,dy] = expand(x,y)
	return new vector2(window.innerWidth * dx,window.innerHeight * (dy || dx)) 
}

//get window size in vector2 format
function getWindow(){return new vector2(window.innerWidth,window.innerHeight)} 



//      /   /   /   /   /   /   /   / RANDOM FUNCTIONS   /   /   /   /   /   /   / RANDOM SECTION
function refById(id){return document.getElementById(id)};// refer to element by id

//retrieve relative size to the window size with desired window ratios (ex 16:9, 4:3)
//while maintaining size within window
function rltvDisp(x, y) {
	let [dx, dy] = expand(x, y)
    const minRatio = Math.min(window.innerWidth / dx, window.innerHeight / dy)
    return vec2(minRatio * dx, minRatio * dy )
};

function ranNumBet(a, b){return a + (b - a) * Math.random(); }// Random number between 2 parameters

function rgb(r, g, b){return 'rgb(' + r + ',' + g + ',' + b + ')'}   //rgb values in string format

function minWin(){ return Math.min(window.innerHeight, window.innerWidth)}; //return the min

function lerp(from, to, speed) {return(to - from) * speed; }//lerp number

//Round to nearest decimal
function roundToDec(num, dec){return Math.round((num + Number.EPSILON) * Math.pow(10, dec)) / Math.pow(10, dec)}



//      /   /   /   /   /   /   /   / DJSFLELEMENT HANDLING   /   /   /   /   /   /   / DJSFLELEMENT SECTION

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



//initialize a none djsflElement that has been used within the document
function elementInit(obj){
	if(obj.classList.contains('djsflElement') == false ){
	obj.className += ' djsflElement'
	}
	Object.assign(obj,{
		pos: vec2(), size: vec2(), anchor: vec2(),
        posRatio: vec2(), sizeRatio: vec2(),
        usePosRatio: false, sizeState: 0
	})
}



//easy assigning of size states for djsflElement
const sizeStates = {pixel: 0, width: 1, height: 2, axis: 3, minAxis: 4  }

/**Handles elements with 'djsflElement' className
 *   refreshes properties such as size/pos
 *   remember to set respective properties 'display' of elements
 */
function elementHandler() {
    Array.from(document.body.getElementsByClassName('djsflElement')).forEach((obj, index) => {
        objHandle(obj)
    })
};



//single djsflElement handler - refreshes only specified obj
function objHandle(obj){
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

        } else if(sizeState == 4){
			//min axis scaling
			let minWin = Math.min(window.innerHeight, window.innerWidth)
			setSize(sizeRatio.x*minWin, sizeRatio.y*minWin)
		}



        //note: pls use direct property value for positioning from resizing as to prevent conlict
        //Section: positioning - anchor applied
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
}



//assign properties of djsflElement
/**
*
* @paragraph Assign properties to djsflElement, a shorthand to quickly assign values to djsflElements
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



//      /   /   /   /   /   /   /   FUNCTION BATCH LOOP SECTION   /   /   /   /   /   /   / 
// FUNCTION LOOP BATCH LIBRARY -- good for loop batch running different funcitons within a loop
// ex. fps based game 60 calls per sec
// & for performance kill the function when no longer needed to be looped
let functions = []
function addAsFunc(func, name) {
    let funcObj = new Object()
    funcObj.func = func
    funcObj.name = name
    functions.push(funcObj)
}

//kill function - so as to not let it be treated as a batch function but can still be used for other uses
function killFunc(name, delay) {
    setTimeout(() => {
        let found = functions.findIndex((obj) => obj.name == name)
        if (found > -1) {
            functions.splice(found, 1)
        }
    }, delay);
}

//calls all batch functions-call this function ONLY once 
function callFunctions(delay) {
    setTimeout(() => {
        functions.forEach(obj => { obj.func.call() });
        callFunctions()
    }, delay);
};