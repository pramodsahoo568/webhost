#include <QCoreApplication>
#include <iostream>
#include <vector>

// Find a student by roll number from a vector list of objects using lambda
struct Student{
    std::string name;
    int rollNo;
    Student(std::string aName, int arollNo):name(aName),rollNo(arollNo) {
    }
};

void displayElements(std::vector<Student*> &s){
    for (Student* value : s) {
        std::cout<<value->rollNo<<" ";
        std::cout<<value->name<<", ";
    }
    std::cout<<std::endl;
}

bool findStudent(std::vector<Student*> &students, int aRollNumber){
    bool found = false;
    // Capture variable 'aRollNumber' by value and 'found' by reference
    std::for_each(students.begin(),students.end(),[=,&found](Student* s)
    {
       if(aRollNumber == s->rollNo) {
           std::cout<<"Found.."<<std::endl;
           found = true;
       }
    });
    return  found;
}
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    std::vector<Student*> students;
    students.push_back( new Student("PK",10));
    students.push_back( new Student("DK",50));
    students.push_back( new Student("GK",20));
    students.push_back( new Student("GK",20));
    students.push_back( new Student("NK",40));



    displayElements(students);
    bool ret = findStudent(students,20);
    if(ret) {
        std::cout<<"Value Found!!!"<<std::endl;
    }
    else {
        std::cout<<"Value NOT Found.."<<std::endl;
    }


    return a.exec();
}
