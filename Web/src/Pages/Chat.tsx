import React from 'react';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Notifications from '../components/Notifications.jsx';
import Layout from '../components/Layout';
import { ContextProvider } from '../Context.js';

const Chat = () => {
  return (
    <Layout>
      <ContextProvider>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </ContextProvider>
    </Layout>
  );
};

export default Chat;
