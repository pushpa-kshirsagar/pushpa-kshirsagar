import React, { useEffect, useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_FRAMWORK_TYPE_REVIEW_LIST_SAGA,
  ITEM_INFO_REVISE_SAGA,
  LOADER_START,
  NAVIGATOR_MODE,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_ITEM_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '../../Molecules/ReviewList/ReviewList.css';
import { DialogContent } from '@material-ui/core';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import PopupHeader from '../../Molecules/PopUp/PopUpHeader';
import Popup from '../../Molecules/PopUp/PopUp';
import JsonRenderComponent from '../../Actions/JsonRenderComponent';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import NavigatorIcon from '@material-ui/icons/OpenWith';

import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import PopUpItemFramework from '../../PopUpInformation/PopUpItemFramework';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DisplayPaneFiveLikertScale from './DisplayPaneFiveLikertScale';
import PopUpItemConfig from '../../PopUpInformation/PopUpItemConfig';
import Paper from '@material-ui/core/Paper';
import DisplayPaneFiveItemTemplate from './DisplayPaneFiveItemTemplate';
import PopUpTextEditor from '../../PopUpIcon/PopUpTextEditor';
import { setResponseToReducerObj } from '../../Actions/ItemModuleAction';
import {
  converTimeToMiliseconds,
  onClickFirst,
  onClickLast,
  onClickNext,
  onClickPrevious
} from '../../Actions/GenericActions';

export const DisplayPaneFiveItem = () => {
  const dispatch = useDispatch();
  const [typeMode, setTypeMode] = useState(true);
  const [Item_Selected_Role_Type, set_Item_Selected_Role_Type] = useState('');
  console.log('item selected role type ', Item_Selected_Role_Type);
  const closePreview = () => {
    dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
  };
  const {
    headerOneBadgeTwo,
    responseObject,
    originResponseObj,
    reviewMode,
    createMode,
    isAssessmentPreviewShow = false,
    isItemPreviewShow = false
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { navigatorIcon, FilterMode, FilterModeEnable } = useSelector(
    (state) => state.FilterReducer
  );
  console.log('responseObject', responseObject);
  // console.log('isItemPreviewShow',isItemPreviewShow );
  // console.log('isAssessmentPreviewShow',isAssessmentPreviewShow );
  const {
    typeOfMiddlePaneList,
    selectedAssociateInfo,
    reviewListDistinctData,
    reviewListReqObj,
    numberPage,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    scanCount
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { isPopUpOpen } = useSelector((state) => state.PopUpReducer);
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    console.log(siftValue);
    dispatch({ type: NAVIGATOR_MODE });
    if (siftValue === 'next') {
      onClickNext(
        reviewListDistinctData,
        responseObject.id,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        headerOneBadgeTwo,
        reviewListReqObj,
        numberPage,
        middlePaneHeader,
        middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo
      );
    }
    if (siftValue === 'previous') {
      onClickPrevious(
        reviewListDistinctData,
        responseObject.id,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        headerOneBadgeTwo
      );
    }
    if (siftValue === 'first') {
      onClickFirst(
        reviewListDistinctData,
        responseObject.id,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        headerOneBadgeTwo
      );
    }
    if (siftValue === 'last') {
      onClickLast(
        reviewListDistinctData,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        scanCount,
        reviewListReqObj,
        numberPage,
        middlePaneHeader,
        middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo
      );
    }
    // dispatch({ type: NAVIGATOR_MODE });
  };
  const [subItemList, setSubItemList] = useState(['item-1']);

  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);

  const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];

  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const itemLabel = '<span>item</span>&nbsp';
  const itemLabelText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const responseLabel =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const itemDescription =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const itemFrameworkOneResponseChoice =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework?.itemFrameworkOne;
  const [selectedChoiceObject, setSelectedChoiceObject] = useState('');
  const [subQuestionId, setSubQuestionId] = useState('');

  // const [responseChoiceDescriptionText, setResponseChoiceDescriptionText] = useState(
  //   responseChoiceDescription
  // );
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const addOption = () => {
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneResponseChoice',
        value: [
          ...itemFrameworkOneResponseChoice,
          {
            itemFrameworkOneResponseChoice: `${itemFrameworkOneResponseChoice.length + 1}`,
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: responseChoiceDescription,
            itemFrameworkOneResponseChoiceMedia: optionLabel,
            itemFrameworkOneResponseChoiceWeightage: '',
            itemFrameworkOneResponseChoiceScore: ''
          }
        ]
      }
    });
  };
  const itemPopUpOption = [
    {
      data: 'configure',
      dataValue: 'configure',
      dataKey: 'configureAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: true
    },
    {
      data: 'revise',
      dataValue: 'revise',
      dataKey: 'reviseAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    }
  ];

  const itemPrimaryPopupOption = [
    {
      data: 'configure',
      dataValue: 'configure',
      dataKey: 'configureAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'revise',
      dataValue: 'revise',
      dataKey: 'reviseAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    }
  ];
  const itemPrimaryTriplePopupOption = [
    {
      data: 'configure',
      dataValue: 'configure',
      dataKey: 'configureAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled:
        responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'review'
          ? true
          : false
    },
    {
      data: 'review',
      dataValue: 'review',
      dataKey: 'reviewAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled:
        responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'review'
          ? true
          : false
    },
    {
      data: 'revise',
      dataValue: 'revise',
      dataKey: 'reviseAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled:
        responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'revise'
          ? true
          : false
    }
  ];

  const onClickReviseFinish = () => {
    setIsShowReviseIcon(true);
    const { informationBasic, informationAllocation, informationFramework } = itemInformation;
    if (informationFramework?.itemFrameworkOne?.itemFrameworkOneTime !== null) {
      let itemTimeMillisec = converTimeToMiliseconds(
        informationFramework?.itemFrameworkOne?.itemFrameworkOneTime
      );
      console.log('itemTimeMillisec', itemTimeMillisec);
      informationFramework.itemFrameworkOne.itemFrameworkOneTime = itemTimeMillisec;
    }
    const { id } = responseObject;
    const reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      item: {
        id,
        informationBasic,
        informationAllocation,
        informationFramework
      }
    };
    dispatch({ type: LOADER_START });
    dispatch({
      type: ITEM_INFO_REVISE_SAGA,
      payload: {
        secondaryOptionCheckValue: headerOneBadgeTwo,
        headerOne: 'item',
        reqBody,
        createMode
      }
    });
    // dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };
  const onClickRevise = () => {
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    setResponseToReducerObj(JSON.parse(originResponseObj), dispatch);
    setIsShowReviseIcon(true);
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
  };

  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const removeOption = () => {
    if (itemFrameworkOneResponseChoice.length > 3) {
      let arr = itemFrameworkOneResponseChoice;
      let newArr = arr.slice(0, -1);
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseChoice',
          value: newArr
        }
      });
    }
  };

  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in item
    console.log();
  };

  const ChangeOptionChoicePopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    setSubQuestionId(popupMode.split('_'));
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_CHOICE_FRAMEWORK_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'revise' && popupMode !== '') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: popupMode,
          popupMode: ''
        }
      });
    }
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    console.log('popupMode',popupMode)

    setSubQuestionId(popupMode.split('_'));
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'SUB_ITEM_FRAMEWORK_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'revise' && popupMode !== '') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: popupMode,
          popupMode: ''
        }
      });
    }
  };
  const ChangeResponsePopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'RESPONSE_CONFIGURE_POPUP',
          popupMode: ''
        }
      });
    }
  };

  const ChangeTripleDotOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'configure') {
      if (!itemInformation.informationFramework.itemTypeList) {
        dispatch({ type: LOADER_START });
        dispatch({
          type: GET_FRAMWORK_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary
            }
          }
        });
      }
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_TRIPLEDOT_CONFIGURE_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'revise') {
      dispatch({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: 'revise'
      });
      dispatch({ type: POPUP_CLOSE });
    }
    if (targetValue === 'review') {
      dispatch({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: 'review'
      });
      dispatch({ type: POPUP_CLOSE });
    }
  };

  const ChangeItemOptionPopup = (e) => {
    // console.log("config clicked");
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_FRAMEWORK_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
  };
  const itemLabelPrimaryPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_LABEL_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
  };
  const passagePrimaryPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'PASSAGE_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
  };
  const responseLabelChoicePopUp = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'RESPONSE_LABEL_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
  };
  const responseLabelExplanationPopUp = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'RESPONSE_LABEL_EXPLANATION_TEXT',
          popupMode: ''
        }
      });
    }
  };
  const itemExplanationPrimaryPopUp = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_DESCRIPTION_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
  };

  const BackHandlerEvent = (e) => {};
  const handleClick = (event) => {
    console.log('ONCHANGE ', event.target.value);
    if (itemFrameworkOne.itemFrameworkOneResponseCorrect[0] == event.target.value) {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: []
        }
      });
    } else {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: [event.target.value]
        }
      });
    }
  };
  const isHrSetup = false;
  console.log('ITEM INFO', itemInformation);
  const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
  const data = itemTypeList.find(
    (item) => item.id === itemInformation.informationFramework.itemFrameworkOne.itemFrameworkOneType
  );
  console.log('selected item role type, ', data);

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="itemPreview"
          showClearIcon
          headerOne="item"
          headerOneBadgeOne=""
          headerOneBadgeTwo="preview"
          headerPanelColour="blue"
          onClickClearInfo={closePreview}
        />
      </div>

      <div className="containerPadding">
        <Paper className={'dossierContainerTop'}>
          <div className="containerPadding sticky-header">
            <div style={{ height: '49px', padding: '0 5px', display: 'flex', cursor: 'default' }}>
              <div style={{ flex: '4' }} className="">
                <div
                  className={[
                    'midPaneInformation',
                    data?.itemFrameworkOneTypeDescription ? null : 'aliasmiddle'
                  ].join(' ')}
                >
                  {data?.itemFrameworkOneTypeName}
                </div>
                <div className={['midPaneLabel', 'textOverflow'].join(' ')}>
                  {data?.itemFrameworkOneTypeDescription}
                </div>
              </div>
              <div
                style={{ flex: '1', display: 'flex', alignItems: 'center' }}
                className="flex-center"
              >
                {!typeMode && (
                  <>
                    <p
                      onClick={() => {
                        let arr = subItemList;
                        let newArr = arr.slice(0, -1);
                        setSubItemList(newArr);
                      }}
                      className={'icon-button-option'}
                    >
                      -
                    </p>
                    <span style={{ fontWeight: 'bold', margin: '0 5px 0 5px' }}>
                      {' '}
                      {subItemList.length}
                    </span>
                    <p
                      onClick={() => {
                        setSubItemList([...subItemList, `item-${subItemList.length + 1}`]);
                      }}
                      className={'icon-button-option'}
                    >
                      +
                    </p>
                  </>
                )}
              </div>
              <div
                style={{ flex: '1', display: 'flex', alignItems: 'center' }}
                className="flex-center"
              >
                {/* <IconButton
                    onClick={async () => {
                      setTypeMode((st) => !st);
                    }}
                    className="MuiIconButton-root-1602"
                  >
                    <Manuscript className={''} />
                  </IconButton> */}
              </div>
            </div>
            {/* <hr
              style={{
                height: '1px',
                margin: '0',
                border: 'none',
                flexShrink: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.12)'
              }}
            /> */}
          </div>
        </Paper>
        <div className="" style={{ height: 'calc(100vh - 200px)', overflow: 'overlay' }}>
          {typeMode ? (
            <>
              {/* <DisplayPaneFiveRadioButton
                  setSelectedChoiceObject={setSelectedChoiceObject}
                  subItemList={subItemList}
                  setSubItemList={setSubItemList}
                  itemType={data?.itemFrameworkOneTypeNameReference}
                /> */}
              <DisplayPaneFiveItemTemplate
                setSelectedChoiceObject={setSelectedChoiceObject}
                subItemList={subItemList}
                setSubItemList={setSubItemList}
                itemType={data?.itemFrameworkOneTypeNameReference}
                itemFrameworkOne={itemFrameworkOne}
                itemInformation={itemInformation}
              />
            </>
          ) : (
            <>
              <DisplayPaneFiveLikertScale
                subItemList={subItemList}
                setSubItemList={setSubItemList}
              />
            </>
          )}
        </div>
      </div>

      <Popup isActive={isPopUpValue === 'ITEM_TRIPLE_DOT_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeTripleDotOptionPopup}
            currentPopUpOption={itemPrimaryTriplePopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_LABEL_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={'label'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={itemLabelPrimaryPopup}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'PASSAGE_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={'passage'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={passagePrimaryPopup}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'RESPONSE_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeResponsePopup}
            currentPopUpOption={[
              {
                data: 'configure',
                dataValue: 'configure',
                dataKey: 'configureAPICall',
                optionClass: 'optionPrimary',
                divider: '',
                disabled: false
              },
              {
                data: 'revise',
                dataValue: 'revise',
                dataKey: 'reviseAPICall',
                optionClass: 'optionPrimary',
                divider: '',
                disabled: true
              }
            ]}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_CHOICE_LABEL_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'label'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={responseLabelChoicePopUp}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'ITEM_RESPONSE_CHOICE_EXPLANATION_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'choice'}
          headerOneBadgeTwo={'explanation'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_RESPONSE_EXPLANATION_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'explanation'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={responseLabelExplanationPopUp}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_EXPLANATION_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={'explanation'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={itemExplanationPrimaryPopUp}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'ITEM_CHOICE_EXPLANATION_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'explanation'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={itemLabelPrimaryPopup}
            currentPopUpOption={() => {}}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_OPTION_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'choice'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            // ChangeOptionPopup={ChangeOptionPopup}
            ChangeOptionPopup={ChangeOptionChoicePopup}
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'SUB_ITEM_EXP_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={'explanation'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      {/*  */}
      <Popup isActive={isPopUpValue === 'SUB_ITEM_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      {/*  */}
      <Popup isActive={isPopUpValue === 'ITEM_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeItemOptionPopup}
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'RESPONSE_EXPLANATION_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'explanation'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPopUpOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      {/* 
        <PopUpTextSheet
          isActive={isPopUpValue === `ITEM_MEDIA_TEXT`}
          headerOne={'item'}
          headerPanelColour={'genericOne'}
          // headerOneBadgeOne={'media'}
          headerOneBadgeTwo={''}
          basicInfo={{}}
          typeOfSetObject={''}
          defaultSheetValue={itemFrameworkOne?.itemFrameworkOneMedia || ''}
          actualLableValue={''}
          mode={'revise'}
          onClickSave={(innerText) => {
            // setInnerContent(innerText);
            dispatch({
              type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
              payload: {
                stateName: 'itemFrameworkOneMedia',
                value: innerText
              }
            });
          }}
        /> */}
      <PopUpTextEditor
        isActive={isPopUpValue === `ITEM_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        // headerOneBadgeOne={'media'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={itemFrameworkOne?.itemFrameworkOneMedia || ''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setInnerContent(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneMedia',
              value: innerText
            }
          });
        }}
      />
      {/* <PopUpTextSheet
          isActive={isPopUpValue === `ITEM_LABEL_MEDIA_TEXT`}
          headerOne={'item'}
          headerPanelColour={'genericOne'}
          headerOneBadgeOne={'label'}
          headerOneBadgeTwo={''}
          basicInfo={{}}
          typeOfSetObject={''}
          defaultSheetValue={itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabel || ''}
          actualLableValue={''}
          mode={'revise'}
          onClickSave={(innerText) => {
            // setLabelText(innerText);
            dispatch({
              type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
              payload: {
                objectName: 'itemFrameworkOneLabel',
                actualStateName: 'itemFrameworkOneLabel',
                value: innerText
              }
            });
          }}
        /> */}
      <PopUpTextEditor
        isActive={isPopUpValue === `ITEM_LABEL_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'label'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={
          itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia || ''
        }
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setLabelText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOneLabel',
              actualStateName: 'itemFrameworkOneLabelMedia',
              value: innerText
            }
          });
        }}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === `PASSAGE_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'passage'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={
          itemFrameworkOne?.itemFrameworkOnePassage?.itemFrameworkOnePassageMedia || ''
        }
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setLabelText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOnePassage',
              actualStateName: 'itemFrameworkOnePassageMedia',
              value: innerText
            }
          });
        }}
      />
      {/* <PopUpTextSheet
          isActive={isPopUpValue === `RESPONSE_LABEL_MEDIA_TEXT`}
          headerOne={'response'}
          headerPanelColour={'genericOne'}
          headerOneBadgeOne={'label'}
          headerOneBadgeTwo={''}
          basicInfo={{}}
          typeOfSetObject={''}
          defaultSheetValue={
            itemFrameworkOne?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabel || ''
          }
          actualLableValue={''}
          mode={'revise'}
          onClickSave={(innerText) => {
            dispatch({
              type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
              payload: {
                objectName: 'itemFrameworkOneResponseLabel',
                actualStateName: 'itemFrameworkOneResponseLabel',
                value: innerText
              }
            });
          }}
        /> */}
      <PopUpTextEditor
        isActive={isPopUpValue === `RESPONSE_LABEL_MEDIA_TEXT`}
        headerOne={'response'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'label'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={
          itemFrameworkOne?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia || ''
        }
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOneResponseLabel',
              actualStateName: 'itemFrameworkOneResponseLabelMedia',
              value: innerText
            }
          });
        }}
      />
      <PopUpTextSheet
        isActive={isPopUpValue === `RESPONSE_LABEL_EXPLANATION_TEXT`}
        headerOne={'response'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'explanation'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={
          itemInformation?.itemFrameworkOneResponseExplanation
            ?.itemFrameworkOneResponseExplanation || ''
        }
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setResponseLabelText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOneResponseExplanation',
              actualStateName: 'itemFrameworkOneResponseExplanation',
              value: innerText
            }
          });
        }}
      />
      {/* <PopUpTextSheet
          isActive={isPopUpValue === `ITEM_DESCRIPTION_MEDIA_TEXT`}
          headerOne={'item'}
          headerPanelColour={'genericOne'}
          headerOneBadgeOne={'explanation'}
          headerOneBadgeTwo={''}
          basicInfo={{}}
          typeOfSetObject={''}
          defaultSheetValue={
            itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanation || ''
          }
          actualLableValue={''}
          mode={'revise'}
          onClickSave={(innerText) => {
            dispatch({
              type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
              payload: {
                objectName: 'itemFrameworkOneExplanation',
                actualStateName: 'itemFrameworkOneExplanation',
                value: innerText
              }
            });
          }}
        /> */}
      <PopUpTextEditor
        isActive={isPopUpValue === `ITEM_DESCRIPTION_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'explanation'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={
          itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia || ''
        }
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOneExplanation',
              actualStateName: 'itemFrameworkOneExplanationMedia',
              value: innerText
            }
          });
        }}
      />
      {/* <PopUpTextSheet
          isActive={isPopUpValue === `RESPONSE_DESCRIPTION_TEXT`}
          headerOne={'response'}
          headerPanelColour={'genericOne'}
          headerOneBadgeOne={'explanation'}
          headerOneBadgeTwo={''}
          basicInfo={{}}
          typeOfSetObject={''}
          defaultSheetValue={
            itemFrameworkOne?.itemFrameworkOneResponseExplanation
              ?.itemFrameworkOneResponseExplanation || ''
          }
          actualLableValue={''}
          mode={'revise'}
          onClickSave={(innerText) => {
            // setResponseDescriptionText(innerText);
            dispatch({
              type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
              payload: {
                objectName: 'itemFrameworkOneResponseExplanation',
                actualStateName: 'itemFrameworkOneResponseExplanation',
                value: innerText
              }
            });
          }}
        /> */}
      <PopUpTextEditor
        isActive={isPopUpValue === `RESPONSE_DESCRIPTION_TEXT`}
        headerOne={'response'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'explanation'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={
          itemFrameworkOne?.itemFrameworkOneResponseExplanation
            ?.itemFrameworkOneResponseExplanationMedia || ''
        }
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setResponseDescriptionText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOneResponseExplanation',
              actualStateName: 'itemFrameworkOneResponseExplanationMedia',
              value: innerText
            }
          });
        }}
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'configuration'}
        nextPopUpValue={''}
        // inputHeader={'item'}
        isItemFramework={true}
        mode={'revise'}
        itemFrameworkOneResponseChoice={itemFrameworkOneResponseChoice || []}
        itemFrameworkOne={itemFrameworkOne}
      />

      <PopUpItemConfig
        isActive={isPopUpValue === 'ITEM_TRIPLEDOT_CONFIGURE_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={''}
        inputHeader={'item'}
        primaryheader={'configuration'}
        isItemFramework={'itemConfig'}
        mode={reviewMode}
        subItemList={subItemList}
        setSubItemList={setSubItemList}
        itemFrameworkOne={itemInformation?.informationFramework?.itemFrameworkOne || []}
        // itemSelectedTypeName = {handleCallback}
      />

      <PopUpItemConfig
        isActive={isPopUpValue === 'RESPONSE_CONFIGURE_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'response'}
        headerOneBadgeOne={''}
        nextPopUpValue={''}
        inputHeader={''}
        primaryheader={'configuration'}
        isItemFramework={'responseConfig'}
        mode={reviewMode}
        itemFrameworkOne={itemInformation?.informationFramework?.itemFrameworkOne || []}
        // itemSelectedTypeName = {handleCallback}
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_CHOICE_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'response'}
        headerOneBadgeOne={'choice'}
        headerOneBadgeTwo={'configuration'}
        choiceOb={selectedChoiceObject}
        inputHeader={''}
        primaryheader={''}
        primaryheaderTwo={''}
        nextPopUpValue={''}
        mode={'revise'}
        subQuestionId={
          data?.itemFrameworkOneTypeNameReference === 'Likert-Scale' &&
          parseInt(subQuestionId[3]) + 1
        }
        itemFrameworkOneResponseChoice={itemFrameworkOneResponseChoice || []}
        itemFrameworkOne={itemFrameworkOne}
      />
      <PopUpItemFramework
        isActive={isPopUpValue === 'SUB_ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'configuration'}
        choiceOb={selectedChoiceObject}
        inputHeader={''}
        primaryheader={''}
        primaryheaderTwo={''}
        nextPopUpValue={''}
        mode={'revise'}
        subQuestionId={
          data?.itemFrameworkOneTypeNameReference === 'Likert-Scale' &&
          parseInt(subQuestionId[4]) + 1
        }
        isItemFramework={true}
        // subQuestionId={data?.id}
        itemFrameworkOneResponseChoice={itemFrameworkOneResponseChoice || []}
        itemFrameworkOne={itemFrameworkOne}
      />
      {reviewMode === 'revise' ? (
        <FooterIconTwo
          className={'widthDisplayPaneFive'}
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={revisePrimaryIcon}
          secondaryIcon={reviseSecondaryIcons}
        />
      ) : (
        <FooterIconTwo
          className={'widthDisplayPaneFive'}
          FilterModeEnable={navigatorIcon}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
        // <div className={[`middleFooterD`,'widthDisplayPaneFive'].join(' ')}>
        //   <div className={'footerInner'}>
        //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        //       <BottomNavigation className={'MuiBottomNavigationCustom'}>
        //         <div className={'mbPager'}></div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'first'}
        //             Icon={FirstPage}
        //             colour={'displayPaneCentre'}
        //             onClick={() => {
        //               onClickFirst(
        //                 reviewListDistinctData,
        //                 responseObject.id,
        //                 typeOfMiddlePaneList,
        //                 selectedAssociateInfo,
        //                 dispatch,
        //                 headerOneBadgeTwo
        //               );
        //             }}
        //             dataValue={'first'}
        //           />
        //         </div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'previous'}
        //             Icon={ArrowLeft}
        //             colour={'displayPaneCentre'}
        //             dataValue={'previous'}
        //             onClick={() => {
        //               onClickPrevious(
        //                 reviewListDistinctData,
        //                 responseObject.id,
        //                 typeOfMiddlePaneList,
        //                 selectedAssociateInfo,
        //                 dispatch,
        //                 headerOneBadgeTwo
        //               );
        //             }}
        //           />
        //         </div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'next'}
        //             Icon={ArrowRight}
        //             colour={'displayPaneCentre'}
        //             onClick={() => {
        //               onClickNext(
        //                 reviewListDistinctData,
        //                 responseObject.id,
        //                 typeOfMiddlePaneList,
        //                 selectedAssociateInfo,
        //                 dispatch,
        //                 headerOneBadgeTwo
        //               );
        //             }}
        //             dataValue={'next'}
        //           />
        //         </div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'last'}
        //             Icon={LastPage}
        //             colour={'displayPaneCentre'}
        //             // onClick={}
        //             dataValue={'last'}
        //           />
        //         </div>
        //         <div className={'mbPager'}></div>
        //       </BottomNavigation>
        //     </Grid>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default DisplayPaneFiveItem;
