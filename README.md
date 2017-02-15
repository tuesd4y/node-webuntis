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

  w.connect("username", "password", "school").then(() => {
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
w.connect("username", "password", "school");
```
#### Parameters
* Username, Password and Schoolname as Strings
* An object containing the login information in the following structure
  ```json
  {
    "schoolName": "school",
    "username": "username",
    "password": "password"
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
