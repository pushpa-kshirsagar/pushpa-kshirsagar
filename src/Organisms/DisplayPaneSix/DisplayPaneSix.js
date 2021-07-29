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
import { POPUP_OPEN, SET_POPUP_STATE } from '../../actionType';
import { RES_START_POPUP_OPTION } from '../../PopUpConfig';
export const DisplayPaneSix = () => {
  // const [isDisplayPaneShow, setIsDisplayPaneShow] = useState(true);
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const { assesseeAssignmentAssessmentData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();

  const onClickFooter = (e) => {
    if (e.currentTarget.getAttribute('data-value') === 'next') {
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
  };
  return (
    <>
      <div>
        <DisplayPaneSixHeader
          className=""
          headerOne="dashboard"
          headerOneBadgeOne=""
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
              <div className={'iguru-leftpanel'}>
                <Paper
                  style={{
                    boxShadow:
                      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
                  }}
                  className={[`iguru-iconbox-dashboardcardtop`].join(' ')}
                >
                  <div className={['iguru-componentinnerdiv'].join(' ')}>
                    <div className={'iguru-cardContentMidPanel'} style={{ flex: '4' }}>
                      <div className={['midPaneInformation'].join(' ')}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: assesseeRole('assessment (communiqué)')
                          }}
                        ></span>
                      </div>
                    </div>
                    <div className={'iguru-iconbox'}></div>
                    <div className={'iguru-iconbox'}></div>
                  </div>
                </Paper>
              </div>
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
                    assesseeAssignmentAssessmentData.informationFramework.assessmentCommunique
                      .assessmentCommuniquePrimary
                }}
              ></div>
            </div>
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
            {/* <DisplayPaneSixFooter /> */}
          </>
        )}
      </div>
    </>
  );
};

export default DisplayPaneSix;
