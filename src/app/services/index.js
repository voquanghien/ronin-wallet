// A mock function to mimic making an async request for data
export function fetchUserPassword() {
  return fetch('./mock/password.json');
}

export function fetchUserInfo() {
  return fetch('./mock/info.json');
}

export function fetchCurrencyRate() {
  return fetch('https://api.exchangerate.host/latest?base=VND&places=10');
}
