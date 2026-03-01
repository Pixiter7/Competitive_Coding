n = int(input())
for i in range(n):
    x = list(map(int, input().split()))
    group = x[0]//x[1]
    ans = (x[0] - group*x[1]) + (x[1]-1)*group
    print(ans)