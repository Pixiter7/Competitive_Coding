#include<iostream>
using namespace std;

int main(){
    int ans = 0, b, t, sum = 0, arr[b];
    int i = 0, j = 0;
    cin >> b >> t;
    for(int i = 0; i<b; i++){
        cin >> arr[i];
    }
    while(j<b){
        if(sum<=t){
            sum += arr[j];
            j++;
        }
        else{
            ans = max(sum, ans);
            sum -= arr[i];
            i++;
        }
    }   
}