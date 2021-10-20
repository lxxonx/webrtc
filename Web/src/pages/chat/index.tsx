import React, { ReactElement } from "react";
import { useGetManyClassesByTutorQuery } from "../../generated/graphql";
import Link from "next/link";
import Layout from "../../components/Layout";
interface Props {}

function Stream({}: Props): ReactElement {
  const { data } = useGetManyClassesByTutorQuery();
  return (
    <Layout>
      <div>chat list</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.getManyClassesByTutor.map((e) => (
          <Link key={e.id} href={"/chat/" + e.id}>
            {e.id}
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default Stream;
