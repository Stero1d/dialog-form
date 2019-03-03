/**
 * Created by administrator on 17.09.18.
 */
// react
import React from "react";
//semantic-ui components
import { Button, Input } from 'semantic-ui-react'
//components
import ListItem from '../../ui/listCard/listCard'
import List from '../../ui/list/List'
//css
import './dialogBuilder.css'

const DialogBuilder = ({name, data, productList, options, onChangeUserInfo, activeId, error, isErrorCheckDisabled}) => {

    const renderDialogContent = (name, data, error, isErrorCheckDisabled) => {
        let newData = data[name.label];
        let content = '';
           switch(name.label) {
               case 'step_selection': {
                    content = (
                        <div id='products'>
                            <div className='product_list'>
                                <ListItem
                                    list={productList}
                                    activeId={activeId}
                                    onChangeUserInfo={onChangeUserInfo}
                                />
                            </div>
                            <div className='error-message'></div>
                        </div>
                    );
                   break;
               }
               case 'step_confirmation': {
                   let list = [];
                   let product = productList[activeId];
                   let optionsProduct = product.options;
                   if (optionsProduct && optionsProduct.length) {
                       for (let i = 0; i < optionsProduct.length; i++) {
                           list.push(options[optionsProduct[i]]);
                       }
                   }

                   content = (
                       <div id='options'>
                           <h3>{productList[activeId].name}</h3>
                           <div className='options_list'>
                               <List
                                   list={list}
                               />
                           </div>
                           <div className='error-message'></div>
                       </div>
                   );
                   break
               }
               case 'step_purchase': {
                   let newFields = [];
                   let fields = newData.fields;
                   let keys = Object.keys(fields);

                   if (keys && keys.length) {
                      for (let i = 0; i < keys.length; i++) {
                          newFields.push(
                              <div className={`field_${keys[i]}`}>
                                  <div>{fields[keys[i]].label}
                                  {fields[keys[i]].required
                                      && <span className='required'>*</span>}
                                  </div>
                                 <Input
                                     name={keys[i]}
                                     placeholder={fields[keys[i]].placeholder}
                                     autoFocus={keys[i] === 'name'}
                                     onChange={(e) => {
                                         let value = e.target.value;
                                         onChangeUserInfo(keys[i], value);
                                         isErrorCheckDisabled(keys[i]);
                                     }}
                                 />
                                  {error && error[keys[i]] && <div className='error_field'>{error[keys[i]]}</div>}
                              </div>
                          )
                      }
                   }

                   content = (
                       <div id='fields_input'>
                           {newFields}
                       </div>
                   );
                   break
               }

               default: break;
           }

           return content
    };

    return (
        <div>
            {renderDialogContent(name, data, error, isErrorCheckDisabled)}
        </div>
    )
};
export default DialogBuilder;
