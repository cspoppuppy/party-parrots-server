# Server Side

To save data to the database using cURL, paste the following line into the terminal (change the localhost port to your .env PORT nunmber)

````curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"","password":"", "email":"", "forename":"", "lastname":"", "type":"" }' \
  http://localhost:9000/api/users```


If successful, the console will return

```Success - user saved to database```

````
