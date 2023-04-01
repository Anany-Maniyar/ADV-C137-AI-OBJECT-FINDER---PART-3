Status = "";
input = "";
objects = [];

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
    
    
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
}

function draw() {
    image(video, 0, 0, 400, 300);
    if(Status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++)
        {
        fill("FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == input){
            video.stop;
            objectDetector.detect(gotResults);
            document.getElementById("number_of_objects").innerHTML = input + "found";
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            var synth = window.speechSynthesis;
        speak_data = input + "found";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
        else{
            document.getElementById("number_of_objects").innerHTML = input + "not found";
            document.getElementById("status").innerHTML = "Status: Detected Objects";
        }

        }
    }
}

function gotResults(error, results) {
    if(error){
        console.log("error")
    }
    console.log(results);
    objects = results;
}