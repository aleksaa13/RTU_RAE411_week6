import flask
from flask import request, jsonify

# Create a flask instance
app = flask.Flask(__name__)
app.config["DEBUG"] = True


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


@app.route('/', methods=['GET'])
def return_all():
    return jsonify(data)


@app.route('/scores', methods=['GET'])
def return_scores():
    return jsonify(data["scores"])


@app.route('/scores/<int:n>', methods=['GET'])
def return_nth_score(n):
    try:
        return list(data["scores"])[n]
    except IndexError:
        return "No so much scores yet!"


@app.route('/scores', methods=['POST'])
def add_score():
    score_value = request.json['value']
    score_key = request.json['key']
    new_score = {
        score_key: score_value,
    }
    (data["scores"])[score_key] = score_value
    return jsonify(new_score)


@app.route('/scores/<int:n>', methods=['PUT'])
def modify_nth_score(n):
    new_key = request.json["new_key"]
    new_value = request.json['new_value']
    nth_key = get_nth_key(data["scores"], n)
    if nth_key != "Not so much scores yet!":
        (data["scores"])[new_key] = (data["scores"]).pop(nth_key)
        (data["scores"])[new_key] = new_value
        return {list(data["scores"])[n]: new_value}
    else:
        return nth_key


@app.route('/scores/<int:n>', methods=['PATCH'])
def modify_nth_score_value(n):
    new_value = request.json['new_value']
    nth_key = get_nth_key(data["scores"], n)
    if nth_key != "Not so much scores yet!":
        (data["scores"])[nth_key] = new_value
        return {list(data["scores"])[n]: new_value}
    else:
        return nth_key


@app.route('/scores/<int:n>', methods=['DELETE'])
def delete_score(n):
    nth_key = get_nth_key(data["scores"], n)
    to_return = {nth_key: (data["scores"])[nth_key]}
    (data["scores"]).pop(nth_key)
    return to_return


def get_nth_key(scores, n):
    try:
        return list(scores)[n]
    except IndexError:
        return "Not so much scores yet!"


app.run()

# end
