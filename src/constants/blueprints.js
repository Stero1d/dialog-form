export const Interface = {
    dialog: {
       steps: {
           step_selection: {
               label: 'Шаг №1',
               header: 'Форма выбора продукта',
               buttons: {
                   next: {
                       label: 'Далее',
                       action: "next",
                       style: {
                           color: 'blue',
                           type: ''
                       }
                   }
               },
               error: 'Выберите один из предоставленных продуктов, и нажмите далее',
               success: "Вы выбрали ${product} за ${cost}"
           },
           step_confirmation: {
               label: 'Шаг №2',
               header: 'Подтверждение выбранного товара',
               buttons: {
                   prev: {
                       label: 'Выбрать другой продукт',
                       action: "prev",
                       style: {
                           color: 'grey',
                           type: ''
                       }
                   },
                   next: {
                       label: 'Оформить заказ',
                       action: "next",
                       style: {
                           color: 'orange',
                           type: ''
                       }
                   }
               },
               warning: 'Выбранный продукт не содержит опцию №4'
           },
           step_purchase: {
               label: 'Шаг №3',
               header: 'Ввод персональных данных',
               buttons: {
                   next: {
                       label: 'Оплатить',
                       action: "next",
                       style: {
                           color: 'green',
                           type: ''
                       }
                   }
               },
               fields: {
                   name: {
                       label: 'Ваше Имя',
                       placeholder: 'Введите ваше имя',
                       required: true
                   },
                   email: {
                       label: 'Электронаая почта',
                       placeholder: 'Введите электронную почту',
                       required: true
                   },
                   phone: {
                       label: 'Мобильный телефон',
                       placeholder: 'Введите мобильный телефон',
                       required: false
                   }
               }
           }
       }
    }
};