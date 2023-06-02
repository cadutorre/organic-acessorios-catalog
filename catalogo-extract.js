import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl =
  "https://gazinsemijoias.com.br/transaction/ShopperMethod/Catalog/listItems";

const listaProdutos = new Array();

const responseErrorHandler = (response) => {
  if (response.status != 200) {
    return Promise.reject(new Error("Status is " + response.status));
  } else {
    return Promise.resolve(response.data);
  }
};

const callListaProdutos = async (page, callbackProducts) => {
  const payloadItems = {
    busca: null,
    id_category: null,
    id_subcategory: null,
    selectedClassificacao: null,
    variation: [],
    ordem: null,
    category: "",
    subcategory: "",
    new: "",
    pag: page,
    prp: 64,
  };

  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadItems),
  };

  await fetch(baseUrl, data)
    .then((res) => res.json())
    .then(responseErrorHandler)
    .then((data) => {
      callbackProducts(data);
    })
    .catch((err) => console.error(err))
    .finally(() => console.log("OK"));
};

const pages = { current: { totalPages: 2 } };

for (let index = 1; index < pages.current.totalPages; index++) {
  console.log(pages.current.currentPage + "/" + pages.current.totalPages);
  await callListaProdutos(index, (page) => (pages.current = page));
  listaProdutos.push(...pages.current.results);
  console.log("total: ", listaProdutos.length);
}

const outputFilename = "catalogo.json";
fs.writeFile(outputFilename, JSON.stringify(listaProdutos, null, 4), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename);
  }
});
