Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
}); 

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
   Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
   });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gyRz9p0PP/model.json', modelLoaded);

function check(){
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult() 
    if( error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("results_emotion_name").innerHTML= results[0].label
        
        prediction_1= results[0].label;
        
        speak();
        if(results[0].label == "Class 1")
        {
            document.getElementById("update_emoji").innerHTML= "&#128077;"
            document.getElementById("result_emotion_name").innerHTML= "All the best!"
        }
        if(results[0].label == "Class 2")
        {
            document.getElementById("update_emoji").innerHTML= "&#9996;"
            document.getElementById("result_emotion_name").innerHTML= "That was a marvelous victory!"
        }
        if(results[0].label == "Class 3")
        {
            document.getElementById("update_emoji").innerHTML= "&#128076;"
            document.getElementById("result_emotion_name").innerHTML= "This is looking amazing!"
        }
}
    


function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first Gesture is is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

