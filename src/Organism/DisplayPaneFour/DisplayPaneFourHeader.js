import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NextIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVert from '@material-ui/icons/MoreVert';
import '../../Molecules/Headers/HeaderCard.css';

const DisplayPaneFourHeader = (props) => {
  const {
    headerOne = 'dashboard',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    headerOneBadgeThree = '',
    headerOneBadgeFour = '',
    isDisplayPaneShow,
    setIsDisplayPaneShow,
    headerPanelColour
  } = props;

  return (
    <>
      {isDisplayPaneShow ? (
        <div className={'iguru-leftpanel'}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'iguru-usercardcontainer'}>
            <Paper
              className={[
                `iguru-assesseescontainer`,
                `iguru-assesseescontainer${headerPanelColour}`
              ].join(' ')}
            >
              <div className={'iguru-componentinnerdiv'}>
                <div className={'iguru-moretextpanelheader'}>
                  <div>
                    <span>{headerOne}</span>&nbsp;
                    {headerOneBadgeOne !== '' ? (
                      <Fragment>
                        <span className={'iguru-header-badge1_0'}>{headerOneBadgeOne}</span>
                        &nbsp;
                      </Fragment>
                    ) : null}
                    {headerOneBadgeTwo !== '' ? (
                      <Fragment>
                        <span className={'iguru-header-badge1_0'}>{headerOneBadgeTwo}</span>
                        &nbsp;
                      </Fragment>
                    ) : null}
                    {headerOneBadgeThree !== '' ? (
                      <Fragment>
                        <span className={'iguru-header-badge1_0'}>{headerOneBadgeThree}</span>
                        &nbsp;
                      </Fragment>
                    ) : null}
                    {headerOneBadgeFour !== '' ? (
                      <Fragment>
                        <span className={'iguru-header-badge1_0'}>{headerOneBadgeFour}</span>
                        &nbsp;
                      </Fragment>
                    ) : null}
                  </div>
                </div>
                <div className={'iguru-iconbox'}>
                  <IconButton
                    onClick={() => {
                      setIsDisplayPaneShow(false);
                    }}
                  >
                    {/* <NextIcon className={'iguru-iconbardefault'} /> */}
                    <ArrowBackIcon className={'iguru-iconbardefault'} />
                  </IconButton>
                </div>
                <div className={'iguru-iconbox'}>
                  <IconButton>
                    <MoreVert className={'iguru-iconbardefault'} />
                  </IconButton>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      ) : (
        <div className={'iguru-leftpanel'} style={{ width: '60px' }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={'iguru-usercardcontainer'}
            style={{ width: '100%' }}
          >
            <Paper
              className={[
                `iguru-assesseescontainer`,
                `iguru-assesseescontainer${headerPanelColour}`
              ].join(' ')}
              style={{ width: '100%' }}
            >
              <div className={'iguru-componentinnerdiv'} style={{ width: '100%' }}>
                <div className={'iguru-iconbox'}>
                  <IconButton
                    onClick={() => {
                      setIsDisplayPaneShow(true);
                    }}
                    style={{ width: '100%' }}
                  >
                    <NextIcon className={'iguru-iconbardefault'} />
                    {/* <ArrowBackIcon className={'iguru-iconbardefault'} /> */}
                  </IconButton>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      )}
    </>
  );
};

export default DisplayPaneFourHeader;
