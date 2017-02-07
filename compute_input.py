import sys, json, numpy

# simple JSON echo script
for line in sys.stdin:
    print (json.dumps(json.loads(line)))

