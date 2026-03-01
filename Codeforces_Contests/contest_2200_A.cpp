#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        int sum = 0;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            sum += a[i];
        }

        set<int> winners;

        for (int start = 0; start < n; start++) {
            vector<int> b = a;
            int last = -1;
            int cur = start;

            while (true) {
                bool done = true;
                for (int x : b) if (x) done = false;
                if (done) break;

                if (b[cur] > 0) {
                    b[cur]--;
                    last = cur;
                }
                cur = (cur + 1) % n;
            }
            winners.insert(last);
        }
        cout << winners.size() << '\n';
    }
    return 0;
}