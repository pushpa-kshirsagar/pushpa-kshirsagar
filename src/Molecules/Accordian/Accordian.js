import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  InputLabel,
  Input
} from '@material-ui/core';
import { ExpansionPanel,IconButton } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import List from '../List/List';
import './Accordian.css';
const Accordian = (props) => {
  const { isDisplayCardExpanded, mode = 'revise', headerLabel,textOneLabel, textOneLabelBadgeOne, isTextList, textOneLabelBadgeTwo,isTextListExpanded, IconOne, IconTwo,textOne } = props;
  return (
    <div className={'containerPadding'} >
      <ExpansionPanel expanded={isDisplayCardExpanded} className={'dossierContainerTop'}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore className={'inputText'} />}
          className={['dossierBg', 'expansionHeader', isDisplayCardExpanded ? 'expandedPanel' : ''].join(' ')}
        >
          <div className={'accordianLabelPadding'}>
            <div>{headerLabel}</div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={'accordionDetails'}>
          <div className={'detailsContactContainer'}>
            <div className={'detsailsPadding'}>
              <div className={['FormBox', 'detailsHeight'].join(' ')}>
                <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
                  <InputLabel
                    htmlFor="name-input"
                    className={['textForLabel', 'textForLabelRight', 'careerLabelRight',isTextList?'careerLabelRighttransform':null].join(' ')}
                  >
                    <span className={mode == 'revise' ? 'linkText' : ''}>{textOneLabel}</span>
                    {textOneLabelBadgeOne?<sup>{textOneLabelBadgeOne}</sup>:null}
                    {textOneLabelBadgeTwo?<sup>{textOneLabelBadgeTwo}</sup>:null}
                  </InputLabel>
                  {isTextList?null:
                  <Input className={'inputText'}
                  id="name-dn-input"
                  value={textOne}
                  disableUnderline={true}
                  readOnly/>}
                </FormControl>
                <div className={'unitFlex'}></div>
                {isTextList?
                <div className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}>
                  {isTextListExpanded?<ExpandLess className={'showLessMoreListIcon'}/>:<ExpandMore className={'showLessMoreListIcon'} />}
                </div>
                :
                <div className={['unitFlex','unitFlexTop'].join(' ')}>
                <div className={['unitFlex', 'verifiedUser','verifiedUserTop'].join(' ')}>
                  <IconButton>
                       <IconOne/>
                  </IconButton>
                </div>
                <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')} >
                <IconButton>
                   <IconTwo/>
                </IconButton>
                </div>
            </div>
                }
              </div>
            </div>
            {isTextList && isTextListExpanded?
            <List name={'name'}/>
            :null}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Accordian;
