import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [mode, setMode] = useState(`light`);
  const [progress, setProgress] = useState(10);

  const modeSwitch = () => {
    if (mode === `light`) {
      setMode(`dark`);
      document.body.style.backgroundColor = "#000316";
    } else {
      setMode(`light`);
      document.body.style.backgroundColor = "white";
    }
  };

  // const apiKey = process.env.REACT_APP_NEWS_API;
  const apiKey = "95909eaed6704e36923f51f7bfd06af1";

  return (
    <div>
      <Router>
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Navbar title="NewsUp" mode={mode} modeSwitch={modeSwitch} />
        <Switch>
          <Route exact path="/" key="general">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/business" key="business">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/entertainment" key="entertainment">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/health" key="health">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="health"
            />
          </Route>
          <Route exact path="/science" key="science">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/sports" key="sports">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/technology" key="technology">
            <News
              mode={mode}
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={6}
              country="in"
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
