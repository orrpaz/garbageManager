# Garbage can system


## Description

Each garbage have:
- ID
- Color
- Type
- Location
- Date 

The service supports RestAPI:
- Add new garbage can
- Update location
- Update date
- retrieve all garbage can on particular location
- retrieve all garbage can according to date
- delete garbage can


## Technologies

- node.js
- express
- RestAPI
- Dockers
- elasticSearch


In future, retrieve by location will be saved 10 minutes and update location will be saved 5 minutes in Cache - Redis
