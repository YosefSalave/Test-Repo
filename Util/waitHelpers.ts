export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const retry = async <T>(fn: () => Promise<T>, attempts = 3, delay = 500): Promise<T> => {
  let lastErr: any;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) await sleep(delay);
    }
  }
  throw lastErr;
};

export default { sleep, retry };
