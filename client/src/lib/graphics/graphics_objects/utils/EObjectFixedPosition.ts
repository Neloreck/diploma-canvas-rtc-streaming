export const BASE_WIDTH_PADDING: number = 2;
export const BASE_WIDTH: number = 96;

export const BASE_HEIGHT_PADDING: number = 3.5;
export const BASE_HEIGHT: number = 93;

export const EObjectFixedPositionLG = {
  LG_BOT: {
    height: BASE_HEIGHT / 2 - BASE_HEIGHT_PADDING,
    left: BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: BASE_WIDTH
  },
  LG_LEFT: {
    height: BASE_HEIGHT,
    left: BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: BASE_WIDTH / 2 - BASE_WIDTH_PADDING
  },
  LG_RIGHT: {
    height: BASE_HEIGHT,
    left: 50 + BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: BASE_WIDTH / 2 - BASE_WIDTH_PADDING
  },
  LG_TOP: {
    height: BASE_HEIGHT / 2 - BASE_HEIGHT_PADDING,
    left: BASE_WIDTH_PADDING,
    top: 50 + BASE_HEIGHT_PADDING,
    width: BASE_WIDTH
  }
};

export const EObjectFixedPositionMD = {
  MD_BOT: {
    height: BASE_HEIGHT / 4 - BASE_HEIGHT_PADDING,
    left: BASE_WIDTH_PADDING,
    top: 50 + BASE_HEIGHT_PADDING + BASE_HEIGHT / 4,
    width: BASE_WIDTH
  },
  MD_LEFT: {
    height: BASE_HEIGHT,
    left: BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: (BASE_WIDTH / 2 - BASE_WIDTH_PADDING)
  },
  MD_RIGHT: {
    height: BASE_HEIGHT,
    left: 50 + BASE_WIDTH_PADDING + BASE_WIDTH / 4,
    top: BASE_HEIGHT_PADDING,
    width: (BASE_WIDTH / 2 - BASE_WIDTH_PADDING)
  },
  MD_TOP: {
    height: BASE_HEIGHT / 4 - BASE_HEIGHT_PADDING,
    left: BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: BASE_WIDTH
  }
};

export const EObjectFixedPositionSM = {
  SM_BOT_LEFT: {
    height: BASE_HEIGHT / 4 - BASE_HEIGHT_PADDING,
    left: BASE_WIDTH_PADDING,
    top: 50 + BASE_HEIGHT_PADDING + BASE_HEIGHT / 4,
    width: BASE_WIDTH / 2 - BASE_WIDTH_PADDING
  },
  SM_BOT_RIGHT: {
    height: BASE_HEIGHT / 4 - BASE_HEIGHT_PADDING,
    left: 50 + BASE_WIDTH_PADDING,
    top: 50 + BASE_HEIGHT_PADDING + BASE_HEIGHT / 4,
    width: BASE_WIDTH / 2 - BASE_WIDTH_PADDING
  },
  SM_TOP_LEFT: {
    height: BASE_HEIGHT / 4 - BASE_HEIGHT_PADDING,
    left: BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: BASE_WIDTH / 2 - BASE_WIDTH_PADDING
  },
  SM_TOP_RIGHT: {
    height: BASE_HEIGHT / 4 - BASE_HEIGHT_PADDING,
    left: 50 + BASE_WIDTH_PADDING,
    top: BASE_HEIGHT_PADDING,
    width: BASE_WIDTH / 2 - BASE_WIDTH_PADDING
  }
};

export const EObjectFixedPosition = {
  ...EObjectFixedPositionLG,
  ...EObjectFixedPositionMD,
  ...EObjectFixedPositionSM
};
