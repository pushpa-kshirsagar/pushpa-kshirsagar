import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Unverified from '../../images/unverified.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import {
  ASSOCIATE_SIGN_ON,
  GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_VALUE
} from '../../actionType';
import AccordianMultiListCard from '../Accordian/AccordianMultiListCard';
import { makeAssociateNodeObj, makeInternalNodeObj } from '../../Actions/GenericActions';
import { getAssociateNodeApiCall } from '../../Actions/AssociateModuleAction';

const DisplayPaneThreeSectionTwoAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { countPage, selectedAssociateInfo, selectedTagValue } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  const { informationContact, informationCredential, informationFramework } = responseObject;

  //   associateAddress: "sampleaddress"
  // associateAddressCity: "33"
  // associateAddressCommunication: false
  // associateAddressCountryRegion: "91"
  // associateAddressPostcode: "123456"
  // associateAddressProvinceState: "22"
  // associateAddressVerification: false
  const {
    associateAddressCountryRegion = '',
    associateAddressProvinceState = '',
    associateAddressPostcode = '',
    associateAddressCity = '',
    associateAddress = ''
  } = informationContact?.associateAddressWorkPrimary || {};
  let workAddressPrimary = `${associateAddress} ${associateAddressCity} ${associateAddressProvinceState} ${associateAddressCountryRegion} ${associateAddressPostcode}`;
  if (!workAddressPrimary.trim()) {
    workAddressPrimary = 'No Information';
  }
  // let workAddressPrimary = `${informationContact?.associateAddressWorkPrimary?.associateAddress} ${informationContact?.associateAddressWorkPrimary?.associateAddressCity} ${informationContact?.associateAddressWorkPrimary?.associateAddressCountryRegion} ${informationContact?.associateAddressWorkPrimary?.associateAddressPostcode}`;
  // if (!workAddressPrimary.trim()) {
  //   workAddressPrimary = 'No Information';
  // }
  const {
    associateAddressCountryRegion: associateAddressCountryRegionSecondary = '',
    associateAddressProvinceState: associateAddressProvinceStateSecondary = '',
    associateAddressPostcode: associateAddressPostcodeSecondary = '',
    associateAddressCity: associateAddressCitySecondary = '',
    associateAddress: associateAddressSecondary = ''
  } = informationContact?.associateAddressWorkSecondary || {};
  let workAddressSecondary = `${associateAddressSecondary} ${associateAddressCitySecondary} ${associateAddressProvinceStateSecondary} ${associateAddressCountryRegionSecondary} ${associateAddressPostcodeSecondary}`;
  // let workAddressSecondary = `${informationContact?.associateAddressWorkSecondary?.associateAddress} ${informationContact?.associateAddressWorkSecondary?.associateAddressCity} ${informationContact?.associateAddressWorkSecondary?.associateAddressCountryRegion} ${informationContact?.associateAddressWorkSecondary?.associateAddressPostcode}`;
  if (!workAddressSecondary.trim()) {
    workAddressSecondary = 'No Information';
  }
  // +91 (citycode) number 'extension' extennumber
  // +91 (80) 786899 extension 987
  const {
    associateTelephoneAreaCity = '',
    associateTelephoneCountryRegion = '',
    associateTelephoneExtension = '',
    associateTelephoneNumber = ''
  } = informationContact?.associateTelephoneWorkPrimary || {};
  let workTelephonePrimary = 'No Information';
  if (
    associateTelephoneAreaCity ||
    associateTelephoneCountryRegion ||
    associateTelephoneExtension ||
    associateTelephoneNumber
  ) {
    workTelephonePrimary = `+${associateTelephoneCountryRegion} (${associateTelephoneAreaCity}) ${associateTelephoneNumber} extension ${associateTelephoneExtension}`;
  }

  const {
    associateTelephoneAreaCity: associateTelephoneAreaCitySecondary = '',
    associateTelephoneCountryRegion: associateTelephoneCountryRegionSecondary = '',
    associateTelephoneExtension: associateTelephoneExtensionSecondary = '',
    associateTelephoneNumber: associateTelephoneNumberSecondary = ''
  } = informationContact?.associateTelephoneWorkSecondary || {};
  let workTelephoneSecondary = 'No Information';
  if (
    associateTelephoneAreaCitySecondary ||
    associateTelephoneCountryRegionSecondary ||
    associateTelephoneExtensionSecondary ||
    associateTelephoneNumberSecondary
  ) {
    workTelephoneSecondary = `+${associateTelephoneCountryRegionSecondary} (${associateTelephoneAreaCitySecondary}) ${associateTelephoneNumberSecondary} extension ${associateTelephoneExtensionSecondary}`;
  }

  const list1 = [
    {
      id: 'a1',
      labelTextOneOne: 'website address',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationContact?.associateAddressWebsitePrimary?.associateAddressWebsite ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationContact?.associateAddressWebsiteSecondary?.associateAddressWebsite ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a2',
      labelTextOneOne: 'work address',
      multiline: workAddressPrimary.length > 40,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: workAddressPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: workAddressSecondary
        }
      ],
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a3',
      labelTextOneOne: 'work telephone',
      multiline: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: workTelephonePrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: workTelephoneSecondary
        }
      ],
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    }
  ];
  const list2 = [
    {
      id: 'a4',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'statutory',
          textOne: informationCredential || 'No Information'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'associate',
      isListCard: false,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];

  let ascendantAll = [];
  let ascendantPrimary = [];
  let ascendantSecondary = [];
  if (informationFramework && informationFramework.associateAscendant) {
    if (
      informationFramework.associateAscendant.associateAscendantAll &&
      informationFramework.associateAscendant.associateAscendantAll.length > 0
    ) {
      informationFramework.associateAscendant.associateAscendantAll.forEach((ob) => {
        ascendantAll.push({
          id: ob.id,
          textOne: ob?.associateName || '',
          textTwo: ob?.associateDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateAscendant.associateAscendantPrimary &&
      informationFramework.associateAscendant.associateAscendantPrimary.length > 0
    ) {
      informationFramework.associateAscendant.associateAscendantPrimary.forEach((ob) => {
        ascendantPrimary.push({
          id: ob.id,
          textOne: ob?.associateName || '',
          textTwo: ob?.associateDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateAscendant.associateAscendantSecondary &&
      informationFramework.associateAscendant.associateAscendantSecondary.length > 0
    ) {
      informationFramework.associateAscendant.associateAscendantSecondary.forEach((ob) => {
        ascendantSecondary.push({
          id: ob.id,
          textOne: ob?.associateName || '',
          textTwo: ob?.associateDescription || '',
          status: ''
        });
      });
    }
  }
  let descendantAll = [];
  let descendantPrimary = [];
  let descendantSecondary = [];
  if (informationFramework && informationFramework.associateDescendant) {
    if (
      informationFramework.associateDescendant.associateDescendantAll &&
      informationFramework.associateDescendant.associateDescendantAll.length > 0
    ) {
      informationFramework.associateDescendant.associateDescendantAll.forEach((ob) => {
        descendantAll.push({
          id: ob.id,
          textOne: ob?.associateName || '',
          textTwo: ob?.associateDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateDescendant.associateDescendantPrimary &&
      typeof informationFramework.associateDescendant.associateDescendantPrimary !== 'string' &&
      informationFramework.associateDescendant.associateDescendantPrimary.length > 0
    ) {
      informationFramework.associateDescendant.associateDescendantPrimary.forEach((ob) => {
        descendantPrimary.push({
          id: ob.id,
          textOne: ob?.associateName || '',
          textTwo: ob?.associateDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateDescendant.associateDescendantSecondary &&
      informationFramework.associateDescendant.associateDescendantSecondary.length > 0
    ) {
      informationFramework.associateDescendant.associateDescendantSecondary.forEach((ob) => {
        descendantSecondary.push({
          id: ob.id,
          textOne: ob?.associateName || '',
          textTwo: ob?.associateDescription || '',
          status: ''
        });
      });
    }
  }
  const list3 = [
    {
      id: 'a1',
      labelTextOneOne: 'associate',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: ascendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: ascendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: ascendantSecondary
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: descendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: descendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: descendantSecondary
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true,
      isMultiList: true
    }
  ];

  const reviseContact = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName, selectedBadgeName);
    if (labelName === 'website address') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'WEBSITEADDRESSPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'WEBSITEADDRESSSECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
    }
    if (labelName === 'work address') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'WORKADDRESSPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'WORKADDRESSSECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
    }
    if (labelName === 'work telephone') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'WORKTELEPHONE', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'WORKTELEPHONESECONDARY', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
    }
  };

  const reviseCredential = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'tag') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'TAGSTATUTORYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
  };
  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
    if (
      labelName === 'associate' &&
      selectedBadgeName === 'ascendant' &&
      innerSelectedBadgeName === 'primary'
    ) {
      let requestObj = makeAssociateNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
        payload: { request: requestObj, nodeViewState: 'list', isMiddlePaneList: false }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ASSOCIATESPARENTLISTPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="contact"
              isDisplayCardExpanded={listExpand === 'contact'}
              setListExpand={setListExpand}
              list={list1}
              mode={reviewMode}
              onClickRevise={reviseContact}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="credential"
              isDisplayCardExpanded={listExpand === 'credential'}
              setListExpand={setListExpand}
              list={list2}
              mode={reviewMode}
              onClickRevise={reviseCredential}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={list3}
              mode={reviewMode}
              onClickRevise={reviseFramework}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {list1.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={reviseContact}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
                        onClickRevise={reviseContact}
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {list2.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={reviseCredential}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
                        onClickRevise={reviseCredential}
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {list3.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <>
                        {ob.isMultiList ? (
                          <AccordianMultiListCard
                            onClickRevise={reviseFramework}
                            accordianObject={ob}
                            mode={reviewMode}
                          />
                        ) : (
                          <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                        )}
                      </>
                    ) : (
                      <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
        </>
      )}
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssociate;
