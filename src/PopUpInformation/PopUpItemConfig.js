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
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_NEXT_POPUP,
  SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_SECTION_FRAMEWORK_DYNAMIC_SINGLE_STATE
} from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
import { input } from 'aws-amplify';
import { createNameWithBadge } from '../Actions/StatusAction';
import { setItemTypeConfigState } from '../Actions/GenericActions';

const PopUpItemConfig = (props) => {
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
    isItemFramework = false,
    itemFrameworkOne = '',
    headerOneBadgeTwo = '',
    assessmentItemSequence = false,
    currentItemSequence
  } = props;
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { itemConfigStates, assessmentSelecedSectionVersionData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const {
    isAssessmentPreviewShow = false,
    isAssessmentSectionShow = false,
    isAssessmentVersionShow = false
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  //const itemFrameworkOne = itemInformation.informationFramework.itemFrameworkOne;
  const assessmentInfo = useSelector((state) => state.AssessmentReducer);
  const versionInfo = useSelector((state) => state.VersionCreateReducer);
  const [item_Aligement, set_Item_Aligement] = useState(
    itemFrameworkOne?.itemFrameworkOneAlignment
  );
  const [item_Type, set_Item_Type] = useState(itemFrameworkOne?.itemFrameworkOneType);
  const [response_word, set_Response_Word] = useState();
  const [item_sequence, set_item_sequence] = useState();
  const [response_Choice_Aligement, set_Choice_Response_Word] = useState();
  const [response_Aligement, Set_Response_Aligement] = useState(
    itemFrameworkOne?.itemFrameworkOneResponseAlignment
  );
  const [sub_item, setSubItem] = useState();
  const [response_Choice, set_Response_Choice] = useState();
  useEffect(() => {
    if (itemFrameworkOne) {
      set_Response_Choice(
        itemFrameworkOne?.itemFrameworkOneResponseChoice.length === 0
          ? 3
          : itemFrameworkOne?.itemFrameworkOneResponseChoice.length
      );
      // set_Response_Choice(2);
      setSubItem(itemFrameworkOne?.itemFrameworkOneSection?.length);
      set_Item_Aligement(itemFrameworkOne?.itemFrameworkOneAlignment);
      set_Item_Type(itemFrameworkOne?.itemFrameworkOneType);
      Set_Response_Aligement(itemFrameworkOne?.itemFrameworkOneResponseAlignment);
      set_Response_Word(itemFrameworkOne?.itemFrameworkOneWord?.itemFrameworkOneWordMaximum);
      set_item_sequence(currentItemSequence);
    }
  }, [itemFrameworkOne]);
  const dispatch = useDispatch();
  const subItemList = itemFrameworkOne?.itemFrameworkOneSection;
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp;";
  const itemText = '<span>item</span>&nbsp;';
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const handleClick = () => {
    let itemFrameworkOneResponseChoice = itemFrameworkOne.itemFrameworkOneResponseChoice;
    const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
    const data = itemTypeList.find((item) => item.id === item_Type);
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneAlignment',
        value: item_Aligement
      }
    });
    setItemTypeConfigState(item_Type, dispatch, true);
    if (isAssessmentPreviewShow) {
      dispatch({
        type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneType',
          value: item_Type
        }
      });
      dispatch({
        type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseAlignment',
          value: response_Aligement
        }
      });
      dispatch({
        type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneWord',
          value: {
            itemFrameworkOneWordMaximum: response_word,
            itemFrameworkOneWordMinimum: response_word
          }
        }
      });
    } else if (isAssessmentSectionShow) {
      dispatch({
        type: SET_ASSESSMENT_SECTION_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneType',
          value: item_Type
        }
      });
      dispatch({
        type: SET_ASSESSMENT_SECTION_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseAlignment',
          value: response_Aligement
        }
      });
      dispatch({
        type: SET_ASSESSMENT_SECTION_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneWord',
          value: {
            itemFrameworkOneWordMaximum: response_word,
            itemFrameworkOneWordMinimum: response_word
          }
        }
      });
    } else if (isAssessmentVersionShow) {
      let array =
        JSON.parse(
          JSON.stringify(assessmentSelecedSectionVersionData.assessmentVersionItemDistinct)
        ) || [];
      let itemSequenceArr = [];
      for (let index = 0; index < array.length; index++) {
        let reviseItem = JSON.parse(JSON.stringify(array[index]));
        if (reviseItem.itemSequence === parseInt(currentItemSequence)) {
          reviseItem = { ...reviseItem, itemSequence: parseInt(item_sequence) };
          itemSequenceArr.push(reviseItem);
        } else if (reviseItem.itemSequence === parseInt(item_sequence)) {
          reviseItem = { ...reviseItem, itemSequence: parseInt(currentItemSequence) };
          itemSequenceArr.push(reviseItem);
        } else {
          itemSequenceArr.push(reviseItem);
        }
      }
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSelecedSectionVersionData',
          value: {
            ...assessmentSelecedSectionVersionData,
            assessmentVersionItemDistinct: itemSequenceArr
          }
        }
      });
    } else {
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
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneWord',
          value: {
            itemFrameworkOneWordMaximum: response_word,
            itemFrameworkOneWordMinimum: response_word
          }
        }
      });
    }
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
    if (sub_item) {
      // let originobj = { ...itemFrameworkOne.itemFrameworkOneSection };
      let originobj = [];
      let origin = itemFrameworkOne.itemFrameworkOneSection.length;
      let add = sub_item - origin;
      if (add > 0) {
        for (let i = 1; i <= add; i++) {
          originobj.push({
            itemFrameworkOneSectionSequence: origin + i,
            itemFrameworkOneSection: {
              itemFrameworkOneMedia: '',
              itemFrameworkOneScore: null,
              itemFrameworkOneType: null,
              itemFrameworkOneCorrect: null,
              itemFrameworkOneResponseChoice: [
                {
                  itemFrameworkOneResponseChoiceAlignment: '',
                  itemFrameworkOneResponseChoiceColumnMatch: '',
                  itemFrameworkOneResponseChoiceExplanation: {
                    itemFrameworkOneResponseChoiceExplanationMedia: '',
                    itemFrameworkOneResponseChoiceExplanationDisplay: false
                  },
                  itemFrameworkOneResponseChoiceMedia: '',
                  itemFrameworkOneResponseChoiceNumber: '1',
                  itemFrameworkOneResponseChoicePolarity: '',
                  itemFrameworkOneResponseChoiceScore: '',
                  itemFrameworkOneResponseChoiceWeightage: ''
                },
                {
                  itemFrameworkOneResponseChoiceAlignment: '',
                  itemFrameworkOneResponseChoiceColumnMatch: '',
                  itemFrameworkOneResponseChoiceExplanation: {
                    itemFrameworkOneResponseChoiceExplanationMedia: '',
                    itemFrameworkOneResponseChoiceExplanationDisplay: false
                  },
                  itemFrameworkOneResponseChoiceMedia: '',
                  itemFrameworkOneResponseChoiceNumber: '2',
                  itemFrameworkOneResponseChoicePolarity: '',
                  itemFrameworkOneResponseChoiceScore: '',
                  itemFrameworkOneResponseChoiceWeightage: ''
                },
                {
                  itemFrameworkOneResponseChoiceAlignment: '',
                  itemFrameworkOneResponseChoiceColumnMatch: '',
                  itemFrameworkOneResponseChoiceExplanation: {
                    itemFrameworkOneResponseChoiceExplanationMedia: '',
                    itemFrameworkOneResponseChoiceExplanationDisplay: false
                  },
                  itemFrameworkOneResponseChoiceMedia: '',
                  itemFrameworkOneResponseChoiceNumber: '3',
                  itemFrameworkOneResponseChoicePolarity: '',
                  itemFrameworkOneResponseChoiceScore: '',
                  itemFrameworkOneResponseChoiceWeightage: ''
                }
              ]
            }
          });
        }
        dispatch({
          type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'itemFrameworkOneSection',
            value: [...itemFrameworkOne.itemFrameworkOneSection, ...originobj]
          }
        });
      }
      if (add < 0) {
        let org = [...itemFrameworkOne.itemFrameworkOneSection];
        originobj = org.slice(0, add);
        dispatch({
          type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'itemFrameworkOneSection',
            value: [...originobj]
          }
        });
      }
    }
    if (item_Type) {
      let choicelength = 3;
      let newArr = [];
      if (data?.id === item_Type && data?.itemFrameworkOneTypeNameReference === 'False-True') {
        choicelength = 2;
      }
      for (let index = 1; index <= choicelength; index++) {
        let ob = {
          itemFrameworkOneResponseChoice: index,
          itemFrameworkOneResponseChoiceColumnMatch: '',
          itemFrameworkOneResponseChoiceExplanation: {
            itemFrameworkOneResponseChoiceExplanation: '',
            itemFrameworkOneResponseChoiceExplanationDisplay: false
          },
          itemFrameworkOneResponseChoiceMedia:
            choicelength === 2 ? (index === 1 ? '<p>False</p>' : '<p>True</p>') : '',
          itemFrameworkOneResponseChoicePolarity: '',
          itemFrameworkOneResponseChoiceScore: null,
          itemFrameworkOneResponseChoiceWeightage: null
        };
        newArr.push(ob);
      }
      // dispatch({
      //   type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      //   payload: {
      //     stateName: 'itemFrameworkOneResponseChoice',
      //     value: newArr
      //   }
      // });
    }
    if (response_Choice > itemFrameworkOneResponseChoice.length) {
      // let originobj = [...itemFrameworkOneResponseChoice];
      let choice = itemFrameworkOneResponseChoice.length;
      let newbj = [];
      let actlen = response_Choice - choice;
      if (actlen > 0) {
        for (let i = 1; i <= actlen; i++) {
          newbj.push({
            itemFrameworkOneResponseChoiceAlignment: '',
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: {
              itemFrameworkOneResponseChoiceExplanationMedia: '',
              itemFrameworkOneResponseChoiceExplanationDisplay: false
            },
            itemFrameworkOneResponseChoiceMedia: '', //optionLabel,
            itemFrameworkOneResponseChoiceNumber: `${choice + i}`,
            itemFrameworkOneResponseChoicePolarity: '',
            itemFrameworkOneResponseChoiceScore: '',
            itemFrameworkOneResponseChoiceWeightage: ''
          });
        }
        console.log('newbj', newbj);
        if (isAssessmentPreviewShow) {
          dispatch({
            type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneResponseChoice',
              value: [...itemFrameworkOneResponseChoice, ...newbj]
            }
          });
        } else {
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneResponseChoice',
              value: [...itemFrameworkOneResponseChoice, ...newbj]
            }
          });
          // if(item_Type=== '61161713f24e1fb765208e23'){
          //          let opArr = itemFrameworkOne.itemFrameworkOneSection;
          //   opArr.forEach((element)=>{
          //     element.itemFrameworkOneSection.itemFrameworkOneResponseChoice=[...itemFrameworkOneResponseChoice, ...newbj];
          //   })
          //   dispatch({
          //     type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          //     payload: {
          //       stateName: 'itemFrameworkOneSection',
          //       value: opArr
          //     }
          //   });
          // }
          // if(item_Type === '61090cace50cf61d5eb440c9'){
          //   let opArr = itemFrameworkOne.itemFrameworkOneSection;
          //   opArr.forEach((element)=>{
          //     element.itemFrameworkOneSection.itemFrameworkOneResponseChoice=[...itemFrameworkOneResponseChoice, ...newbj];
          //   })
          //   dispatch({
          //     type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          //     payload: {
          //       stateName: 'itemFrameworkOneSection',
          //       value: opArr
          //     }
          //   });

          // }else{
          //   dispatch({
          //     type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          //     payload: {
          //       stateName: 'itemFrameworkOneResponseChoice',
          //       value: [...itemFrameworkOneResponseChoice, ...newbj]
          //     }
          //   });
          // }
        }
      }
    }
    if (item_Type === '61090cace50cf61d5eb440c9' || item_Type === '61161713f24e1fb765208e23') {
      let section = itemFrameworkOne.itemFrameworkOneSection[0].itemFrameworkOneSection;
      if (response_Choice > section.itemFrameworkOneResponseChoice.length) {
        let choice = section.itemFrameworkOneResponseChoice.length;
        let newbj = [];
        let actlen = response_Choice - choice;
        if (actlen > 0) {
          for (let i = 1; i <= actlen; i++) {
            newbj.push({
              itemFrameworkOneResponseChoiceAlignment: '',
              itemFrameworkOneResponseChoiceColumnMatch: '',
              itemFrameworkOneResponseChoiceExplanation: {
                itemFrameworkOneResponseChoiceExplanationMedia: '',
                itemFrameworkOneResponseChoiceExplanationDisplay: false
              },
              itemFrameworkOneResponseChoiceMedia: '', //optionLabel,
              itemFrameworkOneResponseChoiceNumber: `${choice + i}`,
              itemFrameworkOneResponseChoicePolarity: '',
              itemFrameworkOneResponseChoiceScore: '',
              itemFrameworkOneResponseChoiceWeightage: ''
            });
          }
          console.log('newbj', newbj);
          let opArr = itemFrameworkOne.itemFrameworkOneSection;
          opArr.forEach((element) => {
            element.itemFrameworkOneSection.itemFrameworkOneResponseChoice = [
              ...section.itemFrameworkOneResponseChoice,
              ...newbj
            ];
          });
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneSection',
              value: opArr
            }
          });
        }
      }
      if (response_Choice < section.itemFrameworkOneResponseChoice.length) {
        let actlen = section.itemFrameworkOneResponseChoice.length - response_Choice;
        let arr = section.itemFrameworkOneResponseChoice;
        let newArr = arr.slice(0, -actlen);
        if (newArr.length >= 3) {
          let opArr = itemFrameworkOne.itemFrameworkOneSection;
          opArr.forEach((element) => {
            element.itemFrameworkOneSection.itemFrameworkOneResponseChoice = [...newArr];
          });
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneSection',
              value: opArr
            }
          });
        }
      }
    }
    // if (sub_item > subItemList?.length) {
    //   let originobj = [...subItemList];
    //   let actlen = response_Choice - subItemList.length;
    //   let choice = subItemList.length;
    //   if (originobj) {
    //     for (let i = 0; i < actlen; i++) {
    //       originobj.push(`item-${choice + i + 1}`);
    //       setSubItem(originobj);
    //     }
    //   }
    // }
    // if (sub_item < subItemList?.length && sub_item !== 0) {
    //   let originobj = [...subItemList];
    //   let actlen = subItemList?.length - sub_item;
    //   let arr = itemFrameworkOne?.subItemList;
    //   let newarr = arr.slice(0, -actlen);
    //   setSubItem(newarr);
    // }

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
  console.log('props', props);
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={primaryheader}
          headerOneBadgeTwo={headerOneBadgeTwo}
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
            {isItemFramework === 'itemConfig' ? (
              <Fragment>
                {itemConfigStates.noOfItemState && (
                  <InputFeild
                    tag={'item'}
                    label={'item'}
                    dataValue={'item'}
                    // labelBadgeOne={'choice'}
                    value={sub_item}
                    errorMsg={''}
                    type={'number'}
                    onClick={
                      mode === 'revise'
                        ? (e) => {
                            setSubItem(e.target.value);
                          }
                        : null
                    }
                  />
                )}
                {/* <SelectField
                  tag={'item_Aligement'}
                  dataValue={'item'}
                  label={'item'}
                  labelBadgeOne={'alignment'}
                  listSelect={[
                    { id: ' ', name: ' ' },
                    { id: 'horizontal', name: 'horizontal' },
                    { id: 'vertical', name: 'vertical' }
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
                /> */}
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
                  // name={'itemFrameworkOneTypeNameReference'}
                  listSelect={itemTypeListArr}
                />
                {/* <SelectField
                  tag={'response_Aligement'}
                  label={'response'}
                  dataValue={'response'}
                  labelBadgeOne={'alignment'}
                  listSelect={[
                    { id: '', name: '' },
                    { id: 'horizontal', name: 'horizontal' },
                    { id: 'vertical', name: 'vertical' }
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
                /> */}
                {itemConfigStates.noOfResponseState && (
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
                )}
                {/* <SelectField
                  tag={'response_choice_Aligement'}
                  label={'response'}
                  dataValue={'response'}
                  labelBadgeOne={'choice'}
                  labelBadgeTwo={'alignment'}
                  listSelect={[
                    { id: '', name: '' },
                    { id: 'horizontal', name: 'horizontal' },
                    { id: 'vertical', name: 'vertical' }
                  ]}
                  errorMsg={() => {}}
                  onChange={
                    mode === 'revise'
                      ? (e) => {
                          set_Choice_Response_Word(e.target.value);
                        }
                      : null
                  }
                  value={response_Choice_Aligement}
                  mappingValue={'id'}
                /> */}
              </Fragment>
            ) : isItemFramework === 'responseConfig' ? (
              <Fragment>
                <InputFeild
                  tag={'response_word'}
                  label={'word'}
                  dataValue={'word'}
                  labelBadgeOne={''}
                  value={response_word}
                  errorMsg={''}
                  type={'number'}
                  onClick={
                    mode === 'revise'
                      ? (e) => {
                          set_Response_Word(e.target.value);
                        }
                      : null
                  }
                />
                <div className={'fitContent'}>
                  <div
                    className={['PopupFormBox', 'popupMinHei0'].join(' ')}
                    style={{ minHeight: 0 }}
                  >
                    <div className={'contFlex'}>
                      <div className={'f4'}>{'attachment'}</div>
                      <div className={'checkedFontNew'}>
                        <Checkbox
                          style={{ float: 'right', margin: '0px' }}
                          className={''}
                          color="default"
                          name={'attachment'}
                          value={''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : isItemFramework === 'sequenceConfig' ? (
              <Fragment>
                <InputFeild
                  tag={'item_sequence'}
                  label={'sequence'}
                  dataValue={'sequence'}
                  labelBadgeOne={''}
                  value={item_sequence}
                  errorMsg={''}
                  type={'number'}
                  onClick={
                    mode === 'revise'
                      ? (e) => {
                          set_item_sequence(e.target.value);
                        }
                      : null
                  }
                />
              </Fragment>
            ) : null}
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpItemConfig;
