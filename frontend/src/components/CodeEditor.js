import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [issues, setIssues] = useState([]);

  const handleSubmit = async () => {
    try {
      console.log("Sending code to backend:", code); // Debugging log
      const response = await axios.post("http://localhost:5000/api/analyze", { code });
      console.log("Backend response:", response.data); // Debugging log
      setIssues(response.data.issues); // Update the issues state
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
  };

  return (
    <div>
      <h2>Code Editor</h2>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
      />
      <button onClick={handleSubmit}>Submit Code</button>

      <h3>Issues:</h3>
      {issues.length > 0 ? (
        <ul>
          {issues.map((issue, index) => (
            <li key={index}>
              Line {issue.line}: {issue.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
}

export default CodeEditor;