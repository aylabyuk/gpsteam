from pylab import *
from numpy import *
import sys, json

# my_data = genfromtxt('buca.csv', delimiter=',')
for line in sys.stdin:
    print (json.dumps(json.loads(line)))


#rawdata
t = my_data[:,0]
e = my_data[:,1]
n = my_data[:,2]
u = my_data[:,3]

#rawdata - mean of all columns
e = (e - mean(e)) * 100
n = (n - mean(n)) * 100
u = (u - mean(u)) * 100
    
d = zeros((len(t), 3))
d[:,0] = e
d[:,1] = n
d[:,2] = u


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
figure
he = subplot(3,1,1)
plot(t,d[:,0],'bo',t,dhat[:,0].conj().transpose(),'g-')

    
print(model[0:2,0])