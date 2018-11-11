import React, { Component } from "react"
import Hidden from "@material-ui/core/Hidden"
import io from "socket.io-client"
import SmallPage from "./SmallPage"
import BigPage from "./BigPage"
import AdminPage from "./AdminPage"

export default class extends Component {
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
        return this.state.admin ? (
            <AdminPage roomid={this.state.roomid} socket={this.socket} />
        ) : (
            <React.Fragment>
                <Hidden xsDown="xsDown">
                    <BigPage roomid={this.state.roomid} socket={this.socket} />
                </Hidden>
                <Hidden xsUp="xsUp">
                    <SmallPage
                        roomid={this.state.roomid}
                        socket={this.socket}
                    />
                </Hidden>
            </React.Fragment>
        )
    }
}
