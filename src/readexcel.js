const XLSX = require('xlsx');

const readExcel = () => {
  const workbook = XLSX.readFile('./src/data/sample.xlsx');
  const sheet_name_list = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
};

module.exports = { readExcel };
