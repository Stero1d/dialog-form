/**
 * Created by smalkov on 03.03.2019.
 */

import React, { Component } from "react";
import {connect} from "react-redux";
//semantic-ui components
import { Modal } from 'semantic-ui-react'
//constants
import {UI} from "../../../redux/constant/UIconst";
/*svgIcons*/
import { CloseIcon } from "../../../constants/svgIcons"
//css
import './dialog.css';
import 'semantic-ui-css/semantic.min.css';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { dialog, closeDialog, buttons, content, header, breadCrumbs, message } = this.props;
        let { isOpen } = dialog;

        return (
            <Modal
                open={isOpen}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                className='dialog_form'
            >
                {isOpen &&
                    <div>
                        <Modal.Header>
                            {header}
                        </Modal.Header>
                        <Modal.Content>
                            <div className="dialog_container">
                                {content}
                            </div>
                            <div className="dialog_message">
                                {message}
                            </div>
                        </Modal.Content>
                        <Modal.Actions>
                            {breadCrumbs}
                            {buttons}
                        </Modal.Actions>
                        <div className="close icon" onClick={closeDialog}>
                            <CloseIcon/>
                        </div>
                    </div>}
            </Modal>
        )
    }
}
export default
connect(
    state => ({
        dialog: state.dialog,
    }),
    dispatch => ({})
)
(Dialog);