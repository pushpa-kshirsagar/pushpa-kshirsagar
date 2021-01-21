import React from 'react';
// import PropTypes from 'prop-types';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  InputLabel,
  Input
} from '@material-ui/core';
import { ExpansionPanel, IconButton } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
// import List from '../List/List';
import './Accordian.css';

const Accordian = (props) => {
  const {
    isDisplayCardExpanded,
    mode = 'revise',
    headerOne,
    labelTextOneOne,
    labelTextOneOneBadgeOne,
    isListSelect,
    labelTextOneOneBadgeTwo,
    isListSelectExpanded,
    labelTextOneOneBadgeThree,
    labelTextOneOneBadgeFour,
    IconOne,
    IconTwo,
    textOneOne
    // allData
  } = props;
  return (
    <div className={'containerPadding'}>
      <ExpansionPanel expanded={isDisplayCardExpanded} className={'dossierContainerTop'}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore className={'inputText'} />}
          className={[
            'dossierBg',
            'expansionHeader',
            isDisplayCardExpanded ? 'expandedPanel' : ''
          ].join(' ')}
        >
          <div className={'accordianLabelPadding'}>
            <div>{headerOne}</div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={'accordionDetails'}>
          <div className={'detailsContactContainer'}>
            <div className={'detsailsPadding'}>
              <div className={['FormBox', 'detailsHeight'].join(' ')}>
                <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
                  <InputLabel
                    htmlFor="name-input"
                    className={[
                      'textForLabel',
                      'textForLabelRight',
                      'careerLabelRight',
                      isListSelect ? 'careerLabelRighttransform' : null
                    ].join(' ')}
                  >
                    <span className={mode === 'revise' ? 'linkText' : ''}>{labelTextOneOne}</span>
                    {labelTextOneOneBadgeOne ? <sup>{labelTextOneOneBadgeOne}</sup> : null}
                    {labelTextOneOneBadgeTwo ? <sup>{labelTextOneOneBadgeTwo}</sup> : null}
                    {labelTextOneOneBadgeThree ? <sup>{labelTextOneOneBadgeThree}</sup> : null}
                    {labelTextOneOneBadgeFour ? <sup>{labelTextOneOneBadgeFour}</sup> : null}
                  </InputLabel>
                  {isListSelect ? null : (
                    <Input
                      className={'inputText'}
                      id="name-dn-input"
                      value={textOneOne}
                      disableUnderline={true}
                      readOnly
                    />
                  )}
                </FormControl>
                <div className={'unitFlex'}></div>
                {isListSelect ? (
                  <div className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}>
                    {isListSelectExpanded ? (
                      <ExpandLess className={'showLessMoreListIcon'} />
                    ) : (
                      <ExpandMore className={'showLessMoreListIcon'} />
                    )}
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
            {/* {isListSelect && isListSelectExpanded ? <List name={'name'} /> : null} */}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Accordian;

// {allData.map((item) => (
//   <ExpansionPanel expanded={isDisplayCardExpanded} className={'dossierContainerTop'}>
//     <ExpansionPanelSummary
//       expandIcon={<ExpandMore className={'inputText'} />}
//       className={[
//         'dossierBg',
//         'expansionHeader',
//         item.isDisplayCardExpanded ? 'expandedPanel' : ''
//       ].join(' ')}
//     >
//       <div className={'accordianLabelPadding'}>
//         <div>{item.headerOne}</div>
//       </div>
//     </ExpansionPanelSummary>
//     <ExpansionPanelDetails className={'accordionDetails'}>
//       <div className={'detailsContactContainer'}>
//         {item.dataTwo.map((itemdata) =>(
//         <div className={'detsailsPadding'}>
//           <div className={['FormBox', 'detailsHeight'].join(' ')}>
//             <FormControl className={['formControlReviewName', 'formControlRight'].join(' ')}>
//               <InputLabel
//                 htmlFor="name-input"
//                 className={[
//                   'textForLabel',
//                   'textForLabelRight',
//                   'careerLabelRight',
//                   itemdata.isListSelect ? 'careerLabelRighttransform' : null
//                 ].join(' ')}
//               >
//                 <span className={mode == 'revise' ? 'linkText' : ''}>{itemdata.labelTextOne}</span>
//                 {itemdata.labelTextOneBadgeOne ? <sup>{itemdata.labelTextOneBadgeOne}</sup> : null}
//                 {itemdata.labelTextOneBadgeTwo ? <sup>{itemdata.labelTextOneBadgeTwo}</sup> : null}
//               </InputLabel>
//               {itemdata.isListSelect ? null : (
//                 <Input
//                   className={'inputText'}
//                   id="name-dn-input"
//                   value={textOne}
//                   disableUnderline={true}
//                   readOnly
//                 />
//               )}
//             </FormControl>
//             <div className={'unitFlex'}></div>
//             {itemdata.isListSelect ? (
//               <div className={['unitFlex', 'careerLabelRight', 'showLessMoreList'].join(' ')}>
//                 {itemdata.isListSelectExpanded ? (
//                   <ExpandLess className={'showLessMoreListIcon'} />
//                 ) : (
//                   <ExpandMore className={'showLessMoreListIcon'} />
//                 )}
//               </div>
//             ) : (
//               <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
//                 <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
//                   <IconButton>
//                     <IconOne />
//                   </IconButton>
//                 </div>
//                 <div className={['unitFlex', 'verifiedUser', 'verifiedUserTop'].join(' ')}>
//                   <IconButton>
//                     <IconTwo />
//                   </IconButton>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         ) )}
//         </div>
//     </ExpansionPanelDetails>
//   </ExpansionPanel>
// ))}
