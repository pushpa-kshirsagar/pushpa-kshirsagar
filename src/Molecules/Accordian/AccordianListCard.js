import React, { useEffect, useState } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import { FormControl, InputLabel } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './Accordian.css';
import { useDispatch, useSelector } from 'react-redux';
import CultureWeightageTableTemplate from './CultureWeightageTableTemplate';
import JobRangeTableTemplate from './jobRangeTableTemplate';
import { SET_WEIGHTAGE_CULTURE_PROFILE, SET_WEIGHTAGE_JOB_PROFILE } from '../../actionType';
import JobWeightageTableTemplate from './JobWeightageTableTemplate';

const AccordianListCard = (props) => {
  const {
    accordianObject,
    mode = '',
    onClickRevise,
    onClickReview = null,
    getReviewList = null
  } = props;
  const {
    responseObject,
    assignmentRelatedReviewListPaneThree,
    isWeightageSelected = false,
    reviewMode
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { cultureProfileInformation } = useSelector((state) => state.CultureProfileCreateReducer);
  const { jobProfileInformation } = useSelector((state) => state.JobProfileCreateReducer);
  const {
    labelTextOneOne = '',
    innerInfo = 'No Information',
    labelTextOneOneBadges,
    isReviewLink = false
  } = accordianObject;
  const dispatch = useDispatch();
  const [isListSelectExpanded, setIsListSelectExpanded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('');
  const reviewLabelClass = isReviewLink ? 'reviewLinkText' : '';
  useEffect(() => {
    if (
      labelTextOneOneBadges[0].labelTextOneOneBadge === 'primary' ||
      labelTextOneOneBadges[0].labelTextOneOneBadge === ''
    ) {
      setSelectedBadge(labelTextOneOneBadges[0]);
    }
    if (isWeightageSelected && labelTextOneOne === 'culture dimensions') {
      setSelectedBadge(labelTextOneOneBadges[1]);
      setIsListSelectExpanded(true);
    } else {
      setIsListSelectExpanded(false);
    }
  }, [responseObject]);

  useEffect(() => {
    if (
      labelTextOneOneBadges[0].labelTextOneOneBadge === 'primary' ||
      labelTextOneOneBadges[0].labelTextOneOneBadge === ''
    ) {
      setSelectedBadge(labelTextOneOneBadges[0]);
    } else {
      setSelectedBadge('');
    }
    if (isWeightageSelected && labelTextOneOne === 'culture dimensions') {
      setSelectedBadge(labelTextOneOneBadges[1]);
      setIsListSelectExpanded(true);
    } else {
      setIsListSelectExpanded(false);
    }
  }, [assignmentRelatedReviewListPaneThree]);
  let tempListData =
    cultureProfileInformation?.informationFramework?.cultureProfileCultureDimensionCoreObj || [];

  if (tempListData.length > 0 && reviewMode === 'revise') {
    // tempListData = cultureProfileInformation?.informationFramework?.cultureProfileCultureDimensionCoreObj || [];
  } else {
    tempListData = responseObject?.informationFramework?.cultureProfileCultureDimensionWeightage;
  }
  let tempJobListData =
    jobProfileInformation?.informationFramework?.jobProfileJobCompetencyCoreObj || [];

  // if (tempJobListData.length > 0 && reviewMode === 'revise') {
  //   // tempListData = cultureProfileInformation?.informationFramework?.cultureProfileCultureDimensionCoreObj || [];
  // } else {
  //   tempListData = responseObject?.informationFramework?.cultureProfileCultureDimensionWeightage;
  // }

  const cultureProfilerItems = [
    {
      competencyId: '5734116b04a3242643c2e636',
      isNegative: true,
      weightage: 2,
      order: 0,
      options: [
        {
          name: 'Pragmatic',
          description:
            'We expect people to be primarily motivated by the material rewards associated with their job. The culture is one of reward for work done.  Employees are unlikely to find their jobs inherently rewarding or meaningful',
          isNegative: true
        },
        {
          name: 'Intrinsic Meaning',
          description:
            'People in our organization are generally concerned with fulfilling some deeper need. We offer people roles which are meaningful and valuable. People might see working for us as a vocation rather than just a job',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116b04a3242643c2e637',
      isNegative: false,
      weightage: 2,
      order: 1,
      options: [
        {
          name: 'Challenge',
          description:
            'We operate in an environment of challenge, difficult decisions and high stakes. People need to be resilient and able to handle whatever the job throws at them. It tends to be ‘survival of the fittest’ in this organization',
          isNegative: true
        },
        {
          name: 'Ease',
          description:
            'We offer our employees an environment which is stress-free, secure and comfortable. We try to provide an optimal environment where people can perform at their best',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116b04a3242643c2e638',
      isNegative: true,
      weightage: 1,
      order: 2,
      options: [
        {
          name: 'Guidance',
          description:
            'This is a highly process driven organization where people know exactly what they are expected to do and are monitored closely. Most roles would have a high level of guidance, supervision, and even ‘micro-management’',
          isNegative: true
        },
        {
          name: 'Autonomy',
          description:
            'This organization offers and expects a high level of autonomy and independence. We are less concerned with how people do things as long as results are achieved. Management style tends to be ‘hands-off’',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116b04a3242643c2e63b',
      isNegative: true,
      weightage: 3,
      order: 5,
      options: [
        {
          name: 'Unconventional',
          description:
            'Our organization culture is one which encourages an informal, casual environment where people (particularly younger employees) can ‘be themselves’',
          isNegative: true
        },
        {
          name: 'Conventional',
          description:
            'Our organization espouses a more traditional,formal culture. There is a certain correct way of doing things, and we expect people to be deferential to their seniors etc.',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116c04a3242643c2e63f',
      isNegative: true,
      weightage: 3,
      order: 9,
      options: [
        {
          name: 'Manual',
          description:
            'Our work environment is basically low-tech and hands-on, and most roles are quite traditional in nature. Technology is minimal',
          isNegative: true
        },
        {
          name: 'Technology',
          description:
            'Our work environment is technology focused and current. We pride ourselves on being a technology leader',
          isNegative: false
        }
      ]
    }
  ];

  return (
    <>
      <div className={'detailsContactContainer'}>
        <div className={'detsailsPadding'}>
          <div className={['FormBox', 'detailsHeight'].join(' ')}>
            <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
              <InputLabel
                htmlFor="name-input"
                className={[
                  'textForLabel',
                  'textForLabelRight',
                  'careerLabelRight',
                  'careerLabelRighttransform'
                ].join(' ')}
              >
                <span
                  onClick={mode === 'revise' ? onClickRevise : onClickReview}
                  data-value={labelTextOneOne}
                  data-key={selectedBadge?.labelTextOneOneBadge || ''}
                  className={mode === 'revise' ? 'linkText' : reviewLabelClass}
                >
                  {labelTextOneOne}
                </span>
                {labelTextOneOneBadges.map((ob, key) => {
                  return (
                    <>
                      {ob.labelTextOneOneBadge !== '' && (
                        <sup
                          key={`badge-${key}`}
                          style={{
                            backgroundColor:
                              selectedBadge &&
                              selectedBadge.labelTextOneOneBadge === ob.labelTextOneOneBadge
                                ? '#F2F2F2'
                                : '#ffffff'
                          }}
                          onClick={() => {
                            setSelectedBadge(ob);
                          }}
                        >
                          {ob.labelTextOneOneBadge}
                        </sup>
                      )}
                    </>
                  );
                })}
                {/* {labelTextOneOneBadgeOne ? <sup>{labelTextOneOneBadgeOne}</sup> : null}
                {labelTextOneOneBadgeTwo ? <sup>{labelTextOneOneBadgeTwo}</sup> : null}
                {labelTextOneOneBadgeThree ? <sup>{labelTextOneOneBadgeThree}</sup> : null}
                {labelTextOneOneBadgeFour ? <sup>{labelTextOneOneBadgeFour}</sup> : null} */}
              </InputLabel>
            </FormControl>
            <div className={'unitFlex'}></div>
            <div
              onClick={() => {
                if (selectedBadge) {
                  if (!isListSelectExpanded && getReviewList) {
                    getReviewList(labelTextOneOne, selectedBadge?.labelTextOneOneBadge);
                  }
                  setIsListSelectExpanded((state) => !state);
                }
              }}
              className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}
            >
              {isListSelectExpanded ? (
                <ExpandLess className={'showLessMoreListIcon'} />
              ) : (
                <ExpandMore className={'showLessMoreListIcon'} />
              )}
            </div>
          </div>
        </div>
        {isListSelectExpanded && (
          <div>
            {selectedBadge.labelTextOneOneBadge === 'weightage' ||
            selectedBadge.labelTextOneOneBadge === 'range' ? (
              <div className={'containerPadding'}>
                {selectedBadge.labelTextOneOneBadge === 'weightage' &&
                  labelTextOneOne === 'culture dimensions' && (
                    <CultureWeightageTableTemplate
                      headerrowcount={3}
                      title="weightage"
                      radiocount={3}
                      row1={['low', 'medium', 'high']}
                      // culturedimensionselected={cultureProfilerItems}
                      culturetooltipstate=""
                      cultureprofilemode="review"
                      listData={tempListData}
                      setWeightage={(ob) => {
                        if (reviewMode === 'revise') {
                          dispatch({ type: SET_WEIGHTAGE_CULTURE_PROFILE, payload: ob });
                        }
                      }}
                    />
                  )}
                {selectedBadge.labelTextOneOneBadge === 'weightage' &&
                  labelTextOneOne === 'job competencies' && (
                    <JobWeightageTableTemplate
                      headerrowcount={3}
                      title="weightage"
                      radiocount={3}
                      row1={['low', 'medium', 'high']}
                      // culturedimensionselected={cultureProfilerItems}
                      culturetooltipstate=""
                      cultureprofilemode="review"
                      listData={tempJobListData}
                      setWeightage={(ob) => {
                        if (reviewMode === 'revise') {
                          dispatch({ type: SET_WEIGHTAGE_JOB_PROFILE, payload: ob });
                        }
                      }}
                    />
                  )}
                {selectedBadge.labelTextOneOneBadge === 'range' && (
                  <JobRangeTableTemplate
                    headerrowcount={4}
                    title="percentile"
                    radiocount={10}
                    row1={['50 - 59', '60 - 69', '70 - 79', '80 - 89', '90 - 99']}
                    rangeheadcolumnhead2={{
                      '50 - 59': 'average',
                      '60 - 69': 'average +',
                      '70 - 79': 'effective',
                      '80 - 89': 'strong',
                      '90 - 99': 'exceptional'
                    }}
                    culturedimensionselected={cultureProfilerItems}
                    culturetooltipstate=""
                    cultureprofilemode="review"
                  />
                )}
              </div>
            ) : (
              <>
                {labelTextOneOne === 'communiqué' ? (
                  <>
                    <div
                      style={{
                        // height: '50px',
                        padding: '2.5px 5px',
                        alignItems: 'center'
                        // display: 'flex'
                      }}
                      dangerouslySetInnerHTML={{ __html: selectedBadge.innerList }}
                    ></div>
                  </>
                ) : (
                  <>
                    {selectedBadge && selectedBadge.innerList.length > 0 ? (
                      <>
                        {selectedBadge &&
                          selectedBadge.innerList.map((associate) => {
                            return (
                              <div style={{ padding: '2.5px 0' }}>
                                <ReviewList
                                  className=""
                                  id={associate.id}
                                  status={associate.status}
                                  textOne={associate.textOne}
                                  textTwo={associate.textTwo}
                                />
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <div
                        style={{
                          height: '50px',
                          padding: '2.5px 5px',
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {innerInfo}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AccordianListCard;
