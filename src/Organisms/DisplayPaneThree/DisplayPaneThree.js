import React, { useState } from 'react';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import BasicCard from '../../Molecules/BasicCard/BasicCard';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import Sections from '../../Molecules/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_SIGN_ON,
  CLEAR_DISPLAY_PANE_THREE,
  NAVIGATOR_MODE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import FooterIconTwo from '../../Molecules/FooterIconTwo/FooterIconTwo';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import './DisplayPaneThree.css';
import PopUpMiddlePaneList from '../../PopUpDisplayPanel/PopUpMiddlePaneList';
import DisplayPaneThreeSectionOne from '../../Molecules/DisplayPaneThreeSectionOne/DisplayPaneThreeSectionOne';
import DisplayPaneThreeSectionTwo from '../../Molecules/DisplayPaneThreeSectionTwo/DisplayPaneThreeSectionTwo';
import DisplayPaneThreeSectionOneAssociate from '../../Molecules/DisplayPaneThreeSectionOneAssociate/DisplayPaneThreeSectionOneAssociate';
import DisplayPaneThreeSectionTwoAssociate from '../../Molecules/DisplayPaneThreeSectionTwoAssociate/DisplayPaneThreeSectionTwoAssociate';
import DisplayPaneThreeSectionOneAssesseeRole from '../../Molecules/DisplayPaneThreeSectionOneAssesseeRole/DisplayPaneThreeSectionOneAssesseeRole';
import DisplayPaneThreeSectionTwoAssesseeRole from '../../Molecules/DisplayPaneThreeSectionTwoAssesseeRole/DisplayPaneThreeSectionTwoAssesseeRole';
import DisplayPaneThreeSectionOneAssociateRole from '../../Molecules/DisplayPaneThreeSectionOneAssociateRole/DisplayPaneThreeSectionOneAssociateRole';
import DisplayPaneThreeSectionTwoAssociateRole from '../../Molecules/DisplayPaneThreeSectionTwoAssociateRole/DisplayPaneThreeSectionTwoAssociateRole';
import DisplayPaneThreeSectionOneAssesseeGroup from '../../Molecules/DisplayPaneThreeSectionOneAssesseeGroup/DisplayPaneThreeSectionOneAssesseeGroup';
import DisplayPaneThreeSectionTwoAssesseeGroup from '../../Molecules/DisplayPaneThreeSectionTwoAssesseeGroup/DisplayPaneThreeSectionTwoAssesseeGroup';
import DisplayPaneThreeSectionOneAssociateGroup from '../../Molecules/DisplayPaneThreeSectionOneAssociateGroup/DisplayPaneThreeSectionOneAssociateGroup';
import DisplayPaneThreeSectionTwoAssociateGroup from '../../Molecules/DisplayPaneThreeSectionTwoAssociateGroup/DisplayPaneThreeSectionTwoAssociateGroup';

export const DisplayPaneThree = () => {
  const dispatch = useDispatch();
  const rightPaneSectionsAssessee = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOne,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwo,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssesseeRole = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssesseeRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssesseeGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssesseeGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociateRole = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociateRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociateRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociateGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociateGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociateGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociate = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociate,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociate,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const [selectedSection, setSelectedSection] = useState(rightPaneSectionsAssessee[0]);
  const [selectedSectionAssesseeRole, setSelectedSectionAssesseeRole] = useState(
    rightPaneSectionsAssesseeRole[0]
  );
  const [selectedSectionAssesseeGroup, setSelectedSectionAssesseeGroup] = useState(
    rightPaneSectionsAssesseeGroup[0]
  );
  const [selectedSectionAssociateGroup, setSelectedSectionAssociateGroup] = useState(
    rightPaneSectionsAssociateGroup[0]
  );
  const [selectedSectionAssociateRole, setSelectedSectionAssociateRole] = useState(
    rightPaneSectionsAssociateRole[0]
  );
  const [selectedSectionAssociate, setSelectedSectionAssociate] = useState(
    rightPaneSectionsAssociate[0]
  );
  const { navigatorIcon, FilterMode } = useSelector((state) => state.FilterReducer);
  const onClickFooter = (e) => {
    dispatch({ type: NAVIGATOR_MODE });
  };
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    console.log('ON CLICK CANCEL ICON');
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK FINISH ICON');
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
    setIsShowReviseIcon(true);
  };
  const onClickCreateAssessee = () => {
    console.log('ON CLICK CREATE ASSESSEE');
    dispatch({ type: ASSESSEE_INFO_CREATE });
    dispatch({
      type: ASSESSEE_SIGN_ON,
      payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: 'ASSESSEE_CREATE' }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedInformationAllorKey', value: 'all' }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'typeOfAssesseeCreate',
        value: 'assessee'
      }
    });
  };
  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];
  const createPrimaryIcon = [{ label: 'create', onClick: onClickCreateAssessee, Icon: AddIcon }];
  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];
  const {
    isReviewRevise = false,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    responseObject,
    reviewMode,
    createMode
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { showMiddlePaneState } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationBasic } = responseObject;
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);

  const onClickClearInfo = () => {
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    dispatch({
      type: SET_MOBILE_PANE_STATE,
      payload: showMiddlePaneState ? 'displayPaneTwo' : 'displayPaneOne'
    });
  };
  console.log('DISPLAY PANE THREE++++++>', responseObject, headerOneBadgeThree);

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="right"
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
          headerOneBadgeThree={headerOneBadgeThree}
          headerPanelColour="green"
          onClickClearInfo={onClickClearInfo}
        />
      </div>
      {isReviewRevise &&
        responseObject &&
        ((headerOne === 'assessee' && headerOneBadgeOne !== 'role') ||
          headerOne === 'administrator' ||
          headerOne === 'manager') && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="alias"
                  textOneOne={`${informationBasic.assesseeNamePrefix} ${informationBasic.assesseeNameFirst} ${informationBasic.assesseeNameOther} ${informationBasic.assesseeNameLast} ${informationBasic.assesseeNameSuffix}`}
                  textOneTwo={informationBasic.assesseeAlias || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssessee}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assessee' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessee}
                primaryIcon={createPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessees' &&
        headerOneBadgeOne === 'role' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assesseeRoleName || 'No Information'}
                  textOneTwo={informationBasic.assesseeRoleDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssesseeRole}
                selectedSection={selectedSectionAssesseeRole}
                setSelectedSection={setSelectedSectionAssesseeRole}
              />
            </div>
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessees' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assesseeGroupName || 'No Information'}
                  textOneTwo={informationBasic.assesseeGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssesseeGroup}
                selectedSection={selectedSectionAssesseeGroup}
                setSelectedSection={setSelectedSectionAssesseeGroup}
              />
            </div>
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associates' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateGroupName || 'No Information'}
                  textOneTwo={informationBasic.associateGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociateGroup}
                selectedSection={selectedSectionAssociateGroup}
                setSelectedSection={setSelectedSectionAssociateGroup}
              />
            </div>
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associates' &&
        headerOneBadgeOne === 'role' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateRoleName || 'No Information'}
                  textOneTwo={informationBasic.associateRoleDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociateRole}
                selectedSection={selectedSectionAssociateRole}
                setSelectedSection={setSelectedSectionAssociateRole}
              />
            </div>
          </>
        )}
      {isReviewRevise && responseObject && headerOne === 'associate' && (
        <>
          <div style={{ padding: '2.5px' }}>
            <div style={{ padding: '2.5px' }}>
              <BasicCard
                isAlertActive
                isFlagActive
                className=""
                labelTextOneOne="name"
                labelTextOneTwo="description"
                textOneOne={informationBasic.associateName || 'No Information'}
                textOneTwo={informationBasic.associateDescription || 'No Information'}
                isVerifiedActiveName={false}
                isVerifiedActivePicture={false}
                mode={reviewMode}
              />
            </div>
            <Sections
              listSections={rightPaneSectionsAssociate}
              selectedSection={selectedSectionAssociate}
              setSelectedSection={setSelectedSectionAssociate}
            />
          </div>
          <PopUpMiddlePaneList
            isActive={isPopUpValue === 'rightPaneTripleDotPopup'}
            onClickInformation={() => {}}
          />
          {/* <FooterIconTwo
            FilterModeEnable={navigatorIcon}
            FilterMode={FilterMode}
            onClick={onClickFooter}
            primaryIcon={primaryIcon}
            secondaryIcon={secondaryIcon}
          /> */}
        </>
      )}
    </>
  );
};

export default DisplayPaneThree;
