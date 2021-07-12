#include <QCoreApplication>
#include <iostream>
using namespace std;

// Program to delete last node
struct Node{
    int data;
    Node* next;
};

Node* start = NULL;

void addItem(int num) {
    if(start == NULL) {
        start = new Node;
        start->data = num;
        start->next = NULL;
    } else {
        Node* temp = start;
        while (temp->next != NULL) {
            temp = temp->next;
        }
       Node* newnode = new Node;
        newnode->data = num;
        newnode->next = NULL;

        temp->next = newnode;

    }
}

void deleteLastNode() {
    Node* temp = start;
    while(temp->next->next != NULL){
        temp = temp->next;
    }
    delete temp->next;
    temp->next = NULL;
}
void displayItem() {
    Node* temp =  start;
    while(temp) {
        cout<<temp->data<< ' ';
        temp = temp->next;
    }
}
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    addItem(10);
    addItem(20);
    addItem(30);
    addItem(40);

    displayItem();
    deleteLastNode();
    cout<<"\n Node deleted "<<std::endl;
    displayItem();

    return a.exec();
}
