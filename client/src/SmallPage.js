import React, { Component } from "react"

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
    return <div>ok</div>
  }
}
