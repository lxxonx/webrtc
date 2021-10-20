import React, { ReactElement, ReactNode } from "react";
import NextLink from "next/link";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import PreviewIcon from "@mui/icons-material/Preview";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DuoIcon from "@mui/icons-material/Duo";

const Wrapper = styled("div")`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
`;
const SideBar = styled("aside")`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  background-color: purple;
  position: fixed;
  height: 100%;
`;
const MainPage = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-left: 72px;
  background-color: lightpink;
`;

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return (
    <Wrapper>
      <SideBar>
        <NextLink href="/">
          <HomeIcon style={{ color: "white" }} />
        </NextLink>
        <NextLink href="/preview">
          <PreviewIcon style={{ color: "white" }} />
        </NextLink>
        <NextLink href="/chat">
          <DuoIcon style={{ color: "white" }} />
        </NextLink>
        <NextLink href="/review">
          <RateReviewIcon style={{ color: "white" }} />
        </NextLink>
      </SideBar>
      <MainPage>{children}</MainPage>
    </Wrapper>
  );
}

export default Layout;
