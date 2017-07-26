import tornado.ioloop
import tornado.web
import time


class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "GET, OPTIONS")

    def get(self):
        t = time.time()
        events = [{
            "id": t + i,
            "type": "track",
            "event": f"Video Heartbeat {t + i}",
            "source": 'android'
        } for i in range(self.events_count)]
        self.write({"events": events})

    @property
    def events_count(self):
        default = 3
        try:
            return int(self.get_query_argument("events_count", default))
        except ValueError:
            return default


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8881)
    tornado.ioloop.IOLoop.current().start()
