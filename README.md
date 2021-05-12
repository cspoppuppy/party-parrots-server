# Server Side

To save data to the database using cURL, paste the following line into the terminal (change the localhost port to your .env PORT nunmber)

````curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"","password":"", "email":"", "forename":"", "lastname":"", "type":"" }' \
  http://localhost:9000/api/users```


If successful, the console will return

```Success - user saved to database```

````

To save parrot data to the database using cURL, paste the following line into the terminal (change the localhost port to your .env PORT nunmber)
The 'user' field must be populated with the _id field's "ObjectId" property, without the 'ObjectId',  e.g.:
_id = ObjectId("609ba87d9c781b1a3b09eb2f")
Here, we would fill in 'user' with 609ba87d9c781b1a3b09eb2f.

```curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Demi","charity":"Birdline", "species":"Timneh African Grey", "age":"25", "location":"Sussex", "gender":"Male", "bio": "I am a cheeky chap and my confidence has really grown since being here. My safehouse mum say’s I just need more time to bring out my true character. I Love chewing toys, hiding under the newspaper at the bottom of the cage and shredding it. I am a quiet bird but do say hello and make ooo noises for my fruit and veg breakfast. I will come over for a chat and a bit of excitable head bobbing dance, and some head scratches through the cage bars. However, I am not comfortable being touched when I am loose yet, although given more time I may come round to enjoying cuddles.", "specialNeeds": "None", "user": "609ba87d9c781b1a3b09eb2f" }' \
  http://localhost:3000/api/parrots```
