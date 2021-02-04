import React, { useState } from 'react';
import {
  ExpansionPanelDetails,
  FormControl,
  InputLabel,
  Input,
  IconButton
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './Accordian.css';

const AccordianListCard = (props) => {
  const {
    mode = '',
    labelTextOneOne = '',
    labelTextOneOneBadgeOne = '',
    labelTextOneOneBadgeTwo = '',
    labelTextOneOneBadgeThree = '',
    labelTextOneOneBadgeFour = ''
  } = props;

  const [isListSelectExpanded, setIsListSelectExpanded] = useState(false);

  return (
    <div className={'containerPadding'}>
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
                <span className={mode === 'revise' ? 'linkText' : ''}>{labelTextOneOne}</span>
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
      </div>
    </div>
  );
};

export default AccordianListCard;
