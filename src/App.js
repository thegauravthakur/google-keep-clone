import React, { Fragment, useEffect } from "react";
import CustomInputField from "./components/CustomInputField";
import Card from "./components/Card";
import { useRecoilState } from "recoil";
import { notesState } from "./recoil/atoms";
import app from "./api/firebase";
import { Footer } from "./components/Footer";
import MetaTags from "react-meta-tags";

function App() {
  const [notes, setNotes] = useRecoilState(notesState);

  useEffect(() => {
    app
      .firestore()
      .collection("notes")
      .doc("notes")
      .get()
      .then((data) => {
        if (data.data().note) {
          console.log(data.data().note);
          setNotes(data.data().note);
          console.log("done");
        }
      });
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Google Keep Clone</title>
        <meta
          name="description"
          content="Simple google keep clone made with reactjs and firebase"
        />
      </MetaTags>
      <div className="flex min-h-screen flex-col">
        <h1 className="text-center font-bold text-3xl py-7">
          Google Keep Clone
        </h1>
        <CustomInputField />
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-5 sm:mx-14  md:mx-24 gap-5 py-7 ">
          {notes.map((note, index) => (
            <Card
              index={index}
              key={note.id}
              title={note.title}
              body={note.body}
            />
          ))}
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
