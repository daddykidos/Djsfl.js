# DjsflV2.js Documentation

## May be incomplete or outdated from time to time

## vector2(x,y) - uses x and y coordinates

you can also use shorthand function **vec2()**

1) if x is specified and y is absent then y = x <br>

2) if all params are absent then returns 0 for both properties
   
       vector2()      //returns {x: 0, y: 0}
       vector2(32)    //returns {x: 32, y:32}
       vector2(43,-3) //returns {x: 43, y: -3}
       vec2(3,1)      //returns {x: 3, y: 1} - shorthand function

### perWin(x, y) - returns a scaled ratio of the axis of the window

This function multiplies each axis according to the window size <br>for example perWin(.5,.5), this returns the center of the screen in pixels

### rltvDisp(x, y) - trys to maintain a ratio within the window while able to fit most of the space

for example if you want a 4:3 window ratio it will scale upwards or downwards according to the height/width of the window 



## Vector2 with expanded functionality

You can now since may 23, 2025 perform methods on vector2 classes

following fucntions/methods available

- add()

- sub() //subtrat

- div() //divide

- multiply()

- lerp(from, to, spd)
- dist(vec) //returns number

**/    /    /    /    /    /    /    /    /    /    /    /    /    /**

## dlsflElement - Element created using createElement function

### createElement(type, debug, id) - creates an element with the djsflElement classname

**Please note** to respectively set the **position property** of element as by default with the djsflElement handled classes are set to **'absolute'** upon creation.

If this affects desired outcome for specific element better to use the plain code **document.createElement()**

type  - Refers to the kind of DOMElement your creating in html format ex. div, span, img e.t.c. <br>
debug - Visually adds color to the object and some size to be noticed easily when debugging. <br>
id    - The id of the element (optional parameter)

### Properties of djsflElement

**Please rememeber** to respectively assign **display** value accordingly for desired results of the element. <br> 
You need to call the elementHandler() function to refresh the actual visual position of all elements containing the  djsflElement className

    pos    //vector2 - position of element in pixels
    size   //vector2 - size of element in pixels
    anchor //vector2 - offset position of element depending on size of element
           //Default 0,0 (top left corner) Center 0.5, 0.5
    posRatio //vector2 ratioed position scaled depending on window size
    sizeRatio //vector2 ratioed size scaled according to window size
    
    usePosRatio - bool   //false - uses pixel pos | true - uses ratioed pos
    sizeState  //number 0-pixel | 1-width | 2-height | 3 - own axis

sizeState - is the choice of what scaling method you want with choices from to 0-3

Note: that when using posRatio or sizeRatio it will affect the pos and size to show in original form in pixels so feel free to **get position and size directly** as it automatically converts it to pixels 

so if the window is 1000 px wide and tall and **sizeRatio** is set to 0.5 on each axis then the **size** will be set to 500px though sizeRatio remains as in ratioed format so still 0.5

As for **pos** and **posRatio** note that anchor is applied to each 

**elementAssign**(obj,pos,usePosRatio,size,sizeState,anchor) - this function is a shorthand function/ one-liner code for manually assigning values to the djsflElement

if usePosRatio is true it will assign the value of posRatio instead of pos

as for size, sizeRatio will be receiving value if sizeState > 0 else it will assign the value of size

## elementHandler() - handles elements with djsflElement className

handles the visual position, size, anchor e.t.c. and refreshes such data once function is called.

## refById(id) - get an element by its id

the refById function gets an element by its id, basically equivalent of **document.getElementById()** function  

/    /    /    /    /    /    /    /    /    /    /    /    /    /

### Other functions

## minWin() - gets smallest window size axis

if the window width is smaller it will return the width else it will return the height. *Does not have any parameter but might have soon*

## rgb(r,g,b) - returns a stringified value of the rgb values

ex. rgb(124,0,225)  //returns 'rgb(124,0,225)'

## ranNumBet(a,b) - returns a random number within range

ex. ranNumBet(3,10) //potential returns 7   

## roundToDec(num,dec) - round to nearest decimal point

ex. rountToDec(1.6314112312,2) //reutrns 1.63

## lerp(from, to, speed) - lerp the from value to the goal and slow in down based on speed

ex. lerp(5,10,.5) //returns 7.5
