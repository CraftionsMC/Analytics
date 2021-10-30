/**
 * @author The Craftions Developers <github.com/CraftionsMC>
 * @copyright (c) 2018-2021 Craftions.net. All rights reserved.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from "./Routes";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";
import "./styles/style.scss";
import Analyze from "./views/Analyze/Analyze";

ReactDOM.render(
  <>
    <BrowserRouter>
      <Switch>
        <Route path={"/analyze_embed"} exact component={Analyze} />
        <Route path={"/"}>
          <NavigationBar />
          <Routes />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  </>,
  document.querySelector("#root")
);
