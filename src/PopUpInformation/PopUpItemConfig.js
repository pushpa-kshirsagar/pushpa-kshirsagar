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
  const itemFrameworkOne = itemInformation.informationFramework.itemFrameworkOne;
  const [item_Aligement, set_Item_Aligement] = useState(itemFrameworkOne.itemFrameworkOneAlignment);
  const [item_Type, set_Item_Type] = useState(itemFrameworkOne.itemFrameworkOneType);
  const [response_Aligement, Set_Response_Aligement] = useState(
    itemFrameworkOne.itemFrameworkOneResponseAlignment
  );
  const [item, setItem] = useState(1);
  const [response_Choice, set_Response_Choice] = useState(
    itemFrameworkOne.itemFrameworkOneResponseChoice.length
  );
  useEffect(() => {
    set_Response_Choice(itemFrameworkOne.itemFrameworkOneResponseChoice.length);
  }, [itemFrameworkOne]);
  const dispatch = useDispatch();
  const {
    isActive,
    primaryheader,
    primaryheaderTwo = '',
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    choiceOb = null,
    basicInfo,
    mode,
    isItemFramework = false
  } = props;
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const handleClick = () => {
    let itemFrameworkOneResponseChoice = itemFrameworkOne.itemFrameworkOneResponseChoice;
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneAlignment',
        value: item_Aligement
      }
    });
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneType',
        value: item_Type
      }
    });
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneResponseAlignment',
        value: response_Aligement
      }
    });
    if (response_Choice < itemFrameworkOne.itemFrameworkOneResponseChoice) {
      let actlen = itemFrameworkOneResponseChoice.length - response_Choice;
      let arr = itemFrameworkOne.itemFrameworkOneResponseChoice;
      let newArr = arr.slice(0, -actlen);
      if (newArr.length >= 3) {
        dispatch({
          type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'itemFrameworkOneResponseChoice',
            value: newArr
          }
        });
      }
    }
    if (response_Choice > itemFrameworkOneResponseChoice.length) {
      let originobj = [...itemFrameworkOneResponseChoice];
      let actlen = response_Choice - itemFrameworkOneResponseChoice.length;
      let choice = itemFrameworkOneResponseChoice.length;
      for (let i = 0; i < actlen; i++) {
        originobj.push({
          itemFrameworkOneResponseChoice: `${choice + i + 1}`,
          itemFrameworkOneResponseChoiceColumnMatch: '',
          itemFrameworkOneResponseChoiceExplanation: {
            itemFrameworkOneResponseChoiceExplanation: '',
            itemFrameworkOneResponseChoiceExplanationDisplay: false
          },
          itemFrameworkOneResponseChoiceMedia: optionLabel,
          itemFrameworkOneResponseChoiceWeightage: '',
          itemFrameworkOneResponseChoiceScore: ''
        });
      }
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseChoice',
          value: originobj
        }
      });
    }
    dispatch({ type: POPUP_CLOSE });
  };
  const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
  const itemTypeListArr = itemTypeList.map((item) => {
    return {
      id: item.id,
      name: item.itemFrameworkOneTypeName,
      description: item.itemFrameworkOneTypeDescription
    };
  });
  console.log(itemFrameworkOne.itemFrameworkOneResponseChoice.length);
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
              value={item}
              errorMsg={''}
              type={'number'}
              onClick={
                mode === 'revise'
                  ? (e) => {
                      setItem(e.target.value);
                    }
                  : null
              }
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
              errorMsg={() => {}}
              onChange={
                mode === 'revise'
                  ? (e) => {
                      set_Item_Aligement(e.target.value);
                    }
                  : null
              }
              value={item_Aligement}
              mappingValue={'id'}
            />
            <SelectField
              tag={'item_Type'}
              label={'item'}
              dataValue={'item'}
              labelBadgeOne={'type'}
              errorMsg={() => {}}
              onChange={
                mode === 'revise'
                  ? (e) => {
                      set_Item_Type(e.target.value);
                      // parentCallback(e.target.value);
                    }
                  : null
              }
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
              errorMsg={() => {}}
              onChange={
                mode === 'revise'
                  ? (e) => {
                      Set_Response_Aligement(e.target.value);
                    }
                  : null
              }
              value={response_Aligement}
              mappingValue={'id'}
            />
            <InputFeild
              tag={'response_choice'}
              label={'response'}
              dataValue={'response'}
              labelBadgeOne={'choice'}
              value={response_Choice}
              errorMsg={''}
              type={'number'}
              onClick={
                mode === 'revise'
                  ? (e) => {
                      set_Response_Choice(e.target.value);
                    }
                  : null
              }
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
