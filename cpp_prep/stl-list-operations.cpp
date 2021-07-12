#include <QCoreApplication>
#include <list>
#include <iostream>
using namespace std;
// Program to add items to list and iterate using iterator, auto and reverse iterator
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);
    list <int> myList;

    myList.push_back(1); // add item
    myList.push_back(2);
    myList.push_back(3);
    myList.push_back(4);
    myList.push_back(5);
    myList.push_back(6);

    myList.remove(4);    // remove item

    list<int>::iterator it ;
    // iterate through list using itrator
    for(it = myList.begin(); it!= myList.end();it++)
    {
        cout<<*it<<" ";
    }

    // iterate through list using auto variable (Without creating iterator)
    cout<<std::endl<<"Iterate using auto"<<std::endl;
    for(auto a = myList.begin(); a!= myList.end();a++)
    {
        cout<<*a<<" ";
    }

    // iterate reverse with reverse iterator and print
    list<int>::reverse_iterator itrev ;
    cout<<endl<<"revesre Iterator "<<endl;
    for(itrev = myList.rbegin(); itrev!= myList.rend();itrev++)
    {
        cout<<*itrev<<" ";
    }


    return a.exec();
}
