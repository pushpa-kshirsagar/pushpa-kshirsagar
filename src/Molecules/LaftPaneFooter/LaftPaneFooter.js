import React from 'react';
import { Keyboard, Description, InsertDriveFile, BusinessCenter } from '@material-ui/icons';
import IconButton from '../IconButton/IconButton';
import './LaftPaneFooter.css';

export const LaftPaneFooter = () => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: '0 5px'
      }}
    >
      <div style={{ flex: 1, textAlign: 'center' }}></div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={Keyboard} className="" colour="displayPaneLeft" label="calculator" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={Description} className="" colour="displayPaneLeft" label="manuscript" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton Icon={BusinessCenter} className="" colour="displayPaneLeft" label="toolkit" />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton
          Icon={InsertDriveFile}
          className=""
          colour="displayPaneLeft"
          label="worksheet"
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}></div>
    </div>
  );
};

export default LaftPaneFooter;
