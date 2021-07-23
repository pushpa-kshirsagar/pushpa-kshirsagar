import React from 'react';
import { ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { ExpansionPanel } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import './DisplayPanelAccordian.css';

export const AccordianHeader = (props) => {
  const { isDisplayCardExpanded, headerOne, children, setListExpand } = props;

  return (
    <ExpansionPanel
      expanded={isDisplayCardExpanded}
      style={{ padding: '0', width: '100%', boxSizing: 'border-box' }}
      className={'dossierContainerTop'}
    >
      <div
        onClick={() => {
          setListExpand((state) => {
            if (headerOne === state) {
              return '';
            } else {
              return headerOne;
            }
          });
        }}
        className="hover-bg-color"
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMore style={{ margin: '0' }} className={'inputText'} />}
          className={[
            'dossierBg',
            'expansionHeader',
            isDisplayCardExpanded ? 'expandedPanel' : ''
          ].join(' ')}
        >
          <div>
            <div>{headerOne}</div>
          </div>
        </ExpansionPanelSummary>
      </div>
      <ExpansionPanelDetails className={'accordionDetails'}>
        <div style={{ width: '100%' }}>{children}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default AccordianHeader;
