var nimbo = nimbo || {};

nimbo.capture = {
    init: function () {
        var that = this;

        $.ajaxSetup({ cache: false });

        that.statusContainer = document.getElementById('status');
        that.runnerContainer = document.getElementById('runner');

        that._status = 'idle';
        that._setStatus(that._status);

        that._pollId = setInterval(function () {
            try {
                if (that._status === 'idle') { that._getSuite(); }
            } catch (e) {}
        }, 1000);
    },
    postMessage: function (data) {
        this._onSuiteMessage(data);
    },
    _getSuite: function () {
        var that = this;
        that._setStatus('polling');
        $.get('/suite_get', function (data) {
            that.suite_id = JSON.parse(data);
            if (that.suite_id) {
                that._onSuite(that.suite_id);
            } else {
                that._setStatus('idle');
            }
        });
    },
    _onSuite: function () {
        this._setStatus('running');
        this._runSuite();
    },
    _runSuite: function () {
        var runner = document.createElement('iframe');
        runner.src = "/suite_runner/" + this.suite_id;
        this.runnerContainer.appendChild(runner);
    },
    _removeSuite: function () {
        this.runnerContainer.innerHTML = "";
    },
    _onSuiteMessage: function (data) {
        $.post('/suite_result/' + this.suite_id, { result: data });
        this._removeSuite();
        this._setStatus('idle');
    },
    _setStatus: function (status) {
        this._status = status;
        this.statusContainer.innerHTML = status;
    }
};

$(function () { nimbo.capture.init(); });
