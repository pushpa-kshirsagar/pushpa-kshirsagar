import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import './DisplayPanelAccordian.css';
import { useSelector } from 'react-redux';

const DisplayPanelAccordianInformation = (props) => {
  const { mode = '', accordianObject, onClickRevise, onClickReview, isPermission = false } = props;
  const { responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    labelTextOneOne = '',
    labelTextOneOneBadges = [],
    IconOne,
    IconTwo,
    textOneOne = '',
    multiline = false,
    isMultiInfoCard = false,
    isReviewLink = false
  } = accordianObject;
  const [selectedBadge, setSelectedBadge] = useState('');
  const [information, setInformation] = useState('');
  const [selectedBadgeArray, setSelectedBadgeArray] = useState([]);
  const reviewLabelClass = isReviewLink ? 'reviewLinkText' : '';

  useEffect(() => {
    if (
      labelTextOneOneBadges[0]?.labelTextOneOneBadge === 'primary' ||
      labelTextOneOneBadges[0]?.labelTextOneOneBadge === ''
    ) {
      setSelectedBadge(labelTextOneOneBadges[0]);
    }
  }, [responseObject]);

  return (
    <>
      {isMultiInfoCard ? (
        <>
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
                      className={['textForLabel', 'textForLabelRight', 'careerLabelRight'].join(
                        ' '
                      )}
                    >
                      <span
                        style={{
                          marginBottom: labelTextOneOneBadges.length > 0 ? '0' : '5px',
                          display: 'inline-block'
                        }}
                        className={mode === 'revise' ? 'linkText' : reviewLabelClass}
                        onClick={
                          mode === 'revise'
                            ? (e) => {
                                onClickRevise(e, selectedBadgeArray, selectedBadge);
                              }
                            : (e) => {
                                onClickReview(e);
                              }
                        }
                        data-value={labelTextOneOne}
                        data-key={selectedBadge?.labelTextTwoBadge || ''}
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
                      {selectedBadgeArray.length > 0 &&
                        selectedBadgeArray.map((val,i) => {
                          return (
                            <sup
                              key={`badge-sign-in${i}`}
                              style={{
                                backgroundColor: '#F2F2F2'
                              }}
                              onClick={() => {
                                // console.log('listtt');
                                setSelectedBadge('');
                                setInformation('');
                                let removeLastOb = selectedBadgeArray.slice(0, -1);
                                setSelectedBadgeArray(removeLastOb);
                              }}
                            >
                              {val.labelTextTwoBadge}
                            </sup>
                          );
                        })}
                      {selectedBadgeArray.length > 0 ? (
                        <>
                          {selectedBadgeArray[
                            selectedBadgeArray.length - 1
                          ].innerLabelBadgeList.map((ob, key) => {
                            return (
                              <>
                                {ob.labelTextTwoBadge !== '' ? (
                                  <sup
                                    key={`badge-${key}`}
                                    style={{
                                      backgroundColor:
                                        selectedBadge &&
                                        selectedBadge.labelTextTwoBadge === ob.labelTextTwoBadge
                                          ? '#F2F2F2'
                                          : '#ffffff'
                                    }}
                                    onClick={(e) => {
                                      if (Array.isArray(ob.innerLabelBadgeList)) {
                                        setSelectedBadgeArray((state) => {
                                          return [...state, ob];
                                        });
                                      } else {
                                        setSelectedBadge(ob);
                                        setInformation(ob.innerLabelInformation);
                                      }
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
                        </>
                      ) : (
                        <>
                          {labelTextOneOneBadges.map((ob, key) => {
                            return (
                              <>
                                {ob.labelTextTwoBadge !== '' ? (
                                  <sup
                                    key={`badge-${key}`}
                                    style={{
                                      backgroundColor:
                                        selectedBadge &&
                                        selectedBadge.labelTextTwoBadge === ob.labelTextTwoBadge
                                          ? '#F2F2F2'
                                          : '#ffffff'
                                    }}
                                    onClick={() => {
                                      console.log('HERE===', ob);
                                      if (Array.isArray(ob.innerLabelBadgeList)) {
                                        setSelectedBadgeArray((state) => {
                                          return [...state, ob];
                                        });
                                      } else {
                                        console.log('LIST==', ob);
                                        setSelectedBadge(ob);
                                      }
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
                        </>
                      )}
                    </InputLabel>
                    {textOneOne ||
                      (selectedBadge && selectedBadge.innerLabelBadgeList && (
                        <Input
                          multiline={
                            multiline &&
                            selectedBadge.innerLabelBadgeList &&
                            selectedBadge.innerLabelBadgeList.length > 40
                          }
                          // row={multiline ? 2 : 1}
                          row={2}
                          rowsMax={
                            multiline &&
                            selectedBadge.innerLabelBadgeList &&
                            selectedBadge.innerLabelBadgeList.length > 40
                              ? 4
                              : 1
                          }
                          className={'inputText'}
                          id="name-dn-input"
                          value={selectedBadge?.innerLabelBadgeList || 'No'}
                          disableUnderline={true}
                          readOnly
                        />
                      ))}
                  </div>
                </div>
                <div className={'unitFlex'}>
                  {isPermission && information ? (
                    <span
                      className={[
                        'unitFlex',
                        'iconsFooterLabelDefault',
                        'AssesseeNotifyStatus'
                      ].join(' ')}
                      style={{ textAlign: 'center' }}
                    >
                      {information}
                      <InputLabel
                        className={['iconsFooterLabelDefault', 'AssesseeNotifyStatusLabel'].join(
                          ' '
                        )}
                      >
                        {'information'}
                      </InputLabel>
                    </span>
                  ) : null}
                </div>
                <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                  {selectedBadge?.IconOne ? (
                    <>
                      <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                        <IconButton
                          onClick={
                            mode === 'revise'
                              ? () => {
                                  onClickReview(
                                    labelTextOneOne,
                                    selectedBadge?.labelTextOneOneBadge || ''
                                  );
                                }
                              : () => {
                                  onClickReview(
                                    labelTextOneOne,
                                    selectedBadge?.labelTextOneOneBadge || ''
                                  );
                                }
                          }
                        >
                          <selectedBadge.IconOne />
                        </IconButton>
                      </div>
                    </>
                  ) : (
                    <>
                      {IconOne && (
                        <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                          <IconButton
                          style={{display: mode === 'revise'? 'block' : 'none'}}
                          data-key={'reset'}
                          data-value={labelTextOneOne}
                            onClick={
                              mode === 'revise'
                                ? (e) => {                                  
                                  onClickRevise(e,'',
                                    //selectedBadge?.labelTextOneOneBadge || ''
                                    )
                                    //onClickReview(e);
                                  }
                                : () => {
                                    onClickReview(
                                      labelTextOneOne,
                                      selectedBadge?.labelTextOneOneBadge || ''
                                    );
                                  }
                            }
                          >
                            <IconOne />
                          </IconButton>
                        </div>
                      )}
                    </>
                  )}
                  {selectedBadge.IconTwo ? (
                    <>
                      <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                        <IconButton>
                          <selectedBadge.IconTwo />
                        </IconButton>
                      </div>
                    </>
                  ) : (
                    <>
                      {IconTwo && (
                        <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                          <IconButton>
                            <IconTwo />
                          </IconButton>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
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
                      className={mode === 'revise' ? 'linkText' : reviewLabelClass}
                      onClick={mode === 'revise' ? onClickRevise : onClickReview}
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
                {selectedBadge?.IconOne ? (
                  <>
                    <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                      <IconButton
                        onClick={
                          mode === 'revise'
                            ? () => {
                                onClickReview(
                                  labelTextOneOne,
                                  selectedBadge?.labelTextOneOneBadge || ''
                                );
                              }
                            : () => {
                                onClickReview(
                                  labelTextOneOne,
                                  selectedBadge?.labelTextOneOneBadge || ''
                                );
                              }
                        }
                      >
                        <selectedBadge.IconOne />
                      </IconButton>
                    </div>
                  </>
                ) : (
                  <>
                    {IconOne && (
                      <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                        <IconButton
                          onClick={
                            mode === 'revise'
                              ? () => {
                                  onClickReview(
                                    labelTextOneOne,
                                    selectedBadge?.labelTextOneOneBadge || ''
                                  );
                                }
                              : () => {
                                  onClickReview(
                                    labelTextOneOne,
                                    selectedBadge?.labelTextOneOneBadge || ''
                                  );
                                }
                          }
                        >
                          <IconOne />
                        </IconButton>
                      </div>
                    )}
                  </>
                )}
                {selectedBadge.IconTwo ? (
                  <>
                    <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                      <IconButton>
                        <selectedBadge.IconTwo />
                      </IconButton>
                    </div>
                  </>
                ) : (
                  <>
                    {IconTwo && (
                      <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                        <IconButton>
                          <IconTwo />
                        </IconButton>
                      </div>
                    )}
                  </>
                )}
                {/* {IconOne && (
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
                  <IconOn
                  e />
                </IconButton>
              </div>
            )} */}
                {/* {IconTwo && (
              <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                <IconButton>
                  <IconTwo />
                </IconButton>
              </div>
            )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayPanelAccordianInformation;
