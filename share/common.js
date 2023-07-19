'use strict';
(function (exports) {
    exports.isDateValid = function (source, input) {
        var inputFromValue = !input.from && input.form !== 0 ? input.form : parseInt(input.from, 10);
        var inputToValue;
        if (!input.to && input.to !== 0) {
            inputToValue = input.to;
        } else {
            inputToValue = parseInt(input.to, 10);
            inputToValue = inputToValue - 1 < 0 ? 23 : inputToValue - 1;

        }
        var sourceHourLength = (source.to < source.from ? source.to + 24 : source.to) - source.from;
        var inputHourLength = (inputToValue < inputFromValue ? inputToValue + 24 : inputToValue) - inputFromValue;
        switch (true) {
            case typeof inputFromValue === 'number' && typeof inputToValue !== 'number':
            case input.form === input.to:
            case inputFromValue < source.from:
            case inputFromValue + inputHourLength >= source.from + sourceHourLength: {
                return false;
            }
        }
        return true;
    };
}(typeof exports === 'undefined' ? this : exports));
