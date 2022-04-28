// A mock function to make an async request for data
export function fetchUserPassword() {
  return fetch('./mock/password.json');
}

// A mock function to make an async request for data
export function fetchUserInfo() {
  return fetch('./mock/info.json');
}

export function fetchCurrencyRate() {
  return fetch('https://api.exchangerate.host/latest?base=VND&places=10');
}
