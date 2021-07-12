#include <QCoreApplication>
#include <vector>
#include<iostream>
using namespace std;
// Program to demonstrate vector operation using itrator and auto 
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    vector<int> v = {10,20,30}; // vector initialization

    v.push_back(40); // add item to vector
    v.push_back(50);


    //  iterator
    vector<int>::iterator  it;
    for(it = v.begin(); it !=v.end();it++)
    {
        cout <<"  "<<*it;
    }
	
    // iterate without creating iterator
    cout<<endl<<"iterate with auto iterator"<<endl;
    for(auto a = v.begin(); a !=v.end();a++)
    {
        cout <<"  "<<*a;
    }

    cout << " \n revrese the list \n ";
    vector<int>::reverse_iterator revit;
    for(revit = v.rbegin();  revit!= v.rend();revit++)
    {
        cout<< " "<< *revit;
    }

    return a.exec();
}
