import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchTargets } from '../targets.adapter';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('returns the list of targets when the request succeeds', async () => {
  const targets = [
    {
      id: 'st-001',
      name: 'Mike Wheeler',
      signalClarity: 0.92,
      duration: 185,
      dimension: 'hawkins',
      lastKnownLocation: 'Wheeler residence, Maple Street',
    },
  ];

  server.use(
    http.get('http://localhost:3210/targets', () => HttpResponse.json(targets)),
  );

  await expect(fetchTargets()).resolves.toEqual(targets);
});

test('throws when the request fails', async () => {
  server.use(
    http.get(
      'http://localhost:3210/targets',
      () => new HttpResponse(null, { status: 500 }),
    ),
  );

  await expect(fetchTargets()).rejects.toThrow();
});
