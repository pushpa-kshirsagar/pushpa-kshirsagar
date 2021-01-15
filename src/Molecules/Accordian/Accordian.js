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
  const { isExpanded, mode = 'revise', header,label, labelBadgeOne, isList, labelBadgeTwo,isListOpen, IconOne, IconTwo } = props;
  return (
    <div className={'containerPadding'} >
      <ExpansionPanel expanded={isExpanded} className={'dossierContainerTop'}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore className={'inputText'} />}
          className={['dossierBg', 'expansionHeader', isExpanded ? 'expandedPanel' : ''].join(' ')}
        >
          <div className={'accordianLabelPadding'}>
            <div>{header}</div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={'accordionDetails'}>
          <div className={'detailsContactContainer'}>
            <div className={'detsailsPadding'}>
              <div className={['FormBox', 'detailsHeight'].join(' ')}>
                <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
                  <InputLabel
                    htmlFor="name-input"
                    className={['textForLabel', 'textForLabelRight', 'careerLabelRight',isList?'careerLabelRighttransform':null].join(' ')}
                  >
                    <span className={mode == 'revise' ? 'linkText' : ''}>{label}</span>
                    {labelBadgeOne?<sup>{labelBadgeOne}</sup>:null}
                    {labelBadgeTwo?<sup>{labelBadgeTwo}</sup>:null}
                  </InputLabel>
                  {isList?null:
                  <Input className={'inputText'}
                  id="name-dn-input"
                  value={'sdaasdsa'}
                  disableUnderline={true}
                  readOnly/>}
                </FormControl>
                <div className={'unitFlex'}></div>
                {isList?
                <div className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}>
                  {isListOpen?<ExpandLess className={'showLessMoreListIcon'}/>:<ExpandMore className={'showLessMoreListIcon'} />}
                </div>
                :
                <div className={['unitFlex','unitFlexTop'].join(' ')}>
                <div className={['unitFlex', 'verifiedUser','verifiedUserTop'].join(' ')}>
                  <IconButton>
                       <img alt={'img'}src={IconOne}/>
                  </IconButton>
                </div>
                <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')} >
                <IconButton>
                <img alt={'img'}src={IconTwo}/>
                </IconButton>
                </div>
            </div>
                }
              </div>
            </div>
            {isListOpen?
            <List name={'name'}/>
            :null}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Accordian;
