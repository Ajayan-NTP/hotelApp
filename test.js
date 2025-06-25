import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
// ✨ HTML & Text Summary Report Generation
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export const options = {
  vus: 100,
  iterations: 100,
  duration: '150s',
};

export default function () {
  const loginPageUrl = 'http://localhost:8080/realms/HotelRealm/protocol/openid-connect/auth?client_id=react-client&response_type=code&scope=openid&redirect_uri=http://localhost:3000';

  const res = http.get(loginPageUrl);
  const cookies = res.cookies;
  const doc = parseHTML(res.body);
  const form = doc.find('form');
  const actionUrl = form.attr('action');

 // console.log(`➡️ Form action URL: ${actionUrl}`);
  if (!actionUrl) return;

  function parseQueryParams(url) {
    const query = url.split('?')[1] || '';
    const pairs = query.split('&');
    const params = {};
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) params[key] = decodeURIComponent(value || '');
    }
    return params;
  }

  const params = parseQueryParams(actionUrl);
//   console.log(`🆔 session_code: ${params.session_code}`);
//   console.log(`🔁 execution: ${params.execution}`);
//   console.log(`🧠 client_id: ${params.client_id}`);
//   console.log(`🧩 tab_id: ${params.tab_id}`);

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
      jar.set('http://localhost:8080', name, c.value);
    });
  }

  const loginRes = http.post(actionUrl, encoded, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirects: 0,
  });

  check(loginRes, {
    'Login POST status is 302': (r) => r.status === 302,
  });

  //console.log(`📍 Login POST status: ${loginRes.status}`);
}

export function handleSummary(data) {
  return {
    'result.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
