Running:
1) Download (clone) and run endpoint.py script on your machine. Don't forget to install flask first!!!
2) GET requests' results can be viewed from browser, yet for POST, PUT, PATCH and DELETE I
recommend using Postman. Link to download https://www.postman.com/downloads/ .
Postman provides you with a simple GUI for testing APIs.

If you are too lazy for all this, here is the webpage from which you can generate requests and see the results directly.
Remember, in order for this to work, you still need to run endpoint.py script on your machine since calls are directed to localhost!

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

1) GET/scores

    Simple get request to retrieve scores. Can be run through browser by visiting localhost:5000 (or 127.0.0.1:5000).
    Results should be as following:
{
  "a": 77,
  "b": 46,
  "c": 91
}

2) GET/scores/{n} , where n is an integer

    This method returns