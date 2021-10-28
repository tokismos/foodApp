import axios from "axios";

const api = axios.create({
  baseURL: "http://3162-41-249-235-83.ngrok.io",
});

const getAllRecipes = async (item) => {
  let url = "?";
  console.log("eerf", item);
  item.map((item) => {
    url = url + `${item.categorie}=${item.value}&`;
  });
  let data;
  console.log("daaaaata", url);
  await api
    .get(`/recipes${url}`)
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
