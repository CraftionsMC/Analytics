/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import * as React from "react";
import { Button, Navbar } from "react-bulma-components";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ExtRedirect from "../ExtRedirect/ExtRedirect";

export default function NavigationBar() {
  return (
    <Navbar fixed={"top"}>
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to={"/"}>
          <img src={logo} alt={"Craftions"} />
          <h1 className={"web_logo_name"} style={{ paddingLeft: "0.5rem" }}>
            Craftions Analytics
          </h1>
        </Navbar.Item>
        <Navbar.Burger
          aria-label={"menu"}
          aria-expanded={"false"}
          data-target={"nav-bar-menu"}
          onClick={() => {
            const $navbarBurgers = Array.prototype.slice.call(
              document.querySelectorAll(".navbar-burger"),
              0
            );
            if ($navbarBurgers.length > 0) {
              $navbarBurgers.forEach((el) => {
                el.addEventListener("click", () => {
                  const target = el.dataset.target;
                  const $target = document.getElementById(
                    target
                  ) as HTMLElement;
                  el.classList.toggle("is-active");
                  $target.classList.toggle("is-active");
                });
              });
            }
          }}
        >
          <span aria-hidden={"true"} />
          <span aria-hidden={"true"} />
          <span aria-hidden={"true"} />
        </Navbar.Burger>
      </Navbar.Brand>
      <Navbar.Menu id={"nav-bar-menu"}>
        <div className={"navbar-start"}>
          <Navbar.Item renderAs={Link} to={"/"}>
            Home
          </Navbar.Item>
          <Navbar.Item renderAs={Link} to={"/analyze"}>
            Analyze
          </Navbar.Item>
          <Navbar.Item>
            <ExtRedirect url={"https://docs.craftions.net/docs/analytics/api"}>
              Documentation
            </ExtRedirect>
          </Navbar.Item>
        </div>
        <div className={"navbar-end"}>
          <Navbar.Item>
            <div className="buttons">
              <Button color={"link"} renderAs={Link} to={"/analyze"}>
                Analyze
              </Button>
            </div>
          </Navbar.Item>
        </div>
      </Navbar.Menu>
    </Navbar>
  );
}
