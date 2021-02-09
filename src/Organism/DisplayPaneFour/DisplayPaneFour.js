import React from 'react';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import CrossIcon from '@material-ui/icons/Clear';
import './DisplayPaneFour.css';
import Card from '../../Molecules/Card/Card';

export const DisplayPaneFour = () => {
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="left"
          headerOne="dashboard"
          headerOneBadgeOne=""
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
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
      </div>
    </>
  );
};

export default DisplayPaneFour;
