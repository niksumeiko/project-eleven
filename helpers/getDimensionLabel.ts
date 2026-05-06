import { DimensionLabel, dimensions } from '../types';

export const getDimensionLabel = (string: DimensionLabel) => dimensions[string];
