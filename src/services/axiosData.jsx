import axios  from 'axios';
export const getUsersData = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/getUser/${id}`);
    return res.data;
  
  }