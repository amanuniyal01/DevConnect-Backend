DevConnect APIS:

PROFILE ROUTER.

- POST /signup
- POST /login
- PATCH /Profile/edit
- GET /Profile/view
- PATCH/profile/password

CONNECTION REQUEST ROUTER.
Status: Accepted , Rejected , Ignored , like.

- POST /request/send/like/:userId ->User is interested Right Swipe(Sending).
- POST /request/send/pass/:userId -> User is not interested Left Swipe(Sending).
- POST /request/receive/accepted/:reqID ->User is interested(Receiving).
- POST /request/receive/rejected/:reqID -> User is Not interested(Receiving).


- GET /user/connections -> Get a list of connections for the logged-in user.
- GET /user/requests/received -> Retrieve a list of received connection requests.
- GET /user/feed -> Get a list of suggested users to connect with.
