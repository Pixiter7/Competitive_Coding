x = int(input())
y = list(map(int, input().split()))
ans = 0
for i in range(x):
    ones = y.count(1)
    for j in range(i, len(y)):
        if y[j] == 0:
            ones += 1
        else:
            ones -= 1
        ans = max(ans, ones)
print(ans)