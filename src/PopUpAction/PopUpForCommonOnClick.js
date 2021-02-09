import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_NEXT_POPUP,
} from '../actionType';
const PopUpForCommonOnClick = () => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();

 
  return (
    <div>
 
    </div>
  );
};

export default PopUpForCommonOnClick;
