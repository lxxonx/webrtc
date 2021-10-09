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

interface Context {
  userVideo: RefObject<HTMLVideoElement>;
  peerVideo: RefObject<HTMLVideoElement>;
}

export const StreamContext = React.createContext<Context>({} as Context);
export function useStream(): Context {
  return useContext(StreamContext);
}

interface StreamProps {
  children: ReactNode;
}

function StreamProvider({ children }: StreamProps): ReactElement {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const peerVideo = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const userVideo = useRef<HTMLVideoElement>({} as HTMLVideoElement);

  useEffect(() => {
    const s: Socket = io("localhost:2000/stream", { withCredentials: true });
    setSocket(s);
    return () => {
      s.close();
    };
  }, []);

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
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <StreamContext.Provider value={{ userVideo, peerVideo }}>
      {children}
    </StreamContext.Provider>
  );
}

export default StreamProvider;
