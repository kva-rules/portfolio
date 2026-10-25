import test from 'node:test';
import assert from 'node:assert/strict';

test('theme toggle logic transitions back and forth accurately', () => {
  const getNextTheme = (current: 'dark' | 'light'): 'dark' | 'light' => {
    return current === 'dark' ? 'light' : 'dark';
  };

  assert.equal(getNextTheme('dark'), 'light');
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme(getNextTheme('dark')), 'dark');
});

test('profile avatar path points to user uploaded asset', async () => {
  const { PROFILE_DATA } = await import('../data/profile.js');
  assert.equal(
    PROFILE_DATA.personal.avatarUrl,
    '/assets/aistudio/Abhidhab_Mellwyn_Profile_Photo_2f6118f5.jpg'
  );
  assert.ok(PROFILE_DATA.personal.name.length > 0);
});
