# save this as app.py
from flask import Flask, request, jsonify
from bot import get_chat_response
from services import login, register

app = Flask(__name__)

@app.route("/<name>")
def chat(name):
    return get_chat_response(name)
    

@app.route("/login", methods=['POST'])
def loginfunc():
    jsonrequest = request.get_json()
    try:
        if(jsonrequest['username'] and jsonrequest['password']):
            out1, out2 = login(jsonrequest['username'], jsonrequest['password'])
            if isinstance(out1, int):
                if out2 == 'Invalid Login':
                    message = {'Login':'Failure. Invalid Credentials'}
                    return(jsonify(message), 400)
                else:
                    message = {'Login': out2}
                return(jsonify(message), 400)
            else:
                message = {'Login':'Success', 'firstName':out1, 'lastName':out2}
                return jsonify(message)
    except KeyError:
        message = {'Login':'Failure. Invalid Request'}
        return(jsonify(message), 400)

@app.route("/register", methods=['POST'])
def registerfunc():
    jsonrequest = request.get_json()
    try:
        if(jsonrequest['email'] and jsonrequest['firstName'] and jsonrequest['lastName'] and jsonrequest['password']):
            out1, out2 = register(jsonrequest['email'], jsonrequest['firstName'], jsonrequest['lastName'], jsonrequest['password'])
            if out1 != 200:
                message = {'message':out2}
                return(jsonify(message), 400)
            else:
                message = {'message':'Success'}
                return jsonify(message)
    except :
        message = {'message':'Failure. Invalid Request'}
        return(jsonify(message), 400)

if __name__ == '__main__':
   app.run()