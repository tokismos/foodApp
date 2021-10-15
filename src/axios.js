import axios from "axios";

const api = axios.create({
  baseURL: "http://9557-196-74-147-41.ngrok.io",
});

const getAllRecipes = (setDATA) => {
  let data;
  api
    .get("/recipes")
    .then((res) => {
      data = res.data;
      setDATA(data);
      console.log("DATA FETCHED CORRECTLY", data);
    })
    .catch((err) => console.log("EROR", err));
  return data;
};
export { getAllRecipes };
