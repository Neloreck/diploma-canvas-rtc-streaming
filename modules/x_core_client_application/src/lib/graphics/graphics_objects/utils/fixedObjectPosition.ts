/* tslint:disable: typedef */

import {IAbstractSizing, IPoint} from "@Lib/graphics";

export const BASE_GRID_LEVELS: number = 5;

const BASE_WIDTH_PADDING: number = 2;
const BASE_WIDTH: number = 96;
const BASE_HEIGHT_PADDING: number = 3.5;
const BASE_HEIGHT: number = 93;

/*
 * Generation util.
 */

const generateGridLayer = () => {

  const grid: Array<Array<IPoint>> = [];

  for (let it = 0; it < BASE_GRID_LEVELS; it ++) {

    const leverArray: Array<IPoint> = [];

    for (let jt = 0; jt < BASE_GRID_LEVELS; jt ++) {
      leverArray.push({
        x: BASE_WIDTH_PADDING + BASE_WIDTH / BASE_GRID_LEVELS * it,
        y: BASE_HEIGHT_PADDING + BASE_HEIGHT / BASE_GRID_LEVELS * jt
      });
    }

    grid.push(leverArray);
  }

  return grid;
};

// Currently using pre-generated. Generates default: XL, SM, MD, LG, XL.
const generateSizingLayer = () => {

  const layer: { [idx: number]: { width: number, height: number }} = {};

  for (let it = 0; it < BASE_GRID_LEVELS; it ++ ) {
    layer[it] = { width: BASE_WIDTH / BASE_GRID_LEVELS  * (it + 1), height: BASE_HEIGHT / BASE_GRID_LEVELS * (it + 1) };
  }

  return layer;
};

// Layers.

export enum EObjectFixedSize {
  XS, SM, MD, LG, XL,
  SM_HOR, MD_HOR, LG_HOR, XL_HOR,
  SM_VER, MD_VER, LG_VER, XL_VER,
  ABSOLUTE
}

export const fixedObjectsGrid: Array<Array<IPoint>> = generateGridLayer();

export const fixedObjectsSizing: { [idx: number]: IAbstractSizing } = {
  // GEN:
  [EObjectFixedSize.XS]: { width: 19.2, height: 18.6 },
  [EObjectFixedSize.SM]: { width: 38.4, height: 37.2 },
  [EObjectFixedSize.MD]: { width: 57.6, height: 55.8},
  [EObjectFixedSize.LG]: { width: 76.8, height: 74.4 },
  [EObjectFixedSize.XL]: { width: 96, height: 93 },
  // HOR:
  [EObjectFixedSize.SM_HOR]: { width: 38.4, height: 18.6 },
  [EObjectFixedSize.MD_HOR]: { width: 57.6, height: 18.6 },
  [EObjectFixedSize.LG_HOR]: { width: 96, height: 18.6 },
  [EObjectFixedSize.XL_HOR]: { width: 96, height: 37.2 },
  // VER:
  [EObjectFixedSize.SM_VER]: { width: 19.2, height: 37.2 },
  [EObjectFixedSize.MD_VER]: { width: 19.2, height: 55.8 },
  [EObjectFixedSize.LG_VER]: { width: 19.2, height: 93 },
  [EObjectFixedSize.XL_VER]: { width: 38.4, height: 93 },
  // ABS:
  [EObjectFixedSize.ABSOLUTE]: { width: 100, height: 100 }
};
