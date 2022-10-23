class Article {
  constructor(title, length, id, layer) {
    this.title = title;
    this.length = length;
    this.id = id;
    this.layer = layer;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.len = 50;
  }

  getTitle() {
    return this.title;
  }
  getLength() {
    return this.length;
  }
  getID() {
    return this.id;
  }
  setTitle(title) {
    this.title = title;
  }
  setLength(length) {
    this.length = length;
  }
  setID(id) {
    this.id = id;
  }
} //Article

function myAdjacencyMap() {
  return adjacencyMap;
}

function convert(obj) {
  return Object.keys(obj).map((key) => ({
    name: key,
    value: obj[key],
    type: "foo",
  }));
}

function displayDataToConsole(article) {
  console.log("OBJ DATA");
  console.log(article.getTitle());
  console.log(article.getLength());
  console.log(article.getID());
}

function initialURL(title) {
  return (
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&titles=" +
    title.trim().replace(/ /g, "%20")
  );
  +"&formatversion=2&inprop=subjectid%7Cdisplaytitle";
}

function formURL(title, limit) {
  var apiEndpoint = "https://en.wikipedia.org/w/api.php?";
  var queryLimit = "gpllimit=" + limit;
  var encodedTitle = "titles=" + title.trim().replace(/ /g, "%20");
  var query =
    "action=query&generator=links&" +
    encodedTitle +
    "&prop=info&format=json&" +
    queryLimit;
  return apiEndpoint + query;
} // formURL


function visualize() {
  var search = document.getElementById('search-field').value;
  ogUrl = initialURL(search);
  console.log(ogUrl);
}

var initial = "Georgia Tech"
if (window.location.search != "") {
  var search = window.location.search;
  console.log(search);
  var front = search.indexOf("=");
  initial = search.substring(front + 1)
  initial = initial.replace('+', " ");
  console.log(initial);
}

var ogUrl = initialURL(initial);
var ogArticle;

var json = {};
$.ajax({
  url: ogUrl + "&origin=*",
  async: false,
  dataType: "json",
  success: function (data) {
    json = data;
  },
});
//console.log(json);
var arr = convert(json.query.pages)[0];
ogArticle = new Article(arr.value.title, arr.value.length, arr.name, 0);

var spread = 2;
//console.log(ogArticle);
var chineseUrl = formURL(ogArticle.title, spread);
//console.log(chineseUrl);

var queue = [];
var adjacencyMap = new Map();

var x = 0;
queue.push(ogArticle);
var tempArticle;
var basearr = [];
var newArticle;
var tempjson;
var jsonarr;
var depth = 3;

for (var i = 1; i <= depth; i++) {
  l = queue.length;
  x = 0;
  while (x < l) {
    tempArticle = queue.shift();
    if (tempArticle.id > 0) {
      basearr = [];
      basearr.push(tempArticle);
      adjacencyMap.set(tempArticle.id, basearr);
      tempjson = {};
      $.ajax({
        url: formURL(tempArticle.title, spread) + "&origin=*",
        async: false,
        dataType: "json",
        success: function (data) {
          tempjson = data;
        },
      });
      jsonarr = convert(tempjson.query.pages);
      for (var j = 0; j < spread && j < jsonarr.length; j++) {
        newArticle = new Article(
          jsonarr[j].value.title,
          jsonarr[j].value.length,
          jsonarr[j].name,
          i
        );
        console.log(newArticle.title);

        if (!adjacencyMap.has(newArticle.id)) {
          queue.push(newArticle);

          basearr = [];
          basearr.push(newArticle);
          adjacencyMap.set(newArticle.id, basearr);

          adjacencyMap.get(tempArticle.id).push(newArticle);
        } else {
          adjacencyMap.get(newArticle.id).push(tempArticle);
        }
      }
    }
    x++;
  }
}
