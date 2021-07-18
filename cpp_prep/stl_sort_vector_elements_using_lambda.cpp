#include <QCoreApplication>
#include <iostream>
#include <vector>

// Sort the vecotor elements using lambda in decsending order
void displayElements(std::vector<int> &v){
    for (int value : v) {
        std::cout<<value<<" ";
    }
    std::cout<<std::endl;
}

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    std::vector<int> elements = {4,2,5,1,6,7,10};

    displayElements(elements);

    // sort the vector elements in acsending order
    //std::sort(elements.begin(),elements.end());


    // Sort the vecotor elemets using lambda in decsending order
    std::sort(elements.begin(),elements.end(),[](int x,int y){
        return x>y;
    });
    displayElements(elements);


    return a.exec();
}
