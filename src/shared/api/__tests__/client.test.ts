import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from '../client';

describe('apiClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('options.signal なしの場合', () => {
    it('レスポンスが10秒以内に返った場合、AbortError を throw せずレスポンスを返す', async () => {
      const mockResponse = new Response('{}', { status: 200 });
      vi.mocked(fetch).mockResolvedValue(mockResponse);

      const result = await apiClient('/test');

      expect(result).toBe(mockResponse);
    });

    it('タイムアウトした場合、fetch が AbortError を throw する', async () => {
      const controller = new AbortController();
      vi.spyOn(AbortSignal, 'timeout').mockReturnValue(controller.signal);

      vi.mocked(fetch).mockImplementation(
        (_input, init) =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () => {
              reject(new DOMException('The operation was aborted.', 'AbortError'));
            });
          }),
      );

      const promise = apiClient('/test');
      controller.abort();

      await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    });
  });

  describe('options.signal が渡された場合', () => {
    it('渡された signal を fetch に使う', async () => {
      const controller = new AbortController();
      const mockResponse = new Response('{}', { status: 200 });
      vi.mocked(fetch).mockResolvedValue(mockResponse);

      const result = await apiClient('/test', { signal: controller.signal });

      const passedSignal = vi.mocked(fetch).mock.calls[0][1]?.signal;
      expect(passedSignal).toBe(controller.signal);
      expect(result).toBe(mockResponse);
    });
  });
});
