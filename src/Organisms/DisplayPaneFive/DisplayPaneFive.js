import React, { useState } from 'react';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PANE_THREE_ITEM_PREVIEW_MODE } from '../../actionType';
import Label from '../../Atoms/Label/Label';

export const DisplayPaneFive = () => {
  const dispatch = useDispatch();
  const closePreview = () => {
    dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane=""
          headerOne=""
          headerOneBadgeOne=""
          headerPanelColour="blue"
        />
      </div>
      <div>
        <button onClick={closePreview}>close</button>
        <Label />
      </div>
    </>
  );
};

export default DisplayPaneFive;
