import React, { ReactElement } from "react";
import Layout from "../../components/Layout";
import StreamProvider, { useStream } from "../../context/StreamProvider";
import { styled } from "@mui/material";

const Video = styled("video")`
  width: 100px;
  height: 100px;
`;
interface Props {}

function Chat({}: Props): ReactElement {
  const { userVideo } = useStream();

  return (
    <StreamProvider>
      <Layout>
        <Video playsInline autoPlay ref={userVideo} />
      </Layout>
    </StreamProvider>
  );
}

export default Chat;
