import fs from "fs";

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const catalogo = loadJSON("./catalogo.json");

// const baseImgUrl = "https://gazinsemijoias.com.br/public/images/items/";

// const baseDir = "catalogo";

const createDir = (data) => {
  data.results.forEach((parent) => {
    fs.mkdir(
      path.join(__dirname, "catalogo", parent.slug),
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully!");
      }
    );
  });
};

// catalogo.forEach((produto) => {
//   createDir(produto);
//   extractData(produto);
//   downloadImages(produto);
// });

catalogo.forEach(produto=>{
    produto.options
})

//SKU desajada pela gabi = 89935
