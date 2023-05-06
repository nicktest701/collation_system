import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// Get all Students
export const getAllParties = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/parties`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getParty = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/parties`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const postParty = async (newParty) => {
  const formData = new FormData();
  // Party
  formData.append('flag', newParty.flag);
  formData.append('name', newParty.name);
  formData.append('initials', newParty.initials);

  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/parties`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putParty = async (updatedSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/parties`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteParty = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/parties/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
