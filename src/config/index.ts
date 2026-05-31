import { createPool, Pool } from 'mysql2/promise';

export interface AppConfig {
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    socketPath: string;
  };
  validationFlags: Record<string, boolean>;
}

const {
  PORT = '4000',
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'twitter_db',
  DB_SOCKET = '/tmp/mysql_3306.sock',
} = process.env;

const config: AppConfig = {
  port: parseInt(PORT, 10),
  db: {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    socketPath: DB_SOCKET,
  },
  validationFlags: {
    'POST /api/auth/signup': true,
    'POST /api/tweets': true,
    'POST /api/followers': true,
    'DELETE /api/followers/:following_id': true,
  },
};

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      socketPath: config.db.socketPath,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

export function isValidationEnabled(method: string, path: string): boolean {
  const normalized = path.replace(/\/+$/, '') || '/';
  const key = `${method.toUpperCase()} ${normalized}`;
  return config.validationFlags[key] !== false;
}

export default config;
