import "./App.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { useLocalstorage } from "./custom/UseLocalstorage";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const App = () => {
  const { setItem, getItem } = useLocalstorage();

  const [code, setCode] = useState(getItem() ? getItem() : "## hello");
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [docsData, setDocsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedValue = localStorage.getItem("value");
    if (storedValue) {
      setCompiled(marked.parse(storedValue));
    } else {
      console.log("Value does not exist in localStorage");
    }
  }, []);
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

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
        "https://www.markdownguide.org/api/v1/basic-syntax.json"
        );
        console.log(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchData();
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
          <div className="docs">
            {loading ? (
              <ClipLoader color="#7f8f8c" size={200} />
            ) : (
              <div className="dataContaienr"></div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;
