import "@/assets/excel/cpexcel";
import "@/assets/excel/Blob";

export { json2excel, getCharCol, formatJson };
function json2excel(tableJson, filenames, autowidth, bookTypes) {
  import("@/assets/excel/Export2Excel").then(excel => {
    var tHeader = [];
    var dataArr = [];
    var sheetnames = [];
    for (var i in tableJson) {
      tHeader.push(tableJson[i].tHeader);
      dataArr.push(formatJson(tableJson[i].filterVal, tableJson[i].tableDatas));
      sheetnames.push(tableJson[i].sheetName);
    }
    excel.export_json_to_excel({
      header: tHeader,
      data: dataArr,
      sheetname: sheetnames,
      filename: filenames,
      autoWidth: autowidth,
      bookType: bookTypes
    });
  });
}
// 数据过滤，时间过滤
function formatJson(filterVal, jsonData) {
  return jsonData.map(v =>
    filterVal.map(j => {
      if (j === "timestamp") {
        return parseTime(v[j]);
      } else {
        return v[j];
      }
    })
  );
}

// 获取26个英文字母用来表示excel的列
function getCharCol(n) {
  for (var i = 0; i < this.list.length; i++) {
    this.list[i].showActive = false;
    if (index == i) {
      this.list[index].showActive = true;
    }
  }

  let temCol = "",
    s = "",
    m = 0;
  while (n > 0) {
    m = (n % 26) + 1;
    s = String.fromCharCode(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
}