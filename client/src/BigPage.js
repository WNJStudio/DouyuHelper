import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import AppBar from "./components/AppBar"
import VipList from "./components/VipList"
import ChatList from "./components/ChatList"
import GiftList from "./components/GiftList"

export default class extends Component {
    state = {
        newuenter: false,
        newchatmsg: false,
        newgift: false,
        noblesupdated: false,
    }

    constructor(props) {
        super(props)
        this.socket = this.props.socket
        this.msgs = []
        this.entered = []

        this.getMessages()
    }

    addMessage(msg) {
        if (this.msgs.length > 10) this.msgs.shift()
        this.msgs.push(msg)
        this.setState(ps => (ps.newchatmsg = true))
        setTimeout(() => this.setState(ps => (ps.newchatmsg = false)), 100)
    }

    userEnter(data) {
        this.entered.push(data)
        this.setState(ps => (ps.newuenter = true))
        setTimeout(() => {
            this.setState(ps => (ps.newuenter = false))
            this.entered.shift()
        }, 1000)
    }

    getMessages() {
        this.socket.on("data", data => {
            if (data.type === "chatmsg") {
                this.addMessage(data)
            } else if (data.type === "uenter") {
                this.userEnter(data)
            } else {
                console.log(data)
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <AppBar
                    admin={false}
                    roomid={this.props.roomid}
                    handler={e => {
                        e.preventDefault()
                        this.socket.emit("requestadmin")
                    }}
                />
                <Grid container spacing={8}>
                    <Grid item sm={2}>
                        <VipList vips={[1, 2, 3, 4, 5]} />
                    </Grid>
                    <Grid item sm={7}>
                        <ChatList msgs={[1, 2, 3, 4, 5, 6]} />
                    </Grid>
                    <Grid item sm={3}>
                        <GiftList gifts={[1, 2, 3, 4, 5, 6]} />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
