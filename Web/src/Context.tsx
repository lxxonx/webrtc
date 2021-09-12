import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  ReactChild,
  LegacyRef,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
type ContextType = {
  callAccepted?: boolean;
  callEnded?: boolean;
  call?: {
    signal: string;
    from: string;
    name: string;
    isReceivingCall: boolean;
  };
  name?: string;
  myVideo?: LegacyRef<HTMLVideoElement>;
  userVideo?: LegacyRef<HTMLVideoElement>;
  stream?: MediaStream | undefined;
  setName?: Function;
  me?: string;
  callUser?: Function;
  leaveCall?: Function;
  answerCall?: Function;
};
const SocketContext = createContext<ContextType>({});
const socket = io({
  path: "ws://localhost:80/stream",
});
// const socket = io("https://warm-wildwood-81069.herokuapp.com");
interface Props {
  children?: ReactChild;
}
const ContextProvider = ({ children }: Props) => {
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

  const myVideo = useRef<HTMLVideoElement>();
  const userVideo = useRef<HTMLVideoElement>();
  const connectionRef = useRef<Peer.Instance>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current!.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
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

  const callUser = (id: Number) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
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
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo: myVideo as LegacyRef<HTMLVideoElement>,
        userVideo: userVideo as LegacyRef<HTMLVideoElement>,
        stream,
        name,
        setName,
        callEnded,
        me,
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
