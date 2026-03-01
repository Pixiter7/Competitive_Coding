#include <bits/stdc++.h>
using namespace std;

void solve(int n, int from, int to, int aux, vector<pair<int,int>>& moves) {
    if(n == 0) return;
    solve(n - 1, from, aux, to, moves);
    moves.push_back({from, to});
    solve(n - 1, aux, to, from, moves);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<pair<int,int>> moves;
    solve(n, 1, 3, 2, moves);

    cout << moves.size() << "\n";
    for(auto &m : moves)
        cout << m.first << " " << m.second << "\n";

    return 0;
}