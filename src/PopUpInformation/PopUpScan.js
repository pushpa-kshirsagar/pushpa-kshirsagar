import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_NEXT_POPUP,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT
} from '../actionType';
import PropTypes from 'prop-types';
import { FormHelperText, Input, InputLabel } from '@material-ui/core';
import { makeAssesseeScanRequestObject } from '../Actions/GenericActions';

const PopUpScan = (props) => {
  const dispatch = useDispatch();
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const {
    scanHeader,
    scanHeaderBadgeOne,
    scanHeaderBadgeTwo,
    typeOfMiddlePaneList,
    countPage,
    middlePaneHeaderBadgeTwo
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { isActive = true } = props;
  const { secondaryOptionCheckValue } = useSelector((state) => state.AssesseeCreateReducer);
  const [state, setState] = useState({
    scanValue: ''
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      scanValue: event.target.value
    }));
  };
  const handleClick = () => {
    /*according to seacrh will change*/
    if(state.scanValue !== ''){
      if (typeOfMiddlePaneList === 'assesseeDistinctReviewList') {
        let requestObect = makeAssesseeScanRequestObject(
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: SET_PAGE_COUNT, payload: 1 });
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: ASSESSEE_REVIEW_DISTINCT_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: 'distinct',
            BadgeTwo: middlePaneHeaderBadgeTwo
          }
        });
        dispatch({ type: ASSESSEE_INFO_CREATE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assesseeRelatedAssociate') {
        console.log(typeOfMiddlePaneList);
      }
    }
   
    dispatch({ type: POPUP_CLOSE });
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={'displayPaneCentre'}
          headerOne={scanHeader}
          headerOneBadgeOne={scanHeaderBadgeOne}
          headerOneBadgeTwo={scanHeaderBadgeTwo}
          headerOneBadgeThree={''}
          mode={'search'}
          onClick={handleClick}
        />

        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={'scan'}
              label={'scan'}
              labelBadgeOne={''}
              isRequired={false}
              value={state.scanValue}
              classNames={'scanInputFields'}
              onClick={handleChange}
            />
            <FormHelperText className={['aliasName', 'helptextmargin'].join(' ')}>
              {isPopUpValue === 'assesseeDistinctReviewList' && (
                <span>name, alias, email address, mobile telephone, tag.</span>
              )}
              {isPopUpValue === 'assesseeRelatedAssociate' && (
                <span>name, description, website address, tag.</span>
              )}
            </FormHelperText>
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpScan.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUpScan;
