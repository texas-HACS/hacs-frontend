import config from "../_config";

const list = async () =>
  fetch(`${config.url}/events`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data == null) {
        data = {};
      }
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

const get = async (id) =>
  fetch(`${config.url}/event/${id}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data == null) {
        data = {};
      }
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

const create = async (user, data) =>
  user
    .getIdToken(true)
    .then((idToken) => {
      fetch(`${config.url}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify(data),
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

const update = async (user, id, data) =>
  user
    .getIdToken(true)
    .then((idToken) => {
      fetch(`${config.url}/event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify(data),
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

const del = async (user, id) =>
  user
    .getIdToken(true)
    .then((idToken) => {
      fetch(`${config.url}/event/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

export default { list, get, create, update, delete: del };
