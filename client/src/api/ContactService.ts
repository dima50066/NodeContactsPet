import axios from 'axios';

const API_URL = 'http://localhost:3001/contacts';

export const fetchContacts = async (params?: any) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const fetchContactById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createContact = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateContact = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
