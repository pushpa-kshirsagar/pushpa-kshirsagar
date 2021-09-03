import React from 'react';
import { Avatar, Dialog } from '@material-ui/core';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { POPUP_CLOSE } from '../actionType';

const PicturePreview = (props) => {
  const { isActive, imageOne, dispatch } = props;
  return (
    <div>
      <Dialog
        open={isActive}
        className={'loaderimg'}
        disableEscapeKeyDown={true}
        onClose={() => {
          dispatch({ type: POPUP_CLOSE });
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div style={{ zIndex: '99999999' }}>
          {/* <img src={Loading} alt={'...'} /> */}
          <Avatar alt="" src={imageOne} variant="rounded" className={'rounded'} />
        </div>
      </Dialog>
    </div>
  );
};

PicturePreview.propTypes = {
  className: PropTypes.string
};

export default PicturePreview;
