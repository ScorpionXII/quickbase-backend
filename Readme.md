# General Considerations
This task has been implemented using ExpressJS to expose the requirements as API Endpoints.

The application can be hosted locally executing the docker-compose command:
```shell
docker-compose up -d
```
### Please notice that there is a provided POSTMAN collection in the docs folder ;)

# Environment Variables

All the missing values should be populate and stored in a .env file at the root directory!

### App
NODE_ENV = "production"
### Data Base
MONGO_DB_CONNECTION_URL = ''
### Session
SESSION_NAME = ''

SESSION_SECRET = ''

SESSION_TTL_IN_MIN = 60
### GitHub
GITHUB_TOKEN = ''
### Freshdesk
FRESHDESK_ORG_API_URL = 'qbdemo.freshdesk.com/api/v2'

FRESHDESK_TOKEN =  ''

# Additional Considerations

After running the Express-Application please proceed to register a new User at the endpoint:
```
METHOD: POST

http://{baseurl}:3000/api/users

Example Payload: {
    "username": "someuser",
    "email": "test@email.com",
    "password": "qwerty1234!" 
}
```
After that you should be able to login with the provided email & password targeting the Authentication endpoint:
```
METHOD: POST

http://{baseurl}:3000/api/auth/login

Example Payload: {
    "email": "test@email.com",
    "password": "qwerty1234!" 
}
