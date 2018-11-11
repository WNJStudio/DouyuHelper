import React, { Component } from "react"
import AppBar from "./components/AppBar"

export default class extends Component {
    state = {
        login: false,
    }

    constructor(props) {
        super(props)

        this.socket = this.props.socket

        this.getLoginState()
    }

    getLoginState() {
        this.socket.on("login", res => this.setState(ps => (ps.login = res)))
    }

    render() {
        return (
            <React.Fragment>
                <AppBar
                    admin={this.state.login}
                    roomid={this.props.roomid}
                    handler={e => {
                        e.preventDefault()
                        this.socket.emit("logout")
                    }}
                />
            </React.Fragment>
        )
    }
}
