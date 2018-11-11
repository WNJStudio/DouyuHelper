import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import AppBarButton from "./AppBarButton"
import "./AppBar.css"

export default class extends Component {
    render() {
        return (
            <div className="AppBarRoot">
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className="AppBarTitle">
                            {this.props.roomid}
                        </Typography>
                        <AppBarButton
                            handler={this.props.handler}
                            text={this.props.admin ? "登出" : "登陆"}
                        />
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
