import icsToJson from "./icsToJson";

const icsData = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Access-A-Ride Pickup
DTSTART;TZID=America/New_York:20130802T103400
DTEND;TZID=America/New_York:20130802T110400
LOCATION:1000 Broadway Ave.\, Brooklyn
DESCRIPTION: Access-A-Ride to 900 Jay St.\, Brooklyn
STATUS:CONFIRMED
SEQUENCE:3
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Pickup Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:Access-A-Ride Pickup
DTSTART;TZID=America/New_York:20130802T200000
DTEND;TZID=America/New_York:20130802T203000
LOCATION:900 Jay St.\, Brooklyn
DESCRIPTION: Access-A-Ride to 1000 Broadway Ave.\, Brooklyn
STATUS:CONFIRMED
SEQUENCE:3
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Pickup Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

const sampleResult = [
  {
    startDate: "20130802T103400",
    endDate: "20130802T110400",
    description: "Access-A-Ride to 900 Jay St., Brooklyn",
    location: "1000 Broadway Ave., Brooklyn",
    summary: "Access-A-Ride Pickup"
  },
  {
    startDate: "20130802T200000",
    endDate: "20130802T203000",
    description: "Access-A-Ride to 1000 Broadway Ave., Brooklyn",
    location: "900 Jay St., Brooklyn",
    summary: "Access-A-Ride Pickup"
  }
];

test("sample file produces expected output", async () => {
  let jsonData = icsToJson(icsData);
  expect(jsonData).toEqual(sampleResult);
  // run it again to make sure consecutive arrays work
  jsonData = icsToJson(icsData);
  expect(jsonData).toEqual(sampleResult);
});
