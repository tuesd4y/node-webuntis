# Untis-API
A simple interface for accessing the webuntis API
***
### Setup
* create a new node.js project

  `npm init`
* install the api

  `npm install --save untis-api`

* write something like this in your main.js

  ```js
  const w = require("untis-api");
  const e = w.entities;

  w.connect("username", "password", "school", "borys").then(() => {
      w.getTeachers().then(teachers => {
        console.log(teachers);
      });

      w.logOut();
  });
  ```

* execute the main.js file

  `node main.js`

***

# API Methods

## connect

#### Returns
A __Promise__ that is either resolved if the connection was successful or rejected if it wasn't.

#### Usage
```js
w.connect("username", "password", "school", "servername");
```
#### Parameters
* Username, Password, Schoolname and Servername as Strings
* An object containing the login information in the following structure
  ```json
  {
    "schoolName": "school",
    "username": "username",
    "password": "password",
    "servername": "borys",
  }
  ```

***

## logout

Calls the logout method on the untis server to invalidate the connection

#### Usage
```js
w.logout();
```

***

## info

Contains information about the currently logged in user and the session.

Will not work if `w.connect()` hasn't completed yet.

#### Usage

```js
w.info;
```

#### Returns

a __Javascript Object__ containing said information

```js
{
  klasseId: 157,
  personId: 238,
  personType: 5,
  sessionId: 'FD42A62B33A83B7C777200CBF62895C4'
}
```

***

## getTeachers

#### Usage

```js
w.getTeachers().then(data => console.log(data));
```

#### Returns
An __Array__ of all teachers in the school
```json
[{
  "id": 1,
  "name": "TEAC",
  "foreName": "Bob",
  "longName": "Teacher",
  "title": "",
  "active": true,
  "dids": [
    {
      "id": 6
    }
  ]
}]
```

***

## getClasses

#### Usage

```js
w.getClasses().then(data => console.log(data)); //or: w.getKlassen();
```

#### Returns
An __Array__ of all classes in the school
```json
[{
  "id": 1,
  "name": "1AHIF",
  "longName": "LongName",
  "active": true,
  "did": 6
}]
```

***

## getSubjects

#### Usage

```js
w.getSubjects().then(data => console.log(data));
```

#### Returns
An __Array__ of all subjects
```json
[{
  "id": 1,
  "name": "AC",
  "longName": "Applied Chemistry",
  "alternateName": "ACH",
  "active": true
}]
```

***

## getRooms

#### Usage

```js
w.getRooms().then(data => console.log(data));
```

#### Returns
An __Array__ of all rooms
```json
[{
  "id": 1,
  "name": "EDV1",
  "longName": "EDV1",
  "active": true,
  "building": "main"
}]
```

***

## getDepartments

#### Usage

```js
w.getDepartments().then(data => console.log(data));
```

#### Returns
An __Array__ of all departments
```json
[{
  "id": 1,
  "name": "BE",
  "longName": "Biomedical Engineering"
}]
```

***

## getHolidays

#### Usage

```js
w.getHolidays().then(data => console.log(data));
```

#### Returns
An __Array__ of all rooms
```json
[{
  "id": 16,
  "name": "Holidays_1",
  "longName": "Christmas",
  "startDate": 20161224,
  "endDate": 20170108
}]
```

***

## getStatusData

#### Usage

```js
w.getStatusData().then(data => console.log(data));
```

#### Returns
A __Javascript Object__ containing information about which color lesson types and codes should be displayed in
```json
{
  "lstypes": [
    {
      "ls": {
        "foreColor": "000000",
        "backColor": "f49f25"
      }
    }
  ],
  "codes": [
    {
      "cancelled": {
        "foreColor": "000000",
        "backColor": "b1b3b4"
      }
    }
  ]
}
```

***

## getTimegridUnits

#### Usage

```js
w.getTimegridUnits().then(data => console.log(data));
```

#### Returns
An __Array__ of days that show when each lesson starts and ends
```json
[{
  "day": 2,
  "timeUnits": [
    {
      "name": "1",
      "startTime": 800,
      "endTime": 850
    },
    {
      "name": "2",
      "startTime": 855,
      "endTime": 945
    },
    {
      "name": "3",
      "startTime": 1000,
      "endTime": 1050
    }
  ]
}]
```

***

## getCurrentSchoolYear

#### Usage

```js
w.getCurrentSchoolYear().then(data => console.log(data));
```

#### Returns
A __Javascript Object__ containing information about the current school year's start and end dates
```json
{
  "id": 2,
  "name": "2016/2017",
  "startDate": 20160912,
  "endDate": 20170709
}
```

***

## getSchoolYears

Same as `getCurrentSchoolYear` but with an array instead of just a single __Object__

***

## getTimetable

#### Usage

```js
TimeTableEntity = require("untis-api").Entities.TimeTableEntity;

w.getTimetable(new TimeTableEntity(1, 5)).then(data => console.log(data));
```
#### Parameters
`getTimetable(tte)`
* tte: a TimeTableEntity containing the person whose timetable you want to watch's id and personType

#### Returns
A lot of data, better see for yourself...

***

## getCustomTimetable

#### Usage

```js
TimeTableEntity = require("untis-api").Entities.TimeTableEntity;

w.getCustomTimetable(new TimeTableEntity(1, 5), {
  showSubstText: true,
  showLsText: true,
  klasseFields: ["name"],
  roomFields: ["name"],
  subjectFields: ["name"]
}).then(data => console.log(data));
```
#### Parameters
`getCustomTimetable(tte, paramsObject)`
* tte: a TimeTableEntity containing the person whose timetable you want to watch's id and personType
* paramsObject: a Object with all custom parameters as properties of this object with their respective value

##### Valid properties:
- startDate: number, format: YYYYMMDD, optional (default: monday of this week)
- endDate: number, format: YYYYMMDD, optional (default: friday of this week)
- showBooking: boolean, returns the period's booking info if available (default: false)
- showInfo: boolean, returns the period information if available (default: false)
- showSubstText: boolean, returns the Untis substitution text if available (default: false)
- showLsText: boolean, returns the text of the period's lesson (default: false)
- showLsNumber: boolean, returns the number of the period's lesson (default: false)
- showStudentgroup: boolean, returns the name(s) of the studentgroup(s) (default: false)
- klasseFields: array, optional, values: „id“, „name“, „longname“, „externalkey“
- roomFields: array, optional, values: „id“, „name“, „longname“, „externalkey“
- subjectFields: array, optional, values: „id“, „name“, „longname“, „externalkey“
- teacherFields: array, optional, values: „id“, „name“, „longname“, „externalkey“


If a Fields parameter (e.g. „teacherFields“) is not set explicitly, the return object will contain the
internal id („keyType“: „id“) of the references (e.g. the teachers of a period) by default.

#### Returns
A lot of data, better see for yourself...

***

## searchPerson

#### Usage

```js
w.searchPerson(5, "firstName", "lastName", 0).then(data => console.log(data));
```
#### Parameters
`searchPerson(<personType>, <firstName>, <lastName>, <dateOfBirth>)`
* personType: type of the person: `2`for teacher or `5`for pupil
* firstName
* lastName
* dateOfBirth: dob of the person to search for, or `0` if unknown

#### Returns
The id of the person if the search was successful.

If it wasn't, `0` is returned
