import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NextIcon from '@material-ui/icons/ArrowForward';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';

import './HeaderCard.css';
const HeaderCard = (props) => {
  const {
    headerLabel = 'dashboard',
    headerBadgeOne = '',
    headerBadgeTwo = '',
    headerBadgeThree = '',
    headerBadgeFour = '',
    displayPane = '',
    headerScanCount = 0,
    headerColour
  } = props;
  console.log(props);
  return (
    <div className={'iguru-leftpanel'}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'iguru-usercardcontainer'}>
        <Paper
          className={[`iguru-assesseescontainer`, `iguru-assesseescontainer${headerColour}`].join(
            ' '
          )}
        >
          <div className={'iguru-componentinnerdiv'}>
            <div className={'iguru-moretextpanelheader'}>
              <div>
                <span>{headerLabel}</span>&nbsp;
                {headerBadgeOne !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeOne}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerBadgeTwo !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeTwo}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerBadgeThree !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeThree}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerBadgeFour !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeFour}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
              </div>
            </div>
            <div className={'iguru-iconbox'}>
              <IconButton>
                {displayPane === 'centre' ? (
                  <Fragment>
                    <SearchIcon className={'iguru-iconbardefault'} />
                    <span className={'iguru-headerbadge'}>{headerScanCount}</span>
                  </Fragment>
                ) : displayPane === 'left' ? (
                  <NextIcon className={'iguru-iconbardefault'} />
                ) : (
                  <Clear className={'iguru-iconbardefault'} />
                )}
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
  );
};

export default HeaderCard;
