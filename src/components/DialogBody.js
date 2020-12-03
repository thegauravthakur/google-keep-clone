import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRecoilState } from "recoil";
import { notesState } from "../recoil/atoms";
import { v4 as uuidv4 } from "uuid";
import app from "../api/firebase";
import { MdDelete } from "react-icons/md";

const DialogBody = ({ title, body, index }) => {
  const [dialogTitle, setDialogTitle] = useState(title);
  const [dialogBody, setDialogBody] = useState(body);
  const [notes, setNotes] = useRecoilState(notesState);

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      textRef.current.selectionStart = textRef.current.value.length;
      textRef.current.selectionEnd = textRef.current.value.length;
    }
  }, []);

  const onSubmitHandler = () => {
    const temp = [...notes];
    temp[index] = { title: dialogTitle, body: dialogBody, id: uuidv4() };
    setNotes(temp);
    app
      .firestore()
      .collection("notes")
      .doc("notes")
      .set({ note: temp })
      .then(() => console.log("doc updated"));
  };

  const onDeleteHandler = () => {
    const temp = [...notes];
    temp.splice(index, 1);
    setNotes(temp);
    app
      .firestore()
      .collection("notes")
      .doc("notes")
      .set({ note: temp })
      .then(() => console.log("doc deleted"));
  };
  return (
    <div className="flex flex-col px-5 py-2">
      <input
        autoFocus={false}
        value={dialogTitle}
        onChange={(event) => setDialogTitle(event.target.value)}
        placeholder="Enter the title"
        className="focus:outline-none font-semibold text-lg"
      />
      <TextareaAutosize
        ref={textRef}
        autoFocus
        value={dialogBody}
        onChange={(event) => setDialogBody(event.target.value)}
        placeholder={"Take a note"}
        minRows={5}
        className="resize-none max-height-80p focus:outline-none"
      />
      <div className="flex justify-between mt-3">
        <MdDelete
          className="cursor-pointer text-gray-500 hover:text-gray-600"
          onClick={onDeleteHandler}
          size={25}
        >
          Delete
        </MdDelete>
        <button
          className="bg-gray-500 hover:bg-gray-600 px-5 py-1 rounded-md text-white"
          onClick={onSubmitHandler}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DialogBody;
