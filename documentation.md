# REST API Documentation

This document provides documentation for the REST API for managing "persons" using Node.js and MongoDB.

## API Base URL

The base URL for all API endpoints is http://localhost:3000/api.

## Endpoints

### Create a New Person

**URL**: /

**Method**: POST

**Request Format**:

```json
{
  "name": "John Doe",
  "age": 30
}
Response Format:

{
  "_id": "5f82d59b085ecc001c71a9b8",
  "name": "John Doe",
  "age": 30,
  "__v": 0
}
Get All People
URL: /

Method: GET

Response Format:

[
  {
    "_id": "5f82d59b085ecc001c71a9b8",
    "name": "John Doe",
    "age": 30,
    "__v": 0
  },
  {
    "_id": "5f82d5b2085ecc001c71a9b9",
    "name": "Jane Smith",
    "age": 25,
    "__v": 0
  }
]
Get a Person by ID
URL: /{person_id}

Method: GET

Response Format:

{
  "_id": "5f82d59b085ecc001c71a9b8",
  "name": "John Doe",
  "age": 30,
  "__v": 0
}
Update a Person by ID
URL: /{person_id}

Method: PUT

Request Format:

{
  "name": "Updated Name",
  "age": 35
}
Response Format:

{
  "_id": "5f82d59b085ecc001c71a9b8",
  "name": "Updated Name",
  "age": 35,
  "__v": 0
}
Delete a Person by ID
URL: /{person_id}

Method: DELETE

Response Format:

{
  "message": "Person deleted"
}
Sample Usage
Here are some sample API requests and their expected responses:

Create a New Person
Request:

POST /api/
{
  "name": "Alice Johnson",
  "age": 28
}
Response:

{
  "_id": "5f82d5e7085ecc001c71a9ba",
  "name": "Alice Johnson",
  "age": 28,
  "__v": 0
}
Get All People
Request:

GET /api/people
Response:

[
  {
    "_id": "5f82d59b085ecc001c71a9b8",
    "name": "John Doe",
    "age": 30,
    "__v": 0
  },
  {
    "_id": "5f82d5b2085ecc001c71a9b9",
    "name": "Jane Smith",
    "age": 25,
    "__v": 0
  },
  {
    "_id": "5f82d5e7085ecc001c71a9ba",
    "name": "Alice Johnson",
    "age": 28,
    "__v": 0
  }
]
Get a Person by ID
Request:


GET /api/5f82d5e7085ecc001c71a9ba
Response:

{
  "_id": "5f82d5e7085ecc001c71a9ba",
  "name": "Alice Johnson",
  "age": 28,
  "__v": 0
}
Update a Person by ID
Request:

PUT /api/5f82d5e7085ecc001c71a9ba
{
  "name": "Updated Name",
  "age": 30
}
Response:

{
  "_id": "5f82d5e7085ecc001c71a9ba",
  "name": "Updated Name",
  "age": 30,
  "__v": 0
}
Delete a Person by ID
Request:

 DELETE /api/5f82d5e7085ecc001c71a9ba

Response:

{
  "message": "Person deleted"
}