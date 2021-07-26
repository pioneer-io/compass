<img src="https://user-images.githubusercontent.com/19399698/126998779-e3bc3a2d-0e2a-4353-8f3e-9aa857455fe5.png" alt="Pioneer logo" width="200" height="200">

# Compass

Compass is an integral component of Pioneer feature flag management.  Compass consists of a user interface built on React, and a node.js backend. For more information, visit Pioneer's case study page.

## Run locally

`npm install` in both the `client` and `server` directories.

From server directory, `npm run dev`.

The front-end of the app is now available at localhost port `3000`.

### To connect with nats server

Ensure Docker is running then `docker pull nats` to pull nats server.

To run server in detached mode: `docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats --js`

Note that Pioneer uses Nats JetStream, hence the `--js` flag above.

To stop the docker container when finished with server:

```
// get container ID
docker ps
docker stop <container ID>
```

## Connecting to DB

An instance of postgres needs to be run in a docker container on port `5432`. The `docker-compose.yml` and `init.sql` files are within the `docker` directory of this repository.

### Server-side

### API endpoints implemented server-side

### `GET /flags`

Example response:

```
{
    "flags": [
        {
            "id": 1,
            "title": "LOGIN_MICROSERVICE",
            "description": "Redirects users to the login microservice",
            "is_active": false,
            "version": 1,
            "rollout": 0,
            "updated_at": "2021-07-12T18:02:12.439Z",
            "created_at": "2021-07-12T18:02:12.439Z"
        },
        {
            "id": 34,
            "title": "this is a testing flag!",
            "description": "log this event, app!",
            "is_active": false,
            "version": 1,
            "rollout": 60,
            "updated_at": "+053499-03-12T04:49:28.999Z",
            "created_at": "2021-07-12T18:02:32.081Z"
        }
    ]
}
```

### `GET /flags/:id`

Returns an object containing the flag object as well as an array of events associated with that flag.

Example response:

```
{
    "flag": {
        "id": 1,
        "title": "LOGIN_MICROSERVICE",
        "description": "Redirects users to the login microservice",
        "is_active": false,
        "version": 1,
        "rollout": 0,
        "updated_at": "2021-07-18T16:18:42.369Z",
        "created_at": "2021-07-18T16:18:42.369Z"
    },
    "eventLog": [
        {
            "id": 1,
            "flag_id": 1,
            "title": "LOGIN_MICROSERVICE",
            "description": "Created new flag: LOGIN_MICROSERVICE",
            "created_at": "2021-07-18T16:18:42.379Z"
        }
    ]
}
```

### `POST /flags`

Successfully creating a flag with `POST` will also create a new event log entry. Note that the title is the only required field. All flags are initially created in an 'off' toggle state.

Example request:

```
{
    "flag": {
        "title": "testing_flag",
        "rollout": 5,
        "description": "testing out flag creation"
    }
}
```

Example response:

```
{
    "flag": {
        "id": 37,
        "title": "testing_flag",
        "description": "testing out flag creation",
        "is_active": false,
        "version": 1,
        "rollout": 5,
        "updated_at": "2021-07-19T16:42:28.483Z",
        "created_at": "2021-07-19T16:42:28.483Z"
    }
}
```

### `PUT /flags/:id`

Successfully updating a flag with `PUT` will create a new entry in the event log.

Example request:

```
{
    "flag": {
        "title": "new title",
        "is_active": false,
        "rollout": 55,
        "description": "adding a more descriptive text here.."
    }
}
```

Example response:

```
{
    "flag": {
        "id": 34,
        "title": "new title",
        "description": "adding a more descriptive text here..",
        "is_active": false,
        "version": 1,
        "rollout": 55,
        "updated_at": "+053499-06-18T05:00:09.999Z",
        "created_at": "2021-07-12T18:02:32.081Z"
    }
}
```

### `DELETE /flags/:id`

When a flag is deleted, a new event log item will be generated.

Example response:

```
{
    "id": "35"
}
```

### `GET / logs`

Returns an array of event logs related to all flags.

Example response:

```
[
    {
        "id": 1,
        "title": "this is a testing flag!",
        "flag_id": 34,
        "description": "Flag created.",
        "created_at": "2021-07-12T18:02:32.098Z"
    },
    {
        "id": 2,
        "title": "this is a testing flag!",
        "flag_id": 34,
        "description": "Updated flag: 'this is a testing flag!'",
        "created_at": "2021-07-12T20:17:48.772Z"
    },
]
```

### Tests

To run tests, run `npm test` from the `/server` directory.
