import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NextIcon from '@material-ui/icons/ArrowForward';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';

import './HeaderCard.css';
const HeaderCard = (props) => {
  const {
    headerOne = 'dashboard',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    headerOneBadgeThree = '',
    headerOneBadgeFour = '',
    displayPane = '',
    scanCount = 0,
    headerPanelColour
  } = props;

  return (
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
              {displayPane === 'five' ? (
                <div>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>00:19:26</span>
                </div>
              ) : (
                <IconButton>
                  {displayPane === 'centre' ? (
                    <Fragment>
                      <SearchIcon className={'iguru-iconbardefault'} />
                      <span className={'iguru-headerbadge'}>{scanCount}</span>
                    </Fragment>
                  ) : displayPane === 'left' ? (
                    <NextIcon className={'iguru-iconbardefault'} />
                  ) : (
                    <Clear className={'iguru-iconbardefault'} />
                  )}
                </IconButton>
              )}
            </div>
            <div className={'iguru-iconbox'}>
              {displayPane === 'five' ? (
                <IconButton>
                  <OpenWithIcon className={'iguru-iconbardefault'} />
                </IconButton>
              ) : (
                <IconButton>
                  <MoreVert className={'iguru-iconbardefault'} />
                </IconButton>
              )}
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default HeaderCard;
