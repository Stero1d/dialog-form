/**
 * Created by smalkov on 03.03.2019.
 */

import React, { Component } from "react";
import {connect} from "react-redux";
//components
import CardItem from '../../ui/cardItem/CardItem'
//css
import './list.css';

class List extends Component {
    renderList(list) {
        let keys = Object.keys(list);
        return keys.map((key, index) => {
            return (
                <li key={`${key}_${index}`}>
                    {list[key].name}
                </li>
            )
        })
    }

    render() {
        const { list } = this.props;

        return (
            <ul>
                {this.renderList(list)}
            </ul>
        )
    }
}
export default (List);