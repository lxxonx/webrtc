import React, { ReactElement } from "react";
import { useStream } from "../../context/StreamProvider";

interface Props {}

function Video({}: Props): ReactElement {
  const {
    userVideo,
    peerVideo,
    callUser,
    answerCall,
    callAccepted,
    callEnded,
    callReceived,
    leaveCall,
    toggleAudio,
  } = useStream();
  const youtubeId = "kTJi9YpmE3M";
  return (
    <div>
      {/* {youtubeId && (
        <iframe
          width="100%"
          height="320"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      )} */}
      {userVideo && (
        <video
          playsInline
          autoPlay
          style={{ width: "100%", height: "320px" }}
          ref={userVideo}
          className="myvid"
        ></video>
      )}
      {callAccepted && !callEnded ? (
        <button
          onClick={() => {
            leaveCall();
          }}
        >
          Hang Up
        </button>
      ) : (
        <button
          onClick={() => {
            callUser();
          }}
        >
          Call
        </button>
      )}
      <button
        onClick={() => {
          toggleAudio();
        }}
      >
        mute
      </button>
      {callReceived && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={() => {
              answerCall();
            }}
          >
            Answer
          </button>
        </div>
      )}
      {peerVideo && (
        <video
          playsInline
          autoPlay
          style={{ width: "100%", height: "320px" }}
          className="peervid"
          ref={peerVideo}
        ></video>
      )}
    </div>
  );
}

export default Video;
