import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = { progress: 10 };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  apiKey = process.env.REACT_APP_NEWS_API;

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Switch>
            <Route exact path="/" key="general">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="general"
              />
            </Route>
            <Route exact path="/business" key="business">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="business"
              />
            </Route>
            <Route exact path="/entertainment" key="entertainment">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="entertainment"
              />
            </Route>
            <Route exact path="/health" key="health">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="health"
              />
            </Route>
            <Route exact path="/science" key="science">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="science"
              />
            </Route>
            <Route exact path="/sports" key="sports">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="sports"
              />
            </Route>
            <Route exact path="/technology" key="technology">
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={6}
                country="in"
                category="technology"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
