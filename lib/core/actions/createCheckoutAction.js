const fs = require("fs");
const path = require("path");

const createCheckoutAction = (project, url) => {
  // 读取配置文件
  try {
    const jsonPath = path.resolve(__dirname, "../../config/index.json");
    const jsonData = fs.readFileSync(jsonPath);
    const jsonObj = JSON.parse(jsonData);
    console.log(jsonObj);
  } catch (err) {
    console.log(err);
  }

};

module.exports = {
    createCheckoutAction,
};
