import { Link } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { useGetManyClassesByTutorQuery } from '../generated/graphql';

interface Props {}

function ChatList({}: Props): ReactElement {
  const { data } = useGetManyClassesByTutorQuery();
  if (!data?.getManyClassesByTutor) {
    return <Layout>loading</Layout>;
  } else {
    return (
      <Layout>
        <ul>
          {data?.getManyClassesByTutor.map((el) => (
            <Link key={el.id} href={`/chat/${el.id}`}>
              {el.tutor.firstname}
            </Link>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default ChatList;
