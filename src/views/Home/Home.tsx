/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import logo from "../../assets/logo.png";
import RHeader from "../../components/RHeader/RHeader";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <RHeader
        title={"Craftions Analytics"}
        image={logo}
        imageStyle={{ width: "128" }}
      >
        <Link to={"/analyze"}>Analyze</Link> the traffic of every web site with
        Craftions Analytics.
      </RHeader>
    </>
  );
}
