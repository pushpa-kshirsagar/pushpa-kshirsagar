import React, { useEffect, useState } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import { FormControl, InputLabel } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './Accordian.css';

const AccordianMultiListCard = (props) => {
  const { accordianObject, mode = '', onClickRevise, onClickReview = null } = props;
  const {
    labelTextOneOne = '',
    innerInfo = 'No Information',
    labelTextOneOneBadges,
    isReviewLink = false
  } = accordianObject;

  const [isListSelectExpanded, setIsListSelectExpanded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('');
  const [innerSelectedBadge, setInnerSelectedBadge] = useState('');
  const reviewLabelClass = isReviewLink ? 'reviewLinkText' : '';
  useEffect(() => {
    if (selectedBadge === '') {
      setInnerSelectedBadge('');
    } else {
      setInnerSelectedBadge(selectedBadge.innerLabelBadgeList[0]);
    }
  }, [selectedBadge]);

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
                  id={innerSelectedBadge?.labelTextTwoBadge || ''}
                  className={mode === 'revise' ? 'linkText' : reviewLabelClass}
                >
                  {labelTextOneOne}
                </span>
                {labelTextOneOneBadges.map((ob, key) => {
                  return (
                    <>
                      {selectedBadge === '' ||
                      selectedBadge.labelTextOneOneBadge === ob.labelTextOneOneBadge ? (
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
                            if (ob.innerLabelBadgeList[0].labelTextTwoBadge !== '') {
                              setSelectedBadge((state) => {
                                if (state.labelTextOneOneBadge === ob.labelTextOneOneBadge) {
                                  return '';
                                }
                                return ob;
                              });
                            }
                          }}
                        >
                          {ob.labelTextOneOneBadge}
                        </sup>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
                {selectedBadge !== '' &&
                  selectedBadge.innerLabelBadgeList.map((ob, key) => {
                    return (
                      <>
                        {true ? (
                          <sup
                            key={`badge-${key}`}
                            style={{
                              backgroundColor:
                                innerSelectedBadge &&
                                innerSelectedBadge.labelTextTwoBadge === ob.labelTextTwoBadge
                                  ? '#F2F2F2'
                                  : '#ffffff'
                            }}
                            onClick={() => {
                              setInnerSelectedBadge(ob);
                            }}
                          >
                            {ob.labelTextTwoBadge}
                          </sup>
                        ) : (
                          <></>
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
              onClick={() => setIsListSelectExpanded((state) => !state)}
              className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}
            >
              {isListSelectExpanded && innerSelectedBadge !== '' ? (
                <ExpandLess className={'showLessMoreListIcon'} />
              ) : (
                <ExpandMore className={'showLessMoreListIcon'} />
              )}
            </div>
          </div>
        </div>
        {isListSelectExpanded && innerSelectedBadge !== '' && (
          <div>
            {innerSelectedBadge.innerList.length > 0 ? (
              <>
                {innerSelectedBadge.innerList.map((associate) => {
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
          </div>
        )}
      </div>
    </>
  );
};

export default AccordianMultiListCard;
