import { Button, Grid, Typography } from "@material-ui/core";
import { Phone, PhoneDisabled } from "@material-ui/icons";
import React, { ReactElement, useState, useEffect, FormEvent } from "react";
import { useRef } from "react";
import openSocket from "socket.io-client";
import Layout from "../Components/Layout";
import Peer from "simple-peer";
import styled from "styled-components";
import { meVar } from "../apollo/localstate";
import { useReactiveVar } from "@apollo/client";
import Cookies from "js-cookie";

const Video = styled("video")`
  width: 550px;
  max-width: 550px;
`;

interface Props {}

const token = Cookies.get("refresh");
const socket = openSocket("ws://localhost:80/stream", {
  extraHeaders: {
    token: token ? token : "",
  },
});
function Chat({}: Props): ReactElement {
  const me = useReactiveVar(meVar);
  const [stream, setStream] = useState<MediaStream>();
  const [myDataChannel, setMyDataChannel] = useState<RTCDataChannel>();
  const [name, setName] = useState("");
  const [myPeerConnection, setMyPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.1.google.com:19302",
            "stun:stun1.1.google.com:19302",
            "stun:stun2.1.google.com:19302",
            "stun:stun3.1.google.com:19302",
            "stun:stun4.1.google.com:19302",
          ],
        },
      ],
    })
  );
  const [classId, setClassId] = useState(
    "8d5f805a-bd0c-424e-900d-a645ac0e2555"
  );
  const myVideo = useRef<HTMLVideoElement>() as any;
  const peerVideo = useRef<HTMLVideoElement>() as any;

  useEffect(() => {
    socket.on("welcome", async () => {
      const dataChannel = myPeerConnection.createDataChannel("chat");
      setMyDataChannel(dataChannel);
      dataChannel.addEventListener("message", (event) =>
        console.log(event.data)
      );
      console.log("made data channel");
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      console.log("sent the offer");
      socket.emit("offer", { offer, classId });
    });

    socket.on("offer", async ({ offer }) => {
      myPeerConnection.addEventListener("datachannel", (event) => {
        setMyDataChannel(event.channel);
        myDataChannel?.addEventListener("message", (event) => {
          console.log(event.data);
        });
      });
      console.log("received the offer");
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", { answer, classId });
      console.log("sent the answer");
    });
    socket.on("answer", ({ answer }) => {
      console.log("received the answer");
      myPeerConnection.setRemoteDescription(answer);
    });
    socket.on("ice", ({ ice }) => {
      console.log("received candidate");
      myPeerConnection.addIceCandidate(ice);
    });
  }, [classId, myPeerConnection, myDataChannel]);

  const getMedia = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(currentStream);
      myVideo.current!.srcObject = currentStream;
    } catch (e) {
      console.log(e);
    }
  };

  const initCall = async () => {
    await getMedia();
    makeConnection();
  };
  const handleWelcomeSubmit = async (event: any) => {
    event.preventDefault();
    await initCall();
    socket.emit("join", classId);
  };

  const makeConnection = () => {
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
  };
  const handleIce = (data: any) => {
    console.log("sent candidate");
    socket.emit("ice", { ice: data.candidate, classId });
  };
  const handleAddStream = (data: any) => {
    peerVideo.current!.srcObject = data.stream;
  };

  return (
    <Layout>
      <Grid container>
        <button onClick={handleWelcomeSubmit}>welcome</button>
        {stream && (
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {me?.firstname || "Name"}
            </Typography>
            <Video playsInline muted ref={myVideo} autoPlay />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {"Name"}
          </Typography>
          <Video playsInline ref={peerVideo} autoPlay />
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PhoneDisabled fontSize="large" />}
          fullWidth
        >
          Hang Up
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Phone fontSize="large" />}
          fullWidth
        >
          Call
        </Button>
      </Grid>
    </Layout>
  );
}

export default Chat;
