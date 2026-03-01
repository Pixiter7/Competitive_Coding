#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >>t;
    while (t--) {
        long long n, k;
        cin>> n >> k;
        long long mn = n;
        long long mx= n * (n + 1) / 2;
        if (k <mn || k > mx) {
            cout<<"NO\n";
            continue;
        }
        cout<<"YES\n";
        // start from maximum configuration
        vector<int> a;
        for (int i= 1; i <= n; i++)
            a.push_back(i);
        for (int i= 1; i <= n; i++)
            a.push_back(i);
        long long reduce= mx - k;
        // move second copies left
        for (int i = n; i >= 1 && reduce > 0; i--) {
            int pos1=i - 1;
            int pos2=n + i - 1;
            long long can = min(reduce, (long long)(n - i));
            swap(a[pos2], a[pos2 - can]);
            reduce -=can;
        }
        for (int x:a)
            cout <<x << " ";
        cout << "\n";
    }
}