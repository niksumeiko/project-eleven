import { http, HttpResponse } from 'msw';
import { mockTargets } from './mockData';

export const handlers = [
  http.get('http://localhost:3210/targets', () => {
    return HttpResponse.json(mockTargets);
  }),
];
