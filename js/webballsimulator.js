var mousePosition = 
{
    x: 0,
    y: 0
};

var previousMousePosition = 
{
    x:0,
    y:0
};

(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        mousePosition.x = event.pageX;
        mousePosition.y = event.pageY;
    }
})();

var ball = 
{
    object: undefined,
    position:
    {
        x: 300,
        y: 500
    },
    size:{
        x:128,
        y:128
    },
    velocity:{
        x:0,
        y:0
    },
    gravity:{
        x:0,
        y:.1
    },
    friction:{
        x:.2,
        y:.2
    },
    grabbed: false
}

var relativeMousePosition = {
    x:0,
    y:0
}

$( document ).ready(function() {

    Start();

    setInterval(Update, 10);
});

function Start(){
    ball.object = $("#ball");
    ball.object.css("width",ball.size.x);
    ball.object.css("height",ball.size.y);

    ball.object.mousedown(ClickBall);

    document.documentElement.addEventListener("mouseup",
    ReleaseBall);

    SetBallPosition();
}

function ClickBall(){
    ball.grabbed = true;
    relativeMousePosition.x = mousePosition.x - ball.position.x;
    relativeMousePosition.y = mousePosition.y - ball.position.y;
}

function ReleaseBall(){
    ball.grabbed = false;
    ball.velocity.x = mouseVelocity.x;
    ball.velocity.y = mouseVelocity.y;
}

function SetBallPosition(){
    ball.object.css("left",ball.position.x);
    ball.object.css("top",ball.position.y);
}

function Bounce(){
    if(ball.position.y > window.innerHeight - ball.size.y
        || ball.position.y < 0){
            ball.velocity.y = -ball.velocity.y;
            ball.position.y = Math.min(ball.position.y, window.innerHeight - ball.size.y);
            ball.position.y = Math.max(ball.position.y, 0);
            ball.velocity.y *= (1 - ball.friction.y);
        }
    if(ball.position.x > window.innerWidth - ball.size.x
        || ball.position.x < 0){
            ball.velocity.x = -ball.velocity.x;
            ball.position.x = Math.min(ball.position.x, window.innerWidth - ball.size.x);
            ball.position.x = Math.max(ball.position.x, 0);
            ball.velocity.x *= (1 - ball.friction.x);
        }
}

function Update(){

    if(ball.grabbed){
        UpdateGrabbed();
    }
    else{
        UpdateLoose();
    }
    SetBallPosition();
}

var mouseVelocity = {
    x:0,
    y:0
}
function UpdateGrabbed(){
    ball.position.x = mousePosition.x - relativeMousePosition.x;
    ball.position.y = mousePosition.y - relativeMousePosition.y;

    mouseVelocity.x = mousePosition.x - previousMousePosition.x,
    mouseVelocity.y = mousePosition.y - previousMousePosition.y,



    previousMousePosition.x = mousePosition.x;
    previousMousePosition.y = mousePosition.y;
}

function UpdateLoose(){
    //Increment the velocity on gravity
    ball.velocity.x += ball.gravity.x;
    ball.velocity.y += ball.gravity.y;

    //Change the position based on veloicty
    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;

    Bounce();
}