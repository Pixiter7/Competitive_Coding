#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for(int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<vector<int>> dp(n + 1, vector<int>(k + 1, -1));
    vector<vector<int>> parent(n + 1, vector<int>(k + 1, -1));

    dp[0][0] = 0;

    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= k; j++) {
            int mx = 0;
            for(int p = i; p >= 1; p--) {
                mx = max(mx, a[p - 1]);
                if(dp[p - 1][j - 1] != -1) {
                    if(dp[p - 1][j - 1] + mx > dp[i][j]) {
                        dp[i][j] = dp[p - 1][j - 1] + mx;
                        parent[i][j] = p - 1;
                    }
                }
            }
        }
    }

    cout << dp[n][k] << "\n";

    vector<int> ans;
    int i = n, j = k;

    while(j > 0) {
        int p = parent[i][j];
        ans.push_back(i - p);
        i = p;
        j--;
    }

    reverse(ans.begin(), ans.end());

    for(int x : ans) {
        cout << x << " ";
    }

    return 0;
}