import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

class ABar extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={this.props.classes.grow}>
                        {this.props.roomid}
                    </Typography>
                    <Button color="inherit" onClick={this.props.handler}>
                        {this.props.admin ? "登出" : "登陆"}
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles({
    grow: {
        flexGrow: 1,
    },
})(ABar)
