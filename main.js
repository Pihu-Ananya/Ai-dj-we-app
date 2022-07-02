song=""
leftwristX=""
leftwristY=""
rigthwristX=""
rightwristY=""
function preload() {
song=loadSound("music.mp3")
}

function setup() {
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
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
    }
}

function modelloaded() {
    console.log("model is loaded")
}

function draw() {
    image(video , 0 , 0 , 600 , 500);

}
function play() {
    song.play()
    song.setVolume(0.5)
    song.rate(1)
}
function pause() {
    song.pause()
   
}
