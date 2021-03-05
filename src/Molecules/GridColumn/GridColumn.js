import React from 'react';
import { isMobile } from 'react-device-detect';
import './GridColumn.css';

export const GridColumn = ({ isExamMode = false, columnCount }) => {
  const list = [];
  for (let i = 1; i <= columnCount; i++) {
    list.push(i);
  }
  const listPane = isMobile ? [1] : [1, 2, 3];

  return (
    <>
      {columnCount && isExamMode ? (
        <div className="grid-container">
          <div style={{ maxWidth: isMobile ? '100%' : '33.00%' }} className="grid-pane-container">
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
          {!isMobile && (
            <div className="grid-pane-container">
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
          )}
        </div>
      ) : (
        columnCount && (
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
        )
      )}
    </>
  );
};

export default GridColumn;
