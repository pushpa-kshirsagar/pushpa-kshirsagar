import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { ExpansionPanel } from '@material-ui/core';
import {ExpandMore , ExpandLess} from '@material-ui/icons';
import './Accordian.css';
const Accordian = (props) => {
  const { isExpanded = true, mode='revise' } = props;
  return (
    <div className={'containerPadding'}>
      <ExpansionPanel expanded={isExpanded} className={'dossierContainerTop'}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore className={'inputText'} />}
          className={[
            'dossierBg',
            'expansionHeader',
            isExpanded ? 'expandedPanel' : ''
          ].join(' ')}
        >
          <div className={'accordianLabelPadding'}>
            {' '}
            <div>allocation</div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={'accordionDetails'}>
          <div className={'detailsContactContainer'}>
            <div className={'detsailsPadding'}>
              <div className={['FormBox', 'detailsHeight'].join(' ')}>
                <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
                  <InputLabel
                    htmlFor="name-input"
                    className={['textForLabel', 'textForLabelRight', 'careerLabelRight'].join(' ')}>
                    <span className={mode == 'revise' ? 'linkText' : ''}>group</span>
                    <sup>primary</sup>
                    <sup>secondary</sup>
                  </InputLabel>
                </FormControl>
                <div className={'unitFlex'}></div>
                <div className={('unitFlex', 'careerLabelRight', 'showLessMoreList')}>
                  <ExpandLess className={'showLessMoreListIcon'} />
                </div>
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Accordian;
