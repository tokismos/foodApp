import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-yuzi.herokuapp.com/",
});

const getAllRecipes = async (item) => {
  let url = "?";
  console.log("eerf", item);
  item.map((item) => {
    url = url + `${item.categorie}=${item.value}&`;
  });
  let data;
  console.log("daaaaata", url);
  try {
    const res = await api.get(`/recipes`);
    console.log("thid id resssq", res);
    data = res.data;
    console.log("DATA FETCHED CORRECTLY", data);
  } catch (e) {
    console.log("EROR", e);
  }
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
