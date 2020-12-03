import React, { useState } from "react";
import OutsideAlerter from "./OutsideAlerter";
import TextareaAutosize from "react-textarea-autosize";

const CustomInputField = () => {
  const [show, setShow] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <OutsideAlerter
      setTitle={setTitle}
      setBody={setDescription}
      title={title}
      description={description}
      setShow={setShow}
      className="grid grid-cols-1 self-center w-full px-5 sm:px-0 sm:max-w-sm"
    >
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid black",
          padding: 5,
          backgroundColor: "white",
        }}
      >
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${!show ? "none" : "block"} w-full focus:outline-none`}
            // className=""
            hidden={true}
            placeholder="title"
          />
          <TextareaAutosize
            maxRows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setShow(true)}
            placeholder="Take a note..."
            rows={!show ? 1 : 2}
            className="w-full focus:outline-none max-h-44 resize-none"
          />
        </div>
      </div>
    </OutsideAlerter>
  );
};
export default CustomInputField;
