const allowedEmailList = (import.meta.env.VITE_SYSTEM_ALLOWED_EMAILS ?? '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const isSystemAccessAllowed = (email?: string | null) => {
  if (!email) {
    return false;
  }

  if (allowedEmailList.length === 0) {
    return false;
  }

  return allowedEmailList.includes(email.toLowerCase());
};

export const getSystemAllowedEmails = () => allowedEmailList;
