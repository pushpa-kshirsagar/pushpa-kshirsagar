import React from 'react';
import { Keyboard, Description, InsertDriveFile, BusinessCenter } from '@material-ui/icons';
import Communique from '@material-ui/icons/EventNote';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '../../Molecules/IconButton/IconButton';
import '../../Molecules/FooterIconTwo/FooterIconTwo.css';

export const DisplayPaneFourFooter = () => {
  return (
    <div className={'middleFooterD'}>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={Keyboard} className="" colour="displayPaneLeft" label="calculator" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={Communique} className="" colour="displayPaneLeft" label="communiqué" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={Description} className="" colour="displayPaneLeft" label="manuscript" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={BusinessCenter} className="" colour="displayPaneLeft" label="toolkit" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={AssessmentIcon} className="" colour="displayPaneLeft" label="trial" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton
          Icon={InsertDriveFile}
          className=""
          colour="displayPaneLeft"
          label="worksheet"
        />
      </div>
    </div>
  );
};

export default DisplayPaneFourFooter;
