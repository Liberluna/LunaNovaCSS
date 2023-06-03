class DOMObserver {
  constructor(callback) {
    this.observer = new MutationObserver(callback);
    this.targetNode = document.body;
    this.observerOptions = { childList: true, subtree: true };
  }

  start() {
    this.observer.observe(this.targetNode, this.observerOptions);
  }

  stop() {
    this.observer.disconnect();
  }
}

class LunaNova {
  constructor() {
    this.observer = new DOMObserver(this.changeDOM.bind(this));
    this.observer.start();

    Nova.DeployStyle();

    this.changeDOM();
  }

  changeDOM() {
    Nova.RemoveStyle();

    const existingClasses = new Set();
    const documentElements = document.querySelectorAll("*");

    for (const element of documentElements) {
      const elementClassList = element.classList;
      if (elementClassList.length > 0) {
        for (const className of elementClassList) {
          existingClasses.add(className);
        }
      }
    }

    const processedClasses = new Set();

    for (const Class of existingClasses) {
      if (LunaProperty()[Class]) {
        const properties = LunaProperty()[Class];
        Nova.LunaAdd(`.${Class}{`);
        for (const [property, value] of properties.self) {
          Nova.LunaAdd(`${property}:${value};`);
        }
        Nova.LunaAdd("}");

        for (const [pseudo, props] of properties.pse) {
          Nova.LunaAdd(`.${Class}${pseudo}{`);
          for (const [property, value] of props) {
            Nova.LunaAdd(`${property}:${value};`);
          }
          Nova.LunaAdd("}");
        }

        processedClasses.add(Class);
      }
    }

    const unusedClasses = new Set([...processedClasses].filter((c) => !existingClasses.has(c)));

    for (const Class of unusedClasses) {
      Nova.LunaAdd(`.${Class}{display:none;}`);
    }

    Nova.DeployStyle();
  }
}

var UserProperty = {};

let LunaPropertys = {
  test_luna: {
    self: [['color', 'red'], ['font-size', '20px']],
    pse: [
      [":after", [["content", "'test'"], ["color", "red"],]],
    ]
  },
  test_luna2: {
    self: [['color', 'blue'], ['font-size', '15px']],
    pse: [
      [":after", [["content", "'test'"], ["color", "blue"],]],
    ]
  }
};//テスト

function LunaProperty() {
  return Object.assign(
    UserProperty, LunaPropertys
  );
}

const Nova = {
  LunaDefault: "body {margin:0;} *,*::before,*::after {box-sizing: border-box;} ",
  LunaStyle: "",
  LunaAdd(css) {
    this.LunaStyle += css;
  },
  DeployStyle() {
    const style = `<style id="lunaNova">${this.LunaDefault} ${this.LunaStyle}</style>`;
    document.head.insertAdjacentHTML('beforeend', style);
  },
  RemoveStyle() {
    this.LunaStyle = "";
    const styleElement = document.querySelector("#lunaNova");
    if (styleElement) {
      styleElement.remove();
    }
  },
  allset() { },
  credit() {
    console.log("%c Dev: ame.x / @macl2189 / Join us : liberluna.github.io",
      "color:white; background-color: #ff0000; padding:2px 4px; border-radius:5px;");
  }
};

const Luna = {
  Set: function (prop, value, key) {
    UserProperty[prop][key] = value;
  },
  powerSet: function (obj) {
    UserProperty = obj;
  },
  clear: function () {
    UserProperty = {};
  },
  Add: function (prop, value) {
    UserProperty[prop] = value;
  },
  Remove: function (prop) {
    delete UserProperty[prop];
  },
} //CSS Obejectを操作する為のmathods

window.LunaNova = true;
const lunaNova = new LunaNova();
Nova.allset();

/*
  予約語
  UserProperty
  LunaPropertys
  LunaProperty
  Nova
  Luna

  追加 = json of 
  methods
*/