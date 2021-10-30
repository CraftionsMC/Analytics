/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import Redirect from "./views/Redirect/Redirect";
import Analyze from "./views/Analyze/Analyze";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/external"} exact component={Redirect} />
        <Route path={"/analyze"} exact component={Analyze} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}
