import React, { ReactElement } from "react";
import StreamProvider, { useStream } from "../../context/StreamProvider";
import Video from "../../components/chat/Video";
import Note from "../../components/chat/Note";
import Layout from "../../components/Layout";

interface Props {}

function Chat({}: Props): ReactElement {
  return (
    <StreamProvider>
      <Layout>
        <Video />
        <Note />
      </Layout>
    </StreamProvider>
  );
}

export default Chat;
