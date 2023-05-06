import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// Get all Students
export const getAllPollingStations = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/polling-stations`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getPollingStation = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/polling-stations`,
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

export const postPollingStation = async (newPollingStation) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/polling-stations`,
      data: newPollingStation,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putPollingStation = async (updatedSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/pollingStation`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const deletePollingStation = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/polling-stations/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
