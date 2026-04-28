n = int(input())
time = {}
for i in range(n):
    x = list(map(int, input().split(" ")))
    time[x[0]] = x[1]
at = list(time. values())
at.sort()
# print(at)
arr = [0]*(at[-1]+1)
# print (arr)
for i in time:
    for z in range(i, time[i]+1):
        arr[z-1] += 1
print(max(arr))