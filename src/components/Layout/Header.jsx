import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import { Link as LinkRouter } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          component={LinkRouter}
          to="/ofertas-emprego"
          style={{ color: "#fff" }}
        >
          <Typography variant="h6">BlackVagas</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
