import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Unverified from '../../images/unverified.svg';
import EditIcon from '@material-ui/icons/Edit';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Manuscript from '@material-ui/icons/Description';
import MailOutline from '@material-ui/icons/MailOutline';
import TelephoneVerified from '@material-ui/icons/Call';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  ASSESSEE_SIGN_ON,
  UPDATE_ASSESSEE_CONTACT_DYNAMIC_SINGLE_STATE,
  UPDATE_ASSESSEE_CONTACT_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO
} from '../../actionType';

const DisplayPaneThreeSectionTwo = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const dispatch = useDispatch();
  const { informationContact, informationPersonal } = responseObject;

  // const longAddressForTest =
  //   '602 Silver Beliza, 48 St. Francis Avenue, SantaCruz West,  Mumbai, Maharashtra 400054, India';
  const ob = {
    assesseeAddressHomePrimary: {
      assesseeAddressCountryRegion: '',
      assesseeAddressProvinceState: '',
      assesseeAddressPostcode: '',
      assesseeAddressCity: '',
      assesseeAddress: '',
      assesseeAddressCommunication: false,
      assesseeAddressVerification: false
    },
    assesseeAddressHomeSecondary: {
      assesseeAddressCountryRegion: '',
      assesseeAddressProvinceState: '',
      assesseeAddressPostcode: '',
      assesseeAddressCity: '',
      assesseeAddress: '',
      assesseeAddressCommunication: false,
      assesseeAddressVerification: false
    },
    assesseeAddressWorkPrimary: {
      assesseeAddressCountryRegion: '',
      assesseeAddressProvinceState: '',
      assesseeAddressPostcode: '',
      assesseeAddressCity: '',
      assesseeAddress: '',
      assesseeAddressCommunication: false,
      assesseeAddressVerification: false
    },
    assesseeAddressWorkSecondary: {
      assesseeAddressCountryRegion: '',
      assesseeAddressProvinceState: '',
      assesseeAddressPostcode: '',
      assesseeAddressCity: '',
      assesseeAddress: '',
      assesseeAddressCommunication: false,
      assesseeAddressVerification: false
    }
  };
  const {
    assesseeAddressCountryRegion = '',
    assesseeAddressProvinceState = '',
    assesseeAddressPostcode = '',
    assesseeAddressCity = '',
    assesseeAddress = ''
  } = informationContact?.assesseeAddressHomePrimary;
  const homeAddressPrimary = `${assesseeAddress} ${assesseeAddressCity} ${assesseeAddressProvinceState} ${assesseeAddressCountryRegion} ${assesseeAddressPostcode}`;

  const {
    assesseeAddressCountryRegion: addressCountryRegion = '',
    assesseeAddressProvinceState: addressProvinceState = '',
    assesseeAddressPostcode: addressPostcode = '',
    assesseeAddressCity: addressCity = '',
    assesseeAddress: address = ''
  } = informationContact?.assesseeAddressHomeSecondary;
  const homeAddressSecondary = `${address} ${addressCity} ${addressProvinceState} ${addressCountryRegion} ${addressPostcode}`;

  const careerListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'document',
      textOneOne: '',
      labelTextOneOneBadgeOne: 'form',
      labelTextOneOneBadgeTwo: 'report',
      labelTextOneOneBadgeThree: 'resume',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    }
  ];
  const contactListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'email address',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationContact.assesseeAddressEmailPrimary.assesseeAddressEmail || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationContact.assesseeAddressEmailSecondary.assesseeAddressEmail ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: MailOutline,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a2',
      labelTextOneOne: 'home address',
      multiline:
        informationContact &&
        informationContact.assesseeAddressHomePrimary &&
        homeAddressPrimary.length > 40, //longAddressForTest.length > 40,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: homeAddressPrimary || 'No Information' //longAddressForTest
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: homeAddressSecondary || 'No Information'
        }
      ],
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: MailOutline,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a3',
      labelTextOneOne: 'home telephone',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: informationContact.assesseeTelephoneHomePrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationContact.assesseeTelephoneHomeSecondary || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: TelephoneVerified,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a4',
      labelTextOneOne: 'mobile telephone',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationContact.assesseeTelephoneMobilePrimary.assesseeTelephoneNumber ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationContact.assesseeTelephoneMobileSecondary || 'No Information'
        }
      ],
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: TelephoneVerified,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a5',
      labelTextOneOne: 'work address',
      multiline:
        informationContact &&
        informationContact.assesseeAddressWorkPrimary &&
        informationContact.assesseeAddressWorkPrimary.length > 40,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: informationContact.assesseeAddressWorkPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationContact.assesseeAddressWorkSecondary || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: MailOutline,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];
  const credentialListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'fingerprint',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'left hand',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'right hand',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Fingerprint
    },
    {
      id: 'a2',
      labelTextOneOne: 'signature',
      textOneOne: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: EditIcon,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a4',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'statutory',
          textOne: 'No Information'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];
  const personalListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'birthdate',
      textOneOne: informationPersonal.assesseeBirthdate || 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a2',
      labelTextOneOne: 'birthmark',
      textOneOne: informationPersonal.assesseeBirthmark || 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'birthplace',
      textOneOne: informationPersonal.assesseeBirthplaceCity || 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'community',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'social',
          textOne: informationPersonal.assesseeCommunitySocial || 'No Information'
        },
        {
          labelTextOneOneBadge: 'spiritual',
          textOne: informationPersonal.assesseeCommunitySpiritual || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'gender',
      textOneOne: informationPersonal.assesseeGender || 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    }
  ];
  const contactListKey = [
    {
      id: 'a1',
      labelTextOneOne: 'email address',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationContact.assesseeAddressEmailPrimary.assesseeAddressEmail || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationContact.assesseeAddressEmailSecondary.assesseeAddressEmail ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: MailOutline,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a4',
      labelTextOneOne: 'mobile telephone',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationContact.assesseeTelephoneMobilePrimary.assesseeTelephoneNumber ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationContact.assesseeTelephoneMobileSecondary || 'No Information'
        }
      ],
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: TelephoneVerified,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];

  const personalListKey = [
    {
      id: 'a4',
      labelTextOneOne: 'gender',
      textOneOne: informationPersonal.assesseeGender || 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    }
  ];
  const reviseCareer = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
  };

  const reviseContact = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'email address') {
      // if (informationContact.assesseeAddressEmailPrimary !== null) {
      //   dispatch({
      //     type: UPDATE_ASSESSEE_CONTACT_DYNAMIC_SINGLE_STATE,
      //     payload: {
      //       stateName: 'assesseeAddressEmailPrimary',
      //       value: informationContact.assesseeAddressEmailPrimary
      //     }
      //   });
      // }
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'EMAILPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'home address') {
      // if (informationContact.assesseeAddressHomePrimary !== null) {
      //   dispatch({
      //     type: UPDATE_ASSESSEE_CONTACT_DYNAMIC_SINGLE_STATE,
      //     payload: {
      //       stateName: 'assesseeAddressHomePrimary',
      //       value: informationContact.assesseeAddressHomePrimary
      //     }
      //   });
      // }
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'HOMEADDRESSPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'work address') {
      // if (informationContact.assesseeAddressWorkPrimary !== null) {
      //   dispatch({
      //     type: UPDATE_ASSESSEE_CONTACT_DYNAMIC_SINGLE_STATE,
      //     payload: {
      //       stateName: 'assesseeAddressWorkPrimary',
      //       value: informationContact.assesseeAddressWorkPrimary
      //     }
      //   });
      // }
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'WORKADDRESSPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'home telephone') {
      // if (informationContact.assesseeTelephoneHomePrimary !== null) {
      //   dispatch({
      //     type: UPDATE_ASSESSEE_CONTACT_DYNAMIC_SINGLE_STATE,
      //     payload: {
      //       stateName: 'assesseeTelephoneHomePrimary',
      //       value: informationContact.assesseeTelephoneHomePrimary
      //     }
      //   });
      // }
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'HOMETELEPHONEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'mobile telephone') {
      // if (informationContact.assesseeTelephoneMobilePrimary !== null) {
      //   dispatch({
      //     type: UPDATE_ASSESSEE_CONTACT_DYNAMIC_SINGLE_STATE,
      //     payload: {
      //       stateName: 'assesseeTelephoneMobilePrimary',
      //       value: informationContact.assesseeTelephoneMobilePrimary
      //     }
      //   });
      // }
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'MOBILETELEPHONEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
  };

  const reviseCredential = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
  };

  const revisePersonal = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    // dispatch({ type: UPDATE_ASSESSEE_PERSONAL_INFO, payload: informationPersonal });
    console.log('=====>', labelName);
    if (labelName === 'birthdate') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'BIRTHDATEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'birthmark') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'BIRTHMARKPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'birthplace') {
    }
    if (labelName === 'community') {
    }
    if (labelName === 'gender') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'SINGLEDROPDOWNPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="career"
              isDisplayCardExpanded={listExpand === 'career'}
              setListExpand={setListExpand}
              list={careerListAll}
              mode={reviewMode}
              onClickRevise={reviseCareer}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="contact"
              isDisplayCardExpanded={listExpand === 'contact'}
              setListExpand={setListExpand}
              list={contactListAll}
              mode={reviewMode}
              onClickRevise={reviseContact}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="credential"
              isDisplayCardExpanded={listExpand === 'credential'}
              setListExpand={setListExpand}
              list={credentialListAll}
              mode={reviewMode}
              onClickRevise={reviseCredential}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="personal"
              isDisplayCardExpanded={listExpand === 'personal'}
              setListExpand={setListExpand}
              list={personalListAll}
              mode={reviewMode}
              onClickRevise={revisePersonal}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {contactListKey.map((ob) => {
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
              {personalListKey.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={revisePersonal}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
                        onClickRevise={revisePersonal}
                        accordianObject={ob}
                        mode={reviewMode}
                      />
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

export default DisplayPaneThreeSectionTwo;
