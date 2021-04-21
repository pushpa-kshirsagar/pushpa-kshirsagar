import React, { useState } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import { FormControl, InputLabel } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './Accordian.css';

const AccordianListCard = (props) => {
  const { accordianObject, mode = '', onClickRevise } = props;
  const {
    labelTextOneOne = '',
    labelTextOneOneBadgeOne = '',
    labelTextOneOneBadgeTwo = '',
    labelTextOneOneBadgeThree = '',
    labelTextOneOneBadgeFour = '',
    innerAssociateList = [],
    innerInfo = 'No Information'
  } = accordianObject;

  const [isListSelectExpanded, setIsListSelectExpanded] = useState(false);

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
                  onClick={onClickRevise}
                  data-value={labelTextOneOne}
                  className={mode === 'revise' ? 'linkText' : ''}
                >
                  {labelTextOneOne}
                </span>
                {labelTextOneOneBadgeOne ? <sup>{labelTextOneOneBadgeOne}</sup> : null}
                {labelTextOneOneBadgeTwo ? <sup>{labelTextOneOneBadgeTwo}</sup> : null}
                {labelTextOneOneBadgeThree ? <sup>{labelTextOneOneBadgeThree}</sup> : null}
                {labelTextOneOneBadgeFour ? <sup>{labelTextOneOneBadgeFour}</sup> : null}
              </InputLabel>
            </FormControl>
            <div className={'unitFlex'}></div>
            <div
              onClick={() => setIsListSelectExpanded((state) => !state)}
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
            {innerAssociateList.length > 0 ? (
              <>
                {innerAssociateList.map((associate) => {
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
