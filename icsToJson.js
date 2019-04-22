const NEW_LINE = /\r\n|\n|\r/;

const EVENT = "VEVENT";
const EVENT_START = "BEGIN";
const EVENT_END = "END";
const START_DATE = "DTSTART";
const END_DATE = "DTEND";
const DESCRIPTION = "DESCRIPTION";
const SUMMARY = "SUMMARY";
const LOCATION = "LOCATION";
const ALARM = "VALARM";
const RRULE = "RRULE";
const DURATION = "DURATION";

const keyMap = {
  [START_DATE]: "startDate",
  [END_DATE]: "endDate",
  [DESCRIPTION]: "description",
  [SUMMARY]: "summary",
  [LOCATION]: "location",
  [RRULE]: "rrule",
  [DURATION]:"duration"
};

const clean = string => unescape(string).trim();

const icsToJson = icsData => {
  const array = [];
  let currentObj = {};
  let lastKey = "";

  const lines = icsData.split(NEW_LINE);

  let isAlarm = false;
  for (let i = 0, iLen = lines.length; i < iLen; ++i) {
    const line = lines[i];
    const lineData = line.split(":");

    let key = lineData[0];
    let value = lineData[1];

    if (key.indexOf(";") !== -1) {
      const keyParts = key.split(";");
      key = keyParts[0];
      // Maybe do something with that second part later
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
        if ( lineData.length > 2) {
          // summary had colon's in the text, recombine 
          lineData.shift();
          value = lineData.join(":");  // remove the key and then join remaining back seperated by :
        }
        currentObj[keyMap[SUMMARY]] = clean(value);
        break;
      case LOCATION:
        currentObj[keyMap[LOCATION]] = clean(value);
        break;
      case RRULE:
        currentObj[keyMap[RRULE]] = clean(value);
        break;
      case DURATION:
        currentObj[keyMap[DURATION]] = clean(value);
        break;
      default:
        continue;
    }
  }
  return array;
};

export default icsToJson;
