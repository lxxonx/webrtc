import React, { ReactElement } from "react";

interface Props {}

function Note({}: Props): ReactElement {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="https://docs.google.com/document/u/1/d/1a0QrZ-M43xpdtdn5F8rFdbf4a-16jcixxDhvoH91CVQ/edit"
        width="100%"
        height="100%"
        title="Embedded google docs"
      ></iframe>
    </div>
  );
}

export default Note;
