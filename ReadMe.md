**PAGE TO MAKE ALL CUSTOM API CALLS FROM BROWSER STILL TO BE ADDED**

Running:

1. Download (clone) and run endpoint.py script on your machine. Don't forget to install flask first!!!
2. GET requests' results can be viewed from browser, yet for POST, PUT, PATCH and DELETE I
   recommend using Postman. Link to download https://www.postman.com/downloads/ .
   Postman provides you with a simple GUI for testing APIs.

If you are too lazy for all this, here is the webpage from which you can generate requests and see the results directly (....to be added).
Remember, in order for this to work, you still need to run endpoint.py script on your machine since calls are directed to localhost! Also, don't
forget about CORS policy. Look at this a an Ali-express Postman version and make sure to read the provided documentation to get the best out of it.

**Notice**: Here, we will work with a dictionary and access it's elements by position. As far as I know, this is not a real life practice and arrays should be indexed with numbers and objects should be indexed with key values. However, this task is done this way so some indexing errors because of auto-sorting keys will happen. Once they happen, they will be explained in details.

API Documentation:

Starting data:
data = {
'course': 411,
"courseName": "Software in Telecommunications",
"releaseYear": 2021,
"courseActive": True,
"droppedStudents": None,
"date": "06/10/2021",
"someData": [[11, 2], [22, 4], [33, 1], [44, 5]],
"scores": {"a": 77, "b": 46, "c": 91}
}

**1) GET/scores**

Simple get request to retrieve scores. Can be run through browser by visiting localhost:5000 (or 127.0.0.1:5000).
Results should be as following:

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136217072-280088d2-c50a-4d5d-8977-ad365c7dc8c9.PNG"/>
</p>

**2) GET/scores/{n} , where n is an integer**

This method returns an object on n-th position in scores dictionary. Jsonified of course. Since scores is a dictionary and not an array this might be a little bit tricky, but
we can just imagin it is an array. So everything done from now one will be for n-th score, which implies score in n-th position in scores dictionary, or its n-th key. Results for /scores/1 (returns second element since indexing starts from 0!, so we expect to get {"b":46}).

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136219774-64dc8c78-f962-45ca-8e37-e7dd8b0003bc.PNG"/>
</p>

**3) POST/scores**

Adds new score to the scores dictionary. **Important : if you are using Postman, set Content-Type headers to application/json for this and all further methods!**
In the body of the API request one should put an dictionary (object) with score_key and score_value keys and their values. Those represent score's key and value, respectively.
The call returns the object given through body. Example is shown below.

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136221343-6e981d67-0ba2-45ed-87b0-a46f37ba1d1e.PNG"/>
</p>

Now, if we visit /scores again

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136221378-4b57679b-caff-41ea-b760-1e71587fa203.PNG"/>
</p>

_Next two methods will be PUT and PATCH so let's take a little break and learn how to distinguis the use-cases of those two who are very similar. PATCH is relatively young method, introduced in 2010 and it's purpose is to chage a value of a specific key. Like if we want to change our "b":46 to "b":99 we should use PATCH. This method stole a lot of PUT utilities so PUTs usage reduced to cases when we need to change the whole object. In this example, if we want to replace "a":77 with "d":88 we will use PUT._

**4) PUT/scores/{n}**

As explained previously, PUT will replace the whole object on n-th postition. So it needs new_key and new_value to be passed through body. Example follows. Let's try to replace _"a":77_ with _"d":88_. We make a call towards /scores/0 because that's where a is.

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136224056-75d49699-9358-42fe-b72a-8cd017504e60.PNG"/>
</p>

Refresh /scores

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136224100-f65b8b48-7d22-409c-ab99-3f9421c07e15.PNG"/>
</p>

**5) PATCH/scores/{n}**

As aforementioned, PATCH will only update the value of the n-th score! This implies that it only need a new_value passed throudh body. Let's change _"b"_ to 99. _"b"_ is on position 0 after previous updates (n=0).

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136225114-ee4f9f35-d466-4d63-b52b-2f4772bcd45f.PNG"/>
</p>

And

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136225125-6295a1bc-dd86-4521-b2fc-af331f14710c.PNG"/>
</p>

**6) DELETE/scores/{n}**

Last but not least DELETE. This one is pretty simple, it just deletes score on the n-th position. Let's try to delete _"d"_.
**Important notice. "d" is on last position 3 (last position) because it was inserted last! Object keys are alphabetically sorted for some reason and that's why attention shoud be paid not to make a mistake for this reason**

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136226697-daad8d17-370e-454c-8900-b921f4d971e5.PNG"/>
</p>

And it's gone.

<p align="center">
<img src="https://user-images.githubusercontent.com/59935366/136226725-a623b5d6-4966-4926-94ee-639c1cc0fa57.PNG"/>
</p>

**If n is bigger then number of scores in any case it is used, message "Not so much scores yet will be displayed/returned".**
