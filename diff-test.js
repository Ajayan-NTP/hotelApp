import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    login: {
      executor: 'constant-vus',
      exec: 'login',
      vus: 1,
      duration: '30s',
    },
    logout: {
      executor: 'constant-vus',
      exec: 'logout',
      vus: 1,
      duration: '30s',
    },
//     search: {
//       executor: 'constant-vus',
//       exec: 'search',
//       vus: 1,
//       duration: '30s',
//     },
//     viewProfile: {
//       executor: 'constant-vus',
//       exec: 'viewProfile',
//       vus: 1,
//       duration: '30s',
//     },
//     updateProfile: {
//       executor: 'constant-vus',
//       exec: 'updateProfile',
//       vus: 1,
//       duration: '30s',
//     },
//     bookRoom: {
//       executor: 'constant-vus',
//       exec: 'bookRoom',
//       vus: 1,
//       duration: '30s',
//     },
//     cancelBooking: {
//       executor: 'constant-vus',
//       exec: 'cancelBooking',
//       vus: 1,
//       duration: '30s',
//     },
//     bookingHistory: {
//       executor: 'constant-vus',
//       exec: 'bookingHistory',
//       vus: 1,
//       duration: '30s',
//     },
//     changePassword: {
//       executor: 'constant-vus',
//       exec: 'changePassword',
//       vus: 1,
//       duration: '30s',
//     },
//     contactSupport: {
//       executor: 'constant-vus',
//       exec: 'contactSupport',
//       vus: 1,
//       duration: '30s',
//     },
   },
};

// 🔁 Define scenario functions

export function login() {
  const res = http.post('https://practicetestautomation.com/practice-test-login/', JSON.stringify({
    username: 'user1',
    password: 'pass1',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'Login status 200': (r) => r.status === 200 });
  sleep(1);
}

export function logout() {
  const res = http.get('https://practicetestautomation.com/logged-in-successfully/');
  check(res, { 'Logout success': (r) => r.status === 200 });
  sleep(1);
}

// export function search() {
//   const res = http.get('https://example.com/api/search?q=room');
//   check(res, { 'Search success': (r) => r.status === 200 });
//   sleep(1);
// }

// export function viewProfile() {
//   const res = http.get('https://example.com/api/user/profile');
//   check(res, { 'Profile loaded': (r) => r.status === 200 });
//   sleep(1);
// }

// export function updateProfile() {
//   const res = http.put('https://example.com/api/user/profile', JSON.stringify({
//     name: 'New Name',
//   }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
//   check(res, { 'Profile updated': (r) => r.status === 200 });
//   sleep(1);
// }

// export function bookRoom() {
//   const res = http.post('https://example.com/api/book', JSON.stringify({
//     room: '101',
//     date: '2025-06-05',
//   }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
//   check(res, { 'Room booked': (r) => r.status === 200 });
//   sleep(1);
// }

// export function cancelBooking() {
//   const res = http.del('https://example.com/api/book/101');
//   check(res, { 'Booking cancelled': (r) => r.status === 200 });
//   sleep(1);
// }

// export function bookingHistory() {
//   const res = http.get('https://example.com/api/book/history');
//   check(res, { 'History loaded': (r) => r.status === 200 });
//   sleep(1);
// }

// export function changePassword() {
//   const res = http.put('https://example.com/api/user/password', JSON.stringify({
//     oldPassword: 'pass1',
//     newPassword: 'pass2',
//   }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
//   check(res, { 'Password changed': (r) => r.status === 200 });
//   sleep(1);
// }

// export function contactSupport() {
//   const res = http.post('https://example.com/api/support', JSON.stringify({
//     message: 'Need help with my booking',
//   }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
//   check(res, { 'Support contacted': (r) => r.status === 200 });
//   sleep(1);
// }
