# DjsflV2.js Documentation
## May be incomplete or outdated from time to time



## vector2(x,y) - uses x and y coordinates
you can also use shorthand function **vec2()**
1) if x is specified and y is absent then y = x<br>
2) if all params are absent then returns 0 for both properties
   
       vector2()      //returns {x: 0, y: 0}
       vector2(32)    //returns {x: 32, y:32}
       vector2(43,-3) //returns {x: 43, y: -3}
       vec2(3,1)      //returns {x: 3, y: 1} - shorthand function

### perWin(x, y) - returns a scaled ratio of the axis of the window
This function multiplies each axis according to the window size <br>
for example perWin(.5,.5), this returns the center of the screen in pixels

### rltvDisp(x, y) - trys to maintain a ratio within the window while able to fit most of the space
for example if you want a 4:3 window ratio it will scale upwards or downwards according to the height/width of the window



## dlsflElement - Element created using createElement function

### createElement(type, debug, id) - creates an element with the djsflElement classname
type  - Refers to the kind of DOMElement your creating in html format ex. div, span, img e.t.c.<br>
debug - Visually adds color to the object and some size to be noticed easily when debugging.<br>
id    - The id of the element (optional parameter)

### Properties of djsflElement
**Please rememeber** to respectively assign **display** value accordingly for desired results of the element. <br> 
You need to call the elementHandler() function to refresh the actual visual position of all elements containing the  djsflElement className

    pos    //vector2 - position of element in pixels
    size   //vector2 - size of element in pixels
    anchor //vector2 - offset position of element depending on size of element
           //Default 0,0 (top left corner) Center 0.5, 0.5

