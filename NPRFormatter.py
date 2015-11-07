from urllib2 import urlopen
from json import load

url = 'http://api.npr.org/query?orgId=1&requiredAssets=audio&date=2015-11-05&dateType=story&sort=dateAsc&output=JSON&apiKey=MDIwOTU0NjUzMDE0NDU1NjgwNjJjZDJmMg000'

response = urlopen(url)
json_obj = load(response)


def parse_url_json(json_obj):
    for story in json_obj['list']['story']:
        print story['title']

parse_url_json(json_obj)
