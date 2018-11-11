import React, { Component } from "react"
import Button from "@material-ui/core/Button"

export default class extends Component {
    render() {
        return (
            <Button color="inherit" onClick={this.props.handler}>
                {this.props.text}
            </Button>
        )
    }
}
