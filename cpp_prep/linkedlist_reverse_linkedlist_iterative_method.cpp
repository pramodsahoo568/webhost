#include <QCoreApplication>
#include <iostream>

using namespace std;
// Reverse the linked List
// After reverse the head should point to the last node
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
void reverseList(){
    Node* prev = NULL;
    Node* curr = head;
    Node* next = NULL;

    while(curr!=NULL) {
        next = curr->next; //  save the address of next node (curr->next) before updating the curr  in order to not lose the connection in linked list
        curr->next = prev; //  assign current->next to previous element so that it will point to prevous element in reverse direction
        // we can reverse only one node at a time so move the nodes in forward direction
        prev = curr; //increament prev value to current so that the curent node becomes the prev element for next iteration
        curr = next; //  increament curent value to next node for next iteration
    }
    head = prev;  //when curr becomes null and we proccesed all nodes  , prev contains the adress of last node,
                  //head should be updated to prev which contains the adress of last node after the while loop
}
void displayItems() {
    Node* temp = head;
    while(temp!=NULL) {
        cout<<temp->data<<" ";
        temp = temp->next;
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
    reverseList();
    cout<<std::endl<<"Reverse Linked List"<<std::endl;
    displayItems();
    return a.exec();
}
