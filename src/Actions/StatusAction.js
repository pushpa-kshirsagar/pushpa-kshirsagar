import React, { Fragment } from 'react';

export const assesseeStatus = (middlePaneState, status) => {
  console.log(middlePaneState, status);
  if (middlePaneState === 'all' || middlePaneState === 'active') {
    return status === 'CONFIRMED' ? 'active' : 'inactive';
  }
  if (middlePaneState === 'inactive') {
    return status;
  }
  return status;
};

export const createNameWithBadge = (name) => {
  var txt = name;
  var arr = [];
  var newTxt = txt.split('(');

  for (var j = 1; j < newTxt.length; j++) {
    let word = newTxt[j].split(')')[0];
    let newwrd = word.replace(' ', '||');
    txt = txt.replace('(' + word + ')', '{' + newwrd + '}');
  }

  let finlastr = txt;
  var finalsplit = finlastr.split(' ');

  for (var i = 0; i < finalsplit.length; i++) {
    if (finalsplit[i].charAt(0) === '{') {
      let nobadge = finalsplit[i];
      let finalentry = nobadge.replace('{', '').replace('}', '').replace('||', ' ');
      arr.push(
        <Fragment>
          <span className={'headerBadge'} style={{ overflow: 'unset' }}>
            {finalentry}
          </span>
          <span>&nbsp;</span>
        </Fragment>
      );
    }

    if (finalsplit[i].charAt(0) !== '{') {
      arr.push(
        <Fragment>
          <span>{finalsplit[i]}</span>
          <span>&nbsp;</span>
        </Fragment>
      );
    }
  }

  return arr;
};
