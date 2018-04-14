const NEW_LINE = /\r\n|\n|\r/
const array = []
let currentObj = {}
let lastKey = ''

const EVENT = 'VEVENT'
const EVENT_START = 'BEGIN'
const EVENT_END = 'END'
const START_DATE = 'DTSTART'
const END_DATE = 'DTEND'
const DESCRIPTION = 'DESCRIPTION'
const SUMMARY = 'SUMMARY'
const LOCATION = 'LOCATION'

const keyMap = {
	[START_DATE]: 'startDate',
	[END_DATE]: 'endDate',
	[DESCRIPTION]: 'description',
	[SUMMARY]: 'summary',
	[LOCATION]: 'location',
}

const icsToJson = (icsData) => {
	const lines = icsData.split(NEW_LINE)

	for (let i = 0, iLen = lines.length; i < iLen; ++i) {
		const line = lines[i]
		const lineData = line.split(':')

		const key = lineData[0]
		const value = lineData[1]


		if (lineData.length < 2) {
			if (key.startsWith(' ') && lastKey !== undefined && lastKey.length) {
				currentObj[lastKey] += unescape(line.substr(1))
			}
			continue
		}
		else {
			lastKey = keyMap[key]
		}

		switch (key) {
		case EVENT_START:
			if (value === EVENT) currentObj = {}
			break
		case EVENT_END:
			if (value === EVENT) array.push(currentObj)
			break
		case START_DATE:
			currentObj[keyMap[START_DATE]] = value
			break
		case END_DATE:
			currentObj[keyMap[END_DATE]] = value
			break
		case DESCRIPTION:
			currentObj[keyMap[DESCRIPTION]] = unescape(value)
			break
		case SUMMARY:
			currentObj[keyMap[SUMMARY]] = unescape(value)
			break
		case LOCATION:
			currentObj[keyMap[LOCATION]] = unescape(value)
		default:
			continue
		}
	}
	return array
}

export default icsToJson
