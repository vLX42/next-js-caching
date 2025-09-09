import '@testing-library/jest-dom'

// Polyfill fetch for Node.js test environment
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    headers: {
      get: (name) => {
        if (name === 'content-type') return 'application/json';
        return null;
      }
    }
  })
);

beforeEach(() => {
  global.fetch.mockClear();
});
