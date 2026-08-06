import { describe, it, expect } from 'vitest';
import { ApiError, isApiError, throwIfNotOk, fetchJson } from '../error';

describe('ApiError', () => {
  it.each([
    [401, 'unauthorized'],
    [403, 'forbidden'],
    [422, 'validation'],
    [500, 'server'],
    [503, 'server'],
    [404, 'unknown'],
  ] as const)('ステータス %i の場合、type が %s になる', (status, expectedType) => {
    const error = new ApiError(status, 'メッセージ');

    expect(error.type).toBe(expectedType);
  });

  it('errors を渡さない場合、undefined になる', () => {
    const error = new ApiError(401, 'メッセージ');

    expect(error.errors).toBeUndefined();
  });

  it('errors を渡した場合、そのまま保持される', () => {
    const errors = { email: ['メールアドレスは必須です'] };
    const error = new ApiError(422, 'メッセージ', errors);

    expect(error.errors).toEqual(errors);
  });

  it('status と message を保持する', () => {
    const error = new ApiError(500, 'サーバーエラー');

    expect(error.status).toBe(500);
    expect(error.message).toBe('サーバーエラー');
  });
});

describe('isApiError', () => {
  it('ApiError インスタンスの場合、true を返す', () => {
    const error = new ApiError(500, 'エラー');

    expect(isApiError(error)).toBe(true);
  });

  it('通常の Error の場合、false を返す', () => {
    expect(isApiError(new Error('エラー'))).toBe(false);
  });

  it('Error 以外の値の場合、false を返す', () => {
    expect(isApiError('文字列')).toBe(false);
    expect(isApiError(null)).toBe(false);
    expect(isApiError(undefined)).toBe(false);
  });
});

describe('throwIfNotOk', () => {
  it('response.ok が true の場合、何もスローしない', async () => {
    const response = new Response('{}', { status: 200 });

    await expect(throwIfNotOk(response, 'フォールバック')).resolves.toBeUndefined();
  });

  it('response.ok が false かつ message を含む JSON ボディの場合、message でスローする', async () => {
    const response = new Response(JSON.stringify({ message: 'サーバーからのメッセージ' }), {
      status: 500,
    });

    await expect(throwIfNotOk(response, 'フォールバック')).rejects.toMatchObject({
      message: 'サーバーからのメッセージ',
      status: 500,
    });
  });

  it('response.ok が false かつ message を含まない JSON ボディの場合、fallback でスローする', async () => {
    const response = new Response('{}', { status: 500 });

    await expect(throwIfNotOk(response, 'フォールバック')).rejects.toMatchObject({
      message: 'フォールバック',
    });
  });

  it('response.ok が false かつ非JSONボディの場合、fallback でスローする', async () => {
    const response = new Response('not json', { status: 500 });

    await expect(throwIfNotOk(response, 'フォールバック')).rejects.toMatchObject({
      message: 'フォールバック',
      status: 500,
    });
  });

  it('422 かつ errors を含む場合、ApiError.errors が設定される', async () => {
    const errors = { email: ['メールアドレスは必須です'] };
    const response = new Response(JSON.stringify({ message: '検証エラー', errors }), {
      status: 422,
    });

    await expect(throwIfNotOk(response, 'フォールバック')).rejects.toMatchObject({
      type: 'validation',
      errors,
    });
  });
});

describe('fetchJson', () => {
  it('成功時、パース済みオブジェクトを返す', async () => {
    const body = { id: 1, name: 'テストユーザー' };
    const response = new Response(JSON.stringify(body), { status: 200 });

    const result = await fetchJson<typeof body>(response, 'フォールバック');

    expect(result).toEqual(body);
  });

  it('失敗時（422 + validation errors）、ApiError.errors が設定される', async () => {
    const errors = { password: ['8文字以上で入力してください'] };
    const response = new Response(JSON.stringify({ message: '検証エラー', errors }), {
      status: 422,
    });

    await expect(fetchJson(response, 'フォールバック')).rejects.toMatchObject({
      type: 'validation',
      errors,
    });
  });

  it('失敗時、fallback メッセージで ApiError をスローする', async () => {
    const response = new Response('{}', { status: 500 });

    await expect(fetchJson(response, 'フォールバック')).rejects.toMatchObject({
      message: 'フォールバック',
      status: 500,
    });
  });

  it('失敗時、ApiError のインスタンスをスローする', async () => {
    const response = new Response('{}', { status: 500 });

    await expect(fetchJson(response, 'フォールバック')).rejects.toBeInstanceOf(ApiError);
  });

  it('非JSONボディの成功時、空オブジェクトを返す', async () => {
    const response = new Response('not json', { status: 200 });

    const result = await fetchJson(response, 'フォールバック');

    expect(result).toEqual({});
  });
});
