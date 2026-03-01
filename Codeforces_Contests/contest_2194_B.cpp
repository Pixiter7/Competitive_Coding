#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin>>t;

    while (t--) {
        int n;
        long long x, y;
        cin>>n>>x>>y;

        vector<long long> a(n);

        long long total_transfers = 0;

        for (int i=0; i<n; i++) {
            cin>>a[i];
            total_transfers += a[i] / x;
        }

        long long answer = 0;

        for (int i=0; i<n; i++) {
            long long own_transfers = a[i] / x;
            long long possible = a[i] + (total_transfers - own_transfers) * y;
            answer=max(answer, possible);
        }

        cout<<answer<<'\n';
    }

    return 0;
}
