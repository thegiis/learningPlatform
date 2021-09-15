import lessonMap from "@/assets/data/lessonsMap.json";

function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

function getVocabPosition(rect) {
  let position = {};
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;
  const elementX = rect.x + rect.width / 2;
  const elementY = rect.y + rect.height / 2;
  // check if element lies on left
  // if left
  if (elementX <= centerX) {
    position["left"] = rect.x + "px";
    position["right"] = "auto";
    if (rect.x > 120) {
      position["transform"] = "translateX(-50%)";
    } else {
      position["transform"] = "none";
    }
  } else {
    position["left"] = "auto";
    position["right"] = windowWidth - (rect.x + rect.width) + "px";
    if (windowWidth - rect.x > 120) {
      position["transform"] = "translateX(50%)";
    } else {
      position["transform"] = "none";
    }
  }
  //check if element lies on top
  if (elementY <= centerY) {
    position["top"] = rect.y + rect.height + "px";
    position["bottom"] = "auto";
  } else {
    position["top"] = "auto";
    position["bottom"] = windowHeight - rect.y + "px";
  }

  // console.log(position)
  return position;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // sort arrays
  a.sort();
  b.sort();

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getPageNamesFromMap(data) {
  // folder name for each lesson then page names inside folder in lessonsMap.json file
  const lessonData = Object.entries(data.lessons);
  const pageNames = lessonData.map((x) => Object.entries(x[1])[0]);
  let pages = [];

  pageNames.forEach((x) => {
    const pageCode = x[0];
    const pageNums = x[1].pages;
    let pageName = "";

    for (let i = 0; i < pageNums.length; i++) {
      pageName = pageCode + "-" + pageNums[i];
      pages.push(pageName);
    }
  });
  return pages;
}

function getModulesFromMap(data) {
  // folder name for each lesson then page names inside folder in lessonsMap.json file
  const lessonData = Object.entries(data.lessons);
  const pageNames = lessonData.map((x) => Object.entries(x[1])[0]);
  let modules = [];

  pageNames.forEach((x) => {
    const pageCode = x[0];
    const pageNums = x[1].pages;
    let pageName = "";
    let chapterPages = [];
    let pageTypes = [];

    for (let i = 0; i < pageNums.length; i++) {
      if (pageNums[i] === "") {
        chapterPages.push(pageCode);
        pageTypes.push("watch");
      } else {
        pageName = pageCode + "-" + pageNums[i];
        chapterPages.push(pageName);

        let type = pageNums[i].toLowerCase();
        if (type.startsWith("quiz")) pageTypes.push("quiz");
        else if (type.startsWith("page")) pageTypes.push("learn");
      }
    }
    const moduleItem = {};
    const temp = Object.entries(x[1]);
    for (let i = 1; i < temp.length; i++) {
      let langData = temp[i][1];
      langData.routes = chapterPages;
      langData.id = pageCode;

      // get videoId
      const indexPage = langData.pageNames[0];
      const currentVideoId = indexPage.split("___")[1];
      langData.videoId = currentVideoId;

      // get pages from langData.pageNames and chapterPages
      let pages = [];
      for (let i = 0; i < langData.pageNames.length; i++) {
        let page = {};
        page.name = langData.pageNames[i];
        page.route = chapterPages[i];
        page.type = pageTypes[i];
        pages.push(page);
      }
      langData.pages = pages;
      const tempItem = {
        [temp[i][0]]: langData,
      };
      Object.assign(moduleItem, tempItem);
    }
    modules.push(moduleItem);
  });

  return modules;
}

function getLessonsFromModules(modules) {
  //{en: [{id: 'food', title: 'Food', videoId: '03434', pages: [{name: 'blah', route: 'blah', type: 'learn'}]}],
  // np: [{id: 'food', title: 'Khan', videoId: '03434', pages: [{name: 'blah', route: 'blah', type: 'learn'}]}]}
  let allLessons = {};
  for (let i = 0; i < modules.length; i++) {
    let currObj = modules[i];
    //iterate through object
    for (const [key, value] of Object.entries(currObj)) {
      if (!allLessons[key]) allLessons[key] = [];
      allLessons[key].push(value);
    }
  }
  return allLessons;
}

function isObjectEmpty(obj) {
  if (typeof obj !== "object") {
    return true;
  }
  // console.log(Object.keys(obj).length === 0)
  // console.log(obj)
  // return true
  return Object.keys(obj).length === 0;
}

function getVideoIdFromRoute(route, lang = "en") {
  const page = route.name.split("__")[0];
  let lesson = lessonMap.lessons.filter((x) => Object.keys(x)[0] === page)[0];
  let firstPage = lesson[page][lang].pageNames[0];
  let videoId = firstPage.split("___")[1];
  return videoId;
}

export {
  isAlphaNumeric,
  getVocabPosition,
  arraysEqual,
  shuffleArray,
  getPageNamesFromMap,
  getModulesFromMap,
  isObjectEmpty,
  getVideoIdFromRoute,
  getLessonsFromModules,
};
