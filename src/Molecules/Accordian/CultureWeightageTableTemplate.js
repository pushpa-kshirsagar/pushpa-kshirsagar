import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid';
import GlobalStyles from '../../globalStyles';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import Radio from 'material-ui/Radio';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class OneRowHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerPadding}>
        <Paper className={classes.assesseesContainerGreen} style={{ padding: '0px' }}>
          <div className={classes.siftComponentInnerDiv}>
            <div
              className={classes.sifSecondtHeaderDiv}
              style={{ borderTop: '1px solid white', height: '50px' }}
            >
              {this.props.row1.map((lis, index) => {
                return (
                  <span
                    className={classes.sifSecondHeaderInner}
                    style={
                      this.props.row1.length == index + 1
                        ? {
                            borderRight: '0px',
                            display: 'flex',
                            height: 'inherit',
                            alignItems: 'center'
                          }
                        : index == '0'
                        ? {
                            borderLeft: '0px',
                            display: 'flex',
                            height: 'inherit',
                            alignItems: 'center'
                          }
                        : { display: 'flex', height: 'inherit', alignItems: 'center' }
                    }
                  >
                    <span style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '1.6rem' }}>
                      <span>{lis}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

class TwoRowHeader extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerPadding}>
        <Paper className={classes.assesseesContainerGreen} style={{ padding: '0px' }}>
          <div className={classes.siftComponentInnerDiv}>
            <div className={classes.siftHeaderDiv}>
              <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{this.props.title}</span>
            </div>
            <div className={classes.sifSecondtHeaderDiv} style={{ borderTop: '1px solid white' }}>
              {this.props.row1.map((lis, index) => {
                return (
                  <span
                    className={classes.sifSecondHeaderInner}
                    style={
                      this.props.row1.length == index + 1
                        ? {
                            borderRight: '0px',
                            display: 'flex',
                            height: 'inherit',
                            alignItems: 'center'
                          }
                        : index == '0'
                        ? {
                            borderLeft: '0px',
                            display: 'flex',
                            height: 'inherit',
                            alignItems: 'center'
                          }
                        : { display: 'flex', height: 'inherit', alignItems: 'center' }
                    }
                  >
                    <span style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '1.2rem' }}>
                      <span>{lis}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

class ThreeRowHeader extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerPadding}>
        <Paper className={classes.assesseesContainerGray} style={{ padding: '0px' }}>
          <div className={classes.siftComponentInnerDiv}>
            <div className={classes.siftHeaderDiv} style={{ height: '50px' }}>
              <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{this.props.title}</span>
            </div>
            {/* <div className={classes.sifSecondtHeaderDiv} style={{borderTop:'1px solid white',display:'block !important',height:'20px'}}>
                              {this.props.row1.map((lis,index)=>{
                               return   <span  className={classes.sifSecondHeaderInner} style={this.props.row1.length==(index+1)?{borderRight:'0px',height: '20px',display:'block !important'}:index=='0'?{borderLeft:'0px',height: '20px',display:'block !important'}:{height:'20px'}}><span style={{color:'rgba(0, 0, 0, 0.87)',fontSize: '1.2rem',height: '20px',
                               alignItems:'center',
                               display: 'flex',
                               textAlign: 'center'}}><span>{lis}</span></span>
                               <span style={{color:'rgba(0, 0, 0, 0.87)',fontSize: '1rem',height: '10px',
                               alignItems:'center',
                               display: 'flex',
                               textAlign: 'center'}}><span>{index+1}</span></span>
                               </span>
                              })} 
                       </div> */}
          </div>
        </Paper>
      </div>
    );
  }
}

class FourRowHeader extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerPadding}>
        <Paper className={classes.assesseesContainerGreen} style={{ padding: '0px' }}>
          <div className={classes.siftComponentInnerDiv}>
            <div className={classes.siftHeaderDiv} style={{ height: '20px' }}>
              <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{this.props.title}</span>
            </div>
            <div
              className={classes.sifSecondtHeaderDiv}
              style={{ borderTop: '1px solid white', display: 'block !important', height: '30px' }}
            >
              {this.props.row1.map((lis, index) => {
                return (
                  <span
                    className={classes.sifSecondHeaderInner}
                    style={
                      this.props.row1.length == index + 1
                        ? { borderRight: '0px', height: '30px', display: 'block !important' }
                        : index == '0'
                        ? { borderLeft: '0px', height: '30px', display: 'block !important' }
                        : { height: '30px' }
                    }
                  >
                    <span
                      style={{
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontSize: '1rem',
                        height: '10px',
                        alignItems: 'center',
                        display: 'flex',
                        textAlign: 'center'
                      }}
                    >
                      <span>{lis}</span>
                    </span>
                    <span
                      style={{
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontSize: '1rem',
                        height: '10px',
                        alignItems: 'center',
                        display: 'flex',
                        textAlign: 'center'
                      }}
                    >
                      <span>average</span>
                    </span>
                    <span
                      style={{
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontSize: '1rem',
                        height: '10px',
                        alignItems: 'center',
                        display: 'flex',
                        textAlign: 'center'
                      }}
                    >
                      <span>{index}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

class CultureWeightageTableTemplate extends Component {
  constructor() {
    super();
    this.state = {
      radioarray: [],
      selectedval: {}
    };
    this.selecttarr = {};
    this.arr = [];
    this.selected = {};
    this.saveselected = this.saveselected.bind(this);
  }
  componentDidMount() {
    var arr = [];
    for (let i = 1; i <= this.props.radiocount; i++) {
      arr.push(i);
    }
    this.setState({
      radioarray: arr
    });
    // this.selecttarr=this.props.cls.weightselectedval;
  }
  saveselected(d, id) {
    this.props.cls.culturedimensionselected.map((value) => {
      if (id == value.competencyId) {
        value['weightage'] = d;
      }
    });
    this.props.cls.setTemplateValue(
      'culturedimensionselected',
      this.props.cls.culturedimensionselected
    );
    console.log(this.props.cls.culturedimensionselected);
  }
  render() {
    console.log(this.props.data);
    var list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const { classes } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.userCardHeaderContainer}
      >
        {this.props.headerrowcount == 1 ? (
          <OneRowHeader title={this.props.title} row1={this.props.row1} classes={classes} />
        ) : this.props.headerrowcount == 2 ? (
          <TwoRowHeader title={this.props.title} row1={this.props.row1} classes={classes} />
        ) : this.props.headerrowcount == 3 ? (
          <ThreeRowHeader title={this.props.title} row1={this.props.row1} classes={classes} />
        ) : this.props.headerrowcount == 4 ? (
          <FourRowHeader title={this.props.title} row1={this.props.row1} classes={classes} />
        ) : null}

        {this.props.cls.culturedimensionselected.map((value, index) => {
          return value.options != null
            ? value.options.map((valuesoptions) => {
                return value.isNegative == valuesoptions.isNegative ? (
                  <div className={classes.containerPadding}>
                    <Paper
                      className={classNames(
                        classes.assesseesContainerGray,
                        classes.contentMaindivGray
                      )}
                    >
                      <div className={classes.siftComponentInnerDiv}>
                        <ClickAwayListener
                          onClickAway={(event) => {
                            event.stopPropagation();
                            this.props.cls.setTemplateValue('culturetooltipstate', '');
                          }}
                        >
                          <Tooltip
                            id="tooltip-icon"
                            onClick={(event) => {
                              event.stopPropagation();
                              this.props.cls.setTemplateValue('culturetooltipstate', '');
                            }}
                            open={
                              this.props.cls.culturetooltipstate == value.competencyId
                                ? true
                                : false
                            }
                            title={
                              <Typography
                                color="inherit"
                                className={classNames(classes.tooltipWidth)}
                                style={{ fontSize: '15px', textAlign: 'center' }}
                              >
                                <div style={{ display: 'block' }}>{valuesoptions.description}</div>
                              </Typography>
                            }
                            style={{ fontSize: '12px' }}
                          >
                            {/* <div className={classNames(classes.siftDescriptionDiv,classes.descriptionHeight,classes.contentHeader)} >
                                <span>{valuesoptions.description}</span>
                        </div>                 */}
                            <div
                              className={classNames(
                                classes.siftHeaderDivGray,
                                classes.contentHeaderGray
                              )}
                              style={{
                                borderLeft: '1px solid #BFBFBF',
                                borderRight: '1px solid #BFBFBF'
                              }}
                            >
                              <span
                                onClick={() => {
                                  this.props.cls.setTemplateValue(
                                    'culturetooltipstate',
                                    value.competencyId
                                  );
                                }}
                              >
                                {valuesoptions.name}
                              </span>
                            </div>
                          </Tooltip>
                        </ClickAwayListener>

                        <div
                          className={classNames(
                            classes.sifSecondtHeaderDivGray,
                            classes.contentDatadivTopborderGray
                          )}
                        >
                          {this.props.cls.cultureprofilemode == 'revise' ||
                          this.props.cls.cultureprofilemode == 'create'
                            ? this.state.radioarray.map((lis, index) => {
                                //   return <span className={classes.contentDatadiv}><Radio
                                //   checked={this.props.cls.weightselectedval[data]==(index+1).toString()?true:false}
                                //   value={index+1}
                                //   name="radio-button-demo"
                                //   aria-label="B"
                                //   className={classes.tdHeightWidth}
                                //   color="default"
                                //   onChange={()=>{this.saveselected(index+1==1?'1':
                                //   index+1==2?'2':index+1==3?'3':null,data,index+1)}}
                                //   /></span>
                                return (
                                  <span
                                    className={classNames(
                                      classes.contentDatadivGray,
                                      value.weightage == index + 1
                                        ? index + 1 == 3
                                          ? classes.selectedG
                                          : index + 1 == 2
                                          ? classes.secondaryGSelected
                                          : index + 1 == 1
                                          ? classes.thirdGselected
                                          : null
                                        : null
                                    )}
                                    onClick={() => {
                                      this.saveselected(index + 1, value.competencyId);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                                      {index + 1 == 1
                                        ? 'low'
                                        : index + 1 == 2
                                        ? 'medium'
                                        : index + 1 == 3
                                        ? 'high'
                                        : null}
                                    </span>
                                  </span>
                                );
                              })
                            : this.state.radioarray.map((lis, index) => {
                                return (
                                  <span
                                    className={classNames(
                                      classes.contentDatadivGray,
                                      value.weightage == index + 1
                                        ? index + 1 == 3
                                          ? classes.selectedG
                                          : index + 1 == 2
                                          ? classes.secondaryGSelected
                                          : index + 1 == 1
                                          ? classes.thirdGselected
                                          : null
                                        : null
                                    )}
                                  >
                                    <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                                      {lis == '1'
                                        ? 'low'
                                        : lis == '2'
                                        ? 'medium'
                                        : lis == '3'
                                        ? 'high'
                                        : null}
                                    </span>
                                  </span>
                                );
                              })}
                        </div>
                      </div>
                    </Paper>
                  </div>
                ) : null;
              })
            : null;
        })}
      </Grid>
    );
  }
}

CultureWeightageTableTemplate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(GlobalStyles)(CultureWeightageTableTemplate);
