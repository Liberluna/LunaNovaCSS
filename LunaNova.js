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
    const documentElement = document.querySelectorAll("*");

    documentElement.forEach((element) => {
      const elementClassList = element.classList;
      if (elementClassList.length > 0) {
        elementClassList.forEach((className) => {
          existingClasses.add(className);
        });
      }
    });

    const processedClasses = new Set();

    existingClasses.forEach((Class) => {
      if (LunaProperty[Class]) {
        Nova.LunaAdd(`.${Class}{`);
        for (const [property, value] of LunaProperty[Class]["self"]) {
          Nova.LunaAdd(`${property}:${value};`);
        }
        Nova.LunaAdd("}");

        for (const [pseudo, properties] of LunaProperty[Class]["pse"]) {
          Nova.LunaAdd(`.${Class}${pseudo}{`);
          for (const [property, value] of properties) {
            Nova.LunaAdd(`${property}:${value};`);
          }
          Nova.LunaAdd("}");
        }

        processedClasses.add(Class);
      }
    });

    const unusedClasses = new Set([...processedClasses].filter((c) => !existingClasses.has(c)));

    unusedClasses.forEach((Class) => {
      Nova.LunaAdd(`.${Class}{display:none;}`);
    });

    Nova.DeployStyle();
  }
}

const LunaProperty = {
  test_luna: {
    self: [['color', 'red'], ['font-size', '20px']],
    pse: [
      [":after", [["content", "'test'"], ["color", "red"],]],
    ]
  }
};

const Nova = {
  LunaDefault: "body {margin:0;} *,*::before,*::after {box-sizing: border-box;} ",
  LunaStyle: "",
  LunaAdd(css) {
    this.LunaStyle += css;
  },
  DeployStyle() {
    let style = `<style id="lunaNova">${this.LunaDefault} ${this.LunaStyle}</style>`;
    document.head.innerHTML += style;
  },
  RemoveStyle() {
    this.LunaStyle = ""; // スタイルをリセットする
    const styleElement = document.querySelector("#lunaNova");
    if (styleElement) {
      styleElement.remove();
    }
  }
};

window.LunaNova = true;
const lunaNova = new LunaNova();
