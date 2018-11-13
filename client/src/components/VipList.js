import React, { Component } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import Hidden from "@material-ui/core/Hidden"

export default class extends Component {
    render() {
        return (
            <List>
                {this.props.vips.map(e => (
                    <Tooltip title="Vip name">
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src="https://apic.douyucdn.cn/upload/avatar_v3/201809/bf9e46288a9daf1759f7bd6671283b02_middle.jpg" />
                            </ListItemAvatar>
                            <Hidden smDown>
                                <Typography noWrap="true">
                                    <ListItemText primary="Vip Name" />
                                </Typography>
                            </Hidden>
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        )
    }
}
