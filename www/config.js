System.config({
  "paths": {
    "*": "*.js",
    "chronos/*": "..\\dev/*.js",
    "github:*": "dev\\jspm_packages/github/*.js",
    "npm:*": "dev\\jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "mithril": "npm:mithril@0.1.28",
    "mithril.elements": "npm:mithril.elements@0.1.1",
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:mithril.elements@0.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

