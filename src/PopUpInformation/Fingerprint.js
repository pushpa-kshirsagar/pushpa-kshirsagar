import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import Previous from '@material-ui/icons/ArrowBack';
import { Avatar, DialogContent, DialogTitle, Paper } from '@material-ui/core';

class Fingerprint extends Component {
  constructor() {
    super();
    this.state = {
      secondpopup: false,
      secondpopupheader: '',
      imgsrc: '',
      fingernumber: ''
    };
    this.openSecondPopup = this.openSecondPopup.bind(this);
    this.goBack = this.goBack.bind(this);
    this.sortByKeyDesc = this.sortByKeyDesc.bind(this);
  }

  openSecondPopup(value, src, title) {
    this.setState({
      secondpopup: true,
      secondpopuphaeder: value,
      imgsrc: src,
      fingernumber: title
    });
  }

  goBack() {
    this.setState({
      secondpopup: false
    });
  }

  sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  render() {
    const { classes } = this.props;
    let assesseeLeftFingerPrint = this.sortByKeyDesc(this.props.assesseeLeftFingerPrint, 'count');
    let assesseeRightFingerPrint = this.sortByKeyDesc(this.props.assesseeRightFingerPrint, 'count');

    const leftFingerArea = [
      {
        title: '1',
        headerTitle: 'left hand 1',
        fingerImg:
          assesseeLeftFingerPrint[0] !== undefined
            ? 'data:image/png;base64,' + assesseeLeftFingerPrint[0].fingerprint
            : null,
        coords: '2,129,54,170'
      },
      {
        title: '2',
        headerTitle: 'left hand 2',
        fingerImg:
          assesseeLeftFingerPrint[1] !== undefined
            ? 'data:image/png;base64,' + assesseeLeftFingerPrint[1].fingerprint
            : null,
        coords: '75,24,118,60'
      },
      {
        title: '3',
        headerTitle: 'left hand 3',
        fingerImg:
          assesseeLeftFingerPrint[2] !== undefined
            ? 'data:image/png;base64,' + assesseeLeftFingerPrint[2].fingerprint
            : null,
        coords: '121,1,163,31'
      },
      {
        title: '4',
        headerTitle: 'left hand 4',
        fingerImg:
          assesseeLeftFingerPrint[3] !== undefined
            ? 'data:image/png;base64,' + assesseeLeftFingerPrint[3].fingerprint
            : null,
        coords: '168,10,208,40'
      },
      {
        title: '5',
        headerTitle: 'left hand 5',
        fingerImg:
          assesseeLeftFingerPrint[4] !== undefined
            ? 'data:image/png;base64,' + assesseeLeftFingerPrint[4].fingerprint
            : null,
        coords: '211,39,249,69'
      }
    ];
    console.log(leftFingerArea);

    const rightFingerArea = [
      {
        title: '1',
        headerTitle: 'right hand 1',
        fingerImg:
          assesseeRightFingerPrint[0] != undefined
            ? 'data:image/png;base64,' + assesseeRightFingerPrint[0].fingerprint
            : null,
        coords: '210,134,259,170'
      },
      {
        title: '2',
        headerTitle: 'right hand 2',
        fingerImg:
          assesseeRightFingerPrint[1] !== undefined
            ? 'data:image/png;base64,' + assesseeRightFingerPrint[1].fingerprint
            : null,
        coords: '139,25,180,58'
      },
      {
        title: '3',
        headerTitle: 'right hand 3',
        fingerImg:
          assesseeRightFingerPrint[2] !== undefined
            ? 'data:image/png;base64,' + assesseeRightFingerPrint[2].fingerprint
            : null,
        coords: '92,0,134,32'
      },
      {
        title: '4',
        headerTitle: 'right hand 4',
        fingerImg:
          assesseeRightFingerPrint[3] !== undefined
            ? 'data:image/png;base64,' + assesseeRightFingerPrint[3].fingerprint
            : null,
        coords: '42,10,90,44'
      },
      {
        title: '5',
        headerTitle: 'right hand 5',
        fingerImg:
          assesseeRightFingerPrint[4] !== undefined
            ? 'data:image/png;base64,' + assesseeRightFingerPrint[4].fingerprint
            : null,
        coords: '2,42,40,70'
      }
    ];

    return (
      <div>
        <DialogContent className={'popupContent'}>
          <div id="dialog-description">
            <div className="true">
              <div className={'imagePopup'} style={{ margin: 5 }}>
                {this.state.secondpopup ? (
                  // <img className={classes.fingerImg} src={this.state.imgsrc}/>
                  <Button
                    variant="fab"
                    disabled={true}
                    mini
                    className="button
                      uploadImageWidthHeight
                      iconsFooterDefault
                      unAvailable
                      imageNA"
                  >
                    <Avatar
                      alt="Anonymous"
                      src={this.state.imgsrc}
                      className={'avatar profileAvatarRight assesseeCredentialImage'}
                    />
                  </Button>
                ) : (
                  <div>
                    <img
                      className={'fingerImg'}
                      src={
                        this.props.headerLabel === 'left hand'
                          ? 'images/lhand.png'
                          : 'images/rhand.png'
                      }
                      useMap={
                        this.props.headerLabel === 'left hand' ? '#left-fingure' : '#right-fingure'
                      }
                      alt=""
                    />
                    <map
                      name={
                        this.props.headerLabel === 'left hand' ? '#left-fingure' : '#right-fingure'
                      }
                      className={'imageMap'}
                    >
                      {this.props.headerLabel === 'left hand'
                        ? leftFingerArea.map((value, index) => (
                            <area
                              alt=""
                              key={index}
                              onClick={() =>
                                this.openSecondPopup(
                                  value.headerTitle,
                                  value.fingerImg,
                                  value.title
                                )
                              }
                              coords={value.coords}
                              shape="rect"
                            />
                          ))
                        : rightFingerArea.map((value, index) => (
                            <area
                              alt=""
                              key={index}
                              onClick={() =>
                                this.openSecondPopup(
                                  value.headerTitle,
                                  value.fingerImg,
                                  value.title
                                )
                              }
                              coords={value.coords}
                              shape="rect"
                            />
                          ))}
                    </map>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    );
  }
}

Fingerprint.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Fingerprint;
