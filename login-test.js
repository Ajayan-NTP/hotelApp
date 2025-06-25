import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // number of virtual users
  duration: '10s', // test duration
};

export default function () {
  const url = 'http://localhost:8080/realms/HotelRealm/login-actions/authenticate';

  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'AUTH_SESSION_ID=NDhkZmQ4OTgtOWFiMS00NWZhLTk4YmQtNzVjOWZkZmNhOGU1LlU1RHc1S2xSUERPLTNXR0NiMHlRdDF6d050eXZ6MnM3SWJrTHp4NFdBT3pJN3p1N3YzUHBrdmZhUURHUVJ5enRyc0F6SHAzMkI4bkVVR1NtZmY0bmdB; KC_AUTH_SESSION_HASH=67sDcGnUSHPYGktrs/Eo00NGC7CW0vj/yOlSBCxBkv0; KC_RESTART=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..uUIGJjRO0Xz6P5Jey-Ts5Q.eWtBtdANns27TnpdEP_7AiJPs7p_NBwr6XVSqYe0n5d-UFZMKR2deQoBJLGo-PH74HuwkzU0FD7s-2Oy4lHuHcipHPoWcXfbB7Q7-KbNzoRedWh8j7vUZ_rwRAbT5zdnzw5jnJ2Oo1UIMBGa2LYDI5QoT0I2Q0JRQWmubFHP0vY3EQ8_Q4488reyQKnQRgHVQUtvHC_XvqHKhyzfeuoh-YAxXbWVQt-oaArXwMFB9xSpdf03CDe9xihqHfAMJiiFvvUinmHYce-RkZpAD_Z2M7XsrDWSWn8fIoGFKf8lfDjSSA8cqkfm4h-lw8pflLZcoi6RJ0FNgZ2XB907QOQ7bMomHSZZWbhGs3OBD8nNzt-T7MgQfgI97QTIc0x6H7594o_xnVgHqz8Ip3ODzoBAVJVGHzRInzfLLOc3OadmvpzNOB2Ij3bSRBwEmxdqXsn_xr_IrvGVQU9J5X9MQZyAiY4Ua5zDe-EAjketyiLpokpPXvi2_QI5Z9trIjHgj6VLE2_NyaPrjyin-ek63CCCTlyL2kNgazHGfLwoMlM2245wwpTQ54jiPttYlYjsPfr7cFg4fgeK97yq6Qe200m2RGPdkWBYuXGBpc0RBxxPQf5UnJf7UwfEkWpNJlkyPJ1g-cazBgGSmZSZN-w3Ql2DjSPR4NR9UtJcKy5QMFCpYFarJo3PYM4tP2fPmOiula_tls9GpOTASqMvMATjd4Ww8VTDwvL6Ggj_IaRSHJhD82caF3nfLj5SRfpYvbqd9GQKtgkWc5899RRCvB_jUxfb-Dj_Ew6OBNMNmrafGMKWyGz3NxtNXmFakaQF_HRgf53tD8Kr_3uxoKLKtvSPtg1QqzbiuxaNrnkbIdmMIfAkD7UL4bq3TPNSQH3ONzG97Zf3AR0Tah-lqspkGjeha8GLHydZPH7Hu6Qj8feCYqpDyXDpcPTRK9tHCbc4qtOj8HrmpREEpKCZbxtZk1L7bMLeoSKq6obFUXFr1Vv1BtbFN2cX4q60qwmUUefUKj66_Y4vMQQXdt1MCqIaVb3AM0vfaq4GPDELOxGpoDJcm43RU0g.8kDPkJ4XLCPKhcRnFSJ2gQ; Idea-2af1ab68=b51da662-4f3d-4fa3-87b8-744ade854fd7',
    },
  };

  const payload = {
    session_code: 'VAmBskVnMX1WVnWwvGfZWTypVo_TPb7OytY3tJ087uo',
    execution: '4b8905c7-bbc4-42e0-bb47-3c124978d099',
    client_id: 'react-client',
    tab_id: 'xFtBFbVr7o8',
    client_data: 'eyJydSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8iLCJydCI6ImNvZGUiLCJybSI6ImZyYWdtZW50Iiwic3QiOiI0NzMzMTZiNi1lMDBhLTQ3ODQtYTY4NC04MjFlOGEwYWFmY2IifQ',
    username: 'ajayan123krish',
    password: 'Ajayan123krish@',
  };

  // Convert form data to URL-encoded string
  const formData = Object.entries(payload)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const res = http.post(url, formData, params);

  check(res, {
    'login successful (302 redirect expected)': (r) => r.status === 302,
    'response body does not contain login error': (r) => !r.body.includes('Invalid username or password'),
  });

  sleep(1);
}

