# save this as app.py
from flask import Flask
from bot import get_chat_response

app = Flask(__name__)

@app.route("/<name>")
def chat(name):
    return get_chat_response(name)

if __name__ == '__main__':
   app.run()