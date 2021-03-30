import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, IconButton } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

const JsonRenderComponent = (props) => {
  const {
    setSecondaryOptionValue,
    ChangeOptionPopup,
    currentPopUpOption = [],
    secondaryOptionCheckValue
  } = props;
  const { popupContentArrValue } = useSelector((state) => state.PopUpReducer);
  let popUpOption = currentPopUpOption.length > 0 ? currentPopUpOption : popupContentArrValue;
  console.log("currentPopUpOption",currentPopUpOption)
  console.log("currentPopUpOption",popupContentArrValue)
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
                      onClick={
                        item.optionClass === 'optionSecondary'
                          ? setSecondaryOptionValue
                          : ChangeOptionPopup
                      }
                      disabled={item.data === 'switch' ? false : item.disabled}
                    >
                      {item.data}
                      {item.optionClass === 'optionSecondary' &&
                      secondaryOptionCheckValue === item.dataValue ? (
                        <IconButton className={'tick'}>
                          <Check className={'selectionIcon'} />
                        </IconButton>
                      ) : null}
                    </Button>
                    {item.divider && <Divider {...item.divider} key={index} />}
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
