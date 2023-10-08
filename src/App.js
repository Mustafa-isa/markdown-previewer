import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";
import { useLocalstorage } from "./custom/UseLocalstorage";
const App = () => {
  const { setItem, getItem } = useLocalstorage();

  const [code, setCode] = useState(getItem() ? getItem() : "## hello");
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [hide, setHide] = useState({
    markedown: true,
    preview: false,
    docs: false
  });
  const openMD = () => {
    console.log(0);
    setHide({
      markedown: true,
      preview: false,
      docs: false
    });
  };

  const openPreview = () => {
    console.log(0);
    setHide({
      markedown: false,
      preview: true,
      docs: false
    });
  };

  const handleChange = e => {
    setCode(e.target.value);
    setItem(e.target.value);

    setCompiled(marked.parse(e.target.value));
  };
  const openDocs = () => {
    setHide({
      markedown: false,
      preview: false,
      docs: true
    });
  };
  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">
            MarkDown
          </button>
          <button onClick={openPreview}>Preview</button>
          <button onClick={openDocs}>docs</button>
        </div>
        {hide.markedown ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : hide.preview ? (
          <div>
            <textarea value={compiled} />
          </div>
        ) : hide.docs ? (
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
            exercitationem minus totam et quam in eius voluptates a expedita
            saepe modi, labore consectetur alias fugiat nihil reiciendis
            eligendi quos? Quae.
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;
