import webapp2
from views import apis
from views import pages


app = webapp2.WSGIApplication([
    (r'/', pages.MainHandler),
    (r'/deckgrid-card.html ', pages.deckgridCcard),
    (r'/login', pages.Login),
    (r'/demo', pages.demo),
    (r'/login', apis.ListApi)
], debug=True)
