import axios from "axios";

const api = axios.create({
  baseURL: "http://65f9-41-142-41-33.ngrok.io",
});

const getAllRecipes = async (item) => {
  let data;
  await api
    .get(`/recipes/?categorie=${item}`)
    .then((res) => {
      data = res.data;
      console.log("DATA FETCHED CORRECTLY");
    })
    .catch((err) => console.log("EROR", err));
  return data;
};

const getFiltredRecipes = async () => {
  console.log("hey");
  await api({
    method: "post",
    data: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });
};
export { getAllRecipes, getFiltredRecipes };
