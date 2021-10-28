import axios from "axios";

const api = axios.create({
  baseURL: "http://5d1a-196-217-64-175.ngrok.io",
});

const getAllRecipes = async () => {
  let data;
  await api
    .get(`/recipes?categorie=dejeuner&difficulte=facile`)
    .then((res) => {
      data = res.data;
      console.log("DATA FETCHED CORRECTLY", data);
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
