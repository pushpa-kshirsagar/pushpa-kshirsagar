import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "../../Molecules/Header/HeaderCard";
import "./DisplayPaneFive.css";
import PopupHeader from "../../Molecules/PopUp/PopUpHeader";
import Popup from "../../Molecules/PopUp/PopUp";
import JsonRenderComponent from "../../Actions/JsonRenderComponent";
import { DialogContent } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ReviseIcon from "@material-ui/icons/RadioButtonChecked";
import Check from "@material-ui/icons/Check";
import PopUpItemFramework from '../../PopUpInformation/PopUpItemFramework';
import {
  SET_POPUP_VALUE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  POPUP_CLOSE,
} from "../../actionType";

import { InputLabel, Paper, IconButton } from "@material-ui/core";
import EditorTemplate from "./EditorTemplate";
import FooterIconTwo from "../../Molecules/FooterIcon/FooterIconTwo";
import { useTimer } from "react-timer-hook";

const AssessmentTimer = ({ expiryTimestamp, timerFinished }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: timerFinished,
    // onExpire: () => {
    //   console.warn('onExpire called');
    // }
  });
  return (
    <div>
      <span>{hours < 10 ? "0" + hours : hours}</span>:
      <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
      <span>{seconds < 10 ? "0" + seconds : seconds}</span>
    </div>
  );
};
const AssessmentHeader = (props) => {
  return (
    <Fragment>
      <Paper className={"dossierContainerTop"}>
        <div className="containerPadding sticky-header">
          <div
            style={{ height: "49px", padding: "0 5px", display: "flex" }}
            className={""}
          >
            <div style={{ display: "inline-block", flex: "2" }}>
              <div
                className={[
                  "midPaneInformation",
                  props.assessmentDesc !== "" ? null : "aliasmiddle",
                ].join(" ")}
              >
                {props.assessmentName}
              </div>
              <div className={["midPaneLabel", "textOverflow"].join(" ")}>
                {props.assessmentDesc}
              </div>
            </div>
            <div
              style={{ flex: "1", display: "flex", alignItems: "center" }}
              className="flex-center"
            >
              <span
                className={[
                  "unitFlex",
                  "assessmenetStatusText",
                  "AssesseeNotifyStatus",
                ].join(" ")}
                style={{ textAlign: "center" }}
              >
                {/* <InputLabel
                  className={[
                    "iconsFooterLabelDefault1",
                    "AssesseeNotifyStatusLabel",
                  ].join(" ")}
                >
                  {1 + "/" + 2}
                </InputLabel> */}
                <InputLabel
                  className={[
                    "iconsFooterLabelDefault1",
                    "AssesseeNotifyStatusLabel",
                  ].join(" ")}
                >
                  {
                   props.assessmentSectionName &&(
                    props.assessmentSectionName + "/" + props.assessmentSectionDescription
                   ) 
                  }
                  {/* {props.assessmentSectionName + "/" + props.assessmentSectionDescription} */}
                </InputLabel>
              </span>
            </div>
            <div
              style={{ flex: "1", display: "flex", alignItems: "center" }}
              className="flex-center"
            >
              {props.score}
            </div>
            <div
              style={{ flex: "1", display: "flex", alignItems: "center" }}
              className="flex-center"
            >
              {props.timer && (
                <span style={{}}>
                  <AssessmentTimer
                    expiryTimestamp={props.timer}
                    key={props.timer}
                    timerFinished={props.timerFinished}
                  />
                </span>
              )}
            </div>
            <div
              style={{ flex: "1", display: "flex", alignItems: "center" }}
              className="flex-center"
            >
              <IconButton
                onClick={props.onClickFlag}
                className={"assessmentFlagButton"}
              >
                {props.isQuestionFlaged ? (
                  <i className="fa fa-flag" style={{ color: "#ff6464" }}></i>
                ) : (
                  <i className="far fa-flag"></i>
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
      <hr className={"assessmentHeaderHr"} />
    </Fragment>
  );
};

export const DisplayPaneFiveAssessment = (props) => {
  const {
    headerOne,
    headerOneBadgeOne,
    closePreview,
    itemObect,
    primaryIcon,
    secondaryIcon,
    navigatorIcon,
    FilterMode,
    isDisplayPaneSixShow,
    onClickFooter,
    data,
    typeMode = true,
    informationFramework,
    currentItemIndex,
    flagQuestion,
    isQuestionFlaged,
  } = props;
  const dispatch = useDispatch();
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { isPopUpValue, popupMode } = useSelector(
    (state) => state.PopUpReducer
  );
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const [selectedChoiceObject, setSelectedChoiceObject] = useState('');
  const [subQuestionId, setSubQuestionId] = useState('');
  console.log("reviewMode", reviewMode);
  const onClickReviseFinish = () => {
    setIsShowReviseIcon(true);
    // const { informationBasic, informationAllocation, informationFramework } = itemInformation;
    // const { id } = responseObject;
    // const reqBody = {
    //   assesseeId: selectedAssociateInfo?.assesseeId,
    //   associateId:
    //     selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    //   item: {
    //     id,
    //     informationBasic,
    //     informationAllocation,
    //     informationFramework
    //   }
    // };
    // dispatch({ type: LOADER_START });
    // dispatch({
    //   type: ITEM_INFO_REVISE_SAGA,
    //   payload: {
    //     secondaryOptionCheckValue: headerOneBadgeTwo,
    //     headerOne: 'item',
    //     reqBody,
    //     createMode
    //   }
    // });
    // dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };
  const onClickRevise = () => {
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    //setResponseToReducerObj(JSON.parse(originResponseObj), dispatch);
    setIsShowReviseIcon(true);
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: "review" });
  };

  const revisePrimaryIcon = [
    { label: "revise", onClick: onClickRevise, Icon: ReviseIcon },
  ];

  const reviseSecondaryIcons = [
    { label: "cancel", onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: "finish", onClick: onClickReviseFinish, Icon: Check },
  ];
  //   const [currentItemIndex, setcurrentItemIndex] = useState(0);

  //   const dispatch = useDispatch();

  //   const {
  //     middlePaneHeader,
  //     middlePaneHeaderBadgeOne,
  //     middlePaneHeaderBadgeTwo,
  //   } = useSelector((state) => state.DisplayPaneTwoReducer);

  //   const {
  //     headerOne,
  //     headerOneBadgeOne,
  //   } = useSelector((state) => state.DisplayPaneThreeReducer);

  //   const { informationFramework,isDisplayPaneSixShow } = useSelector(
  //     (state) => state.AssessmentReducer
  //   );
  //   const { FilterMode,navigatorIcon } = useSelector((state) => state.FilterReducer);
  //   console.log(FilterMode,navigatorIcon);
  //   console.log("AssessmentInformation", informationFramework);

  const [subItemList, setSubItemList] = useState(["item-1"]);

  //   const closePreview = () => {
  //       debugger;
  //     dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: false });
  //     dispatch({ type: SET_MOBILE_PANE_STATE, payload: "displayPaneThree" });
  //   };

  //   const onClickFooter = (e) => {
  //       debugger;
  //     let clickedval = e.currentTarget.getAttribute('data-value');
  //     dispatch({ type: NAVIGATOR_MODE });
  //     if (clickedval === 'previous') {
  //         let prevIndex=currentItemIndex-1;
  //         if(currentItemIndex!==0){
  //             setcurrentItemIndex(prevIndex);
  //         }
  //     }
  //     if (clickedval === 'first') {
  //         setcurrentItemIndex(0);
  //     }
  //     if (clickedval === 'next') {
  //         if(currentItemIndex<informationFramework.assessmentItem.length-1){
  //             setcurrentItemIndex(currentItemIndex+1);
  //         }
  //     }
  //     if (clickedval === 'last') {
  //         let lastIndex=informationFramework.assessmentItem.length-1;
  //         setcurrentItemIndex(lastIndex);
  //     }
  //   };
  //   // const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
  //   // const data = itemTypeList.find(
  //   //   (item) => item.id === itemInformation.informationFramework.itemFrameworkOne.itemFrameworkOneType
  //   // );
  //   const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  //   const secondaryIcon = [
  //     { label: 'first', onClick: onClickFooter, Icon: FirstPage },
  //     { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
  //     { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
  //     { label: 'last', onClick: onClickFooter, Icon: LastPage }
  //   ];
  //   const data = {
  //     itemFrameworkOneTypeName: "Responce Choise(Single Select)",
  //   };

  //   //let itemObect = informationFramework?.informationFramework?.itemFrameworkOne?.assessmentItem[currentItemIndex];
  //   let itemObect =
  //     informationFramework?.assessmentItem[currentItemIndex].informationFramework
  //       ?.itemFrameworkOne;
  //   //console.log("itemObect", itemObect);

  const BackHandlerEvent = (e) => {};
  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in item
    console.log();
  };
  // const itemLabelPrimaryPopup = (e) => {
  //   let targetValue = e.currentTarget.getAttribute("data-value");
  //   if (targetValue === "revise") {
  //     dispatch({
  //       type: SET_POPUP_VALUE,
  //       payload: {
  //         isPopUpValue: "ITEM_LABEL_MEDIA_TEXT",
  //         popupMode: "",
  //       },
  //     });
  //   }
  // };

  // const itemPopUpOption = [
  //   {
  //     data: "configure",
  //     dataValue: "configure",
  //     dataKey: "configureAPICall",
  //     optionClass: "optionPrimary",
  //     divider: "",
  //     disabled: false,
  //   },
  //   {
  //     data: "revise",
  //     dataValue: "revise",
  //     dataKey: "reviseAPICall",
  //     optionClass: "optionPrimary",
  //     divider: "",
  //     disabled: true,
  //   },
  // ];
  const itemPrimaryPopupOption = [
    {
      data: "configure",
      dataValue: "configure",
      dataKey: "configureAPICall",
      optionClass: "optionPrimary",
      divider: "",
      disabled: false,
    },
    {
      data: "revise",
      dataValue: "revise",
      dataKey: "reviseAPICall",
      optionClass: "optionPrimary",
      divider: "",
      disabled: true,
    },
  ];

  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute("data-value");
    // setSubQuestionId(e.currentTarget.getAttribute('subquestionid'))
    setSubQuestionId(popupMode.split('_'));
    if (targetValue === "configure") {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: "SUB_ITEM_FRAMEWORK_POPUP",
          popupMode: "",
        },
      });
    }
    // if (targetValue === "revise" && popupMode !== "") {
    //   dispatch({
    //     type: SET_POPUP_VALUE,
    //     payload: {
    //       isPopUpValue: popupMode,
    //       popupMode: "",
    //     },
    //   });
    // }
  };
  const ChangeItemOptionPopup = (e) => {
    // console.log("config clicked");
    let targetValue = e.currentTarget.getAttribute("data-value");
    if (targetValue === "configure") {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: "ITEM_FRAMEWORK_POPUP",
          popupMode: "",
        },
      });
    }
    if (targetValue === "revise") {
      // dispatch({
      //   type: SET_POPUP_VALUE,
      //   payload: {
      //     isPopUpValue: "ITEM_MEDIA_TEXT",
      //     popupMode: "",
      //   },
      // });
    }
  };

  const itemExplanationPrimaryPopUp = (e) => {
    let targetValue = e.currentTarget.getAttribute("data-value");
    if (targetValue === "revise") {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: "ITEM_DESCRIPTION_MEDIA_TEXT",
          popupMode: "",
        },
      });
    }
  };

  const responseLabelChoicePopUp = (e) => {
    let targetValue = e.currentTarget.getAttribute("data-value");
    if (targetValue === "revise") {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: "RESPONSE_LABEL_MEDIA_TEXT",
          popupMode: "",
        },
      });
    }
  };

  const ChangeTripleDotOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute("data-value");
    if (targetValue === "configure") {
      // if (!itemInformation.informationFramework.itemTypeList) {
      //   dispatch({ type: LOADER_START });
      //   dispatch({
      //     type: GET_FRAMWORK_TYPE_REVIEW_LIST_SAGA,
      //     payload: {
      //       request: {
      //         assesseeId: selectedAssociateInfo?.assesseeId,
      //         associateId:
      //           selectedAssociateInfo?.associate?.informationEngagement.associateTag
      //             .associateTagPrimary
      //       }
      //     }
      //   });
      // }
      // dispatch({
      //   type: SET_POPUP_VALUE,
      //   payload: {
      //     isPopUpValue: "ITEM_TRIPLEDOT_CONFIGURE_POPUP",
      //     popupMode: "",
      //   },
      // });
    }
    if (targetValue === "revise") {
      dispatch({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: "revise",
      });
      dispatch({ type: POPUP_CLOSE });
    }
    if (targetValue === "review") {
      dispatch({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: "review",
      });
      dispatch({ type: POPUP_CLOSE });
    }
  };
  const itemPrimaryTriplePopupOption = [
    {
      data: "configure",
      dataValue: "configure",
      dataKey: "configureAPICall",
      optionClass: "optionPrimary",
      divider: "",
      disabled: true,
      // responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'review'
      //   ? true
      //   : false
    },{
      data: "review",
      dataValue: "review",
      dataKey: "reviewAPICall",
      optionClass: "optionPrimary",
      divider: "",
      disabled: reviewMode === 'review'? true:false

    },
    {
      data: "revise",
      dataValue: "revise",
      dataKey: "reviseAPICall",
      optionClass: "optionPrimary",
      divider: "",
      disabled: false,
      // responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'revise'
      //   ? true
      //   : false
    },
  ];

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="itemPreview"
          showClearIcon
          headerOne={headerOne}
          headerOneBadgeOne={""}
          headerOneBadgeTwo="preview"
          headerPanelColour="blue"
          onClickClearInfo={closePreview}
        />
      </div>
      <div className="containerPadding">
        <div style={{ display: "none" }}>
          <Paper className={"dossierContainerTop"}>
            <div className="containerPadding sticky-header">
              <div
                style={{
                  height: "49px",
                  padding: "0 5px",
                  display: "flex",
                  cursor: "default",
                }}
              >
                <div style={{ flex: "4" }} className="">
                  <div
                    className={[
                      "midPaneInformation",
                      data?.itemFrameworkOneTypeDescription
                        ? null
                        : "aliasmiddle",
                    ].join(" ")}
                  >
                    {data?.itemFrameworkOneTypeName}
                  </div>
                  <div className={["midPaneLabel", "textOverflow"].join(" ")}>
                    {data?.itemFrameworkOneTypeDescription}
                  </div>
                </div>
                <div
                  style={{ flex: "1", display: "flex", alignItems: "center" }}
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
                        className={"icon-button-option"}
                      >
                        -
                      </p>
                      <span
                        style={{ fontWeight: "bold", margin: "0 5px 0 5px" }}
                      >
                        {" "}
                        {subItemList.length}
                      </span>
                      <p
                        onClick={() => {
                          setSubItemList([
                            ...subItemList,
                            `item-${subItemList.length + 1}`,
                          ]);
                        }}
                        className={"icon-button-option"}
                      >
                        +
                      </p>
                    </>
                  )}
                </div>
                <div
                  style={{ flex: "1", display: "flex", alignItems: "center" }}
                  className="flex-center"
                ></div>
              </div>
            </div>
          </Paper>
        </div>

        <AssessmentHeader
          qnumber={currentItemIndex + 1}
          totalQuestion={20}
          score={1}
          assessmentName={"name"}
          assessmentDesc={"description"}
          onClickFlag={null}
          isQuestionFlaged={false}
          timerFinished={""}
          timer={"timer"}
          assessmentSectionName={informationFramework?.assessmentSection[0].assessmentSectionName}
          assessmentSectionDescription={informationFramework?.assessmentSection[0].assessmentSectionDescription}
        />

        <div
          className=""
          style={{ height: "calc(100vh - 200px)", overflow: "overlay" }}
        >
          {/* item label */}
          {itemObect?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia && (
                <div className={"innerpadding"}>
                  <div className={["ex_container", "ig-label"].join(" ")}>
                    <EditorTemplate
                      label={"itemFrameworkOneLabel"}
                      jsonData={
                        itemObect?.itemFrameworkOneLabel
                          ?.itemFrameworkOneLabelMedia
                      }
                    />
                  </div>
                </div>
              )}

          {/* item */}

          {(itemObect?.itemFrameworkOneMedia || reviewMode === "revise") && (
            <div
              className={["ex_container", "ig-itemGeneric"].join(" ")}
              style={{ cursor: reviewMode === "revise" && "pointer" }}
              onClick={
                reviewMode === "revise"
                  ? () => {
                      dispatch({
                        type: SET_POPUP_VALUE,
                        payload: {
                          isPopUpValue: "ITEM_PRIMARY_POPUP",
                          popupMode: popupMode,
                        },
                      });
                    }
                  : null
              }
            >
              {itemObect?.itemFrameworkOneMedia !== "" && (
                <div className={"innerpadding"}>
                  <div className={["ex_container"].join(" ")}>
                    <EditorTemplate
                      label={"itemFrameworkOneMedia"}
                      jsonData={itemObect?.itemFrameworkOneMedia}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* item explanation */}
             {itemObect.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-label'].join(' ')}>
                <EditorTemplate
                  label={'itemFrameworkOneExplanation'}
                  jsonData={
                    itemObect?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia
                  }
                />
              </div>
            </div>
          )}

          {/* response label */}
          {itemObect.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-label'].join(' ')}>
                <EditorTemplate
                  label={'itemFrameworkOneResponseLabel'}
                  jsonData={
                    itemObect?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia
                  }
                />
              </div>
            </div>
          )}

          {/* response choices */}
          {itemObect?.itemFrameworkOneResponseChoice.map((op, key) => {
            return (
              <Fragment>
                {op.itemFrameworkOneResponseChoiceMedia !== "" && (
                  <div key={`op-${key}`} className={"innerpadding"}>
                    <div
                      className="option-container ex_container"
                      key={`option-${key}`}
                    >
                      <div
                        style={{
                          paddingRight: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="option1"
                          style={{ cursor: "pointer" }}
                          value={`${op.itemFrameworkOneResponseChoiceNumber}`}
                          //onChange={handleRadioButton}
                          // checked={
                          //   currentQuestionChoice === op.itemFrameworkOneResponseChoiceNumber
                          // }
                        />
                      </div>

                      <div
                        className={["ig-itemGeneric "].join(" ")}
                        style={{
                          paddingLeft: "5px",
                          cursor: reviewMode === 'revise' ? 'pointer' : ''
                        }}
                        onClick={
                          reviewMode === 'revise'
                            ? () => {
                                dispatch({
                                  type: SET_POPUP_VALUE,
                                  payload: {
                                    isPopUpValue: 'ITEM_OPTION_PRIMARY_POPUP',
                                    popupMode: `OPTION_${key}`
                                  }
                                });
                                setSelectedChoiceObject(op);
                              }
                            : null
                        }
                      >
                        <EditorTemplate
                          jsonData={op.itemFrameworkOneResponseChoiceMedia}
                          label={"itemFrameworkOneResponseChoiceMedia"}
                        />
                      </div>
                    </div>

                    <div>
                      {op.itemFrameworkOneResponseChoiceExplanation
                        ?.itemFrameworkOneResponseChoiceExplanationMedia && (
                        <div
                          className={["ex_container", "ig-explanation "].join(
                            " "
                          )}
                        >
                          <EditorTemplate
                            jsonData={
                              op.itemFrameworkOneResponseChoiceExplanation
                                ?.itemFrameworkOneResponseChoiceExplanationMedia
                            }
                            label={
                              "itemFrameworkOneResponseChoiceExplanationMedia"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}

          {/* responce explanation */}
          
          {itemObect?.itemFrameworkOneResponseExplanation
                ?.itemFrameworkOneResponseExplanationMedia !== "" && (
                <div className={"innerpadding"}>
                  <div
                    className={["ex_container", "ig-explanation "].join(" ")}
                  >
                    <EditorTemplate
                      jsonData={
                        itemObect?.itemFrameworkOneResponseExplanation
                          ?.itemFrameworkOneResponseExplanationMedia
                      }
                      label={"itemFrameworkOneResponseExplanationMedia"}
                    />
                  </div>
                </div>
              )}
        </div>
      </div>

      <Popup isActive={isPopUpValue === "ITEM_TRIPLE_DOT_PRIMARY_POPUP"}>
        <PopupHeader
          headerPanelColour={"genericOne"}
          headerOne={"item"}
          headerOneBadgeOne={""}
          onClick={BackHandlerEvent}
          mode={""}
        />
        <DialogContent className={["popupContent", "fixed05PadDim"].join(" ")}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeTripleDotOptionPopup}
            currentPopUpOption={itemPrimaryTriplePopupOption}
            secondaryOptionCheckValue={""}
          />
        </DialogContent>
      </Popup>
      <Popup
        isActive={
          isPopUpValue === "ITEM_PRIMARY_POPUP" ||
          isPopUpValue === "SUB_ITEM_PRIMARY_POPUP"
        }
      >
        <PopupHeader
          headerPanelColour={"genericOne"}
          headerOne={"item"}
          headerOneBadgeOne={""}
          onClick={BackHandlerEvent}
          mode={""}
        />
        <DialogContent className={["popupContent", "fixed05PadDim"].join(" ")}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={
              isPopUpValue === "SUB_ITEM_PRIMARY_POPUP"
                ? ChangeOptionPopup
                : ChangeItemOptionPopup
            }
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={""}
          />
        </DialogContent>
      </Popup>

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
          itemFrameworkOne={itemObect}
          itemFrameworkOneResponseChoice={itemObect?.itemFrameworkOneResponseChoice}
        />
        <Popup isActive={isPopUpValue === 'ITEM_OPTION_PRIMARY_POPUP'}>
          <PopupHeader
            headerPanelColour={'genericOne'}
            headerOne={'response'}
            headerOneBadgeOne={'choice'}
            onClick={BackHandlerEvent}
            mode={'revise'}
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
            parseInt(subQuestionId[3]) + 1
          }
          itemFrameworkOneResponseChoice={itemObect?.itemFrameworkOneResponseChoice||[]}
          itemFrameworkOne={itemObect}
        />
      </>
  );
};
export default DisplayPaneFiveAssessment;
