import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchTargets } from '../targetService';
import { mockTargets } from '../../mocks/mockData';

const server = setupServer(
  http.get('http://localhost:3210/targets', () => {
    return HttpResponse.json(mockTargets);
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('targetService', () => {
  describe('fetchTargets', () => {
    it('should fetch targets successfully', async () => {
      const targets = await fetchTargets();
      expect(targets).toEqual(mockTargets);
    });

    it('should handle 500 error', async () => {
      server.use(
        http.get('http://localhost:3210/targets', () => {
          return HttpResponse.json(
            { message: 'Internal server error' },
            { status: 500 },
          );
        }),
      );

      await expect(fetchTargets()).rejects.toThrow('Internal server error');
    });

    it('should handle network error', async () => {
      server.use(
        http.get('http://localhost:3210/targets', () => {
          return HttpResponse.error();
        }),
      );

      await expect(fetchTargets()).rejects.toThrow();
    });
  });
});
