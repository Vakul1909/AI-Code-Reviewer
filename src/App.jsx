import React, { useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Editor from "@monaco-editor/react"
import Select from "react-select"
import { GoogleGenAI } from "@google/genai"
import Markdown from 'react-markdown'
import { BeatLoader } from "react-spinners"

const App = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "java", label: "Java" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0])

  const [code, setCode] = useState("");
  const ai = new GoogleGenAI({ apiKey: "AIzaSyAWQ3FwdlqCIJk8sjnaMRJs3JSi5dcX9Rc" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function reviewcode() {
    setResponse("")
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ Time Complexity and Space Complexity of code
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.
7️⃣ Correct and Optimize Code ✅

Analyze it like a senior developer reviewing a pull request.
Code: ${code}
`,
    });
    console.log(response.text);
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div
        className="main flex justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[87%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <div style={{ width: "100%" }}>
              <Select
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                options={options}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#1e1e1e",
                    borderColor: "#3c3c3c",
                    padding: "4px",
                    boxShadow: "none",
                    ":hover": {
                      borderColor: "#5a5a5a",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#430533ff",
                    color: "white",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#f090ddff"
                      : state.isSelected
                        ? "purple"
                        : "#271522ff",
                    color: "white",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#aaaaaa",
                  }),
                }}
              />
            </div>
            <button onClick={() => {
              if (code === "") {
                alert("Please enter code first")
              }
              else {
                reviewcode();
              }
            }} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Review</button>
          </div>
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value={code} onChange={(e) => { setCode(e) }}
          />
        </div>
        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[100%]">
          <div className="topTab border-b-[3px] border-t-[3px] border-[purple] flex items-center justify-between h-[60px]">
            <p className="font-[700] text-[30px] color- #cccccc">Response</p>
          </div>
          {loading && <BeatLoader color="#5b164f" />}
          <Markdown>{response}</Markdown>
        </div>
      </div>
    </>
  )
}

export default App