#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    int t;
    cin >> t;
    while (t--) {
        long long x, y;
        cin >> x >> y;
        long long val = x - 2 * y;
        // condition 1
        if (val < 0 || val % 3 != 0) {
            cout << "NO\n";
            continue;
        }
        long long k = val / 3;
        // minimum c needed so that a >= 0
        long long min_c = max(0LL, -y);
        if (k >= 2 * min_c)
            cout << "YES\n";
        else
            cout << "NO\n";
    }
    return 0;
}