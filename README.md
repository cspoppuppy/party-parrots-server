# Server Side

To save a user to the database using cURL, paste the following line into the terminal (change the localhost port to your .env PORT nunmber)

````curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"","password":"", "email":"", "forename":"", "lastname":"", "type":"" }' \
  http://localhost:3000/api/users```


If successful, the console will return

```Success - user saved to database```


To save parrot data to the database using cURL, paste the following line into the terminal (change the localhost port to your .env PORT nunmber)
The 'user' field must be populated with the _id field's "ObjectId" property, without the 'ObjectId',  e.g.:
_id = ObjectId("609ba87d9c781b1a3b09eb2f")
Here, we would fill in 'user' with 609ba87d9c781b1a3b09eb2f.

```curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Rio","charity":"Birdline", "species":"Conure", "age":"8", "location":"Wales", "gender":"Male", "bio": "Im a young male Green-Cheeked conure called Rio. I love to ask what youre doing and to sing with you. I will steal all of the bad food but Im a good boy really. My favourite toys are cat balls with bells in them: Ill pick them up and shake them for hours!", "specialNeeds": "None", "user": "609ba87d9c781b1a3b09eb2f" }' \
  http://localhost:3000/api/parrots```
````
