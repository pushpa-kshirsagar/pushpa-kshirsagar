import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import '../Accordian/Accordian.css';

const OneRowHeader = (props) => {
  const { row1 = [] } = props;
  console.log('ONE', props);
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
  console.log('Two', props);
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

const ThreeRowHeader = (props) => {
  const { title, row1 = [] } = props;
  return (
    <div className={'containerPadding'}>
      <Paper className={'assesseesContainerGray'} style={{ padding: '0px' }}>
        <div className={'siftComponentInnerDiv'}>
          <div className={'siftHeaderDiv'} style={{ height: '50px' }}>
            <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{title}</span>
          </div>
          <div
            className={'sifSecondtHeaderDiv'}
            style={{ borderTop: '1px solid white', display: 'block !important', height: '20px' }}
          >
            {row1.map((lis, index) => {
              return (
                <span
                  className={'sifSecondHeaderInner'}
                  style={
                    row1.length == index + 1
                      ? { borderRight: '0px', height: '20px', display: 'block !important' }
                      : index == '0'
                      ? { borderLeft: '0px', height: '20px', display: 'block !important' }
                      : { height: '20px' }
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
                    <span>{index + 1}</span>
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

const FourRowHeader = (props) => {
  const { title, row1 = [], rangeheadcolumnhead2 } = props;
  console.log('Four', props);
  return (
    <div className={'containerPadding'}>
      <Paper
        className={'assesseesContainerGreen'}
        style={{ padding: '0px', backgroundColor: '#F2F2F2' }}
      >
        <div className={'siftComponentInnerDiv'}>
          <div className={'siftHeaderDiv'} style={{ height: '30px' }}>
            <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{title}</span>
          </div>
          <div
            className={'sifSecondtHeaderDiv'}
            style={{ borderTop: '1px solid #BFBFBF', display: 'block !important', height: '20px' }}
          >
            {row1.map((lis, index) => {
              return (
                <span
                  className={'sifSecondHeaderInner'}
                  style={
                    row1.length === index + 1
                      ? { borderRight: '0px', height: '20px', display: 'block !important' }
                      : index === '0'
                      ? { borderLeft: '0px', height: '20px', display: 'block !important' }
                      : { height: '20px' }
                  }
                >
                  <span
                    style={{
                      color: 'rgba(0, 0, 0, 0.54)',
                      fontSize: '1rem',
                      height: '10px',
                      alignItems: 'center',
                      display: 'flex',
                      textAlign: 'center'
                    }}
                  >
                    <span>{lis}</span>
                  </span>
                  {Object.keys(rangeheadcolumnhead2).map((val) => {
                    return val === lis ? (
                      <span
                        style={{
                          color: 'rgba(0, 0, 0, 0.54)',
                          fontSize: '1rem',
                          height: '10px',
                          alignItems: 'center',
                          display: 'flex',
                          textAlign: 'center'
                        }}
                      >
                        <span>{rangeheadcolumnhead2[val]}</span>
                      </span>
                    ) : null;
                  })}
                  {/* {Object.keys(this.props.cls.rangeheadcolumnhead3).map((val)=>{
                                return  val==lis?<span style={{color:'rgba(0, 0, 0, 0.87)',fontSize: '1rem',height: '10px',
                               alignItems:'center',
                               display: 'flex',
                               textAlign: 'center'}}>{this.props.cls.rangeheadcolumnhead3[val].map((data)=>{
                                 return <span>{data}</span>   
                               })}</span>
                               :null
                            })} */}
                </span>
              );
            })}
          </div>
        </div>
      </Paper>
    </div>
    // <div className={'containerPadding'}>
    //   <Paper className={'assesseesContainerGreen'} style={{ padding: '0px' }}>
    //     <div className={'siftComponentInnerDiv'}>
    //       <div className={'siftHeaderDiv'} style={{ height: '20px' }}>
    //         <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{title}</span>
    //       </div>
    //       <div
    //         className={'sifSecondtHeaderDiv'}
    //         style={{ borderTop: '1px solid white', display: 'block !important', height: '30px' }}
    //       >
    //         {row1.map((lis, index) => {
    //           return (
    //             <span
    //               className={'sifSecondHeaderInner'}
    //               style={
    //                 row1.length === index + 1
    //                   ? { borderRight: '0px', height: '30px', display: 'block !important' }
    //                   : index === '0'
    //                   ? { borderLeft: '0px', height: '30px', display: 'block !important' }
    //                   : { height: '30px' }
    //               }
    //             >
    //               <span
    //                 style={{
    //                   color: 'rgba(0, 0, 0, 0.87)',
    //                   fontSize: '1rem',
    //                   height: '10px',
    //                   alignItems: 'center',
    //                   display: 'flex',
    //                   textAlign: 'center'
    //                 }}
    //               >
    //                 <span>{lis}</span>
    //               </span>
    //               <span
    //                 style={{
    //                   color: 'rgba(0, 0, 0, 0.87)',
    //                   fontSize: '1rem',
    //                   height: '10px',
    //                   alignItems: 'center',
    //                   display: 'flex',
    //                   textAlign: 'center'
    //                 }}
    //               >
    //                 <span>average</span>
    //               </span>
    //               <span
    //                 style={{
    //                   color: 'rgba(0, 0, 0, 0.87)',
    //                   fontSize: '1rem',
    //                   height: '10px',
    //                   alignItems: 'center',
    //                   display: 'flex',
    //                   textAlign: 'center'
    //                 }}
    //               >
    //                 <span>{index}</span>
    //               </span>
    //             </span>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </Paper>
    // </div>
  );
};

class JobRangeTableTemplate extends Component {
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
    var list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    // var listData = ['1', '2', '3'];
    const { listData = [], saveselected } = this.props;
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'userCardHeaderContainer'}>
        <FourRowHeader
          rangeheadcolumnhead2={this.props.rangeheadcolumnhead2}
          title={this.props.title}
          row1={this.props.row1}
        />
        {/* {this.props.headerrowcount === 1 ? (
          <OneRowHeader title={this.props.title} row1={this.props.row1} />
        ) : this.props.headerrowcount === 2 ? (
          <TwoRowHeader title={this.props.title} row1={this.props.row1} />
        ) : this.props.headerrowcount === 3 ? (
          <ThreeRowHeader title={this.props.title} row1={this.props.row1} />
        ) : this.props.headerrowcount === 4 ? (
          <FourRowHeader title={this.props.title} row1={this.props.row1} />
        ) : null} */}

        {/*this.props.culturedimensionselected.map((value, index) => {
          return value.options != null
            ? value.options.map((valuesoptions) => {
                return value.isNegative === valuesoptions.isNegative ? (
                  <div className={'containerPadding'}>
                    <Paper className={'assesseesContainerGray contentMaindivGray'}>
                      <div className={'siftComponentInnerDiv'}>
                        <ClickAwayListener
                          onClickAway={(event) => {
                            // event.stopPropagation();
                            // this.props.cls.setTemplateValue('culturetooltipstate', '');
                          }}
                        >
                          <Tooltip
                            id="tooltip-icon"
                            onClick={(event) => {
                              // event.stopPropagation();
                              // this.props.cls.setTemplateValue('culturetooltipstate', '');
                            }}
                            open={
                              this.props.culturetooltipstate === value.competencyId ? true : false
                            }
                            title={
                              <Typography
                                color="inherit"
                                className={'tooltipWidth'}
                                style={{ fontSize: '15px', textAlign: 'center' }}
                              >
                                <div style={{ display: 'block' }}>{valuesoptions.description}</div>
                              </Typography>
                            }
                            style={{ fontSize: '12px' }}
                          >
                            <div
                              className={'siftHeaderDivGray contentHeaderGray'}
                              style={{
                                borderLeft: '1px solid #BFBFBF',
                                borderRight: '1px solid #BFBFBF'
                              }}
                            >
                              <span
                                onClick={() => {
                                  // this.props.cls.setTemplateValue(
                                  //   'culturetooltipstate',
                                  //   value.competencyId
                                  // );
                                }}
                              >
                                {valuesoptions.name}
                              </span>
                            </div>
                          </Tooltip>
                        </ClickAwayListener>

                        <div className={'sifSecondtHeaderDivGray contentDatadivTopborderGray'}>
                          {this.props.cultureprofilemode === 'revise' ||
                          this.props.cultureprofilemode === 'create'
                            ? this.state.radioarray.map((lis, index) => {
                                //   return <span className={"contentDatadiv"}><Radio
                                //   checked={this.props.cls.weightselectedval[data]===(index+1).toString()?true:false}
                                //   value={index+1}
                                //   name="radio-button-demo"
                                //   aria-label="B"
                                //   className={"tdHeightWidth"}
                                //   color="default"
                                //   onChange={()=>{this.saveselected(index+1===1?'1':
                                //   index+1===2?'2':index+1===3?'3':null,data,index+1)}}
                                //   /></span>
                                return (
                                  <span
                                    className={
                                      ('contentDatadivGray',
                                      value.weightage === index + 1
                                        ? index + 1 === 3
                                          ? 'selectedG'
                                          : index + 1 === 2
                                          ? 'secondaryGSelected'
                                          : index + 1 === 1
                                          ? 'thirdGselected'
                                          : null
                                        : null)
                                    }
                                    onClick={() => {
                                      this.saveselected(index + 1, value.competencyId);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                                      {index + 1 === 1
                                        ? 'low'
                                        : index + 1 === 2
                                        ? 'medium'
                                        : index + 1 === 3
                                        ? 'high'
                                        : null}
                                    </span>
                                  </span>
                                );
                              })
                            : this.state.radioarray.map((lis, index) => {
                                return (
                                  <span
                                    className={
                                      ('contentDatadivGray',
                                      value.weightage === index + 1
                                        ? index + 1 === 3
                                          ? 'selectedG'
                                          : index + 1 === 2
                                          ? 'secondaryGSelected'
                                          : index + 1 === 1
                                          ? 'thirdGselected'
                                          : null
                                        : null)
                                    }
                                  >
                                    <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                                      {lis === '1'
                                        ? 'low'
                                        : lis === '2'
                                        ? 'medium'
                                        : lis === '3'
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
        }) */}

        {listData.map((value) => {
          return (
            <div className={'containerPadding'}>
              <Paper className={['contentMaindivGray'].join()}>
                <div className={'siftComponentInnerDiv'}>
                  <ClickAwayListener
                    onClickAway={(event) => {
                      // event.stopPropagation();
                      // this.setState({ ...this.state, isShowTooltipId: '' });
                    }}
                  >
                    <Tooltip
                      id="tooltip-icon"
                      onClick={(event) => {
                        // event.stopPropagation();
                        // this.setState({ ...this.state, isShowTooltipId: '' });
                      }}
                      open={false}
                      // open={value.id === this.state.isShowTooltipId ? true : false}
                      title={
                        <Typography
                          color="inherit"
                          className={'tooltipWidth'}
                          style={{ fontSize: '15px', textAlign: 'center' }}
                        >
                          <div style={{ display: 'block' }}>{'description'}</div>
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
                        onClick={(event) => {
                          // event.stopPropagation();
                          // this.setState({
                          //   ...this.state,
                          //   isShowTooltipId: value.id
                          // });
                        }}
                      >
                        <span>{value.jobProfilerFrameworkSecondary}</span>
                      </div>
                    </Tooltip>
                  </ClickAwayListener>

                  <div className={['sifSecondtHeaderDivGray contentDatadivTopborderGray'].join()}>
                    {'revise' === 'revise'
                      ? this.state.radioarraylist.map((lis, index) => {
                          return (
                            <span
                              // className={'contentDatadivGray'}
                              className={[
                                'contentDatadivGray',
                                value.jobProfileJobCompetencyTag
                                  ? value.jobProfileJobCompetencyRangeMinimum == index + 1
                                    ? 'thirdGselected'
                                    : value.jobProfileJobCompetencyRangeMaximum == index + 1
                                    ? 'selectedG'
                                    : value.jobProfileJobCompetencyRangeMinimum < index + 1 &&
                                      value.jobProfileJobCompetencyRangeMaximum > index + 1
                                    ? 'secondaryGSelected'
                                    : null
                                  : null
                              ].join(' ')}
                              onClick={() => {
                                saveselected(index + 1, value.jobProfileJobCompetencyTag, index + 1);
                              }}
                              style={{
                                cursor: 'pointer',
                                borderLeft: '1px solid #BFBFBF',
                                borderRight: '1px solid #BFBFBF'
                              }}
                            >
                              <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{lis}</span>
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

export default JobRangeTableTemplate;
