export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const format = (level: LogLevel, message: string) => {
  const ts = new Date().toISOString();
  return `[${ts}] [${level.toUpperCase()}] ${message}`;
};

export const logger = {
  debug: (msg: string) => console.debug(format('debug', msg)),
  info: (msg: string) => console.info(format('info', msg)),
  warn: (msg: string) => console.warn(format('warn', msg)),
  error: (msg: string) => console.error(format('error', msg)),
};

export default logger;
