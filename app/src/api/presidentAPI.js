import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// Get all Students
export const getAllPresidents = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/presidents`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const getPresident = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/presidents/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const postPresident = async (newPresident) => {
  const formData = new FormData();
  formData.append('profile', newPresident.profile);
  formData.append('firstname', newPresident.firstname);
  formData.append('surname', newPresident.surname);
  formData.append('othername', newPresident.othername);
  formData.append('dateofbirth', newPresident.dateofbirth);
  formData.append('gender', newPresident.gender);
  formData.append('email', newPresident.email);
  formData.append('phonenumber', newPresident.phonenumber);
  formData.append('placeofbirth', newPresident.placeofbirth);
  formData.append('address', newPresident.address);
  formData.append('region', newPresident.region);
  formData.append('party', newPresident.party);
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/presidents`,
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

export const putPresident = async (updatedPresident) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/presidents`,
      data: updatedPresident,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};

export const putPresidentProfile = async (profileInfo) => {
  const formData = new FormData();
  formData.append('_id', profileInfo._id);
  formData.append('profile', profileInfo.profile);
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/presidents/profile`,
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

export const deletePresident = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/presidents/${id}`,
    });

    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    throw error.response.data;
  }
};
