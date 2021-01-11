import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
    label = 'dashboard',
    lableBadgeCore = '',
    lableBadgePrimary = '',
    lableBadgeSecondary = '',
  } = props;
  const { lableBadgeTertiary = '', displayPane = '', scanCount = 0 } = props;
  console.log(props);
  return (
    <div className={'iguru-leftpanel'}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'iguru-usercardcontainer'}>
        <Paper
          className={
            displayPane == 'left'
              ? [`iguru-assesseescontainer`, `iguru-assesseescontainerblue`]
              : [`iguru-assesseescontainer`, `iguru-assesseescontainergreen`]
          }
        >
          <div className={'iguru-componentinnerdiv'}>
            <div className={'iguru-moretextpanelheader'}>
              <div>
                <span>{label}</span>&nbsp;
                {lableBadgeCore != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{lableBadgeCore}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {lableBadgePrimary != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{lableBadgePrimary}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {lableBadgeSecondary != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{lableBadgeSecondary}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {lableBadgeTertiary != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{lableBadgeTertiary}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
              </div>
            </div>
            <div className={'iguru-iconbox'}>
              <IconButton>
                {displayPane == 'middle' ? (
                  <Fragment>
                    <SearchIcon className={'iguru-iconbardefault'} />
                    <span className={'iguru-headerbadge'}>{scanCount}</span>
                  </Fragment>
                ) : displayPane == 'left' ? (
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
