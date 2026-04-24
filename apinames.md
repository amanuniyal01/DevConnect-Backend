🚀DevConnect APIs

☑️Auth Router
POST /signup –> Register a new user account.
POST /login –> Authenticate user and return JWT token.
POST/logout -> Logout User from Webpage.

👤 Profile Router
GET /profile/view –> Fetch logged-in user profile details.
PATCH /profile/edit –> Update user profile information.
PATCH /profile/password –> Securely update user password.

🤝 Connection Request Router
POST /request/send/like/:userId –> Send interest (right swipe) to a user.
POST /request/send/pass/:userId –> Skip user (left swipe).
POST /request/receive/accepted/:reqId –> Accept a received request.
POST /request/receive/rejected/:reqId –> Reject a received request.

🌐 User APIs
GET /user/requests/received –> Fetch all received connection requests.
GET /user/connections –> Get all accepted user connections.
GET /user/feed –> Get suggested users for connection.
