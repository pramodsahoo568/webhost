#include <QCoreApplication>
#include <iostream>
#include <vector>

// Sort custome objects in a vector list using lambda
struct Student{
    std::string name;
    int rollNo;
    Student(std::string aName, int arollNo):name(aName),rollNo(arollNo) {

    }
};

void displayElements(const std::vector<Student> &s){
    for (Student value : s) {
        std::cout<<value.rollNo<<" ";
        //std::cout<<value.name<<", ";
    }
    std::cout<<std::endl;
}

void sortStudentsByRollNo(std::vector<Student> &aStudents, bool ascending) {
    std::sort(aStudents.begin(),aStudents.end(),[=](Student& lhsObj,Student& rhsObj) {
       if(ascending == true){
        return  lhsObj.rollNo < rhsObj.rollNo;
       }
       else {
        return  lhsObj.rollNo > rhsObj.rollNo;
       }
    });

}

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    std::vector<Student> students;
    students.push_back(Student("PK",10));
    students.push_back(Student("DK",50));
    students.push_back(Student("GK",30));
    students.push_back(Student("GK",20));
    students.push_back(Student("NK",40));

    displayElements(students);
    sortStudentsByRollNo(students,true);
    displayElements(students);
    sortStudentsByRollNo(students,false);
    displayElements(students);



    return a.exec();
}
