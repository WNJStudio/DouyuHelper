import React, { Component } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"

export default class extends Component {
    render() {
        return (
            <List>
                {this.props.gifts.map(e => (
                    <ListItem>
                        <Chip
                            classes={{ label: { "word-wrap": "break-word" } }}
                            avatar={
                                <Avatar src="https://apic.douyucdn.cn/upload/avatar_v3/201809/bf9e46288a9daf1759f7bd6671283b02_middle.jpg" />
                            }
                            label="Gift text"
                            color="primary"
                        />
                    </ListItem>
                ))}
            </List>
        )
    }
}
