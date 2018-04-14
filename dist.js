"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keyMap;

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NEW_LINE = /\r\n|\n|\r/;
var array = [];
var currentObj = {};
var lastKey = '';
var EVENT = 'VEVENT';
var EVENT_START = 'BEGIN';
var EVENT_END = 'END';
var START_DATE = 'DTSTART';
var END_DATE = 'DTEND';
var DESCRIPTION = 'DESCRIPTION';
var SUMMARY = 'SUMMARY';
var LOCATION = 'LOCATION';
var keyMap = (_keyMap = {}, _defineProperty(_keyMap, START_DATE, 'startDate'), _defineProperty(_keyMap, END_DATE, 'endDate'), _defineProperty(_keyMap, DESCRIPTION, 'description'), _defineProperty(_keyMap, SUMMARY, 'summary'), _defineProperty(_keyMap, LOCATION, 'location'), _keyMap);

var icsToJson =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(icsData) {
    var lines, i, iLen, line, lineData, key, value;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            lines = icsData.split(NEW_LINE);
            i = 0, iLen = lines.length;

          case 2:
            if (!(i < iLen)) {
              _context.next = 33;
              break;
            }

            line = lines[i];
            lineData = line.split(':');
            key = lineData[0];
            value = lineData[1];

            if (!(lineData.length < 2)) {
              _context.next = 12;
              break;
            }

            if (key.startsWith(' ') && lastKey !== undefined && lastKey.length) {
              currentObj[lastKey] += unescape(line.substr(1));
            }

            return _context.abrupt("continue", 30);

          case 12:
            lastKey = keyMap[key];

          case 13:
            _context.t0 = key;
            _context.next = _context.t0 === EVENT_START ? 16 : _context.t0 === EVENT_END ? 18 : _context.t0 === START_DATE ? 20 : _context.t0 === END_DATE ? 22 : _context.t0 === DESCRIPTION ? 24 : _context.t0 === SUMMARY ? 26 : _context.t0 === LOCATION ? 28 : 29;
            break;

          case 16:
            if (value === EVENT) currentObj = {};
            return _context.abrupt("break", 30);

          case 18:
            if (value === EVENT) array.push(currentObj);
            return _context.abrupt("break", 30);

          case 20:
            currentObj[keyMap[START_DATE]] = value;
            return _context.abrupt("break", 30);

          case 22:
            currentObj[keyMap[END_DATE]] = value;
            return _context.abrupt("break", 30);

          case 24:
            currentObj[keyMap[DESCRIPTION]] = unescape(value);
            return _context.abrupt("break", 30);

          case 26:
            currentObj[keyMap[SUMMARY]] = unescape(value);
            return _context.abrupt("break", 30);

          case 28:
            currentObj[keyMap[LOCATION]] = unescape(value);

          case 29:
            return _context.abrupt("continue", 30);

          case 30:
            ++i;
            _context.next = 2;
            break;

          case 33:
            return _context.abrupt("return", array);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function icsToJson(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = icsToJson;
exports.default = _default;
