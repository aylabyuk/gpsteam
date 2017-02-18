from pylab import *
from numpy import *
import sys, json

def read_in():
    mydataRow = []
    t = []
    e = []
    n = []
    u = []

    for line in sys.stdin:
        mydata = json.loads(line)
        for x in mydata['data']:
            mydataRow = json.loads(x)
            t.append(mydataRow['date'])
            e.append(mydataRow['east'])
            n.append(mydataRow['north'])
            u.append(mydataRow['up'])

    e = (e - mean(e)) * 100
    n = (n - mean(n)) * 100
    u = (u - mean(u)) * 100

    d = zeros((len(t), 4))
    d[:,0] = e
    d[:,1] = n
    d[:,2] = u
    d[:,3] = t

    return d

def main():

    d = read_in()
    t = d[:,3]
    
    G = zeros((len(t), 2))
    G[:,0] = 1
    G[:,1] = t

    model = zeros((2, 3))
    dhat = zeros((len(t), 3))
    residual = zeros((len(t), 3))

    gT = G.conj().transpose()
    gInv = linalg.inv(dot(gT,G))
    gDotInv = dot(gInv, gT)


    #get the slope/velocity
    for iii in range(0, 3):
        model[0:2,iii] = dot(gDotInv, d[:,iii])
        dhat[:,iii] = dot(G,model[:,iii])
        residual[:,iii]=d[:,iii]-dhat[:,iii]
        
    varM = gInv
    rnorm= zeros((1,3))
    sig_m= zeros((1,3))

    #get the std error
    for jjj in range(0, 3):
        rnorm[:,jjj] = (dot(residual[:,jjj].conj().transpose(),residual[:,jjj])) / (len(residual)-2)
        sig_m[:,jjj] = sqrt(varM[1,1] * rnorm[:,jjj])

    #PLOT
    # figure
    # he = subplot(3,1,1)
    # plot(t,d[:,0],'bo',t,dhat[:,0].conj().transpose(),'g-')

    out = {
        "velocity": {
            "east" : model[0:2,0].tolist(),
            "north": model[0:2,1].tolist(),
            "up": model[0:2,2].tolist(),
        },
        "line": {
            "east": dhat[:,0].tolist(),
            "north": dhat[:,1].tolist(),
            "up": dhat[:,2].tolist()
        },
        "std_error": {
            "east": sig_m[:,0].tolist(),
            "north": sig_m[:,1].tolist(),
            "up": sig_m[:,2].tolist(),
        }
    }
    
    #send the data to server
    print(json.dumps(out))

#start process
if __name__ == '__main__':
    main()