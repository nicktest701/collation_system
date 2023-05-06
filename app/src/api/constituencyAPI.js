import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get all Students
export const getAllConstituencies = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/constituencies`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getConstituency = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/constituencies`,
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

export const postConstituency = async (newConstituency) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/constituencies`,
      data: newConstituency,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putConstituency = async (updatedSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/constituencies`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteConstituency = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/constituencies/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
