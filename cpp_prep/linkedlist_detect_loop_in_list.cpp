#include <QCoreApplication>
#include <iostream>
using namespace std;

// Program to detect loop in a list using slow and fast pointer
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

void createLoop(Node* start) {
    Node* temp = start;
    // traverse to last  node
    while (temp->next) {
        temp =  temp->next;
    }
    // last node pints to start or head node to create a circular loop
    temp->next = start;
}


bool detectLoopInLinkedList() {
    Node* slow_ptr = start;
    Node* fast_ptr = start;
    while(slow_ptr && fast_ptr) {
        slow_ptr = slow_ptr->next;
        fast_ptr =  fast_ptr->next->next;
        if(slow_ptr == fast_ptr) {
            return  true;
        }

    }
    return false;
}
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    addItem(10);
    addItem(20);
    addItem(30);
    addItem(40);
    addItem(50);
    addItem(60);

    createLoop(start); // create a loop for testing
    bool ret = detectLoopInLinkedList();
    if(ret == true) {
        cout<<"Loop Detected...";
    }
    else {
        cout<<"No loop detected...";
    }
    return a.exec();
}
