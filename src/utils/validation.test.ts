import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, createMailtoLink } from './validation';

test('validateContactForm catches empty fields', () => {
  const errors = validateContactForm({ name: '', email: '', message: '' });
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.message);
});

test('validateContactForm checks email format', () => {
  const invalidEmail = validateContactForm({
    name: 'Alice',
    email: 'not-an-email',
    message: 'Hello, I have an opportunity for you'
  });
  assert.ok(invalidEmail.email);

  const valid = validateContactForm({
    name: 'Alice',
    email: 'alice@example.com',
    message: 'Hello, I have an opportunity for you'
  });
  assert.equal(Object.keys(valid).length, 0);
});

test('createMailtoLink properly encodes subject and body', () => {
  const link = createMailtoLink('test@example.com', {
    name: 'Bob Smith',
    email: 'bob@corp.com',
    message: 'Let us build something great'
  });
  assert.ok(link.startsWith('mailto:test@example.com?subject='));
  assert.ok(link.includes('Bob%20Smith'));
});
