import React, { useState } from 'react';
import CrossIcon from '@material-ui/icons/Clear';
import './DisplayPaneSix.css';
import Card from '../../Molecules/Card/Card';
import DisplayPaneSixFooter from './DisplayPaneSixFooter';
import DisplayPaneSixHeader from './DisplayPaneSixHeader';
import { useDispatch, useSelector } from 'react-redux';
import { assesseeRole } from '../../Actions/AssesseeModuleAction';
import { Paper } from '@material-ui/core';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import {
  POPUP_OPEN,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_POPUP_STATE
} from '../../actionType';
import { RES_START_POPUP_OPTION, ASSESSMENT_CLOSED_POPUP_OPTION } from '../../PopUpConfig';

export const DisplayPaneSix = () => {
  // const [isDisplayPaneShow, setIsDisplayPaneShow] = useState(true);
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const { assesseeAssignmentAssessmentData, isAssessmentStart } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();

  const onClickFooter = (e) => {
    let clickedval = e.currentTarget.getAttribute('data-value');
    if (clickedval === 'next') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'assessment',
          popupHeaderOneBadgeOne: '',
          popupHeaderOneBadgeTwo: '',
          isPopUpValue: '',
          popupOpenType: 'primary',
          popupContentArrValue: RES_START_POPUP_OPTION,
          selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
          selectedTagStatus: 'status'
        }
      });
      dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    }
    if (clickedval === 'close') {
      dispatch({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'assesseeAssessmentStartData', value: null }
      });
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'assessment',
          popupHeaderOneBadgeOne: 'close',
          popupHeaderOneBadgeTwo: '',
          isPopUpValue: '',
          popupOpenType: 'primary',
          secondaryOptionCheckValue: 'assignment',
          popupContentArrValue: ASSESSMENT_CLOSED_POPUP_OPTION,
          selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
          selectedTagStatus: 'status'
        }
      });
      dispatch({ type: POPUP_OPEN, payload: 'paneSevenPopup' });
    }
  };
  return (
    <>
      <div>
        <DisplayPaneSixHeader
          className=""
          headerOne={'assessment'}
          headerOneBadgeOne={'communiqué'}
          headerOneBadgeTwo={
            isAssessmentStart === 'START'
              ? 'primary'
              : isAssessmentStart === 'FINISH'
              ? 'secondary'
              : ''
          }
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        {isDisplayPaneSixShow && (
          <>
            <div className="containerPadding">
              {/* <Card
                IconOne={CrossIcon}
                className=""
                isIcon
                textOneOne={assesseeRole('assessment (communiqué)')}
                textTwoOne=""
              /> */}
            </div>
            <div className="containerPadding">
              <div
                style={{
                  // height: '50px',
                  padding: '2.5px 5px',
                  alignItems: 'center',
                  height: 'calc(100vh - 190px)',
                  overflow: 'overlay'
                  // display: 'flex'
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    isAssessmentStart === 'START'
                      ? assesseeAssignmentAssessmentData.informationFramework.assessmentCommunique
                          .assessmentCommuniquePrimary
                      : isAssessmentStart === 'FINISH'
                      ? assesseeAssignmentAssessmentData.informationFramework.assessmentCommunique
                          .assessmentCommuniqueSecondary
                      : ''
                }}
              ></div>
            </div>

            {isAssessmentStart === 'START' ? (
              <FooterIconTwo
                FilterModeEnable={false}
                FilterMode={FilterMode}
                onClick={onClickFooter}
                backColour={'displayPaneLeft'}
                primaryIcon={[]}
                secondaryIcon={[
                  { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft, disabled: 'true' },
                  { label: 'next', onClick: onClickFooter, Icon: ArrowRight }
                ]}
              />
            ) : isAssessmentStart === 'FINISH' ? (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickFooter}
                backColour={'displayPaneLeft'}
                primaryIcon={[{ label: 'close', onClick: onClickFooter, Icon: CrossIcon }]}
                secondaryIcon={[]}
              />
            ) : null}

            {/* <DisplayPaneSixFooter /> */}
          </>
        )}
      </div>
    </>
  );
};

export default DisplayPaneSix;
