<p align="center">
    <img width="500" src="https://user-images.githubusercontent.com/10063864/38649838-bb70b7ba-3dc6-11e8-9c10-943ad21cd592.png" alt="ics-to-json">
    <br>
</p>

----------

Convert the ICS calendar format to JSON data to consume in web apps.

## Usage

```js
import icsToJson from 'ics-to-json'

// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed
const convert = async (fileLocation) => {
	const icsRes = await fetch(fileLocation)
	const icsData = await icsRes.text()
	// Convert
	const data = icsToJson(icsData)
	return data
}
```

## Format

Result is an array of:

```js
{
  startDate: '20180505T020000Z',
  endDate: '20180505T060000Z',
  description: 'Big Event!',
  location: 'The place!',
  summary: 'Summary!'
}
```
## Upcoming

- Ability to reverse conversion
- Include the rest of the keys from the ICS format
