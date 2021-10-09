import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return <div>{children}</div>;
}

export default Layout;
