import React from 'react';
import Paper from '@material-ui/core/Paper';
import { InputLabel,ListItem } from '@material-ui/core';
import './List.css';

const List =(props)=>{
  const {description="null"}=props;
  return(
    <div className={'containerPadding'}>
      <div className={'dossierContainerTop'}>
       <Paper className={['iguru-componentinnerdiv','noTextTranform'].join(' ')} >
                    <ListItem className={'leftNavButton'}>
                    <div className={'iguru-cardContentMidPanel'} onClick={()=>{}} >
                    <div className={['midPaneInformation',description==null|| description=='' ?'aliasmiddle':null].join(' ')} >
                      name
                    </div>
                    {description!=null ?
                    <div className={'midPaneLabel'} >
                   {description}
                </div>:null}
                </div>
                <div className={'unitFlex'}>
                  <span className={['unitFlex','assessmenetStatusText','AssesseeNotifyStatus'].join(' ')} style={{textAlign: 'center'}}>
                  {/* <Notifications style={{right:'0px'}} className={classes.selectionIcon}/> */}
                  <InputLabel className={['iconsFooterLabelDefault','AssesseeNotifyStatusLabel'].join(' ')}> {'active'}</InputLabel>
                  </span> 
                  </div>
                <div className={'dashboardImage'}>
                  <div className={'unitFlex'}>
                  {/* <div className={classes.iconBoxFooter1}>
                    <Tooltip title="hierarchy" aria-label="hierarchy">
                      <Button variant="fab" mini className={classNames(classes.iconsFooterRight)}> <img alt="Anonymous" src={"images/account_tree.svg"} className={classNames(classes.selectionIcon1)} onClick={()=>{setToggleTreeList(2)}} /></Button>
                    </Tooltip>
                    </div> */}
                  </div>
               </div>
               </ListItem>
                </Paper>
    </div>
    </div>
  );
};

export default List;