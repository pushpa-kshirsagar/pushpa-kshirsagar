import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NextIcon from '@material-ui/icons/ArrowForward';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import { isMobile } from 'react-device-detect';
import './HeaderCard.css';
import {
  POPUP_OPEN,
  SET_POPUP_VALUE,
  SET_POPUP_STATE,
  SET_SCAN_POPUP_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_ASSOCIATE_TRIPPLE_DOT_POPUP_OPTION,
  LEFT_TRIPPLE_DOT_POPUP_OPTION,
  TRIPPLE_DOT_POPUP_OPTION,
  ASSESSMENT_FINISH_POPUP_OPTION
} from '../../PopUpConfig';



const HeaderCard = (props) => {
  const {
    headerOne = '',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    headerOneBadgeThree = '',
    headerOneBadgeFour = '',
    displayPane = '',
    scanCount,
    headerPanelColour,
    showMiddlePaneState,
    onClickClearInfo = null,
    showClearIcon = false
  } = props;
  const dispatch = useDispatch();
  const {
    typeOfMiddlePaneList,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneSelectedValue,
    middlePaneListPopupOptions,
    selectedTagsArray
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const {
    headerOne: rightPaneHeaderOne,
    headerOneBadgeOne: rightPaneBadgeOne,
    reviewMode
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { primaryArrOprion } = useSelector((state) => state.PopUpReducer);
  const { assesseeAssessmentStartData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const onClickScan = () => {
    dispatch({
      type: SET_SCAN_POPUP_STATE,
      payload: {
        scanHeader: middlePaneHeader,
        scanHeaderBadgeOne: middlePaneHeaderBadgeOne === 'distinct' ? '' : middlePaneHeaderBadgeOne,
        scanHeaderBadgeTwo: 'scan'
      }
    });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: typeOfMiddlePaneList, popupMode: 'SCAN_POPUP_FUN' }
    });
  };
  const openMiddlePaneTripleDotPopup = () => {
    let optArr = [];
    if (middlePaneHeaderBadgeOne !== 'distinct') {
      optArr = [...TRIPPLE_DOT_POPUP_OPTION];
      let newObj = {
        data: middlePaneHeader,
        dataValue: middlePaneHeader,
        dataKey: 'reviewDistinct',
        optionClass: 'optionPrimary',
        divider: 'dark',
        disabled: false
      };
      optArr.splice(10, 0, newObj);
    } else if (middlePaneHeader === 'assignments' && middlePaneHeaderBadgeOne === 'distinct') {
      optArr = [...ASSESSEE_ASSOCIATE_TRIPPLE_DOT_POPUP_OPTION];
      let newObj = {
        data: 'administer',
        dataValue: 'administer',
        dataKey: 'administer',
        optionClass: 'optionPrimary',
        disabled: false
      };
      optArr.splice(0, 0, newObj);
    } else {
      optArr = ASSESSEE_ASSOCIATE_TRIPPLE_DOT_POPUP_OPTION;
    }
    console.log('optArr', optArr);
    let tempArr = [];
    optArr.forEach((element) => {
      if (selectedTagsArray.length === 0) {
        if (
          element.data === 'allocate' ||
          element.data === 'administer' ||
          element.data === 'archive' ||
          element.data === 'flag' ||
          element.data === 'share' ||
          element.data === 'suspend' ||
          element.data === 'terminate' ||
          element.data === 'delete'
        ) {
          tempArr.push({ ...element, disabled: true });
        } else tempArr.push({ ...element, disabled: false });
      } else if (selectedTagsArray.length > 0) {
        if (element.data === 'create' || element.data === 'review' || element.data === 'select')
          tempArr.push({ ...element, disabled: true });
        else tempArr.push({ ...element, disabled: false });
      } else tempArr.push({ ...element, disabled: false });
    });
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: middlePaneHeader,
        popupHeaderOneBadgeOne:
          middlePaneHeaderBadgeOne === 'distinct' ? '' : middlePaneHeaderBadgeOne,
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneTrippleDotPopup' });
  };
  const openLeftPaneTripleDotPopup = () => {
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'dashboard',
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: LEFT_TRIPPLE_DOT_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'leftPaneTrippleDotPopup' });
  };
  const openRightPaneTripleDotPopup = () => {
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: rightPaneHeaderOne,
        popupHeaderOneBadgeOne: rightPaneBadgeOne === 'information' ? '' : rightPaneBadgeOne,
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: middlePaneListPopupOptions,
        selectedTagValue: middlePaneSelectedValue
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };

  useEffect(() => {
    // const sec = (assesseeAssessmentStartData?.assessmentTime % 60000) / 1000;
   
  }, [assesseeAssessmentStartData]);

  const openTripleDotPopup = () => {
    dispatch({
      type: SET_POPUP_VALUE,
      payload: {
        isPopUpValue: 'ITEM_TRIPLE_DOT_PRIMARY_POPUP',
        popupMode: ''
      }
    });
  };
  return (
    <div className={'iguru-leftpanel'}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'iguru-usercardcontainer'}>
        <Paper
          className={[
            `iguru-assesseescontainer`,
            'iguru-box-shadow',
            `iguru-assesseescontainer${headerPanelColour}`
          ].join(' ')}
        >
          <div className={'iguru-componentinnerdiv'}>
            <div className={'iguru-moretextpanelheader'}>
              <div>
                <span>{headerOne}</span>&nbsp;
                {headerOneBadgeOne !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeOne}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerOneBadgeTwo !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeTwo}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerOneBadgeThree !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeThree}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerOneBadgeFour !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeFour}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
              </div>
            </div>

            <Fragment>
              <div className={'iguru-iconbox'}>
                {displayPane === 'five' ? (
                  <div></div>
                ) : displayPane === 'centre' && showMiddlePaneState ? (
                  <IconButton onClick={onClickScan}>
                    <Fragment>
                      <SearchIcon className={'iguru-iconbardefault'} />
                      <span className={'iguru-headerbadge'}>{scanCount}</span>
                    </Fragment>
                  </IconButton>
                ) : displayPane === 'left' ? (
                  <IconButton>
                    {!isMobile && <NextIcon className={'iguru-iconbardefault'} />}
                  </IconButton>
                ) : (displayPane === 'right' && reviewMode !== 'revise' && headerOne !== '') ||
                  showClearIcon ? (
                  <IconButton onClick={onClickClearInfo}>
                    <Clear className={'iguru-iconbardefault'} />
                  </IconButton>
                ) : null}
              </div>
              <div className={'iguru-iconbox'}>
                {displayPane === 'five' && assesseeAssessmentStartData ? (
                  <IconButton
                    onClick={() => {
                      dispatch({ type: POPUP_OPEN, payload: 'NavigatorPOPUP' });
                    }}
                  >
                    <OpenWithIcon className={'iguru-iconbardefault'} />
                  </IconButton>
                ) : displayPane === 'centre' && showMiddlePaneState ? (
                  <IconButton onClick={openMiddlePaneTripleDotPopup}>
                    <MoreVert className={'iguru-iconbardefault'} />
                  </IconButton>
                ) : displayPane === 'left' ? (
                  <IconButton onClick={openLeftPaneTripleDotPopup}>
                    <MoreVert className={'iguru-iconbardefault'} />
                  </IconButton>
                ) : displayPane === 'right' && headerOne !== '' ? (
                  <IconButton onClick={openRightPaneTripleDotPopup}>
                    <MoreVert className={'iguru-iconbardefault'} />
                  </IconButton>
                ) : displayPane === 'itemPreview' ? (
                  <IconButton onClick={openTripleDotPopup}>
                    <MoreVert className={'iguru-iconbardefault'} />
                  </IconButton>
                ) : null}
              </div>
            </Fragment>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default HeaderCard;
