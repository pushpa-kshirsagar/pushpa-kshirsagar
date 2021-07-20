import React, { useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFour.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PANE_THREE_PREVIEW_MODE } from '../../actionType';

export const DisplayPaneFour = () => {
  const dispatch = useDispatch();
  const {
    previewHeaderOne = '',
    previewHeaderOneBadgeOne = '',
    previewHeaderOneBadgeTwo = '',
    previewHeaderOneBadgeThree = '',
    previewInnerHTML = ''
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const onClickClearInfo = () => {
    dispatch({
      type: SET_PANE_THREE_PREVIEW_MODE,
      payload: {
        isPreviewShow: false,
        previewHeaderOne: '',
        previewHeaderOneBadgeOne: '',
        previewHeaderOneBadgeTwo: '',
        previewHeaderOneBadgeThree: '',
        previewInnerHTML: ''
      }
    });
  };

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="right"
          headerOne={previewHeaderOne}
          headerOneBadgeOne={previewHeaderOneBadgeOne}
          headerOneBadgeTwo={previewHeaderOneBadgeTwo}
          headerOneBadgeThree={previewHeaderOneBadgeThree}
          headerPanelColour="green"
          onClickClearInfo={onClickClearInfo}
          showClearIcon={true}
        />
      </div>
      <div className="containerPadding">
        <>
          <div
            style={{
              // height: '50px',
              padding: '2.5px 5px',
              alignItems: 'center'
              // display: 'flex'
            }}
            dangerouslySetInnerHTML={{ __html: previewInnerHTML }}
          ></div>
        </>
      </div>
    </>
  );
};

export default DisplayPaneFour;
