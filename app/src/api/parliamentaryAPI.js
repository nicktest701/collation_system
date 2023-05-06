import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// Get all Students
export const getAllParliamentary = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/parliamentary`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getParliamentary = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/parliamentary`,
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

export const postParliamentary = async (newParliamentary) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/parliamentary`,
      data: newParliamentary,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putParliamentary = async (updatedSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/parliamentary`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteParliamentary = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/parliamentary/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
