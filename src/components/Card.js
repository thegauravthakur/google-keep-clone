import React, { Fragment } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DialogBody from "./DialogBody";

const Card = ({ title, body, index }) => {
  return (
    <Fragment>
      <Popup
        nested
        lockScroll
        contentStyle={{
          width: "80%",
          maxWidth: "500px",
          padding: 0,
          borderRadius: "10px",
        }}
        modal
        trigger={
          <div className="whitespace-pre-line shadow hover:shadow-xl  py-5 px-5 bg-white rounded-lg cursor-pointer remove-touch-effect">
            {title.length > 0 ? (
              <LinesEllipsis
                className="font-bold mb-3"
                text={title}
                maxLine="20"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            ) : null}
            <LinesEllipsis
              text={body}
              maxLine="20"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        }
      >
        <DialogBody index={index} body={body} title={title} />
      </Popup>
    </Fragment>
  );
};

export default Card;
