# 编译原理课设

## 作者

蒲家训 142006020228

## 用法

用浏览器打开 dist 文件夹下的 index.html 文件即可使用。

开发模式：在本目录下运行命令

```bash
npm i
gulp
```

## 题目

### 基于算符优先分析方法的表达式语法分析器

#### 设计内容

对简单表达式文法构造算符优先分析器。

#### 设计要求
1. 对下列简单表达式文法 G[ E’]构造算符优先关系表。
    ```
    E'→#E#
    E→E+T|T
    T→T*F|F
    F→P/F|P
    P→(E)|i
    ```
2. 根据算符优先关系表，使用栈结构来实现算符优先分析:设置两个栈:存放运算符的 OPTR 栈和存放操作数或运算结果的 OPND 栈。具体算法 述如下:
    1. 首先置操作数 OPND 栈为空栈，将#入运算符 OPTR 栈。
    2. 依次读入表达式中每个单词，若是操作数则进 OPND 栈，若是运算符则转(3)。
    3. 当前设读入的运算符为θ2，查找算符优先关系表，比较θ2 与 OPTR 栈顶元素θ1 :
        若θ1<θ2,则θ2 进 OPTR 栈，转(2);
        若θ1=θ2, 如θ2 为#，则分析成功，否则 OPTR 栈顶元素θ1 出栈，并转(2); 若θ1>θ2，则出栈 OPND 栈顶元素存放到 b，又出栈其新栈顶元素存放到 a，再
        出栈 OPTR 栈顶元素至 t，进行运算 r=a t b (t 为运算符)，并将结果 r 存入栈 OPND
        后转(2);
    4. 若θ1 和θ2 之间无优先关系，则报错。
3. 从键盘输入表达式，利用算符优先法求出其值，如输入表达式有错，则给出报错提示。表达式以“#”结尾。


### 基于预测分析方法的表达式语法分析器

#### 设计内容

已知文法G[S]：
S->AT
A->BU
T->+AT|$
U->\*BU|$
B->(S)|m

其中，$表示空串。对该文法构造预测分析表，并手工构造预测分析程序，对输入串m+m*m#进行语法分析，并根据栈的变化状态输出分析过程。

#### 设计要求

1. 判断上述文法G[S]是否LL(1)文法，若不是，将其转变为LL(1)文法；
2. 对转变后的LL(1)文法建立预测分析表；
3. 根据清华大学出版、吕映之等编著的编译原理教材教材第五章Page 88的图5.11手工构造预测分析程序；
4. 用预测分析程序对键盘输入串m+m*m#进行语法分析，并根据栈的变化状态输出给定串的具体分析过程。
