import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "../../Molecules/Header/HeaderCard";
import "./DisplayPaneFive.css";
import NavigatorIcon from '@material-ui/icons/OpenWith';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import {  
  NAVIGATOR_MODE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE,
} from "../../actionType";

import Paper from "@material-ui/core/Paper";
import EditorTemplate from "./EditorTemplate";
import FooterIconTwo from "../../Molecules/FooterIcon/FooterIconTwo";

export const DisplayPaneFiveAssessment = (props) => {
    const{
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
        typeMode=true
    } =props;
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
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="AssessmentPreview"
          showClearIcon
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo="preview"
          headerPanelColour="blue"
          onClickClearInfo={closePreview}
        />
      </div>
      <div className="containerPadding">
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
                    <span style={{ fontWeight: "bold", margin: "0 5px 0 5px" }}>
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
                    itemObect?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia
                  }
                />
              </div>
            </div>
          )}
          {/* item */}
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

          {/* item explanation */}
          {itemObect.itemFrameworkOneExplanation
            ?.itemFrameworkOneExplanationMedia && (
            <div className={"innerpadding"}>
              <div className={["ex_container", "ig-label"].join(" ")}>
                <EditorTemplate
                  label={"itemFrameworkOneExplanation"}
                  jsonData={
                    itemObect?.itemFrameworkOneExplanation
                      ?.itemFrameworkOneExplanationMedia
                  }
                />
              </div>
            </div>
          )}

          {/* response label */}
          {itemObect.itemFrameworkOneResponseLabel
            ?.itemFrameworkOneResponseLabelMedia && (
            <div className={"innerpadding"}>
              <div className={["ex_container", "ig-label"].join(" ")}>
                <EditorTemplate
                  label={"itemFrameworkOneResponseLabel"}
                  jsonData={
                    itemObect?.itemFrameworkOneResponseLabel
                      ?.itemFrameworkOneResponseLabelMedia
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
                        }}
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

          {/* item explanation */}
          {itemObect?.itemFrameworkOneResponseExplanation
            ?.itemFrameworkOneResponseExplanationMedia !== "" && (
            <div className={"innerpadding"}>
              <div className={["ex_container", "ig-explanation "].join(" ")}>
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
        <FooterIconTwo
              className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
              FilterModeEnable={navigatorIcon}
              FilterMode={FilterMode}
              onClick={onClickFooter}
              primaryIcon={primaryIcon}
              secondaryIcon={secondaryIcon}
            />
      </div>
    </>
  );
};
export default DisplayPaneFiveAssessment;
