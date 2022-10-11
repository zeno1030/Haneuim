// video document
const mainRoom = document.getElementById("mainRoom");
const call = document.getElementById("call");
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const changeBtn = document.getElementById("change");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");
const peerFace = document.getElementById("peerFace");
const img = document.createElement("img");

// video init
let myStream;
let myPeerConnection;
let muted = false;
let cameraOff = false;
let changeFace = false;
mainRoom.hidden = true;

img.src="test.JPG"

// ---------------- Start video function part ------------------
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
};
const getMidea = async (deviceId) => {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
};

const changeIMG = () => {
  myStream
    .getVideoTracks()
    .forEach((img) => (img.enabled =! img.enabled));
  if (changeFace){
    changeBtn.innerText ="아바타 ON"
    changeFace = false ;
  } else {
    changeBtn.innerText = "아바타 OFF"
    changeFace = true ;
  }


};



const handleMuteClick = () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "음소거 해제";
    muted = true;
  } else {
    muteBtn.innerText = "음소거";
    muted = false;
  }
};

const handleCameraClick = () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "카메라 끄기";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "카메라 켜기";
    cameraOff = true;
  }
};

const handleCameraChange = async () => {
  await getMidea(cameraSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSender()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
};

const initCall = async () => {
  welcome.hidden = true;
  mainRoom.hidden = false;
  await getMidea();
  makeConnection();
};

const handleIce = (data) => {
  socket.emit("ice", data.candidate, roomName);
};

const handleAddStream = (data) => {
  peerFace.srcObject = data.stream;
};
// ---------------- End video function part ------------------

// event listen
muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
changeBtn.addEventListener("click",changeIMG);
cameraSelect.addEventListener("input", handleCameraChange); ///초대코드 버튼 만들면 될듯..

socket.on("offer", async (offer, nickname) => {
  // chat
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", (event) =>
      addMessage(`${nickname}: ${event.data}`)
    );
  });
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  myPeerConnection.addIceCandidate(ice);
});

// RTC (화상채팅)
const makeConnection = () => {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
};
