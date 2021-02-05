import React from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import './Accordian.css';

const AccordianInfoCard = (props) => {
  const { mode = '', accordianObject } = props;
  const {
    labelTextOneOne = '',
    labelTextOneOneBadgeOne = '',
    labelTextOneOneBadgeTwo = '',
    labelTextOneOneBadgeThree,
    labelTextOneOneBadgeFour = '',
    IconOne,
    IconTwo,
    textOneOne = '',
    multiline = false
  } = accordianObject;

  return (
    <div className={'detailsContactContainer'}>
      <div className={'detsailsPadding'}>
        <div
          style={{ height: multiline ? '105px' : '50px' }}
          className={['FormBox', 'detailsHeight'].join(' ')}
        >
          <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
            <InputLabel
              htmlFor="name-input"
              className={['textForLabel', 'textForLabelRight', 'careerLabelRight'].join(' ')}
            >
              <span style={{ fontSize: '1.6rem' }} className={mode === 'revise' ? 'linkText' : ''}>
                {labelTextOneOne}
              </span>
              {labelTextOneOneBadgeOne ? <sup>{labelTextOneOneBadgeOne}</sup> : null}
              {labelTextOneOneBadgeTwo ? <sup>{labelTextOneOneBadgeTwo}</sup> : null}
              {labelTextOneOneBadgeThree ? <sup>{labelTextOneOneBadgeThree}</sup> : null}
              {labelTextOneOneBadgeFour ? <sup>{labelTextOneOneBadgeFour}</sup> : null}
            </InputLabel>
            {textOneOne && (
              <Input
                multiline={multiline}
                // row={multiline ? 2 : 1}
                row={2}
                rowsMax={multiline ? 4 : 1}
                className={'inputText'}
                id="name-dn-input"
                value={textOneOne}
                disableUnderline={true}
                readOnly
              />
            )}
          </FormControl>
          <div className={'unitFlex'}></div>
          <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
            {IconOne && (
              <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                <IconButton>
                  <IconOne />
                </IconButton>
              </div>
            )}
            {IconTwo && (
              <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                <IconButton>
                  <IconTwo />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianInfoCard;
