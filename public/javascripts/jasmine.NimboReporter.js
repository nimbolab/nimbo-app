jasmine.NimboReporter = function () {
    // console.log('Reporter new NimboReporter');
};

jasmine.NimboReporter.prototype.reportRunnerStarting = function (runner) {
    // console.log('Reporter reporterRunnerStarting', runner);
};

jasmine.NimboReporter.prototype.reportRunnerResults = function (runner) {
    var suites, specs;
    var failedCount = 0;
    var passedCount = 0;

    suites = runner.suites();
    for (var suiteIndex = 0; suiteIndex < suites.length; suiteIndex++) {
        specs = suites[suiteIndex].specs();
        for (var specIndex = 0; specIndex < specs.length; specIndex++) {
            failedCount += specs[specIndex].results().failedCount;
            passedCount += specs[specIndex].results().passedCount;
        }
    }

    top.nimbo.capture.postMessage({
        failed: failedCount,
        passed: passedCount
    });
};

jasmine.NimboReporter.prototype.reportSuiteResults = function (suite) {
    // console.log('Reporter reportSuiteResults', suite);
};

jasmine.NimboReporter.prototype.reportSpecStarting = function (spec) {
    // console.log('Reporter reportSpecStarting', spec);
};

jasmine.NimboReporter.prototype.reportSpecResults = function (spec) {
    // console.log('Reporter reportSpecResults', spec);
};

jasmine.NimboReporter.prototype.log = function (str) {
    // console.log('Reporter log', str);
};

jasmine.getEnv().addReporter(new jasmine.NimboReporter());
jasmine.getEnv().execute();
