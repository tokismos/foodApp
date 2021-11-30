import axios from "axios";

const api = axios.create({
  baseURL: "http://644b-105-189-6-127.ngrok.io",
  //baseURL: "https://backend-yuzi.herokuapp.com/",
});

const getAllRecipes = async (item) => {
  //randomize data of array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  let url = "?";
  item.map((item) => {
    url = url + `${item.categorie}=${item.value}&`;
  });
  let data;
  try {
    const res = await api.get(`/recipes`);
    data = res.data;
    shuffleArray(data);
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
