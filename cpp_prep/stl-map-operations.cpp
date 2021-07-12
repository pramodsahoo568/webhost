#include <QCoreApplication>
#include <map>
#include <iostream>
using namespace std;
// Program for Map operations , insert item, find item 
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    map<int,string> mmap;

    mmap.insert(std::make_pair(1,"one"));  // insert as key value pair 1:one
    mmap.insert(std::make_pair(2,"two"));
    mmap.insert(std::make_pair(3,"trhee"));

    map<int,string>::iterator it;

    for (it= mmap.begin();it!= mmap.end();it++)
    {
        //it->first is key, it->second is value
        cout << (*it).first << ": " << (*it).second << ":"<<endl;
    }

    // find element in map
    it = mmap.find(2);
    if(it == mmap.end()) {
        cout<<std::endl<<"Value does not exit";
    } else {
         cout<<std::endl<<"Value found...";
    }

    return a.exec();
}
