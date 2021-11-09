import config from "../_config";

const list = async (headers = {}) =>
  fetch(`${config.url}/scholarships`, {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => {});

const get = async (id, headers = {}) =>
  fetch(`${config.url}/scholarship/${id}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => null);

const create = async (user, data, headers = {}) =>
  user
    .getIdToken(true)
    .then((idToken) =>
      fetch(`${config.url}/scholarship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
          ...headers,
        },
        body: JSON.stringify(data),
      })
    )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => null);

const update = async (user, id, data, headers = {}) =>
  user
    .getIdToken(true)
    .then((idToken) =>
      fetch(`${config.url}/scholarship/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
          ...headers,
        },
        body: JSON.stringify(data),
      })
    )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => null);

const del = async (user, id, headers = {}) => {
  user
    .getIdToken(true)
    .then((idToken) =>
      fetch(`${config.url}/scholarship/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
          ...headers,
        },
      })
    )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => null);
};

export default { list, get, create, update, delete: del };
