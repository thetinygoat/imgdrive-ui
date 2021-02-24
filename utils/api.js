import axios from "axios";
const api = axios.create({
  baseURL: "https://polar-depths-49240.herokuapp.com/api",
});
export const getRootData = async () => {
  const data = await api.get("/dir");
  return data.data;
};

export const renameFolder = async (name, id) => {
  const data = await api.post(`/dir/${id}/rename`, { name });
  return data.data;
};

export const getChildren = async (id) => {
  const data = await api.get(`/dir/${id}/children`);
  return data.data;
};

export const addFolder = async (name, parent) => {
  let data;
  if (parent) {
    data = await api.post(`/dir/new?parent=${parent}`, { name });
  } else {
    data = await api.post("/dir/new", { name });
  }
  return data.data;
};

export const uploadFile = async (file, parent) => {
  const form = new FormData();
  form.append("file", file, file.name);
  let data;
  if (parent) {
    data = await api({
      method: "POST",
      url: `/file/upload?parent=${parent}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: form,
    });
  } else {
    data = await api({
      method: "POST",
      url: "/file/upload",
      headers: { "Content-Type": "multipart/form-data" },
      data: form,
    });
  }
  return data.data;
};

export const deleteDir = async (id) => {
  const data = await api({
    method: "DELETE",
    url: `/dir/${id}`,
  });
  return data.data;
};

export const searchFiles = async (q, format) => {
  let data;
  if (format) {
    data = await api({
      method: "GET",
      url: `/file/search?q=${q}&&format=${format}`,
    });
  } else {
    data = await api({
      method: "GET",
      url: `/file/search?q=${q}`,
    });
  }
  return data.data;
};
