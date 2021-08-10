import React, { Fragment, useState, useEffect } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  POPUP_CLOSE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_NEXT_POPUP
} from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
import { input } from 'aws-amplify';
import { createNameWithBadge } from '../Actions/StatusAction';

const PopUpItemConfig = (props) => {
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const [item_Aligement, set_Item_Aligement] = useState('');
  const [item_Type, set_Item_Type] = useState('');
  const [response_Aligement, Set_Response_Aligement] = useState('');
  const [response_Choice, Set_Response_Choice] = useState('');

  const dispatch = useDispatch();
  const {
    isActive,
    parentCallback = null,
    primaryheader,
    primaryheaderTwo = '',
    inputHeader,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    choiceOb = null,
    basicInfo,
    mode,
    isItemFramework = false
  } = props;

  const handleClick = () => {
    dispatch({ type: POPUP_CLOSE });
  };
  const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
  console.log('itemRoltype', itemTypeList);
  const itemTypeListArr = itemTypeList.map((item) => {
    return {
      id: item.id,
      name: item.itemFrameworkOneTypeName,
      description: item.itemFrameworkOneTypeDescription
    };
  });



  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={primaryheader}
          onClick={handleClick}
          mode={mode}
          value={item_Type}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <Fragment>
                  {/* {inputHeader}&nbsp; */}
                  {/* {primaryheader ? (
                    <>
                      <span className={'headerBadge'}>{primaryheader}</span>&nbsp;
                    </>
                  ) : null} */}
                  {primaryheaderTwo ? (
                    <span className={'headerBadge'}>{primaryheaderTwo}</span>
                  ) : null}
                </Fragment>
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message="Click me, I will stay visible until you click outside." />
              </div>
            </div>
          </div>
          <FormControl style={{ width: '100%' }}>
          <InputFeild
              tag={'item'}
              label={'item'}
              dataValue={'item'}
              // labelBadgeOne={'choice'}
              value={''}
              errorMsg={''}
              type={'number'}
              onClick={(e) => {
                // setscore(e.target.value);
              }}
            />
            <SelectField
              tag={'item_Aligement'}
              dataValue={'item'}
              label={'item'}
              labelBadgeOne={'alignment'}
              listSelect={[
                { id: 'horizontal-bottom', name: 'horizontal-bottom' },
                { id: 'horizontal-top', name: 'horizontal-top' },
                { id: 'vertical-bottom', name: 'vertical-bottom' },
                { id: 'vertical-top', name: 'vertical-top' }
              ]}
              errorMsg={() => { }}
              onChange={(e) => {
                set_Item_Aligement(e.target.value);
              }}
              value={item_Aligement}
              mappingValue={'id'}
            />
            <SelectField
              tag={'item_Type'}
              label={'item'}
              dataValue={'item'}
              labelBadgeOne={'type'}
              errorMsg={() => { }}
              onChange={(e) => {
                console.log(e.target);
                
                dispatch({
                  type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
                  payload: {
                    stateName: 'itemFrameworkOneType',
                    value: e.target.value
                  }
                })
                set_Item_Type(e.target.value);
                // parentCallback(e.target.value);
              }}
              value={item_Type}
              mappingValue={'id'}
              listSelect={itemTypeListArr}
            />
            <SelectField
              tag={'response_Aligement'}
              label={'response'}
              dataValue={'response'}
              labelBadgeOne={'alignment'}
              listSelect={[
                { id: 'horizontal-bottom', name: 'horizontal-bottom' },
                { id: 'horizontal-top', name: 'horizontal-top' },
                { id: 'vertical-bottom', name: 'vertical-bottom' },
                { id: 'vertical-top', name: 'vertical-top' }
              ]}
              errorMsg={() => { }}
              onChange={(e) => {
                Set_Response_Aligement(e.target.value);
              }}
              value={response_Aligement}
              mappingValue={'id'}
            />
             <InputFeild
              tag={'response_choice'}
              label={'response'}
              dataValue={'response'}
              labelBadgeOne={'choice'}
              value={''}
              errorMsg={''}
              type={'number'}
              onClick={(e) => {
                // setscore(e.target.value);
              }}
            />
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge('item (explanation)')}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      style={{ float: 'right', margin: '0px' }}
                      className={''}
                      color="default"
                      name={'assesseeAddressEmailCommunication'}
                      value={''}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge('item (label)')}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      style={{ float: 'right', margin: '0px' }}
                      className={''}
                      color="default"
                      name={'assesseeAddressEmailCommunication'}
                      value={''}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>
                    {createNameWithBadge('response (choice) (explanation)')}
                  </div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      style={{ float: 'right', margin: '0px' }}
                      className={''}
                      color="default"
                      name={'assesseeAddressEmailCommunication'}
                      value={''}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge('response (explanation)')}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      style={{ float: 'right', margin: '0px' }}
                      className={''}
                      color="default"
                      name={'assesseeAddressEmailCommunication'}
                      value={''}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge('response (label)')}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      style={{ float: 'right', margin: '0px' }}
                      className={''}
                      color="default"
                      name={'assesseeAddressEmailCommunication'}
                      value={''}
                    />
                  </div>
                </div>
              </div>
            </div>
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpItemConfig;
