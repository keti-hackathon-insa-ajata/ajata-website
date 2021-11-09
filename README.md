# Ajata Website

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about technologies used in the project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn React](https://reactjs.org/docs/getting-started.html#learn-react) - a react tutorial
- [Leaflet Documentation](https://leafletjs.com/reference-1.7.1.html) - learn how to use Leaflet
- [React Leaflet](https://react-leaflet.js.org/docs/start-introduction/) - learn how to use Leaflet with React

## Raspi MYSQL Initialization

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
