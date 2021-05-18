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
import { ASSESSEE_SIGN_ON } from '../../actionType';

const DisplayPaneThreeSectionTwo = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const dispatch = useDispatch();
  const { informationContact, informationPersonal } = responseObject;

  // const longAddressForTest =
  //   '602 Silver Beliza, 48 St. Francis Avenue, SantaCruz West,  Mumbai, Maharashtra 400054, India';
  const {
    assesseeAddressCountryRegion = '',
    assesseeAddressProvinceState = '',
    assesseeAddressPostcode = '',
    assesseeAddressCity = '',
    assesseeAddress = ''
  } = informationContact?.assesseeAddressHomePrimary;
  let homeAddressPrimary = `${assesseeAddress} ${assesseeAddressCity} ${assesseeAddressProvinceState} ${assesseeAddressCountryRegion} ${assesseeAddressPostcode}`;
  if (!homeAddressPrimary.trim()) {
    homeAddressPrimary = 'No Information';
  }
  const {
    assesseeAddressCountryRegion: addressCountryRegion = '',
    assesseeAddressProvinceState: addressProvinceState = '',
    assesseeAddressPostcode: addressPostcode = '',
    assesseeAddressCity: addressCity = '',
    assesseeAddress: address = ''
  } = informationContact?.assesseeAddressHomeSecondary;
  let homeAddressSecondary = `${address} ${addressCity} ${addressProvinceState} ${addressCountryRegion} ${addressPostcode}`;
  if (!homeAddressSecondary.trim()) {
    homeAddressSecondary = 'No Information';
  }
  const {
    assesseeAddressCountryRegion: workAddressPrimaryRegion = '',
    assesseeAddressProvinceState: workAddressPrimaryState = '',
    assesseeAddressPostcode: workAddressPrimaryPostcode = '',
    assesseeAddressCity: workAddressPrimaryCity = '',
    assesseeAddress: workAddressPrimaryAddress = ''
  } = informationContact?.assesseeAddressWorkPrimary;
  let workAddressPrimary = `${workAddressPrimaryAddress} ${workAddressPrimaryCity} ${workAddressPrimaryState} ${workAddressPrimaryRegion} ${workAddressPrimaryPostcode}`;
  if (!workAddressPrimary.trim()) {
    workAddressPrimary = 'No Information';
  }
  const {
    assesseeAddressCountryRegion: workAddressSecondaryCountryRegion = '',
    assesseeAddressProvinceState: workAddressSecondaryProvinceState = '',
    assesseeAddressPostcode: workAddressSecondaryPostcode = '',
    assesseeAddressCity: workAddressSecondaryCity = '',
    assesseeAddress: workAddressSecondaryAddress = ''
  } = informationContact?.assesseeAddressWorkSecondary;
  let workAddressSecondary = `${workAddressSecondaryAddress} ${workAddressSecondaryCity} ${workAddressSecondaryProvinceState} ${workAddressSecondaryCountryRegion} ${workAddressSecondaryPostcode}`;
  if (!workAddressSecondary.trim()) {
    workAddressSecondary = 'No Information';
  }
  // assesseeTelephoneHomePrimary: {
  //   assesseeTelephoneCountryRegion: '',
  //   assesseeTelephoneAreaCity: '',
  //   assesseeTelephoneNumber: '',
  //   assesseeTelephoneExtension: '',
  //   assesseeTelephoneCommunication: false,
  //   assesseeTelephoneVerification: false
  // },
  const careerListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'academia',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'education',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'license',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a1',
      labelTextOneOne: 'profile',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a1',
      labelTextOneOne: 'report',
      labelTextOneOneBadges: [],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a1',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'iGuru',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
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
      multiline: true,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: homeAddressPrimary //longAddressForTest
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: homeAddressSecondary
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
          textOne:
            informationContact.assesseeTelephoneHomePrimary?.assesseeTelephoneNumber ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationContact.assesseeTelephoneHomeSecondary?.assesseeTelephoneNumber ||
            'No Information'
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
            informationContact.assesseeTelephoneMobilePrimary.assesseeTelephoneAreaCity ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationContact.assesseeTelephoneMobileSecondary?.assesseeTelephoneAreaCity ||
            'No Information'
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
      multiline: true,
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
      labelTextOneOne: 'work telephone',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationContact.assesseeTelephoneWorkPrimary?.assesseeTelephoneNumber ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationContact.assesseeTelephoneWorkPrimary?.assesseeTelephoneNumber ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: TelephoneVerified,
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
          textOne:
            informationPersonal.assesseeCommunitySocial?.assesseeCommunity || 'No Information'
        },
        {
          labelTextOneOneBadge: 'spiritual',
          textOne:
            informationPersonal.assesseeCommunitySpiritual?.assesseeCommunity || 'No Information'
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
          textOne:
            informationContact.assesseeTelephoneMobileSecondary.assesseeTelephoneNumber ||
            'No Information'
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
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName, selectedBadgeName);
    if (labelName === 'email address') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'EMAILPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'EMAILSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'home address') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'HOMEADDRESSPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'HOMEADDRESSSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'work address') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'WORKADDRESSPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'WORKADDRESSSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'home telephone') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'HOMETELEPHONEPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'HOMETELEPHONESECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'work telephone') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'WORKTELEPHONEPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'WORKTELEPHONESECONDARPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'mobile telephone') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'MOBILETELEPHONEPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'MOBILETELEPHONESECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
  };

  const reviseCredential = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'fingerprint') {
      if (selectedBadgeName === 'left hand') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'LEFTFINGERPRINTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'right hand') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'RIGHTFINGERPRINTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'signature') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'SIGNATUREPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'tag') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'TAGSTATUTORY', popupMode: 'ASSESSEE_CREATE' }
      });
    }
  };
  const reviewCredential = (labelName, selectedBadgeName) => {
    // const labelName = e.currentTarget.getAttribute('data-value');
    // const selectedBadgeName = e.currentTarget.getAttribute('id');
    console.log('=====>', labelName);
    if (labelName === 'fingerprint') {
      if (selectedBadgeName === 'left hand') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'LEFTFINGERPRINTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'right hand') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'RIGHTFINGERPRINTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'signature') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'SIGNATUREPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    // if (labelName === 'tag') {
    //   dispatch({
    //     type: ASSESSEE_SIGN_ON,
    //     payload: { isPopUpValue: 'TAGSTATUTORY', popupMode: 'ASSESSEE_CREATE' }
    //   });
    // }
  };

  const revisePersonal = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
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
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'BIRTHPLACEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'community') {
      if (selectedBadgeName === 'social') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'COMMUNITYSOCIALPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'spiritual') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'COMMUNITYSPIRITUALPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
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
              onClickReview={reviewCredential}
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
