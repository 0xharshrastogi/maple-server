const { URL, parse } = require("url");

const testURL = new URL("http://localhost:8080/v1/user?select=-_Id%20-__v%20-classrooms");

console.log(parse("http://localhost:8080/v1/user?select=-_Id%20-__v%20-classrooms"));

console.log(testURL);
