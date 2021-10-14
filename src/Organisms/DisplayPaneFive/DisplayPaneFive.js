import React, { useState } from "react";
import "./DisplayPaneFive.css";
import { useDispatch, useSelector } from "react-redux";
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
  SET_POPUP_VALUE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE,
} from "../../actionType";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import "../../Molecules/ReviewList/ReviewList.css";
import FooterIconTwo from "../../Molecules/FooterIcon/FooterIconTwo";
import NavigatorIcon from "@material-ui/icons/OpenWith";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ArrowRight from "@material-ui/icons/ChevronRight";
import ArrowLeft from "@material-ui/icons/ChevronLeft";
import ReviseIcon from "@material-ui/icons/RadioButtonChecked";
import Check from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DisplayPaneFiveItem from "../../Organisms/DisplayPaneFive/DisplayPaneFiveItem";
import DisplayPaneFiveAssessment from "../../Organisms/DisplayPaneFive/DisplayPaneFiveAssessment";
import {
  onClickFirst,
  onClickLast,
  onClickNext,
  onClickPrevious,
} from "../../Actions/GenericActions";

export const DisplayPaneFive = () => {
  const dispatch = useDispatch();
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const {
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const {
    headerOne,
    headerOneBadgeOne,
    isAssessmentPreviewShow = false,
    isItemPreviewShow = false,
    reviewMode,
  } = useSelector((state) => state.DisplayPaneThreeReducer);

  const { informationFramework, isDisplayPaneSixShow } = useSelector(
    (state) => state.AssessmentReducer
  );
  const { isPopUpValue, popupMode } = useSelector(
    (state) => state.PopUpReducer
  );
  const { FilterMode, navigatorIcon } = useSelector(
    (state) => state.FilterReducer
  );
  console.log(FilterMode, navigatorIcon);
  console.log("AssessmentInformation", informationFramework);
  const closePreview = () => {
    dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: false });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: "displayPaneThree" });
  };
  const onClickFooter = (e) => {
    debugger;
    let clickedval = e.currentTarget.getAttribute("data-value");
    dispatch({ type: NAVIGATOR_MODE });
    if (clickedval === "previous") {
      let prevIndex = currentItemIndex - 1;
      if (currentItemIndex !== 0) {
        setcurrentItemIndex(prevIndex);
        dispatch({
          //type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
          type: SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: "assessmentSectionItemDistinctRevise",
            actualStateName: "itemFrameworkOne",
            value:
              informationFramework?.assessmentSection[0]
                ?.assessmentSectionItemDistinct[prevIndex]
                .itemFrameworkOne,
            //value: informationFramework?.assessmentItem[currentItemIndex].informationFramework
          },
        });
      }
    }
    if (clickedval === "first") {
      setcurrentItemIndex(0);
      dispatch({
        //type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        type: SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: "assessmentSectionItemDistinctRevise",
          actualStateName: "itemFrameworkOne",
          value:
            informationFramework?.assessmentSection[0]
              ?.assessmentSectionItemDistinct[0]
              .itemFrameworkOne,
          //value: informationFramework?.assessmentItem[currentItemIndex].informationFramework
        },
      });
    }
    if (clickedval === "next") {
      //informationFramework?.assessmentSection[0]?.assessmentSectionItemDistinct[currentItemIndex].itemFrameworkOne
      //if (currentItemIndex < informationFramework.assessmentItem.length - 1) {
      if (
        currentItemIndex <
        informationFramework.assessmentSection[0]?.assessmentSectionItemDistinct
          .length -
          1
      ) {
        setcurrentItemIndex(currentItemIndex + 1);
        dispatch({
          //type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
          type: SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: "assessmentSectionItemDistinctRevise",
            actualStateName: "itemFrameworkOne",
            value:
              informationFramework?.assessmentSection[0]
                ?.assessmentSectionItemDistinct[currentItemIndex+1]
                .itemFrameworkOne,
            //value: informationFramework?.assessmentItem[currentItemIndex].informationFramework
          },
        });
      }
    }
    if (clickedval === "last") {
      //let lastIndex = informationFramework.assessmentItem.length - 1;
      let lastIndex =
        informationFramework.assessmentSection[0]?.assessmentSectionItemDistinct
          .length - 1;
      setcurrentItemIndex(lastIndex);
      dispatch({
        //type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        type: SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: "assessmentSectionItemDistinctRevise",
          actualStateName: "itemFrameworkOne",
          value:
            informationFramework?.assessmentSection[0]
              ?.assessmentSectionItemDistinct[lastIndex]
              .itemFrameworkOne,
          //value: informationFramework?.assessmentItem[currentItemIndex].informationFramework
        },
      });
    }
  };
  const onClickReviseFinish = () => {
    debugger;
    setIsShowReviseIcon(true);
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: "review" });
    //const { informationBasic, informationAllocation, informationFramework } = assessmentInfo;
    //const { id } = responseObject;
    // const reqBody = {
    //   assesseeId: selectedAssociateInfo?.assesseeId,
    //   associateId:
    //     selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    // // };
    // console.log('ASSESSMENT REVISE ===', reqBody);
    // dispatch({ type: LOADER_START });
    // dispatch({
    //   type: ASSESSMENT_INFO_REVISE_SAGA,
    //   payload: {
    //     secondaryOptionCheckValue: headerOneBadgeTwo,
    //     headerOne: 'assessment',
    //     reqBody,
    //     createMode
    //   }
    // });
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
  const primaryIcon = [
    { label: "navigator", onClick: onClickFooter, Icon: NavigatorIcon },
  ];
  const secondaryIcon = [
    { label: "first", onClick: onClickFooter, Icon: FirstPage },
    { label: "previous", onClick: onClickFooter, Icon: ArrowLeft },
    { label: "next", onClick: onClickFooter, Icon: ArrowRight },
    { label: "last", onClick: onClickFooter, Icon: LastPage },
  ];
  const data = {
    id: "61090cace50cf61d5eb440ce",
    itemFrameworkOneTypeDescription: "Single-Select",
    itemFrameworkOneTypeName: "Response-Choice",
    itemFrameworkOneTypeNameReference: "Response-Choice (Single-Select)",
  };

  //let itemObect = informationFramework?.informationFramework?.itemFrameworkOne?.assessmentItem[currentItemIndex];
  //  let itemObect =informationFramework?.assessmentSection[0]?.assessmentSectionItemDistinct[currentItemIndex].itemFrameworkOne;
  //informationFramework?.assessmentItem[currentItemIndex].informationFramework?.itemFrameworkOne;
  //console.log("itemObect", itemObect);
  //const itemInformation=informationFramework?.assessmentSection[currentItemIndex]?.assessmentSectionItemDistinct[currentItemIndex]

  return (
    <>
      <div>
        {isAssessmentPreviewShow ? (
          <>
            <DisplayPaneFiveAssessment
              headerOne={headerOne}
              headerOneBadgeOne={headerOneBadgeOne}
              data={data}
              //itemObect={itemObect}
              closePreview={closePreview}
              primaryIcon={primaryIcon}
              secondaryIcon={secondaryIcon}
              navigatorIcon={navigatorIcon}
              FilterMode={FilterMode}
              isDisplayPaneSixShow={isDisplayPaneSixShow}
              onClickFooter={onClickFooter}
              informationFramework={informationFramework}
              currentItemIndex={currentItemIndex}
            />
            {reviewMode === "revise" ? (
              <FooterIconTwo
                className={"widthDisplayPaneFive"}
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            ) : (
              <FooterIconTwo
                className={
                  isDisplayPaneSixShow ? "widthDisplayPaneFive" : "fullWidth"
                }
                FilterModeEnable={navigatorIcon}
                FilterMode={FilterMode}
                onClick={onClickFooter}
                primaryIcon={primaryIcon}
                secondaryIcon={secondaryIcon}
              />
            )}
          </>
        ) : isItemPreviewShow ? (
          <DisplayPaneFiveItem />
        ) : null}

        {/* <PopUpItemFramework
          isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={'configuration'}
          nextPopUpValue={''}
          // inputHeader={'item'}
          // primaryheader={'configuration'}
          isItemFramework={true}
          mode={'revise'}
          itemObect={itemObect}
        /> */}
      </div>
    </>
  );
};

export default DisplayPaneFive;
