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
  SET_POPUP_VALUE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE
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
import DisplayPaneFiveItem from '../../Organisms/DisplayPaneFive/DisplayPaneFiveItem';
import DisplayPaneFiveAssessment from '../../Organisms/DisplayPaneFive/DisplayPaneFiveAssessment';
import {
  onClickFirst,
  onClickLast,
  onClickNext,
  onClickPrevious
} from '../../Actions/GenericActions';

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
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const {    
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const {
    headerOne,
    headerOneBadgeOne,   
    isAssessmentPreviewShow=false,
    isItemPreviewShow = false 
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationFramework,isDisplayPaneSixShow } = useSelector(
    (state) => state.AssessmentReducer
  );
  const { FilterMode,navigatorIcon } = useSelector((state) => state.FilterReducer);
  console.log(FilterMode,navigatorIcon);
  console.log("AssessmentInformation", informationFramework);
  const closePreview = () => {
    dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: false });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: "displayPaneThree" });
  };
  const onClickFooter = (e) => {
    let clickedval = e.currentTarget.getAttribute('data-value');
    dispatch({ type: NAVIGATOR_MODE });
    if (clickedval === 'previous') {
        let prevIndex=currentItemIndex-1;
        if(currentItemIndex!==0){
            setcurrentItemIndex(prevIndex);
        }
    }
    if (clickedval === 'first') {
        setcurrentItemIndex(0);        
    }
    if (clickedval === 'next') {
        if(currentItemIndex<informationFramework.assessmentItem.length-1){
            setcurrentItemIndex(currentItemIndex+1);
        }
    }
    if (clickedval === 'last') {
        let lastIndex=informationFramework.assessmentItem.length-1;
        setcurrentItemIndex(lastIndex);        
    }
  };
  // const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
  // const data = itemTypeList.find(
  //   (item) => item.id === itemInformation.informationFramework.itemFrameworkOne.itemFrameworkOneType
  // );
  const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const data = {
    id: "61090cace50cf61d5eb440ce",
    itemFrameworkOneTypeDescription: "Single-Select",
    itemFrameworkOneTypeName: "Response-Choice",
    itemFrameworkOneTypeNameReference: "Response-Choice (Single-Select)"
  };

  //let itemObect = informationFramework?.informationFramework?.itemFrameworkOne?.assessmentItem[currentItemIndex];
  let itemObect =
    informationFramework?.assessmentItem[currentItemIndex].informationFramework
      ?.itemFrameworkOne;
  //console.log("itemObect", itemObect);
  
  
  // const isHrSetup = false;
  // console.log('ITEM INFO', itemInformation);
  // const itemTypeList = itemInformation?.informationFramework?.itemTypeList || [];
  // const data = itemTypeList.find(
  //   (item) => item.id === informationFramework?.assessmentItemassessmentItem[currentItemIndex].informationFramework?.itemFrameworkOne
  // );
  
  // console.log('selected item role type, ', data);

return(
  <>
  <div>
    {
      isAssessmentPreviewShow?(
        <DisplayPaneFiveAssessment
        headerOne={headerOne}
        headerOneBadgeOne={headerOneBadgeOne}
        data={data}
        itemObect={itemObect}
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
      ):
      isItemPreviewShow?(
        <DisplayPaneFiveItem/>
      ):null
    }
  </div>
  </>
)
};

export default DisplayPaneFive;