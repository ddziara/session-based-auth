# Session Based Authentication

The server uses node.js express framework with session middleware and Redis in-memory database to implement sessions.

![session-based-auth](https://github.com/ddziara/session-based-auth/assets/54773918/6d31c007-30b7-49b0-9568-12f211a27092)

Password is hashed with "bcrypt" module

To enable cross-origin request, CORS is configured (headers Access-Control-Allow-Origin and Access-Control-Allow-Credentials)
Also client has to allow credentials, for instance "withCredentials" property has to be set.
