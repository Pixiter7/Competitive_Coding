#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        bool allSame = true;
        for (int i = 1; i < n; i++) {
            if (s[i] != s[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            cout << 1 << endl;
            continue;
        }
        int blocks = 1;
        for (int i = 1; i < n; i++) {
            if (s[i] != s[i - 1])
                blocks++;
        }

        cout << blocks << endl;
    }
}