# Ajata Website

Local website running on the Raspberry Pi where the user can look at the "global" map which uses data from the central server where only the dangerous uploaded reports will be displayed. The user can also see and manage his/her local map with his/her markers. He/she can choose to delete some markers before sending them to central server (publicly visible) via the "Upload Reports" button. This website is the link between the Hardware part (microcontroller ESP8266) and OM2M.

## Prerequisites
  * Git
  * nodejs
  * npm
  * MySQL

## Git

To retrieve the project, run :
```
git clone https://github.com/keti-hackathon-insa-ajata/ajata-website.git
```

## Getting Started

First, run ```npm install``` to install the dependencies.

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## MySQL Initialization

- Create the database : 
```sql
CREATE database hackathon;
```

- Create a user and give permissions : 
```sql
CREATE USER 'hackathon'@'localhost' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON hackathon.* TO 'hackathon'@'localhost';
```

- Create the table : 
```sql
CREATE table hackathon.markers(
id int NOT NULL AUTO_INCREMENT,
timestamp int NOT NULL,
distance float NOT NULL,
object_speed float NOT NULL,
bicycle_speed float NOT NULL,
latitude float NOT NULL,
longitude float NOT NULL,
sync bool NOT NULL,
PRIMARY KEY (id)
);
```

## Website configuration

  * /next.config.js :
```js
module.exports = {
  reactStrictMode: true,
  // Proxy to avoid CORS error with OM2M
  async rewrites() {
    return [
      {
        source: '/api/om2m/:path*',
        // Adapt this line to the IP address of the Rapsberry Pi
        destination: 'http://192.168.43.139:8282/:path*',
      },
    ];
  },
  env: {
    // The name of the mn-cse running on the Rapsberry Pi
    om2mMnCseName: 'mn-cse-raspi/mn-raspi',
    // The name of the AE where the content instances will be stored
    om2mAE: 'AjataSensor',
    // Adapt this line to the IP address of the central server
    restApiEndpoint: 'http://192.168.43.171:12345/dangerReports?dangerous=true',
  },
};
```


## API : /api/markers
  * The local REST Api is accessible at : http://localhost:3000/api/markers (on the Raspberry Pi, or replace "localhost" with the IP address of the Raspberry Pi)
  * GET requests are used to retrieve the local data
  * POST requests are used to create new local markers (JSON Array)
  * PATCH requests are used to modify the field 'sync' of the given local marker (by id)
  * DELETE requests are used to delete the given local markers (array of int)

## JSON format for POST requests
Example
```json
[{
    "date": "2021-11-12T16:27:22.000Z",
    "distance": 300.0,
    "object_speed": 60.0,
    "bicycle_speed": 7.0,
    "latitude": 43.57037533253987,
    "longitude": 1.468026024931181
},{
    "date": "2021-11-11T15:17:05.000Z",
    "distance": 80.0,
    "object_speed": 30.0,
    "bicycle_speed": 5.0,
    "latitude": 43.573154109080825,
    "longitude": 1.4781496777222487
}]
```
  * date : date when the danger report occured (in ISO format),
  * distance : distance between the detected object/vehicle and the user's bike (in cm),
  * object_speed : speed of the detected object/vehicle (in km/h),
  * bicycle_speed : speed of the user's bicycle (in km/h),
  * latitude and longitude : coordinates where the danger report occured

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about technologies used in the project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn React](https://reactjs.org/docs/getting-started.html#learn-react) - a react tutorial
- [Leaflet Documentation](https://leafletjs.com/reference-1.7.1.html) - learn how to use Leaflet
- [React Leaflet](https://react-leaflet.js.org/docs/start-introduction/) - learn how to use Leaflet with React
