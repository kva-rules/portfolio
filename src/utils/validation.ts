export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function validateContactForm(values: ContactFormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.name || values.name.trim().length === 0) {
    errors.name = 'Please provide your name';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || values.email.trim().length === 0) {
    errors.email = 'Please provide your email address';
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!values.message || values.message.trim().length === 0) {
    errors.message = 'Please provide a message or inquiry';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export function createMailtoLink(
  recipientEmail: string,
  values: ContactFormValues
): string {
  const subject = encodeURIComponent(`Portfolio Inquiry from ${values.name.trim()}`);
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\nMessage:\n${values.message.trim()}`
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
