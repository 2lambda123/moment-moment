import hasOwnProp from '../utils/has-own-prop';

var memo = {};

function FixedOffsetTimeZone(offset) {
    this.offset = offset;
    this.offsetMs = offset * 60 * 1000;
}

FixedOffsetTimeZone.fromOffset = function (offset) {
    if (!hasOwnProp(memo, offset)) {
        memo[offset] = new FixedOffsetTimeZone(offset);
    }
    return memo[offset];
};

FixedOffsetTimeZone.prototype.offsetFromTimestamp = function (uts) {
    return this.offsetMs;
};

FixedOffsetTimeZone.prototype.type = 'fixed-offset';

export var fixedTimeZoneForOffset = FixedOffsetTimeZone.fromOffset;
