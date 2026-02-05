#include <iostream>
using namespace std;
int main() {
    int t;
    cin>> t;
    while ( t-- ) {
        int n; 
        cin >> n;
        if ( n <= 4) {
            cout << -1 << endl;
            continue;
        }
        for ( int i = 1 ; i <= n ; i +=2 ) {
            cout << i << " ";
        }
        for ( int i = 4 ; i <= n ; i += 2) {
            cout << i << " ";
        }
        cout << 2 << endl ;
    }
    return 0;
}