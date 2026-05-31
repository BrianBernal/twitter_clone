import { Request, Response, NextFunction } from 'express';
import { isValidationEnabled } from '../config/index.js';

type ValidationFn = (req: Request) => string | null;

const validators = new Map<string, ValidationFn>();

function registerValidator(method: string, path: string, fn: ValidationFn): void {
  validators.set(`${method.toUpperCase()} ${path}`, fn);
}

function fullPath(req: Request): string {
  const p = req.baseUrl ? `${req.baseUrl}${req.path}` : req.path;
  return p.replace(/\/+$/, '') || '/';
}

function validationMiddleware(req: Request, res: Response, next: NextFunction): void {
  const path = fullPath(req);
  if (!isValidationEnabled(req.method, path)) {
    next();
    return;
  }

  const key = `${req.method.toUpperCase()} ${path}`;
  const validator = validators.get(key);
  if (!validator) {
    next();
    return;
  }

  const error = validator(req);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  next();
}

export { registerValidator, validationMiddleware };
