//Djsfl Daki javascript function library

// refer to element by id
function RefById(id) {
   return document.getElementById(id)
};//(>--<)



//create element to document
function Cobj(id,type,debug){
   const obj = document.createElement(type)
   const objS = obj.style
    obj.id = id

    //object becomes visually seeable in debug mode
    if (debug != false||debug !=""){
        console.log('debugging object'+id)
        objS.position = 'absolute'
        objS.background = 'grey'
        objS.width = window.innerWidth*0.05+"px"
        objS.height = window.innerHeight*0.05+"px"
    };

  return  document.body.appendChild(obj)
};//(>--<)



// Random number between 2 parameters
function RanNumBet(a,b) {
    return a+(b*Math.random())
};//(>--<)



//set position of element by pixels
function SetPosByPx(obj,x,y,center){
    let objS = obj.style
    objS.position = 'absolute'

    //Object centered visually?
    if (center == false ||center=="" ||center==undefined){
        objS.top = y+'px';objS.left = x+'px'
        } else{
            objS.top = y-obj.offsetHeight/2+'px'
            objS.left = x-obj.offsetWidth/2+'px'
        };
};//(>--<)



//set position of element by percentage
function SetPosByPer(obj,x,y,center){
    const objS = obj.style
    objS.position = 'absolute'
    
    //Object centered visually?
    if (center == false ||center==""){
    objS.top = y*window.innerHeight+'px';objS.left = x*window.innerWidth+'px'
    } else{
        objS.top = y*window.innerHeight-obj.offsetHeight/2+'px'
        objS.left = x*window.innerWidth-obj.offsetWidth/2+'px'
    };
};//(>--<)



//set size of element by px
function SetSizeByPx(obj,x,y){
    const objS = obj.style
    objS.position = 'absolute'
    objS.height = y+'px';objS.width = x+'px'
};//(>--<)



//set size of element by percentage
function SetSizeByPer(obj,x,y){
    const objS = obj.style
    objS.position = 'absolute'
    objS.height = y*window.innerHeight+'px';objS.width = x*window.innerWidth+'px'
};//(>--<)



//get size by pixels - returns an array containing 2 values indexed by 1 or 0 
function GetSizeByPx(obj){
    const objS = obj.style
    //get original disp to avoid error
    const curdisp = objS.display
    objS.display = "block"

    const size = [obj.offsetWidth,obj.offsetHeight]

    //return to normal state
    objS.display = curdisp
    return size
};//(>--<)



//get position by pixels - returns an array containing 2 values indexed by 1 or 0 
function GetPosByPx(obj){
    const objS = obj.style
    //get original disp to avoid error
    const curdisp = objS.display
    objS.display = "block"

    const pos = [obj.offsetLeft,obj.offsetTop]

    //return to normal state
    objS.display = curdisp
    return pos
};//(>--<)




//changes the offset positvely or negatvely of the object
function SetOffsetPos(obj,x,y){
let objS = obj.style
objS.position = 'absolute'

objS.top = (obj.offsetTop+y)+'px'
objS.left = (obj.offsetLeft+x)+'px'
};//(>--<)


//retrieve relative size to the window size with desired window ratios (ex 16:9, 4:3) 
//while maintaining size within window
function RltvDisp(x,y) {
  const minkill = Math.min(window.innerWidth/x,window.innerHeight/y)
  return [minkill*x,minkill*y]
};//(>--<)

//return rgb values in contecated format
function rgb(r,g,b){
    return 'rgb('+r+','+g+','+b+')'
};//(>--<)



