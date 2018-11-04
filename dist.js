"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keyMap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NEW_LINE = /\r\n|\n|\r/;
var EVENT = "VEVENT";
var EVENT_START = "BEGIN";
var EVENT_END = "END";
var START_DATE = "DTSTART";
var END_DATE = "DTEND";
var DESCRIPTION = "DESCRIPTION";
var SUMMARY = "SUMMARY";
var LOCATION = "LOCATION";
var ALARM = "VALARM";
var keyMap = (_keyMap = {}, _defineProperty(_keyMap, START_DATE, "startDate"), _defineProperty(_keyMap, END_DATE, "endDate"), _defineProperty(_keyMap, DESCRIPTION, "description"), _defineProperty(_keyMap, SUMMARY, "summary"), _defineProperty(_keyMap, LOCATION, "location"), _keyMap);

var clean = function clean(string) {
  return unescape(string).trim();
};

var icsToJson = function icsToJson(icsData) {
  var array = [];
  var currentObj = {};
  var lastKey = "";
  var lines = icsData.split(NEW_LINE);
  var isAlarm = false;

  for (var i = 0, iLen = lines.length; i < iLen; ++i) {
    var line = lines[i];
    var lineData = line.split(":");
    var key = lineData[0];
    var value = lineData[1];

    if (key.indexOf(";") !== -1) {
      var keyParts = key.split(";");
      key = keyParts[0]; // Maybe do something with that second part later
    }

    if (lineData.length < 2) {
      if (key.startsWith(" ") && lastKey !== undefined && lastKey.length) {
        currentObj[lastKey] += clean(line.substr(1));
      }

      continue;
    } else {
      lastKey = keyMap[key];
    }

    switch (key) {
      case EVENT_START:
        if (value === EVENT) {
          currentObj = {};
        } else if (value === ALARM) {
          isAlarm = true;
        }

        break;

      case EVENT_END:
        isAlarm = false;
        if (value === EVENT) array.push(currentObj);
        break;

      case START_DATE:
        currentObj[keyMap[START_DATE]] = value;
        break;

      case END_DATE:
        currentObj[keyMap[END_DATE]] = value;
        break;

      case DESCRIPTION:
        if (!isAlarm) currentObj[keyMap[DESCRIPTION]] = clean(value);
        break;

      case SUMMARY:
        currentObj[keyMap[SUMMARY]] = clean(value);
        break;

      case LOCATION:
        currentObj[keyMap[LOCATION]] = clean(value);

      default:
        continue;
    }
  }

  return array;
};

var _default = icsToJson;
exports.default = _default;
