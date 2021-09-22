import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import '../Accordian/DisplayPanelAccordian.css';
{
  /*}
const OneRowHeader = (props) => {
  const { row1 = [] } = props;
  console.log("ONE", props);
  return (
    <div className={'containerPadding'}>
      <Paper className={'assesseesContainerGreen'} style={{ padding: '0px' }}>
        <div className={'siftComponentInnerDiv'}>
          <div
            className={'sifSecondtHeaderDiv'}
            style={{ borderTop: '1px solid white', height: '50px' }}
          >
            {row1.map((lis, index) => {
              return (
                <span
                  className={'sifSecondHeaderInner'}
                  style={
                    row1.length === index + 1
                      ? {
                          borderRight: '0px',
                          display: 'flex',
                          height: 'inherit',
                          alignItems: 'center'
                        }
                      : index === '0'
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
};

const TwoRowHeader = (props) => {
  const { row1 = [], title } = props;
  console.log("Two", props);
  return (
    <div className={'containerPadding'}>
      <Paper className={'assesseesContainerGreen'} style={{ padding: '0px' }}>
        <div className={'siftComponentInnerDiv'}>
          <div className={'siftHeaderDiv'}>
            <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{title}</span>
          </div>
          <div className={'sifSecondtHeaderDiv'} style={{ borderTop: '1px solid white' }}>
            {row1.map((lis, index) => {
              return (
                <span
                  className={'sifSecondHeaderInner'}
                  style={
                    row1.length === index + 1
                      ? {
                          borderRight: '0px',
                          display: 'flex',
                          height: 'inherit',
                          alignItems: 'center'
                        }
                      : index === '0'
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
};
*/
}
const ThreeRowHeader = (props) => {
  const { title } = props;
  return (
    <div className={'containerPadding'}>
      <Paper className={'assesseesContainerGray'} style={{ padding: '0px' }}>
        <div className={'siftComponentInnerDiv'}>
          <div className={'siftHeaderDiv'} style={{ height: '50px' }}>
            <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{title}</span>
          </div>
        </div>
      </Paper>
    </div>
  );
};

const FourRowHeader = (props) => {
  const { title, row1 = [] } = props;
  console.log('Four', props);
  return (
    <div className={'containerPadding'}>
      <Paper className={'assesseesContainerGreen'} style={{ padding: '0px' }}>
        <div className={'siftComponentInnerDiv'}>
          <div className={'siftHeaderDiv'} style={{ height: '20px' }}>
            <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{title}</span>
          </div>
          <div
            className={'sifSecondtHeaderDiv'}
            style={{ borderTop: '1px solid white', display: 'block !important', height: '30px' }}
          >
            {row1.map((lis, index) => {
              return (
                <span
                  className={'sifSecondHeaderInner'}
                  style={
                    row1.length === index + 1
                      ? { borderRight: '0px', height: '30px', display: 'block !important' }
                      : index === '0'
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
};

class CultureWeightageTableTemplate extends Component {
  constructor() {
    super();
    this.state = {
      radioarray: [],
      radioarraylist: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      selectedval: {}
    };
    this.selecttarr = {};
    this.arr = [];
    this.selected = {};
    this.isShowTooltipId = false;
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
    this.props.culturedimensionselected.map((value) => {
      if (id === value.competencyId) {
        value['weightage'] = d;
      }
    });
    this.props.cls.setTemplateValue(
      'culturedimensionselected',
      this.props.culturedimensionselected
    );
    console.log(this.props.culturedimensionselected);
  }
  render() {
    console.log('IN CULTURE +++++>', this.props);
    var list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const { listData = [], setWeightage } = this.props;
    console.log('LIST DATA', listData);
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'userCardHeaderContainer'}>
        <ThreeRowHeader title={this.props.title} row1={this.props.row1} />
        {listData.map((value) => {
          return (
            <div key={value.id} className={'containerPadding'}>
              <Paper className={['contentMaindivGray'].join()}>
                <div className={'siftComponentInnerDiv'}>
                  <ClickAwayListener
                    onClickAway={(event) => {
                      event.stopPropagation();
                      this.setState({ ...this.state, isShowTooltipId: '' });
                    }}
                  >
                    <Tooltip
                      id="tooltip-icon"
                      onClick={(event) => {
                        event.stopPropagation();
                        this.setState({ ...this.state, isShowTooltipId: '' });
                      }}
                      open={
                        value.cultureProfileCultureDimensionTag === this.state.isShowTooltipId
                          ? true
                          : false
                      }
                      title={
                        <Typography
                          color="inherit"
                          className={'tooltipWidth'}
                          style={{ fontSize: '15px', textAlign: 'center' }}
                        >
                          <div style={{ display: 'block' }}>
                            {value?.analyticFrameworkOneClusterSecondaryExplanationSecondary || ''}
                          </div>
                        </Typography>
                      }
                      style={{ fontSize: '12px' }}
                    >
                      <div
                        className={['siftheaderdivgray contentHeaderGray'].join()}
                        style={{
                          borderLeft: '1px solid #BFBFBF',
                          borderRight: '1px solid #BFBFBF'
                        }}
                      >
                        <span
                          style={{ cursor: 'pointer', fontSize: '1.2rem', margin: '1px 0 1px 0' }}
                          onClick={(event) => {
                            event.stopPropagation();
                            this.setState({
                              ...this.state,
                              isShowTooltipId: value.cultureProfileCultureDimensionTag
                            });
                          }}
                        >
                          {value?.iGuruAnalyticFrameworkOneClusterSecondary || 'name'}
                        </span>
                        <span
                          style={{ cursor: 'pointer', fontSize: '1rem' }}
                          onClick={(event) => {
                            // event.stopPropagation();
                            // this.setState({
                            //   ...this.state,
                            //   isShowTooltipId: value.cultureProfileCultureDimensionTag
                            // });
                          }}
                        >
                          {value?.analyticFrameworkOneClusterSecondaryExplanationPrimary}
                        </span>
                      </div>
                    </Tooltip>
                  </ClickAwayListener>

                  <div className={['sifSecondtHeaderDivGray contentDatadivTopborderGray'].join()}>
                    {'revise' == 'revise'
                      ? this.state.radioarray.map((lis, index) => {
                          const temp =
                            value?.cultureProfileCultureDimensionWeightage === index + 1
                              ? index + 1 === 3
                                ? 'selectedG'
                                : index + 1 === 2
                                ? 'secondaryGSelected'
                                : index + 1 === 1
                                ? 'thirdGselected'
                                : ''
                              : '';
                          return (
                            <span
                              // className={classArr.join()}
                              className={['contentDatadivGray', temp].join(' ')}
                              onClick={(e) => {
                                console.log('event++++++++++', index + 1, value);
                                setWeightage({
                                  ...value,
                                  cultureProfileCultureDimensionWeightage: index + 1
                                });
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
                      : null}
                  </div>
                </div>
              </Paper>
            </div>
          );
        })}
      </Grid>
    );
  }
}

export default CultureWeightageTableTemplate;
