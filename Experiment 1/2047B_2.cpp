#include<bits/stdc++.h>
using namespace std;

void countfreq(int &maxcount, int &mincount, char &maxchar, char &minchar, int n, string s) {
    sort(s.begin(),s.end());
    for (int i = 0;i< n; ) {
        int j =i;
        int count= 0;
        while (j < n && s[j]== s[i]) {
            count++;
            j++;
        }
        if (count > maxcount) {
            maxcount =count;
            maxchar =s[i];
        }
        if (count <= mincount) {
            mincount= count;
            minchar = s[i];
        }
        i = j;
    }
}
int main() {
    int t;
    cin >> t;
    while (t--) {
        int maxcount = 0,mincount =INT_MAX, n;
        char maxchar =0, minchar = 0;
        string s;
        cin >>n;
        cin >> s;
        n = s.size();
        countfreq(maxcount, mincount, maxchar, minchar, n, s);
        if (maxchar!=minchar) {
            for (int i =0; i < n; i++) {
                if (s[i]== minchar) {
                    s[i] = maxchar;
                    break;
                }
            }
        }
        cout <<s << endl;
    }
    return 0;
}