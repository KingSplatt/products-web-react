import { describe, expect, it } from 'vitest';

describe('frontend configuration', () => {
  it('uses a string API base URL', () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    expect(typeof apiUrl).toBe('string');
  });
});
