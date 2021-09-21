import { Link } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { useGetManyClassesByUserQuery } from '../generated/graphql';

interface Props {}

function ChatList({}: Props): ReactElement {
  const { data } = useGetManyClassesByUserQuery();
  if (!data?.getManyClassesByUser) {
    return <Layout>loading</Layout>;
  } else {
    return (
      <Layout>
        <ul>
          {data?.getManyClassesByUser.map((el) => (
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
