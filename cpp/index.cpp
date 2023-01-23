// g++ -s index.cpp -o index.exe -fopenmp
#include <stdio.h>
#include <cmath>
#include <iostream>
#include <string>
#include <algorithm>
#include <omp.h>

// Поиск факториала
int factorial(int n)
{
  int k = 1;
  for (int i = 1; i <= n; ++i)
    k *= i;
  return k;
}

// Ввод массивов представляющих граф
void enter_graph(int length, int *&arr, int **&arr_eges)
{
  arr = new int[length];
  arr_eges = new int *[length];
  for (int i = 0; i < length; ++i)
    arr_eges[i] = new int[length];

  for (int i = 0; i < length; ++i)
  {
    arr[i] = i;
    for (int j = 0; j < length; ++j)
      arr_eges[i][j] = 0;
  }

  int max_number_of_eges = (length * (length - 1)) / 2;

  // std::cout << "Enter vertices that has eges: " << std::endl;
  std::string s;

  for (int i = 0; i < max_number_of_eges; ++i)
  {
    std::cin >> s;
    if (s == "exit")
      break;

    int index = s.find("-");
    int firs_index = std::stoi(s.substr(0, index)) - 1;
    int second_index = std::stoi(s.substr(index + 1, s.length())) - 1;

    arr_eges[firs_index][second_index] = 1;
    arr_eges[second_index][firs_index] = 1;
  }
}

// Генеращия сочетаний без повторений
int **comb(int length, int n, int m)
{
  int **arr = new int *[length];
  for (int i = 0; i < length; ++i)
    arr[i] = new int[m];
  int index = 0;

  std::string bitmask(m, 1);
  bitmask.resize(n, 0);

  do
  {
    int j = 0;
    for (int i = 0; i < n; ++i)
    {
      if (bitmask[i])
      {
        arr[index][j] = i;
        j++;
      }
    }
    index++;
  } while (std::prev_permutation(bitmask.begin(), bitmask.end()));
  return arr;
}

// Генераци перестановок
int **perm(int length, int *b, int m)
{
  int **arr = new int *[length];
  for (int i = 0; i < length; i++)
    arr[i] = new int[m];
  int index = 0;

  std::string s = "";

  for (int i = 0; i < m; ++i)
  {
    char c = i;
    s += c;
  }

  do
  {
    int j = 0;
    for (int i = 0; i < m; ++i)
    {
      arr[index][j] = s[i];
      j++;
    }
    index++;
  } while (std::next_permutation(s.begin(), s.end()));
  return arr;
}

// Проверяет изоморфность двух подграфов
bool check_izomorphism(int **a_eges, int **b_eges, int *a_subgraph, int *b_subgraph, int m)
{
  bool is_izomorph = true;

  for (int i = 0; i < m; i++)
  {
    for (int j = 0; j < m; j++)
    {
      if (i != j)
      {
        is_izomorph = is_izomorph && a_eges[a_subgraph[i]][a_subgraph[j]] == b_eges[b_subgraph[i]][b_subgraph[j]];
      }
    }
  }
  return is_izomorph;
}

int main()
{
  // #ifdef _OPENMP
  //   std::cout << "openmp supported" << std::endl;
  // #endif

  // Ввод первого графа
  int n; // Колличестко вершиин первого графа
  // std::cout << "Enter number of first graph vertices" << std::endl;
  std::cin >> n;
  int *a;       // Вершиины первого графа
  int **a_eges; // Ребра первого графа
  enter_graph(n, a, a_eges);

  // Ввод второго графа
  int m; // Колличестко вершиин второго графа
  // std::cout << "Enter number of second graph vertices" << std::endl;
  std::cin >> m;
  int *b;       // Вершиины второго графа
  int **b_eges; // Ребра второго графа
  enter_graph(m, b, b_eges);

  // Оработка ошибки при вводе
  if (m > n)
  {
    // std::cout << "Graph can not have less vertices than subgraph";
    return 0;
  }

  int b_subgraph_length = factorial(m);             // Длинна массива перестановок вершин в графе b
  int **b_subgraph = perm(b_subgraph_length, b, m); // Массив перестановок из вершин графа b

  // Приверка не явлюся ли графы изоморфными друг другу
  if (m == n)
  {
    bool checked = false;

#pragma omp parallel for
    for (int i = 0; i < b_subgraph_length; i++)
    {
      if (check_izomorphism(a_eges, b_eges, a, b_subgraph[i], m) && !checked)
      {
#pragma omp critical
        {
          checked = true;
          std::cout << "0";
        }
      }
    }

    return 0;
  }

  int a_subgraph_lehgth = factorial(n) / (factorial(m) * factorial(n - m)); // Длинна массива сочетаний вершин из n по m в графе a
  int **a_subgraphs = comb(a_subgraph_lehgth, n, m);                        // Mассив сочетаний вершин из n по m в графе a

  bool *checked_verses_a = new bool[a_subgraph_lehgth];
  for (int i = 0; i < a_subgraph_lehgth; i++)
    checked_verses_a[i] = false;

  bool *checked_verses_b = new bool[b_subgraph_length];
  for (int i = 0; i < b_subgraph_length; i++)
    checked_verses_b[i] = false;

    // std::cout << "Izomorph subgraphs:" << std::endl;

    // Поиск изоморфных подграфов
#pragma omp parallel for
  for (int i = 0; i < a_subgraph_lehgth; i++)
  {
    for (int j = 0; j < b_subgraph_length; j++)
    {
      if (check_izomorphism(a_eges, b_eges, a_subgraphs[i], b_subgraph[j], m))
      {
#pragma omp critical
        {
          if (!checked_verses_a[i] || !checked_verses_b[j])
          {
            for (int w = 0; w < m; w++)
            {
              std::cout << a_subgraphs[i][w] + 1 << " ";
            }
            std::cout << std::endl;
            checked_verses_a[i] = true;
            checked_verses_b[j] = true;
          }
        }
        break;
      }
    }
  }

  return 0;
}