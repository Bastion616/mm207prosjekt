# API Documentation
| API | METHOD  | DESCRIPTION  | 
| ------------- | ------------- | ------------- |
| /users/register  | POST  | Creates new user with sha256 crytpation of passwords  |
| /users/login  | POST  | Checks if the username and password insertet exists, and if they match it logs in the user  |
| /wishlist/add  | POST  |   Stores the Pokémon the users add to their wishlsit in the database  |
| /wishlist/delete  | DELETE  |  Deletes the Pokémon the users have added to their wishlist from the database  |
| /wishlist/:userId  | GET  |  Retrieves all the wishlist items associated with a specific user  |
