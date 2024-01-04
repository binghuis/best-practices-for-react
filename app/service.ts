import axios from "axios";

export const getCat = async () => {
  const res = await axios.get("http://localhost:3000/api/cat");
  return res;
};
