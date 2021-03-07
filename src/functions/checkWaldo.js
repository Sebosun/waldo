// checks if waldo has been found, based on click position, waldos position etc.
function checkWaldo(clickPos, charPos, aimbot) {
  // screenSize[0] = Y same with clickPos and charPos
  // screenSize[1] = X
  if (
    clickPos[0] >= charPos[0] - aimbot &&
    clickPos[0] <= charPos[0] + aimbot
  ) {
    if (
      clickPos[1] >= charPos[1] - aimbot &&
      clickPos[1] <= charPos[1] + aimbot
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default checkWaldo;
