const fetchPostOptions: RequestInit = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

const fetchDeleteOptions: RequestInit = {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

const fetchGetOptions: RequestInit = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
  credentials: 'include',
};

export { fetchPostOptions, fetchGetOptions, fetchDeleteOptions };
