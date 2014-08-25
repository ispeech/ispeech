import webapp2
from template.handler import HtmlHandler


class MainHandler(HtmlHandler):
    def get(self):
        import pdb;pdb.set_trace()
        self.HtmlResponse("index.html", {})


app = webapp2.WSGIApplication([
    (r'/', MainHandler)
], debug=True)
