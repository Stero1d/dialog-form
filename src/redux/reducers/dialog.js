import { UI } from "../../redux/constant/UIConst";

const initState = {
    isOpen: false,
    product_list: {},
    userInfo: {
        name: '',
        email: '',
        phone: '',
        productId: ''
    },
    current_step: {
        label: 'step_selection',
        index: 0
    },
    warning: '',
    error: {},
    successSendInfo: ''
};

export default (state = initState, action) => {

    switch (action.type) {
        case UI.DIALOG.IS_OPEN_DIALOG:{
            let isOpen = action.payload.isOpen;
            if (isOpen) {
                return {
                    ...state,
                    isOpen: isOpen
                };
            } else {
                return {
                    ...initState
                };
            }

            break;
        }

        case UI.DIALOG.SET_PRODUCT_LIST:{
            let data = action.payload.data;
            return {
                ...state,
                ...data
            };

            break;
        }

        case UI.DIALOG.SWITCH_STEP:{
            let step = action.payload.step;
            return {
                ...state,
                current_step: step
            };

            break;
        }

        case UI.DIALOG.ON_CHANGE_USER_INFO:{
            let field = action.payload.field;
            let value = action.payload.value;
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    [field]: value
                }
            };

            break;
        }

        case UI.DIALOG.IS_CHECK_ERROR_SUCCESS:{
            let field = action.payload.field;
            let value = action.payload.value;
            return {
                ...state,
                [field]: value
            };

            break;
        }

        default: break;
    }

    return state;
}