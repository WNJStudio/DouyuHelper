import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"
import CssBaseline from "@material-ui/core/CssBaseline"
import io from "socket.io-client"
import SmallPage from "./SmallPage"
import BigPage from "./BigPage"
import AdminPage from "./AdminPage"

class App extends Component {
    state = {
        roomid: 0,
        admin: false,
    }

    constructor(props) {
        super(props)
        this.socket = io.connect()
        this.getRoomID()
        this.getAdminState()
    }

    getRoomID() {
        this.socket.on("roomid", id => this.setState(ps => (ps.roomid = id)))
    }

    getAdminState() {
        this.socket.on("admin", res => this.setState(ps => (ps.admin = res)))
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={this.props.classes.root}>
                    {this.state.admin ? (
                        <AdminPage
                            roomid={this.state.roomid}
                            socket={this.socket}
                        />
                    ) : (
                        <React.Fragment>
                            <Hidden xsDown>
                                <BigPage
                                    roomid={this.state.roomid}
                                    socket={this.socket}
                                />
                            </Hidden>
                            <Hidden xsUp>
                                <SmallPage
                                    roomid={this.state.roomid}
                                    socket={this.socket}
                                />
                            </Hidden>
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles({
    root: {
        flexGrow: 1,
        maxHeight: "100%",
        overflow: "hidden",
    },
})(App)
