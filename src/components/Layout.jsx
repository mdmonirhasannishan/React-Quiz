/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import classes from "../styles/Layout.module.css";
import Nav from "./nav";
export default function Layout() {
  return (
    <>
      <Nav />
      <main className={classes.main}>
        <div className={classes.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
}
