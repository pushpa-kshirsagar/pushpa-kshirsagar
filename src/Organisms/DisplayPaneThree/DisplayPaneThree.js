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
import { CLEAR_DISPLAY_PANE_THREE, NAVIGATOR_MODE } from '../../actionType';
import FooterIconTwo from '../../Molecules/FooterIconTwo/FooterIconTwo';
import './DisplayPaneThree.css';
import DisplayPaneThreeSectionOne from '../../Molecules/DisplayPaneThreeSectionOne/DisplayPaneThreeSectionOne';
import DisplayPaneThreeSectionTwo from '../../Molecules/DisplayPaneThreeSectionTwo/DisplayPaneThreeSectionTwo';
import DisplayPaneThreeSectionOneAssociate from '../../Molecules/DisplayPaneThreeSectionOneAssociate/DisplayPaneThreeSectionOneAssociate';
import DisplayPaneThreeSectionTwoAssociate from '../../Molecules/DisplayPaneThreeSectionTwoAssociate/DisplayPaneThreeSectionTwoAssociate';

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
  const [selectedSectionAssociate, setSelectedSectionAssociate] = useState(
    rightPaneSectionsAssociate[0]
  );
  const { navigatorIcon, FilterMode } = useSelector((state) => state.FilterReducer);
  const onClickFooter = (e) => {
    dispatch({ type: NAVIGATOR_MODE });
  };

  const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const {
    isReviewRevise = false,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    responseObject
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationBasic } = responseObject;

  const onClickClearInfo = () => {
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  console.log('DISPLAY PANE THREE++++++>', responseObject);

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
      {isReviewRevise && responseObject && headerOne === 'assessee' && (
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
              />
            </div>
            <Sections
              listSections={rightPaneSectionsAssessee}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
          <FooterIconTwo
            FilterModeEnable={navigatorIcon}
            FilterMode={FilterMode}
            onClick={onClickFooter}
            primaryIcon={primaryIcon}
            secondaryIcon={secondaryIcon}
          />
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
              />
            </div>
            <Sections
              listSections={rightPaneSectionsAssociate}
              selectedSection={selectedSectionAssociate}
              setSelectedSection={setSelectedSectionAssociate}
            />
          </div>
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
