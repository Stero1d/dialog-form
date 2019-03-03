/**
 * Created by smalkov on 03.03.2019.
 */

import React, { Component } from "react";
import {connect} from "react-redux";
//components
import CardItem from '../../ui/cardItem/CardItem'
//css
import './listCard.css';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderList(list, onChangeUserInfo, activeId) {
        let keys = Object.keys(list);
        return keys.map((key, index) => {
            return (
                <CardItem
                    key={index}
                    activeId={activeId}
                    item={list[key]}
                    onChangeUserInfo={onChangeUserInfo}
                    id={key}
                />
            )
        })
    }

    render() {
        const { list, onChangeUserInfo, activeId } = this.props;

        return (this.renderList(list, onChangeUserInfo, activeId))
    }
}
export default (Dialog);