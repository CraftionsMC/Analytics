/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { Redirect as Redir } from "react-router-dom";

export default function Redirect() {
  const usp = new URLSearchParams(location.search);
  const redirect = usp.get("redirect");

  if (redirect === null || redirect === "") {
    return <Redir to={"/"} />;
  } else {
    window.location.href = redirect;
    return null;
  }
}
