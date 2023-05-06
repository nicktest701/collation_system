import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// Get all Students
export const getAllPresidential = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/presidential`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getPresidential = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/presidential`,
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

export const postPresidential = async (newPresidential) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/presidential`,
      data: newPresidential,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putPresidential = async (updatedPresidential) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/presidential`,
      data: updatedPresidential,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const deletePresidential = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/presidential/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
