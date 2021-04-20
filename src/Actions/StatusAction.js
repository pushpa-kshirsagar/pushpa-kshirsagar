export const assesseeStatus = (middlePaneState, status) => {
  console.log(middlePaneState, status)
  if (middlePaneState === 'all' || middlePaneState === 'active') {
    return status === 'CONFIRMED' ? 'active' : 'inactive';
  }
  if (middlePaneState === 'inactive') {
    return status;
  }
  return status;
};
