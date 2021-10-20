import { useRouter } from "next/dist/client/router";
import React, {
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Peer, { Instance, SignalData } from "simple-peer";

interface Context {
  callAccepted: Boolean;
  callEnded: Boolean;
  callReceived: Boolean;
  userVideo: RefObject<HTMLVideoElement>;
  peerVideo: RefObject<HTMLVideoElement>;
  answerCall: Function;
  callUser: Function;
  leaveCall: Function;
  toggleAudio: Function;
}

interface PeerDataType {
  signal: SignalData;
  name: string;
}

export const StreamContext = React.createContext<Context>({} as Context);
export function useStream(): Context {
  return useContext(StreamContext);
}

interface StreamProps {
  children: ReactNode;
}
function StreamProvider({ children }: StreamProps): ReactElement {
  const {
    query: { classId },
  } = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [stream, setStream] = useState<MediaStream>({} as MediaStream);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callReceived, setCallReceived] = useState(false);
  const [peerData, setPeerData] = useState<PeerDataType>({} as PeerDataType);
  const peerVideo = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const userVideo = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const connectionRef = useRef<Instance>({} as Instance);
  useEffect(() => {
    const s: Socket = io("localhost:2000/stream", { withCredentials: true });
    setSocket(s);
    s.on("call-init", ({ signal, name }) => {
      console.log("call init");
      console.log(signal, name);
      setCallReceived(true);
      setPeerData({ signal, name });
    });
    if (classId && stream) s.emit("join-room", { classId });
    return () => {
      s.close();
    };
  }, [classId, stream]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          height: { min: 360, ideal: 720, max: 1080 },
        },
        audio: true,
      })
      .then((currentStream) => {
        setStream(currentStream);
        userVideo!.current!.srcObject = currentStream;
      });
    return () => {};
  }, []);

  const toggleAudio = () => {
    if (stream) {
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const answerCall = async () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (signal) => {
      socket?.emit("answer-call", { signal, classId });
    });

    peer.on("stream", (currentStream) => {
      peerVideo.current.srcObject = currentStream;
    });

    peer.signal(peerData!.signal);

    connectionRef.current = peer;
  };

  const callUser = () => {
    if (classId) socket?.emit("join-room", { classId });
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (signal) => {
      if (classId)
        socket?.emit("call-user", {
          signal,
          classId,
        });
    });

    peer.on("stream", (currentStream) => {
      peerVideo.current.srcObject = currentStream;
    });

    socket?.on("call-accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.replace("/review");
  };
  return (
    <StreamContext.Provider
      value={{
        callAccepted,
        callEnded,
        callReceived,
        userVideo,
        peerVideo,
        leaveCall,
        answerCall,
        callUser,
        toggleAudio,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}

export default StreamProvider;
