var moment = require("../../moment");

exports.lang = {
    "library getter" : function(test) {
        test.expect(4);

        moment.lang('en');
        test.equal(moment.lang(), 'en', 'Lang should return en by default');

        moment.lang('fr');
        test.equal(moment.lang(), 'fr', 'Lang should return the changed language');

        moment.lang('en-gb');
        test.equal(moment.lang(), 'en-gb', 'Lang should return the changed language');

        moment.lang('en');
        test.equal(moment.lang(), 'en', 'Lang should reset');

        test.done();
    },

    "library ensure inheritance" : function(test) {
        test.expect(2);

        moment.lang('made-up', {
            // I put them out of order
            months : "February_March_April_May_June_July_August_September_October_November_December_January".split("_")
            // the rest of the properties should be inherited.
        });

        test.equal(moment([2012, 5, 6]).format('MMMM'), 'July', 'Override some of the configs');
        test.equal(moment([2012, 5, 6]).format('MMM'), 'Jun', 'But not all of them');

        test.done();
    },

    "library langData" : function(test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment.langData().months[0], 'January', 'no arguments returns global');
        test.equal(moment.langData('zh-cn').months[0], '一月', 'a string returns the language based on key');
        test.equal(moment.langData(moment().lang('es')).months[0], 'Enero', "if you pass in a moment it uses the moment's language");

        test.done();
    },

    "instance lang method" : function(test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment([2012, 5, 6]).format('MMMM'), 'June', 'Normally default to global');
        test.equal(moment([2012, 5, 6]).lang('es').format('MMMM'), 'Junio', 'Use the instance specific language');
        test.equal(moment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific language does not affect other moments');

        test.done();
    },

    "instance lang persists with manipulation" : function(test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment([2012, 5, 6]).lang('es').add({days: 1}).format('MMMM'), 'Junio', 'With addition');
        test.equal(moment([2012, 5, 6]).lang('es').day(0).format('MMMM'), 'Junio', 'With day getter');
        test.equal(moment([2012, 5, 6]).lang('es').eod().format('MMMM'), 'Junio', 'With eod');

        test.done();
    },

    "instance lang persists with cloning" : function(test) {
        test.expect(2);
        moment.lang('en');

        var a = moment([2012, 5, 6]).lang('es'),
            b = a.clone(),
            c = moment(a);

        test.equal(b.format('MMMM'), 'Junio', 'using moment.fn.clone()');
        test.equal(b.format('MMMM'), 'Junio', 'using moment()');

        test.done();
    },

    "duration lang method" : function(test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment.duration({seconds:  44}).humanize(), 'a few seconds', 'Normally default to global');
        test.equal(moment.duration({seconds:  44}).lang('es').humanize(), 'unos segundos', 'Use the instance specific language');
        test.equal(moment.duration({seconds:  44}).humanize(), 'a few seconds', 'Using an instance specific language does not affect other durations');

        test.done();
    },

    "duration lang persists with cloning" : function(test) {
        test.expect(1);
        moment.lang('en');

        var a = moment.duration({seconds:  44}).lang('es'),
            b = moment.duration(a);

        test.equal(b.humanize(), 'unos segundos', 'using moment.duration()');
        test.done();
    },

    "instance lang used with from" : function(test) {
        test.expect(2);
        moment.lang('en');

        var a = moment([2012, 5, 6]).lang('es'),
            b = moment([2012, 5, 7]);

        test.equal(a.from(b), 'hace un día', 'preserve language of first moment');
        test.equal(b.from(a), 'in a day', 'do not preserve language of second moment');

        test.done();
    }
};
