/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { Redirect as Redir } from "react-router-dom";
import { ReactChildren, ReactElement } from "react";

interface Props {
  url: string;
  children: ReactChildren | ReactElement | string;
}

export default function ExtRedirect(props: Props) {
  return <a href={"/external?redirect=" + props.url}>{props.children}</a>;
}
