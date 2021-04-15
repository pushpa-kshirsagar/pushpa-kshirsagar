import React, { useState } from 'react';
import CrossIcon from '@material-ui/icons/Clear';
import './DisplayPaneFour.css';
import Card from '../../Molecules/Card/Card';
import DisplayPaneFourFooter from './DisplayPaneFourFooter';
import DisplayPaneFourHeader from './DisplayPaneFourHeader';
import { useSelector } from 'react-redux';

export const DisplayPaneFour = () => {
  // const [isDisplayPaneShow, setIsDisplayPaneShow] = useState(true);
  const { isDisplayPaneFourShow } = useSelector((state) => state.AssessmentReducer);
  return (
    <>
      <div>
        <DisplayPaneFourHeader
          className=""
          headerOne="dashboard"
          headerOneBadgeOne=""
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        {isDisplayPaneFourShow && (
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
            <DisplayPaneFourFooter />
          </>
        )}
      </div>
    </>
  );
};

export default DisplayPaneFour;
