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

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'twitter_db',
    socketPath: process.env.DB_SOCKET || '/tmp/mysql_3306.sock',
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
