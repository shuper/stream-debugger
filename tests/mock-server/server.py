import tornado.ioloop
import tornado.web
import json
from base64 import b64encode


class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "GET, OPTIONS")

    def post(self):
        self.write({"Records": self.encoded_events})

    @property
    def encoded_events(self):
        events = json.loads(self.request.body)
        bytify_obj = lambda e: json.dumps(e).encode()
        to_b64str = lambda e: b64encode(bytify_obj(e)).decode()
        return [{"Data": to_b64str(e)} for e in events]


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8881)
    tornado.ioloop.IOLoop.current().start()
