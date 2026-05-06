import { connectionOutcome, Outcome } from '../types';

export const getConnectionOutcome = (outcome: Outcome) =>
  connectionOutcome[outcome];
