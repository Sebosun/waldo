function calcDisplayChanges(orgScreen, curScreen, charPosition) {
  // as in checkWaldo, first pos is Y second is X
  // here we check if there are any differences between pic size
  // and the current pic size
  if (orgScreen[0] !== curScreen[0] || orgScreen[1] !== curScreen[1]) {
    let diff_Y = curScreen[0] / orgScreen[0];
    let diff_X = curScreen[1] / orgScreen[1];
    return [charPosition[0] * diff_Y, charPosition[1] * diff_X];
  } else {
    return [charPosition[0], charPosition[1]];
  }
}

export default calcDisplayChanges;
