import { Request } from 'express';

function validateSignup(req: Request): string | null {
  const { user_handle, email_address, first_name, last_name } = req.body;

  if (
    !user_handle ||
    typeof user_handle !== 'string' ||
    user_handle.trim().length === 0 ||
    user_handle.length > 50
  ) {
    return 'user_handle is required (max 50 characters)';
  }
  if (
    !email_address ||
    typeof email_address !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address)
  ) {
    return 'A valid email_address is required';
  }
  if (!first_name || typeof first_name !== 'string' || first_name.trim().length === 0) {
    return 'first_name is required';
  }
  if (!last_name || typeof last_name !== 'string' || last_name.trim().length === 0) {
    return 'last_name is required';
  }
  if (req.body.phone_number !== undefined && req.body.phone_number !== null) {
    if (typeof req.body.phone_number !== 'string' || !/^\d{10,15}$/.test(req.body.phone_number)) {
      return 'phone_number must be 10-15 digits';
    }
  }

  return null;
}

export { validateSignup, validateSignin };
function validateSignin(req: Request): string | null {
  const { email_address } = req.body;
  if (!email_address || typeof email_address !== 'string' || email_address.trim().length === 0) {
    return 'email_address is required';
  }
  return null;
}
