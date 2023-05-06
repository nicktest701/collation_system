import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// Get all Students
export const getAllParliamentarians = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/parliamentarians`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getParliamentarian = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/parliamentarians/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const postParliamentarian = async (newParliamentarian) => {
  const formData = new FormData();
  formData.append('profile', newParliamentarian.profile);
  formData.append('firstname', newParliamentarian.firstname);
  formData.append('surname', newParliamentarian.surname);
  formData.append('othername', newParliamentarian.othername);
  formData.append('dateofbirth', newParliamentarian.dateofbirth);
  formData.append('gender', newParliamentarian.gender);
  formData.append('email', newParliamentarian.email);
  formData.append('phonenumber', newParliamentarian.phonenumber);
  formData.append('placeofbirth', newParliamentarian.placeofbirth);
  formData.append('address', newParliamentarian.address);
  formData.append('region', newParliamentarian.region);
  formData.append('party', newParliamentarian.party);
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/parliamentarians`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putParliamentarian = async (updatedParliamentarian) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/parliamentarians`,
      data: updatedParliamentarian,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putParliamentarianProfile = async (profileInfo) => {
  const formData = new FormData();
  formData.append('_id', profileInfo._id);
  formData.append('profile', profileInfo.profile);
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/parliamentarians/profile`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteParliamentarian = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/parliamentarians/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
