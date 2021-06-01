import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import './Accordian.css';
import { useSelector } from 'react-redux';

const AccordianInfoCard = (props) => {
  const { mode = '', accordianObject, onClickRevise, onClickReview } = props;
  const { responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    labelTextOneOne = '',
    labelTextOneOneBadges = [],
    labelTextOneOneBadgeOne = '',
    labelTextOneOneBadgeTwo = '',
    labelTextOneOneBadgeThree,
    labelTextOneOneBadgeFour = '',
    IconOne,
    IconTwo,
    textOneOne = '',
    multiline = false
  } = accordianObject;
  const [selectedBadge, setSelectedBadge] = useState('');
  useEffect(() => {
    if (
      labelTextOneOneBadges[0]?.labelTextOneOneBadge === 'primary' ||
      labelTextOneOneBadges[0]?.labelTextOneOneBadge === ''
    ) {
      setSelectedBadge(labelTextOneOneBadges[0]);
    }
  }, [responseObject]);

  return (
    <div className={'detailsContactContainer'}>
      <div className={'detsailsPadding'}>
        <div
          style={{
            height:
              multiline &&
              selectedBadge &&
              selectedBadge.textOne &&
              selectedBadge.textOne.length > 40
                ? '105px'
                : '50px'
          }}
          className={['FormBox', 'detailsHeight'].join(' ')}
        >
          <div className={['formControlReviewName', 'formControlRight'].join(' ')}>
            <div style={{ width: '100%' }}>
              <InputLabel
                htmlFor="name-input"
                className={['textForLabel', 'textForLabelRight', 'careerLabelRight'].join(' ')}
              >
                <span
                  style={{
                    marginBottom: labelTextOneOneBadges.length > 0 ? '0' : '5px',
                    display: 'inline-block'
                  }}
                  className={mode === 'revise' ? 'linkText' : ''}
                  onClick={mode === 'revise' ? onClickRevise : () => {}}
                  data-value={labelTextOneOne}
                  data-key={selectedBadge?.labelTextOneOneBadge || ''}
                >
                  {labelTextOneOne}
                </span>
                {labelTextOneOne === 'sign-in' && (
                  <sup
                    key={`badge-sign-in`}
                    style={{
                      backgroundColor: '#F2F2F2'
                    }}
                  >
                    credential
                  </sup>
                )}
                {labelTextOneOneBadges.map((ob, key) => {
                  return (
                    <>
                      {ob.labelTextOneOneBadge !== '' ? (
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
              {textOneOne ||
                (selectedBadge && selectedBadge.textOne && (
                  <Input
                    multiline={
                      multiline && selectedBadge.textOne && selectedBadge.textOne.length > 40
                    }
                    // row={multiline ? 2 : 1}
                    row={2}
                    rowsMax={
                      multiline && selectedBadge.textOne && selectedBadge.textOne.length > 40
                        ? 4
                        : 1
                    }
                    className={'inputText'}
                    id="name-dn-input"
                    value={(selectedBadge && selectedBadge.textOne) || textOneOne}
                    disableUnderline={true}
                    readOnly
                  />
                ))}
            </div>
          </div>
          <div className={'unitFlex'}></div>
          <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
            {IconOne && (
              <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                <IconButton
                  onClick={
                    mode === 'revise'
                      ? () => {}
                      : () => {
                          onClickReview(labelTextOneOne, selectedBadge?.labelTextOneOneBadge || '');
                        }
                  }
                >
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
