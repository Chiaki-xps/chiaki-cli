const fs = require("fs");
const path = require("path");

const createAddAction = (project, url) => {
  const jsonPath = path.resolve(__dirname, "../../config/index.json");
  let jsonObj;

  // 校验URL
//   function isValidUrl(string) {
//     try {
//       new URL(string);
//       return true;
//     } catch (err) {
//       return false;
//     }
//   }
//   console.log(isValidUrl(url));

  // 读取配置文件
  try {
    const jsonData = fs.readFileSync(jsonPath);
    jsonObj = JSON.parse(jsonData);
  } catch (err) {
    console.log(err);
  }

  console.log(project);
  console.log(url);

  if (jsonObj?.[project]) {
    console.log(`${project}已经存在`);
    return;
  } else {
    jsonObj[project] = url;
    console.log(jsonObj);
    const data = JSON.stringify(jsonObj);
    fs.writeFileSync(jsonPath, data);
  }
};

module.exports = {
  createAddAction,
};
