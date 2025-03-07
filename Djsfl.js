//Djsfl Daki javascript function library


// refer to element by id
function refById(id) {
   return document.getElementById(id)
};//(>--<)


//A simulated vector using x,y axises
function vector2(x, y){
let vec = new Object()
vec.x = x
if(y==null){vec.y = x}else{vec.y = y}
return vec
};



//create element to document
function createElement(id,type,debug){
   const obj = document.createElement(type)
   const objS = obj.style
   if (id!=''){
    obj.id = id
   }
    //object becomes visually seeable in debug mode
    if (debug != false||debug !=null){
        console.log('debugging object'+id)
        objS.position = 'absolute'
        objS.background = 'grey'
        objS.width = window.innerWidth*0.05+"px"
        objS.height = window.innerHeight*0.05+"px"
    };

  return  document.body.appendChild(obj)
};//(>--<)



// Random number between 2 parameters
function ranNumBet(a,b) {
    return a+(b-a)*Math.random()
};//(>--<)



//set position of element by pixels
function setPosByPx(obj,pos,center){
    const objS = obj.style
    objS.position = 'absolute'
    let x = pos.x
    let y = pos.y
    //Object centered visually?
    if (center == false ||center==""){
        objS.top = y+'px';objS.left = x+'px'
        } else{
            objS.top = y-obj.offsetHeight/2+'px'
            objS.left = x-obj.offsetWidth/2+'px'
        };
};//(>--<)



//set position of element by percentage
function setPosByPer(obj,pos,center){
    const objS = obj.style
    objS.position = 'absolute'
    let x = pos.x
    let y = pos.y
    //Object centered visually?
    if (center == false ||center==null){
    objS.top = y*window.innerHeight+'px';objS.left = x*window.innerWidth+'px'
    } else{
        objS.top = y*window.innerHeight-obj.offsetHeight/2+'px'
        objS.left = x*window.innerWidth-obj.offsetWidth/2+'px'
    };
};//(>--<)



//set size of element by px
function setSizeByPx(obj,size){
    let x = size.x
    let y = size.y
    const objS = obj.style
    objS.height = y+'px';objS.width = x+'px'
};//(>--<)



//set size of element by percentage
function setSizeByPer(obj,size){
    let x = size.x
    let y = size.y
    const objS = obj.style
    objS.height = y*window.innerHeight+'px';objS.width = x*window.innerWidth+'px'
};//(>--<)



//get size by pixels - returns an array containing 2 values indexed by 1 or 0 
function getSizeByPx(obj){
    const objS = obj.style
    //get original disp to avoid error
    const curdisp = objS.display
    objS.display = "block"

    const size = new Object()
    size.x = obj.offsetWidth
    size.y = obj.offsetHeight

    //return to normal state
    objS.display = curdisp
    return size
};//(>--<)



//get position by pixels index by x or y
function getPosByPx(obj,center){
    const objS = obj.style
    //get original disp to avoid error
    const curdisp = objS.display
    objS.display = "block"

    const pos = new Object()
   if(center!=true | center==null){
    pos.x = obj.offsetLeft
    pos.y = obj.offsetTop
   }else{
   pos.x = obj.offsetleft+obj.offsetWidth/2
   pos.y = obj.offsetTop+obj.offsetHeight/2   
   }
    //return to normal state
    objS.display = curdisp
    return pos
};//(>--<)


//retrieve relative size to the window size with desired window ratios (ex 16:9, 4:3) 
//while maintaining size within window
function rltvDisp(x ,y) {
    const minkill = Math.min(window.innerWidth/x,window.innerHeight/y)
    let pos = new Object()
    pos.x = minkill*x
    pos.y = minkill*y

    return pos
};//(>--<)



function rgb(r,g,b){
    return 'rgb('+r+','+g+','+b+')'
}
