import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import Clear from '@material-ui/icons/Clear';
// import Check from '@material-ui/icons/Check';
// import Previous from '@material-ui/icons/ArrowBack';
const PicturePopup = (props) => {
  // const {
  //   isActive,
  //   headerOne,
  //   headerOneBadgeOne,
  //   headerOneBadgeTwo,
  //   headerOneBadgeThree,
  //   close,
  //   headerPanelColour = 'green',
  //   children
  // } = props;

  return (
    <div>
      <Popup isActive={true}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'assessees'}
          headerOneBadgeOne={'information'}
        />
        <DialogContent className={'popupContent'}>
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button className={'optionPrimary'} data-value="create">
                    create
                  </Button>
                </div>
                <div>
                  <Button className={'optionPrimary'} data-value="review">
                    review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PicturePopup;
