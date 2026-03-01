#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin>>t;

    while (t--) {
        int n;
        cin>>n;
        vector<int> p(n);
        int pos = -1;
        for (int i = 0; i < n; i++) {
            cin >> p[i];
            if (p[i] == n)
                pos = i;
        }
        if (pos != 0)
            swap(p[0], p[pos]);
        for (int x : p)
            cout<<x <<" ";
        cout << "\n";
    }
}