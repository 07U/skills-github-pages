(function () {
  var script = document.createElement('script');
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
  script.async = true;
  document.head.appendChild(script);
})();

MathJax = {
  loader: {load: ['[tex]/tagformat']},
  section: 1,
  tex: {
    tags: 'ams',
    packages: {'[+]': ['tagformat', 'sections']},
    tagformat: {
      number: (n) => MathJax.config.section + '.' + n
    }
  },
  startup: {
    ready() {
      const Configuration = MathJax._.input.tex.Configuration.Configuration;
      const CommandMap = MathJax._.input.tex.SymbolMap.CommandMap;
      new CommandMap('sections', {
        setSection: 'SetSection',
      }, {
        SetSection(parser, name) {
          const n = parser.GetArgument(name);
          MathJax.config.section = parseInt(n);
          parser.tags.counter = parser.tags.allCounter = 0;
        }
      });
      Configuration.create(
        'sections', {handler: {macro: ['sections']}}
      );
      MathJax.startup.defaultReady();
      MathJax.startup.input[0].preFilters.add(({math}) => {
        if (math.inputData.recompile) MathJax.config.section = math.inputData.recompile.section;
      });
      MathJax.startup.input[0].postFilters.add(({math}) => {
        if (math.inputData.recompile) math.inputData.recompile.section = MathJax.config.section;
      });
   }
  }
};

(function () {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.id = "MathJax-script";
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
  script.async = true;
  document.head.appendChild(script);
})();
