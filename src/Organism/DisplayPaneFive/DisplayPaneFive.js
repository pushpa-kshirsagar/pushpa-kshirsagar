import React, { useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneFive.css';

export const DisplayPaneFive = () => {
  const [isQuestionFlaged, setIsQuestionFlaged] = useState(false);
  const flagQuestion = () => {
    setIsQuestionFlaged((state) => !state);
  };

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="five"
          headerOne="Career Search"
          headerOneBadgeOne=""
          headerPanelColour="green"
        />
      </div>
      <div className="containerPadding displayPaneFive-main-container">
        <div className="containerPadding sticky-header">
          <div style={{ height: '50px', padding: '0 5px', display: 'flex' }}>
            <div style={{ flex: '2' }} className="flex-center">
              <span style={{ fontWeight: 'bold' }}> 1 / 60 </span>
            </div>
            <div style={{ flex: '1' }} className="flex-center">
              <span style={{ fontWeight: 'bold' }}> 3 </span>
            </div>
            <div style={{ flex: '1' }} className="flex-center">
              <IconButton>
                <RefreshIcon style={{ width: '20px', height: '20px', color: 'black' }} />
              </IconButton>
            </div>
            <div style={{ flex: '1' }} className="flex-center"></div>
            <div style={{ flex: '1' }} className="flex-center">
              <IconButton onClick={flagQuestion} className={'assessmentFlagButton'}>
                {isQuestionFlaged ? (
                  <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
                ) : (
                  <i className="far fa-flag"></i>
                )}
              </IconButton>
            </div>
          </div>
          <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DisplayPaneFive;
