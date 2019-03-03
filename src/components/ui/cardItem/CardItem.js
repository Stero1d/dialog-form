/**
 * Created by smalkov on 03.03.2019.
 */

import React, { Component } from "react";
import {connect} from "react-redux";
//css
import './CardItem.css';

class CardItem extends Component {

    render() {
        const { item, key, onChangeUserInfo, id, activeId } = this.props;

        return (
            <div
                className={activeId === id && 'list_item active_element' || 'list_item'}
                key={`${id}_${key}`}
                onClick={() => {
                    onChangeUserInfo('productId', id);
                }}
            >
                <div className='list_title'>{item.name}</div>
                <div className='list_description'>{item.description}</div>
                <div className='list_cost'>{item.cost}</div>
            </div>
        )
    }
}
export default (CardItem);