// Leetcode - 338: Counting Bits
// UID: 24BCS12643
// Name: Himanshu Kumar

class Solution {
public:
    int obit(int n){
        int count = 0;
        while(n>0){
            if(n%2 == 1){
                count++;
            }
            n/=2;
        }
        // cout<<count<<endl; for debugging
        return count;
    }

    vector<int> countBits(int n) {
        vector<int> ans;
        for(int i = 0; i<=n; i++){
            int a = obit(i);
            ans.push_back(a);
        }
        return ans;
    }

};