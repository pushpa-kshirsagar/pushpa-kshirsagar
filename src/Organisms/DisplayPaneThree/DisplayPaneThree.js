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

export const DisplayPaneThree = () => {
  const dispatch = useDispatch();
  const rightPaneSections = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOne,
      displayPaneLeftHeaderText: 'dashboard',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwo,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'analytics'
    }
  ];
  const [selectedSection, setSelectedSection] = useState(rightPaneSections[0]);
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
      {isReviewRevise && responseObject && informationBasic && (
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
              listSections={rightPaneSections}
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
    </>
  );
};

export default DisplayPaneThree;
