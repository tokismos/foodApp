import axios from "axios";

const api = axios.create({
  baseURL: "http://55e0-197-253-254-100.ngrok.io",
  // baseURL: "https://backend-yuzi.herokuapp.com/",
});

const getAllRecipes = async (item) => {
  let url = "?";
  item.map((item) => {
    url = url + `${item.categorie}=${item.value}&`;
  });
  let data;
  try {
    const res = await api.get(`/recipes`);
    data = res.data;
  } catch (e) {
    console.log("ERROR", e);
  }
  return data;
};

const getFiltredRecipes = async () => {
  await api({
    method: "post",
    data: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });
};
export { getAllRecipes, getFiltredRecipes, api };
