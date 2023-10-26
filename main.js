song1 = "";
song2 = "";

leftX = 0;
rightX = 0;
leftY = 0;
rightY= 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

song1status = "";
song2status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);
}

function modelloaded() {
    console.log("model has been loaded");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("left wrist score = " + scoreLeftWrist + "score right wrist = " + scoreRightWrist);

        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("RightX = " + rightX + "RightY = " + rightY);

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("LeftX = " + leftX + "LeftY = " + leftY);
    }


}

function draw() {
    image(video, 0, 0, 600, 500);

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    fill("#000000");
    stroke("#000000");

    if (scoreRightWrist > 0.2) {
        circle(rightX,rightY, 10);
        song2.stop();
        if (song1status == false) {
            song1.play();
            document.getElementById("song_inp").innerHTML = "Playing Harry Potter Theme Song";
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftX,leftY, 10);
        song1.stop();
        if (song2status == false) {
            song2.play();
            document.getElementById("song_inp").innerHTML = "Playing Country Music";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}