song1 = "";
song2 = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";
song2_name = "";


function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function preload(){
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);
    
    fill("#00ff00");
    stroke("#ff0000");

    song_name = song1.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        song2.stop();
        if(song_name == false){
            song1.play();
        }
        else{
            console.log("Song Name: no thank you HTT");
            document.getElementById("song_id").innerHTML = "Song Name: no thank you HTT";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        song1.stop();
        if(song2_name == false){
            song2.play();
        }
        else{
            console.log("Song Name: I love poland ");
            document.getElementById("song_id").innerHTML = "Song Name: I love poland ";
        }
    }
    
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
         
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}