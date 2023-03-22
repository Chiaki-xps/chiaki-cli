const fs = require('fs');
const path = require('path');

const readJson = async () => {
  let jsonObj;
  try {
    const jsonPath = path.resolve(__dirname, '../config/index.json');
    const jsonData = await fs.readFileSync(jsonPath, 'utf-8');
    jsonObj = JSON.parse(jsonData);
    return jsonData;
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = {
  readJson,
};
