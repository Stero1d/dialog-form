/**
 * Created by smalkov on 03.03.2019.
 */

import React, { Component } from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Button, Modal } from 'semantic-ui-react'
//custom components
import Dialog from '../../ui/dialog/Dialog'
import ButtonBuilder from '../../interfaceBuilder/buttonBuilder/ButtonBuilder'
import DialogBuilder from '../../interfaceBuilder/dialogBuilder/DialogBuilder'
import ErrorBoundary from '../../ui/errorBoundary/ErrorBoundary'
//constants
import { UI } from "../../../redux/constant/UIConst";
import {Interface} from "../../../constants/blueprints";
//utils
import { fetchData } from "../../../utils/fetchHelper";
import {testPatterns, EMAIL_PATTERN, PHONE_PATTERN} from "../../../utils/validation";

class Main extends Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        this.onChangeUserInfo = this.onChangeUserInfo.bind(this);
        this.isErrorCheckDisabled = this.isErrorCheckDisabled.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        const { isOpenDialog } = this.props;
        isOpenDialog(false);
    }

    getProductList() { //Получение списка продуктов(через rest запрос, я обычно использую axios(можно и вебсокеты),
        // а так пока будем брать данные из model/product_list.json(типа бэк) )
        const { setProductList } = this.props;
        const api = '/model/product_list.json';
        fetchData(api, {}, setProductList);
    }

    onSend(userInfo) {//Собрали всю инфу с формы и отправляем
        let { warningForm } = this.props;
        /*fetchData('апи для отправки', userInfo, 'Тут какой нить каллбэк с ответом успешно или нет');*/
        let random = Math.random();
        let message = '';
        this.close();
        console.log(userInfo);
        if (random <= 0.5) { //Имитация кэлбэка
            warningForm('successSendInfo', 'success');
            message = 'Оплата прошла успешно!';
        } else {
            warningForm('successSendInfo', 'error');
            message = 'Возникла ошибка при оплате!';
        }

        setTimeout(() => {
            alert(message)
        }, 1000);
    }

    onClickButton(type) {//переходим к другому шагу(или назад на 2 шаге)
        const { dialog, switchStep, warningForm } = this.props;
        const { userInfo } = dialog;
        const activeId = userInfo.productId;
        const steps = Interface.dialog.steps;
        const stepKeys = Object.keys(steps);
        const currentStep = dialog.current_step;
        const fields = steps[currentStep.label].fields;
        let error = steps[currentStep.label].error;
        switch(type) {
            case 'next': {
                if (activeId) {
                    if (stepKeys && stepKeys.length !== currentStep.index + 1) {
                        let obj = {
                            label: stepKeys[currentStep.index + 1],
                            index: currentStep.index + 1
                        };
                        switchStep(obj);
                        let warning = '';
                        if (['id_001', 'id_004', 'id_005'].includes(activeId)) {
                            warning = steps[stepKeys[currentStep.index + 1]].warning;
                        }
                        warningForm('warning', warning);
                    } else {
                        let keysInfo = Object.keys(userInfo);
                        let error = {};
                        if (keysInfo && keysInfo.length) {
                            for (let i = 0; i < keysInfo.length; i++) {
                                switch(keysInfo[i]) {
                                    case 'name': {
                                        if (fields[keysInfo[i]].required) {
                                              if (!userInfo[keysInfo[i]]) {
                                                  error[keysInfo[i]] = "Заполните обязательное поле";
                                              }
                                        }
                                        break;
                                    }
                                    case 'email': {
                                        if (fields[keysInfo[i]].required) {
                                            if (!userInfo[keysInfo[i]]) {
                                                error[keysInfo[i]] = "Заполните обязательное поле";
                                            } else if (!testPatterns(userInfo[keysInfo[i]], EMAIL_PATTERN)) {
                                                error[keysInfo[i]] = "Введена некорректная электронная почта";
                                            }
                                        }
                                        break;
                                    }
                                    case 'phone': {
                                        if (fields[keysInfo[i]].required) {
                                            if (!userInfo[keysInfo[i]]) {
                                                error[keysInfo[i]] = "Заполните обязательное поле";
                                            } else if (!testPatterns(userInfo[keysInfo[i]], PHONE_PATTERN)) {
                                                error[keysInfo[i]] = "Введен некорретный телефон";
                                            }
                                        } else {
                                            if (userInfo[keysInfo[i]] && !testPatterns(userInfo[keysInfo[i]], PHONE_PATTERN)) {
                                                error[keysInfo[i]] = "Введен некорретный телефон";
                                            }
                                        }
                                        break;
                                    }
                                    default: break;
                                }
                            }
                        }
                        warningForm('error', error);
                        if (!Object.keys(error).length) {
                            this.onSend(userInfo);
                        }
                    }
                } else {
                    warningForm('warning', error);
                }
                break
            }
            case 'prev': {
                if (stepKeys && currentStep.index !== 0) {
                    let obj = {
                        label: stepKeys[currentStep.index - 1],
                        index: currentStep.index - 1
                    };
                    warningForm('warning', '');
                    switchStep(obj);
                }
                break
            }
            default: break;
        }
    }

    onChangeUserInfo(field, value) {//сохраняем всю инфу в объект, при выборе продукта, вводе данных
        let { warningForm, dialog, onChangeUserInfo } = this.props;
        const steps = Interface.dialog.steps;
        const currentStep = dialog.current_step;
        let productList = dialog.product_list;

        switch(field) {
            case 'productId': {
                let name = productList[value].name;
                let cost = productList[value].cost;
                let success = ((steps[currentStep.label].success).replace('${product}', name)).replace('${cost}', cost);
                onChangeUserInfo(field, value);
                warningForm('warning', success);
                break;
            }
            default: {
                onChangeUserInfo(field, value);
                break
            };
        }

    }

    isErrorCheckDisabled(field) {//убираем ошибку при вводе в поле
        let { dialog, warningForm } = this.props;
        let { error } = dialog;
        if (error && error[field]) {
            delete error[field];
            warningForm('error', error);
        }
    }

    closeDialog() {//собираем инфу и отправляем при закрытии окна
        const { dialog } = this.props;
        const { current_step, userInfo} = dialog;
        /*fetchData('апи для отправки при закрытии', тут объект с любой инфой какую хотим получить
         если пользователь закрыл окно на каком то шаге, () => {});*/
        this.close();
    }

    render() {
        const { dialog, onChangeUserInfo } = this.props;
        const { current_step, userInfo, product_list, options, successSendInfo } = dialog;
        const steps = Interface.dialog.steps;
        const currentStep = current_step;
        const activeId = userInfo.productId;
        let productList = product_list;
        let buttons = steps[currentStep.label].buttons;
        const warning = dialog.warning;
        const error = dialog.error;

        const header = (
            <h2 className="dialog_title">{steps[currentStep.label].header}</h2>
        );

        const buttonBuilder = (
            <ButtonBuilder
                onClick={this.onClickButton}
                buttons={buttons}
                id="dialog_buttons"
            />
        );

        const dialogBuilder = (
            <DialogBuilder
                name={currentStep}
                activeId={activeId}
                error={error}
                data={steps}
                options={options}
                productList={productList}
                isErrorCheckDisabled={this.isErrorCheckDisabled}
                onChangeUserInfo={this.onChangeUserInfo}
            />
        );

        const message = (
            warning && <div>{warning}</div>
        );

        return (
            <ErrorBoundary>{/*граница ошибок*/}
                <section>
                    <Button
                        onClick={() => {
                            this.props.isOpenDialog(true)
                            this.getProductList();
                        }}
                    >Выбрать продукт</Button>
                    <Dialog
                        header={header}
                        message={message}
                        buttons={buttonBuilder}
                        content={dialogBuilder}
                        breadCrumbs={<div></div>}
                        onClickButton={this.onClickButton}
                        close={this.close}
                    />
                    <Dialog
                        header={header}
                        message={message}
                        buttons={buttonBuilder}
                        content={dialogBuilder}
                        breadCrumbs={<div></div>}
                        onClickButton={this.onClickButton}
                        closeDialog={this.closeDialog}
                    />
                </section>
            </ErrorBoundary>
        )
    }
}

export default
connect(
    state => ({
        dialog: state.dialog
    }),
    dispatch => ({
        isOpenDialog: (isOpen) => {
            dispatch({
                type: UI.DIALOG.IS_OPEN_DIALOG,
                payload: {
                    isOpen: isOpen
                }
            })
        },
        setProductList: (data) => {
            dispatch({
                type: UI.DIALOG.SET_PRODUCT_LIST,
                payload: {
                    data: data
                }
            })
        },
        switchStep: (step) => {
            dispatch({
                type: UI.DIALOG.SWITCH_STEP,
                payload: {
                    step: step
                }
            })
        },
        onChangeUserInfo: (field, value) => {
            dispatch({
                type: UI.DIALOG.ON_CHANGE_USER_INFO,
                payload: {
                    field: field,
                    value: value
                }
            })
        },
        warningForm: (field, value) => {
            dispatch({
                 type: UI.DIALOG.IS_CHECK_ERROR_SUCCESS,
                 payload: {
                     field: field,
                     value: value
                 }
             })
         },
    })
)
(Main);