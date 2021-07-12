import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, IconButton } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import InputField from '../Atoms/InputField/InputField';

const JsonRenderComponent = (props) => {
  const {
    setSecondaryOptionValue,
    ChangeOptionPopup,
    currentPopUpOption = [],
    secondaryOptionCheckValue,
    tertiaryOptionCheckValue = 'all',
    forthOptionCheckValue = '',
    setSecondaryOptionValueTwo = null,
    setSecondaryOptionValueThree = null
  } = props;
  const { popupContentArrValue } = useSelector((state) => state.PopUpReducer);
  let popUpOption = currentPopUpOption.length > 0 ? currentPopUpOption : popupContentArrValue;
  // console.log("currentPopUpOption",currentPopUpOption)
  // console.log("currentPopUpOption",popupContentArrValue)
  return (
    <>
      <div id="dialog-description">
        <div className="true">
          <div className={'tickOption'}>
            {popUpOption &&
              popUpOption.map((item, index) => {
                return (
                  <div key={index}>
                    <Button
                      className={item.optionClass}
                      data-value={item.dataValue}
                      data-key={item.dataKey ? item.dataKey : item.dataValue}
                      onClick={
                        item.optionClass === 'optionSecondary'
                          ? setSecondaryOptionValue
                          : item.optionClass === 'optionTertiary'
                          ? setSecondaryOptionValueTwo
                          : item.optionClass === 'optionForth'
                          ? setSecondaryOptionValueThree
                          : ChangeOptionPopup
                      }
                      disabled={item.dataValue === 'switch' ? false : item.disabled}
                    >
                      {item.data}
                      {item.optionClass === 'optionSecondary' &&
                      secondaryOptionCheckValue === item.dataValue ? (
                        <IconButton className={'tick'}>
                          <Check className={'selectionIcon'} />
                        </IconButton>
                      ) : null}
                      {item.optionClass === 'optionTertiary' &&
                      tertiaryOptionCheckValue === item.dataValue ? (
                        <IconButton className={'tick'}>
                          <Check className={'selectionIcon'} />
                        </IconButton>
                      ) : null}
                      {item.optionClass === 'optionForth' &&
                      forthOptionCheckValue === item.dataValue ? (
                        <IconButton className={'tick'}>
                          <Check className={'selectionIcon'} />
                        </IconButton>
                      ) : null}
                    </Button>
                    {item.divider && <Divider light={item.divider === 'light'} key={index} />}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default JsonRenderComponent;
