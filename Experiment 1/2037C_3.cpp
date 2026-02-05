#include <iostream>
using namespace std;
int main() {
    int t;
    cin>> t;
    while ( t-- ) {
        int n; 
        cin >> n;
        if ( n <= 3) {
            cout << -1 << endl;
            continue;
        }
        for ( int i = 1 ; i <= n ; i +=2 ) {
            cout << i << " ";
        }
        for ( int i = 2 ; i <= n ; i += 2) {
            cout << i << " ";
        }
        cout << endl ;
    }
    return 0;
}