import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Code Review Assistant</h1>
      <Link to="/editor">Go to Code Editor</Link>
    </div>
  );
}

export default Home;