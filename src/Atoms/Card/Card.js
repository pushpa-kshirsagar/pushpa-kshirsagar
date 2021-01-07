import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NextIcon from '@material-ui/icons/ArrowForward';
import './Card.css';
const Card = () => {
  return (
    <div className={'leftPanel'}>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={'userCardHeaderContainer'}>
      <div className={'iconBox'}>
        <Paper className={'assesseesContainer'}>
          <IconButton>
            <NextIcon className={'iconsBarDefault'}/>
          </IconButton>
        </Paper>
      </div>
    </Grid>
    </div>
  );
};

export default Card;
