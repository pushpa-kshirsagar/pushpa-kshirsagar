import React, { useState } from 'react';
import CrossIcon from '@material-ui/icons/Clear';
import './DisplayPaneSix.css';
import Card from '../../Molecules/Card/Card';
import DisplayPaneSixFooter from './DisplayPaneSixFooter';
import DisplayPaneSixHeader from './DisplayPaneSixHeader';
import { useSelector } from 'react-redux';

export const DisplayPaneSix = () => {
  // const [isDisplayPaneShow, setIsDisplayPaneShow] = useState(true);
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  return (
    <>
      <div>
        <DisplayPaneSixHeader
          className=""
          headerOne="dashboard"
          headerOneBadgeOne=""
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        {isDisplayPaneSixShow && (
          <>
            <div className="containerPadding">
              <Card IconOne={CrossIcon} className="" isIcon textOneOne="--" textTwoOne="" />
            </div>
            <div className="containerPadding">
              <div
                style={{
                  boxShadow:
                    'rgb(0 0 0 / 20%) 0px 1px 5px 0px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 3px 1px -2px',
                  height: 'calc(100vh - 232px)'
                }}
              ></div>
            </div>
            <DisplayPaneSixFooter />
          </>
        )}
      </div>
    </>
  );
};

export default DisplayPaneSix;
