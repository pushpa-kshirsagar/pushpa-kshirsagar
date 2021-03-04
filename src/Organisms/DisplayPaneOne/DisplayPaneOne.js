import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneOne.css';
import Sections from '../../Molecules/Section/Section';
import FooterIconOne from '../../Molecules/FooterIconOne/FooterIconOne';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MIDDLEPANE_STATE, SET_POPUP_STATE } from '../../actionType';
import { ASSESSEE_CARD_POPUP_OPTIONS, ASSOCIATE_CARD_POPUP_OPTION } from '../../PopUpConfig';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import PopUpSpreadSheet from '../../PopUpIcon/PopUpSpreadSheet';
import PopUpAssesseePassword from '../../PopUpInformation/PopUpAssesseePassword';
import PopUpDisplayPanelAssessee from '../../PopUpDisplayPanel/PopUpDisplayPanelAssessee';
import PopUpDisplayPanelAssociate from '../../PopUpDisplayPanel/PopUpDisplayPanelAssociate';
import DisplayPaneOneSectionOne from '../../Molecules/DisplayPaneOneSectionOne/DisplayPaneOneSectionOne';
import DisplayPaneOneSectionTwo from '../../Molecules/DisplayPaneOneSectionTwo/DisplayPaneOneSectionTwo';
import DisplayPaneOneSectionThree from '../../Molecules/DisplayPaneOneSectionThree/DisplayPaneOneSectionThree';
import DisplayPaneOneSectionFour from '../../Molecules/DisplayPaneOneSectionFour/DisplayPaneOneSectionFour';
import {
  setAssesseeCardPermissionInJson,
  setAssociateCardPermissionInJson
} from '../../Actions/GenericActions';
import PopUpDisplayPaneOneSectionOne from '../../PopUpDisplayPanel/PopUpDisplayPaneOneSectionOne';
import PopUpDisplayPaneOneSectionTwo from '../../PopUpDisplayPanel/PopUpDisplayPaneOneSectionTwo';
import PopUpAssesseesModule from '../../PopUpDisplayPanel/PopUpAssesseesModule';
import PopUpAssociatesModule from '../../PopUpDisplayPanel/PopUpAssociatesModule';
import PopupAssessmentsModule from '../../PopUpDisplayPanel/PopupAssessmentsModule';

export const DisplayPaneOne = () => {
  const leftPaneSections = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneOneSectionOne,
      displayPaneLeftHeaderText: 'dashboard',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneOneSectionTwo,

      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'analytics'
    },
    {
      id: 'section3',
      sectionComponent: DisplayPaneOneSectionThree,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'marketplace'
    },
    {
      id: 'section4',
      sectionComponent: DisplayPaneOneSectionFour,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'mine'
    }
  ];
  const [selectedSection, setSelectedSection] = useState(leftPaneSections[0]);
  const dispatch = useDispatch();
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { userData, assesseePermission = null } = useSelector((state) => state.UserReducer);
  const { isAssociateSelected, selectedAssociateInfo } = useSelector(
    (state) => state.DisplayPaneReducer
  );
  const associateName = selectedAssociateInfo
    ? selectedAssociateInfo.associateInformation.associateName
    : 'associates';
  const associateDescription =
    selectedAssociateInfo && selectedAssociateInfo.associateInformation.associateDescription;
  const assesseeAlias =
    selectedAssociateInfo && selectedAssociateInfo.assesseeInformation.assesseeAlias;
  const assesseeName = selectedAssociateInfo
    ? selectedAssociateInfo.assesseeInformation.assesseeNameFirst +
      ' ' +
      selectedAssociateInfo.assesseeInformation.assesseeNameLast
    : 'sample@gmail.com ';
  const openCardPopup = (e) => {
    let popupContentArrValue = [];
    let popupHeaderOne = '';
    let value = '';
    if (e.currentTarget.getAttribute('data-value') !== '') {
      if (e.currentTarget.getAttribute('data-value') === 'assessee_card') {
        popupHeaderOne = 'assessee';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          ASSESSEE_CARD_POPUP_OPTIONS,
          assesseePermission
        );
        value = 'ASSESSEE_CARD_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'associate_card') {
        popupHeaderOne = 'associate';
        // popupContentArrValue = ASSOCIATE_CARD_POPUP_OPTION;
        popupContentArrValue = setAssociateCardPermissionInJson(
          ASSOCIATE_CARD_POPUP_OPTION,
          assesseePermission
        );

        value = 'ASSOCIATE_CARD_POPUP';
      }
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: popupHeaderOne,
          popupHeaderOneBadgeOne: '',
          isPopUpValue: value,
          popupOpenType: 'primary',
          popupContentArrValue: popupContentArrValue
        }
      });
    } else {
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'associate',
          middlePaneHeaderBadgeOne: 'active',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assesseeRelatedAssociate',
          scanCount: userData && userData.length
        }
      });
    }
  };

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="left"
          headerOne={selectedSection.displayPaneLeftHeaderText}
          headerOneBadgeOne={selectedSection.displayPaneLeftBadgeText}
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        <div className="containerPadding">
          <Card
            ImageOne={selectedAssociateInfo ? PersonIcon : null}
            textOneOne={assesseeName}
            textTwoOne={assesseeAlias}
            onClick={
              selectedAssociateInfo && selectedAssociateInfo.assesseeInformation
                ? openCardPopup
                : null
            }
            tag={'assessee_card'}
          />
        </div>
        <div className="containerPadding">
          {selectedAssociateInfo ? (
            <Card
              ImageOne={AssociateIcon}
              textOneOne={associateName}
              textTwoOne={associateDescription}
              onClick={openCardPopup}
              tag={'associate_card'}
            />
          ) : (
            <Card isIcon IconOne={ArrowRight} textOneOne="associates" onClick={openCardPopup} />
          )}
        </div>
      </div>
      {assesseePermission && assesseePermission.associateHierarchy.includes('review') && (
        <>
          <Sections
            listSections={leftPaneSections}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />

          <FooterIconOne />
        </>
      )}
      <PopUpDisplayPaneOneSectionOne
        isActive={isPopUpValue === 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP'}
      />
      <PopUpDisplayPaneOneSectionTwo
        isActive={isPopUpValue === 'DISPLAY_PANE_ONE_SECTION_TWO_POPUP'}
      />
      <PopUpAssesseesModule />
      <PopUpAssociatesModule />
      <PopupAssessmentsModule />
      <PopUpDisplayPanelAssessee isActive={isPopUpValue === 'ASSESSEE_CARD_POPUP'} />
      <PopUpDisplayPanelAssociate isActive={isPopUpValue === 'ASSOCIATE_CARD_POPUP'} />
      <PopUpTextSheet isActive={isPopUpValue === 'TEXTSHEET_POPUP'} />
      <PopUpSpreadSheet isActive={isPopUpValue === 'SPREADSHEET_POPUP'} />
      <PopUpAssesseePassword isActive={isPopUpValue === 'REVISE_PASSWORD_POPUP'} />
    </>
  );
};

export default DisplayPaneOne;
