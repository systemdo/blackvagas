import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextareaEditor = ({ label, onWriteText }) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const handleWriteText = e => {
    setEditorState(e);
    onWriteText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleWriteText}
    />
  );
};

export default TextareaEditor;
