import { Button, Grid, Typography } from "@material-ui/core";
import { Phone, PhoneDisabled } from "@material-ui/icons";
import React, { ReactElement, useState, useEffect } from "react";
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
  const sessionId = 3;
  const mequery = useReactiveVar(meVar);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState("");
  const [call, setCall] = useState({
    signal: "",
    from: "",
    name: "",
    isReceivingCall: false,
  });
  const [me, setMe] = useState("");

  const myVideo = useRef<HTMLVideoElement>() as any;
  const userVideo = useRef<HTMLVideoElement>() as any;
  const connectionRef = useRef<Peer.Instance>();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current!.srcObject = currentStream;
      });
    if (mequery) {
      setName(mequery.firstname + mequery.lastname);
    }
    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
      });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current!.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        from: me,
        name,
        sessionId,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current!.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current?.destroy();

    window.location.reload();
  };

  return (
    <Layout>
      <Grid container>
        {stream && (
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <Video playsInline muted ref={myVideo} autoPlay />
          </Grid>
        )}
        {callAccepted && !callEnded && (
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call?.name || "Name"}
            </Typography>
            <Video playsInline ref={userVideo} autoPlay />
          </Grid>
        )}
        {call.isReceivingCall && !callAccepted && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>{call.name} is calling:</h1>
            <Button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </Button>
          </div>
        )}
        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PhoneDisabled fontSize="large" />}
            fullWidth
            onClick={leaveCall}
          >
            Hang Up
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Phone fontSize="large" />}
            fullWidth
            onClick={() => callUser()}
          >
            Call
          </Button>
        )}
      </Grid>
    </Layout>
  );
}

export default Chat;
