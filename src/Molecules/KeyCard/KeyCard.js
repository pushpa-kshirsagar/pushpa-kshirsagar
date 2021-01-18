import React from 'react';
import '../Accordian/Accordian.css';
import { Paper, FormControl, InputLabel, Input } from '@material-ui/core';
import { ExpansionPanel, IconButton } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
const KeyCard = (props) => {
  const {isListSelect, textOne, IconOne, IconTwo,labelTextOneBadgeOne,labelTextOneBadgeTwo,labelTextOne}=props;
  return (
    <div>
      <div className={'containerPadding'}>
        <Paper className={'dossierContainerTop'}>
          <div>
          <div className={'detsailsPadding'}>
              <div className={['FormBox', 'detailsHeight'].join(' ')}>
                <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
                  <InputLabel
                    htmlFor="name-input"
                    className={['textForLabel', 'textForLabelRight', 'careerLabelRight', isListSelect ? 'careerLabelRighttransform' : null].join(' ')}
                  >
                    <span>{labelTextOne}</span>
                    <sup>{labelTextOneBadgeOne}</sup>
                    <sup>{labelTextOneBadgeTwo}</sup>
                  </InputLabel>
                  {isListSelect ? null : (
                    <Input
                      className={'inputText'}
                      id="name-dn-input"
                      value={textOne}
                      disableUnderline={true}
                      readOnly
                    />
                  )}
                </FormControl>
                <div className={'unitFlex'}></div>
                {isListSelect ? (
                  <div className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}>
                    <ExpandMore className={'showLessMoreListIcon'} />
                  </div>
                ) : (
                  <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                    <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                      <IconButton>
                        <IconOne />
                      </IconButton>
                    </div>
                    <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
                      <IconButton>
                        <IconTwo />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={'detsailsPadding'}>
              <div className={['FormBox', 'detailsHeight'].join(' ')}>
                <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
                  <InputLabel
                    htmlFor="name-input"
                    className={['textForLabel', 'textForLabelRight', 'careerLabelRight'].join(' ')}
                  >
                    <span>manager</span>
                    <sup>primary</sup>
                    <sup>secondary</sup>
                  </InputLabel>
                </FormControl>
                <div className={'unitFlex'}></div>
                <div className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}>
                  <ExpandMore className={'showLessMoreListIcon'} />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default KeyCard;
