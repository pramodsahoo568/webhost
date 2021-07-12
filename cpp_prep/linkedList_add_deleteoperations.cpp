#include <QCoreApplication>
#include <iostream>

using namespace std;

struct Node {
    int data;
    Node *next;
};

Node* head = NULL; // Head node points to the start node of the linked list

void addItem(int aData) {
    // If likned list is empty crate a new Node
    if(head==NULL) {
        head = new Node;
        head->data = aData;
        head->next = NULL;
    }
    else {
        // If linked list is NOT Empty, then traverse to last node
        Node* temp = head;
        while(temp->next!= NULL){
            temp = temp->next;
        }

        // Create a new node and add it to the last node
        Node* node = new Node;
        node->data = aData;
        node->next = NULL;

        temp->next = node;
    }

}

void displayItems() {
    Node* temp = head;
    while(temp!=NULL) {
        cout<<temp->data<<" ";
        temp = temp->next;
    }
}

void deleteItem(int aData) {
    Node* curr = head;
    Node* prev = NULL;

    while(curr != NULL) {

        if(curr->data == aData) {
            //check if the node is first node
            if(curr == head) {
                head = curr->next;
                delete  curr;
            }
            else {
                prev->next = curr->next;
                delete curr;
            }
            return;
        }
        prev = curr;  // keep track of previous node
        curr = curr->next; // increament the curr node
    }


}

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    //Add Items To Linked List
    addItem(10);
    addItem(20);
    addItem(30);
    addItem(40);

    displayItems();
    cout<<std::endl;
    deleteItem(30);
    displayItems();

    return a.exec();
}
