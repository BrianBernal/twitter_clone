import { Request, Response, NextFunction } from 'express';
import { isValidationEnabled } from '../config/index.js';

function fullPath(req: Request): string {
  const p = req.originalUrl;
  return p.replace(/\/+$/, '') || '/';
}

function validateParam(paramName: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const path = fullPath(req);
    if (!isValidationEnabled(req.method, path)) {
      next();
      return;
    }

    const val = Number(req.params[paramName]);
    if (!Number.isInteger(val) || val <= 0) {
      res.status(400).json({ error: `${paramName} must be a positive integer` });
      return;
    }
    req.params[paramName] = String(val);
    next();
  };
}

export { validateParam };
