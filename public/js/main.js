'use strict';
window.addEventListener('load', function () {
    createHourElements();
    resetValue();
    resetValidHourData();
});
var validHourData = {
    from: 0,
    to: 0
};
var resetValidHourData = function () {
    toApi('/hour/availableList', {}, function (result) {
        validHourData = result;
        document.getElementById('valid-from').innerText = result.from < 10 ? '0' + result.from.toString() : result.from;
        document.getElementById('valid-to').innerText = result.to < 10 ? '0' + result.to.toString() : result.to;
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    });
};
var resetValue = function () {
    document.getElementById('from').value = 22;
    document.getElementById('to').value = 5;
};
var createHourElements = function () {
    var elementList = ['from', 'to'];
    for (var i = 0; i < elementList.length; i++) {
        var element = document.getElementById(elementList[i]);
        for (var j = 0; j < 24; j++) {
            var childElement = document.createElement('option');
            childElement.value = j;
            childElement.text = (j < 10 ? '0' + j.toString() : j) + ':00';
            element.add(childElement);
        }
    }
};
var toApi = function (apiName, inputData, callBack) {
    var ajax = new XMLHttpRequest();
    ajax.open('POST', apiName, true);
    ajax.setRequestHeader('content-type', 'application/json');
    ajax.send(JSON.stringify(inputData));
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var result = JSON.parse(ajax.responseText);
            callBack(result);
        }
    };
};
var submit = function () {
    var buttonElement = document.getElementById('submit');
    var inputData = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value
    };
    if (isDateValid(validHourData, inputData)) {
        alert('Valid Hour');
    } else {
        alert('Invalid Hour');
    }
};