/**
 * Created by administrator on 17.09.18.
 */
// react
import React from "react";
//semantic-ui components
import { Button } from 'semantic-ui-react'
//css
import './buttonBuilder.css'

const ButtonBuilder = ({buttons, onClick = () => {}, id = ''}) => {

    const renderButtons = (buttons) => {
        let keys = Object.keys(buttons);
        return keys.map((key, index) => {
            return (
                <Button
                    style={{marginLeft: 20}}
                    name={buttons[key].action}
                    key={`${id}_item_${index}`}
                    color={buttons[key].style.color}
                >
                    {buttons[key].label}
                </Button>
            )
        })
    };

    return (
        <div
            id={id}
            onClick={(e) => {
                let name = e.target.name;
                onClick(name);
            }}
        >
            {renderButtons(buttons)}
        </div>
    )
};
export default ButtonBuilder;
