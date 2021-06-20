import axios from "axios";

export const getCatFacts = async () => {
  const { data } = await axios.get("https://cat-fact.herokuapp.com/facts");
  return data;
};
