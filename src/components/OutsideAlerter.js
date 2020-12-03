import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { notesState } from "../recoil/atoms";
import app from "../api/firebase";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setShow, title, body, setTitle, setBody) {
  const [notes, setNotes] = useRecoilState(notesState);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (title !== "" || body !== "") {
          const temp = [{ title, body, id: uuidv4() }].concat([...notes]);
          setNotes(temp);
          app
            .firestore()
            .collection("notes")
            .doc("notes")
            .set({ note: temp })
            .then(() => console.log("doc added!"));
          console.log({ body, title });
          setTitle("");
          setBody("");
          setShow(false);
        } else {
          setShow(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    props.setShow,
    props.title,
    props.description,
    props.setBody,
    props.setTitle
  );
  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
