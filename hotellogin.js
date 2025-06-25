import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

export const options = {
  vus: 1,
  duration: '2s',
};

const BASE_URL = 'http://localhost:8080';
const LOGIN_URL = `${BASE_URL}/realms/HotelRealm/protocol/openid-connect/auth?client_id=react-client&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=openid`;

const USERNAME = 'ajayan123krish';
const PASSWORD = 'Ajayan123krish@';

export default function () {
  const res = http.get(LOGIN_URL);

  check(res, { 'Login page loaded': (r) => r.status === 200 });

  const doc = parseHTML(res.body);
  const form = doc.find('form');
  const formAction = form.attr('action');

  if (!formAction) {
    console.error('❌ Form action missing');
    return;
  }

  const fullPostUrl = formAction.startsWith('http')
    ? formAction
    : `${BASE_URL}${formAction}`;

  const formData = new URLSearchParams();

  form.find('input').toArray().forEach(input => {
    const name = input.attr('name');
    const value = input.attr('value') || '';
    if (name) formData.append(name, value);
  });

  // Override credentials manually
  formData.set('username', USERNAME);
  formData.set('password', PASSWORD);

  const loginRes = http.post(fullPostUrl, formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirects: 0,
  });

  check(loginRes, {
    'status is 302 redirect (successful login)': (r) => r.status === 302,
    'does not contain login error': (r) => !r.body.includes('Invalid'),
  });

  console.log(`➡️  Login POST status: ${loginRes.status}`);
  console.log('📄 Response preview:', loginRes.body.slice(0, 3000));
}
