import React from 'react';
import { isMobile } from 'react-device-detect';
import './GridUI.css';

export const GridUI = () => {
  const list = [1, 2, 3, 4, 5, 6];
  const listPane = isMobile ? [1] : [1, 2, 3];
  return (
    <div className="grid-container">
      {listPane.map((pane) => {
        return (
          <div key={`${pane}-pane`} className="grid-pane-container">
            <div style={{ padding: '2.5px' }}>
              <div className="grid-inner-container">
                {list.map((label) => {
                  return (
                    <div key={label} className={label % 2 === 0 ? 'mb1g' : 'mb1b'}>
                      <p style={{ margin: '5px' }}>{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridUI;
