import tornado.ioloop
import tornado.web
import json
from base64 import b64encode
from time import sleep
import uuid


class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "GET, OPTIONS")

    def post(self):
        sleep(self.delay)
        self.write({"Records": self.encoded_events})

    @property
    def encoded_events(self):
        events = json.loads(self.request.body)
        bytify_obj = lambda e: json.dumps(e).encode()
        to_b64str = lambda e: b64encode(bytify_obj(e)).decode()
        return [{"Data": to_b64str(e), "SequenceNumber": str(uuid.uuid4())} for e in events]

    @property
    def delay(self):
        return float(self.get_argument('delay', 0.5))


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8881)
    tornado.ioloop.IOLoop.current().start()
