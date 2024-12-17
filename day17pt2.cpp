#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

bool trything(int a) {
  int b = 0;
  int c = 0;

  vector<int> cases;
  vector<int> output;
  int iterations = 0;
  while (true) {
    b = a % 8;
    b = b ^ 7;
    c = a / (1 << b);
    a = a / 8;
    b = b ^ 7;
    b = b ^ c;
    if (iterations == 0) {
      if (b % 8 != 2) return false;
      iterations++;
    } else if (iterations == 1) {
      if (b % 8 != 4) return false;
      iterations++;
    } else if (iterations == 2) {
      if (b % 8 != 1) return false;
      iterations++;
    } else if (iterations == 3) {
      if (b % 8 != 7) return false;
      iterations++;
    } else if (iterations == 4) {
      if (b % 8 != 7) return false;
      iterations++;
    } else if (iterations == 5) {
      if (b % 8 != 5) return false;
      iterations++;
    } else if (iterations == 6) {
      if (b % 8 != 0) return false;
      iterations++;
    } else if (iterations == 7) {
      if (b % 8 != 3) return false;
      iterations++;
    } else if (iterations == 8) {
      if (b % 8 != 1) return false;
      iterations++;
    } else if (iterations == 9) {
      if (b % 8 != 7) return false;
      iterations++;
    } else if (iterations == 10) {
      if (b % 8 != 4) return false;
      cout << "very good\n";
      iterations++;
    } else if (iterations == 11) {
      if (b % 8 != 1) return false;
      iterations++;
    } else if (iterations == 12) {
      if (b % 8 != 5) return false;
      iterations++;
    } else if (iterations == 13) {
      if (b % 8 != 5) return false;
      iterations++;
    } else if (iterations == 14) {
      if (b % 8 != 3) return false;
      iterations++;
    } else if (iterations == 15) {
      if (b % 8 != 0) return false;
      iterations++;
    }
    // a = a / 8;
    // output.push_back(a % 8);
    if (a == 0) {
      return iterations > 16;
    }
    auto index = find(cases.begin(), cases.end(), a);
    if (index != cases.end()) {
      return false;
    }
    cases.push_back(a);
  }
}

int main() {
  for (int a = 10000000;; a++) {
    // cout << a;
    // cout << '\n';
    if (trything(a)) {
      cout << a;
      cout << '\n';
      break;
    }
  }
}
