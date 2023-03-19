const fs = require("fs");
const path = require("path");

const createAddAction = (project, url) => {
  const jsonPath = path.resolve(__dirname, "../../config/index.json");
  let jsonObj;
  let urlOption;

  // 校验URL
  try {
    urlOption = new URL(url);
  } catch (err) {
    return;
  }

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
    jsonObj[project] = urlOption.protocol === 'https' ? 'direct:' + url : url;
    console.log(jsonObj);
    const data = JSON.stringify(jsonObj);
    fs.writeFileSync(jsonPath, data);
  }
};

module.exports = {
  createAddAction,
};
