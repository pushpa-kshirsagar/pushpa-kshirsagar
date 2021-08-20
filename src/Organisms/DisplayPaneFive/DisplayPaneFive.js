import React, { useEffect, useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_FRAMWORK_TYPE_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA,
  ITEM_INFO_REVISE_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_ITEM_DYNAMIC_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
  SET_PANE_THREE_ITEM_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '../../Molecules/ReviewList/ReviewList.css';
import { DialogContent, IconButton } from '@material-ui/core';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import PopupHeader from '../../Molecules/PopUp/PopUpHeader';
import Popup from '../../Molecules/PopUp/PopUp';
import JsonRenderComponent from '../../Actions/JsonRenderComponent';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import PopUpItemFramework from '../../PopUpInformation/PopUpItemFramework';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DisplayPaneFiveRadioButton from './DisplayPaneFiveRadioButton';
import DisplayPaneFiveLikertScale from './DisplayPaneFiveLikertScale';
import Manuscript from '@material-ui/icons/Description';
import PopUpItemConfig from '../../PopUpInformation/PopUpItemConfig';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)'
    }
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3'
    }
  }
});
function StyledRadio(props) {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export const DisplayPaneFive = () => {
  const dispatch = useDispatch();
  const [typeMode, setTypeMode] = useState(true);
  const [Item_Selected_Role_Type, set_Item_Selected_Role_Type] = useState('');
  console.log('item selected role type ', Item_Selected_Role_Type);
  const closePreview = () => {
    dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };
  const { headerOneBadgeTwo, responseObject, reviewMode, createMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpOpen } = useSelector((state) => state.PopUpReducer);
  const onClickFooter = (e) => {
    // dispatch({ type: NAVIGATOR_MODE });
  };
  const [subItemList, setSubItemList] = useState(['item-1']);

  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);

  const primaryIcon = [];
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
    const { id } = responseObject;
    const reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId: id,
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

  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    // setSubQuestionId(e.currentTarget.getAttribute('subquestionid'))
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
          headerOneBadgeOne="information"
          headerOneBadgeTwo="media"
          headerPanelColour="blue"
          onClickClearInfo={closePreview}
        />
      </div>
      <div className="containerPadding">
        <div className="containerPadding sticky-header">
          <div style={{ height: '49px', padding: '0 5px', display: 'flex' }}>
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
          <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          />
        </div>
        <div className="" style={{ height: 'calc(100vh - 200px)', overflow: 'overlay' }}>
          {typeMode ? (
            <>
              <DisplayPaneFiveRadioButton
                setSelectedChoiceObject={setSelectedChoiceObject}
                subItemList={subItemList}
                setSubItemList={setSubItemList}
                itemType={data?.itemFrameworkOneTypeNameReference}
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
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup
        isActive={
          isPopUpValue === 'ITEM_PRIMARY_POPUP' || isPopUpValue === 'SUB_ITEM_PRIMARY_POPUP'
        }
      >
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
            ChangeOptionPopup={
              isPopUpValue === 'SUB_ITEM_PRIMARY_POPUP' ? ChangeOptionPopup : ChangeItemOptionPopup
            }
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
      />
      <PopUpTextSheet
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
      />
      <PopUpTextSheet
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
          // setResponseLabelText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
            payload: {
              objectName: 'itemFrameworkOneResponseLabel',
              actualStateName: 'itemFrameworkOneResponseLabel',
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
      <PopUpTextSheet
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
      />
      <PopUpTextSheet
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
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'configuration'}
        nextPopUpValue={''}
        // inputHeader={'item'}
        // primaryheader={'configuration'}
        isItemFramework={true}
        mode={'revise'}
      />

      <PopUpItemConfig
        isActive={isPopUpValue === 'ITEM_TRIPLEDOT_CONFIGURE_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={''}
        inputHeader={'item'}
        primaryheader={'configuration'}
        isItemFramework={true}
        mode={reviewMode}
        subItemList={subItemList}
        setSubItemList={setSubItemList}
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
        isItemFramework={false}
        mode={reviewMode}
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
          FilterModeEnable={false}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
    </>
  );
};

export default DisplayPaneFive;
