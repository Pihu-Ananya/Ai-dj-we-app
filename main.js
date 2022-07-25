song=""
leftwristX=""
leftwristY=""
rigthwristX=""
rightwristY=""
leftwrist_score=""
rightwrist_score=""
function preload() {
song=loadSound("music.mp3")
}

function setup() {
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(600,500)
    video.hide()
    poseNet=ml5.poseNet(video , modelloaded)
    poseNet.on("pose", getposes)
}

function getposes(results) {
    if(results.length>0) {
        console.log(results)
        leftwristX=results[0].pose.leftWrist.x
        leftwristY=results[0].pose.leftWrist.y 
        rightwristX=results[0].pose.rightWrist.x
        rightwristY=results[0].pose.rightWrist.y
        console.log(leftwristX , leftwristY , rightwristX , rightwristY)
        leftwrist_score=results[0].pose.keypoints[9].score
        console.log(leftwrist_score)
        rightwrist_score=results[0].pose.keypoints[10].score
        console.log(rightwrist_score)

    }
}

function modelloaded() {
    console.log("model is loaded")
}

function draw() {
    image(video , 0 , 0 , 600 , 500);
    if(leftwrist_score>0.2){
        fill("blue")
        stroke("black")
        circle(leftwristX , leftwristY , 25)
        numbery=Number(leftwristY)
        removedecimals=floor(numbery)
        volume=removedecimals/500
        song.setVolume(volume)
        document.getElementById("volume").innerHTML="volume:"+volume
    }
    if(rightwrist_score>0.2){
        fill("green")
        stroke("black")
        circle(rightwristX , rightwristY , 30)
        if(rightwristY>0&&rightwristY<=100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML="speed:0.5x"
        }
        else if(rightwristY>100&&rightwristY<=200){
            song.rate(1)
            document.getElementById("speed").innerHTML="speed:1x"
        }
        else if(rightwristY>200&&rightwristY<=300){
            song.rate(1.5)
            document.getElementById("speed").innerHTML="speed:1.5x"
        }
        else if(rightwristY>300&&rightwristY<=400){
            song.rate(2)
            document.getElementById("speed").innerHTML="speed:2x"
        }
        else if(rightwristY>400&&rightwristY<=500){
            song.rate(2.5)
            document.getElementById("speed").innerHTML="speed:2.5x"
        }
    }
}
function play() {
    song.play()
    song.setVolume(0.5)
    song.rate(1)
}
function pause() {
    song.pause()
   
}
