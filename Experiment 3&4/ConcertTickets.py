import bisect
n, m = map(int, input().split())
tickets = list(map(int, input().split()))
customers = list(map(int, input().split()))
tickets.sort()
parent = list(range(n))
def find(x):
    if x < 0:
        return -1
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

for c in customers:
    idx = bisect.bisect_right(tickets, c) - 1
    idx = find(idx)
    
    if idx == -1:
        print(-1)
    else:
        print(tickets[idx])
        parent[idx] = find(idx - 1)