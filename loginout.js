import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  vus: 1000,
  iterations: 1000,
  duration: '1000s',
};

export default function () {
  const base = 'http://localhost:8080';
  const realm = 'HotelRealm';
  const client = 'react-client';
  const redirectUri = 'http://localhost:3000';

  const loginPageUrl = `${base}/realms/${realm}/protocol/openid-connect/auth?client_id=${client}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;

  const res = http.get(loginPageUrl);
  const cookies = res.cookies;
  const doc = parseHTML(res.body);
  const form = doc.find('form');
  const actionUrl = form.attr('action');
  if (!actionUrl) return;

  const formData = {
    username: 'ajayan123krish',
    password: 'Ajayan123krish@',
    credentialId: '',
  };

  const encoded = Object.entries(formData)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  const jar = http.cookieJar();
  for (const name in cookies) {
    cookies[name].forEach(c => {
      jar.set(base, name, c.value);
    });
  }

  const loginRes = http.post(actionUrl, encoded, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirects: 0,
  });

  check(loginRes, {
    'Login successful (302)': (r) => r.status === 302,
  });

  const logoutUrl = `${base}/realms/${realm}/protocol/openid-connect/logout?client_id=${client}&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
  const logoutRes = http.get(logoutUrl, {
    redirects: 0,
  });

  check(logoutRes, {
    'Logout successful (302)': (r) => r.status === 302,
  });
}

export function handleSummary(data) {
  return {
    'resultin&out.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
