import React, { createContext, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import Cookies from 'js-cookie';
import { useMeQuery } from './generated/graphql';

const SocketContext = createContext();
const token = Cookies.get('refresh');

const socket = io('ws://localhost:80/stream', {
  extraHeaders: {
    token: token ? token : '',
  },
  // withCredentials: true,
});

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const { data } = useMeQuery();
  const [call, setCall] = useState({});
  const [myId, setMyId] = useState('');
  const [peerId, setPeerId] = useState(null);
  const { classId } = useParams();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (myId) => {
      setMyId(myId);
      socket.emit('join', { classId });
    });
    socket.on('welcome', (peer) => {
      if (peer !== myId) {
        setPeerId(peer);
      }
    });
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    return () => {};
  }, []);

  const answerCall = async () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;

    // const desktopStream = await navigator.mediaDevices.getDisplayMedia({
    //   video: { width: 640, height: 480 },
    //   audio: true,
    // });
    // const rec = new MediaRecorder(desktopStream, {
    //   mimeType: 'video/webm; codecs=vp9',
    // }); // mediaRecorder객체 생성

    // rec.ondataavailable = (event) => {
    //   if (event.data.size > 0) {
    //     blobs.push(event.data);
    //     console.log(blobs);
    //     download();
    //   }
    // };

    // rec.start(); // 녹화 시작
  };
  // function download() {
  //   var blob = new Blob(blobs, {
  //     type: 'video/webm',
  //   });
  //   var url = URL.createObjectURL(blob);
  //   var a = document.createElement('a');
  //   document.body.appendChild(a);
  //   a.style = 'display: none';
  //   a.href = url;
  //   a.download = 'test.webm';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: myId,
        name: data?.me?.firstname,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    // download();
    connectionRef.current.destroy();
  };

  return (
    <SocketContext.Provider
      value={{
        peerId,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        firstname: data?.me?.firstname,
        callEnded,
        myId,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
