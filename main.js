function reveal() {
    console.log("scrolled");
    var reveals = document.querySelectorAll('.section');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 100;
        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}


objects = [];
inputvar = "";
status1 = "";
function setup() {
    setTimeout(function () {
        canvas = createCanvas(450, 450);
        canvas.center();

    }, 5000);
    video = createCapture(VIDEO);
    video.hide();
}
function start() {
    objectdetector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    inputvar = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model is loaded");
    status1 = "true";
}
function draw() {
    image(video, 0, 0, 450, 450);

    if (status1 != "") {
        objectdetector.detect(video, gotResults);
        for (var i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence *100);
            fill("red")
            text(objects[i].label + " "+ percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


            if (inputvar = objects[i].label) {
                video.stop()
                objectdetector.detect(gotResults);
                const synth = window.speechSynthesis;
                const utterThis = new SpeechSynthesisUtterance(objects[i].label);
                synth.speak(utterThis);

                document.getElementById("status").innerHTML = "Status: object detected";
                document.getElementById("obj_detected").innerHTML = "Object Detected: "+ inputvar;
            }
            else{
                document.getElementById("status").innerHTML = "Status: object not detected";
                document.getElementById("obj_detected").innerHTML = "Object not Detected: "+ inputvar;
            }

        }
    }
}




