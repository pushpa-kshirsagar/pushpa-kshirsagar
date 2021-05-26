import React, { useEffect, useState } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import { FormControl, InputLabel } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './Accordian.css';
import { useSelector } from 'react-redux';

const AccordianListCard = (props) => {
  const { accordianObject, mode = '', onClickRevise, onClickReview = null } = props;
  const { responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    labelTextOneOne = '',
    innerInfo = 'No Information',
    labelTextOneOneBadges,
    isReviewLink = false
  } = accordianObject;

  const [isListSelectExpanded, setIsListSelectExpanded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('');
  const reviewLabelClass = isReviewLink ? 'reviewLinkText' : '';
  useEffect(() => {
    if (labelTextOneOneBadges[0].labelTextOneOneBadge === 'primary') {
      setSelectedBadge(labelTextOneOneBadges[0]);
    }
  }, [responseObject]);

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
          </div>
        )}
      </div>
    </>
  );
};

export default AccordianListCard;
