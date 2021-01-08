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
  const { label = 'dashboard' } = props;
  const { primaryheaderbadge = '' } = props;
  const { secondaryheaderbadge = '' } = props;
  const { thirdheaderbadge = '' } = props;
  const { forthheaderbadge = '' } = props;
  const { headertype = '' } = props;
  console.log(props);
  return (
    <div className={'iguru-leftpanel'}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'iguru-usercardcontainer'}>
        <Paper
          className={
            headertype == 'left'
              ? [`iguru-assesseescontainer`, `iguru-assesseescontainerblue`]
              : [`iguru-assesseescontainer`, `iguru-assesseescontainergreen`]
          }
        >
          <div className={'iguru-componentinnerdiv'}>
            <div className={'iguru-moretextpanelheader'}>
              <div>
                <span>{label}</span>&nbsp;
                {primaryheaderbadge != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{primaryheaderbadge}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {secondaryheaderbadge != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{secondaryheaderbadge}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {thirdheaderbadge != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{thirdheaderbadge}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {forthheaderbadge != '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{forthheaderbadge}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
              </div>
            </div>
            <div className={'iguru-iconbox'}>
              <IconButton>
                {headertype == 'middle' ? (
                  <Fragment>
                    <SearchIcon className={'iguru-iconbardefault'} />
                    <span className={'iguru-headerbadge'}>{10}</span>
                  </Fragment>
                ) : headertype == 'left' ? (
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
