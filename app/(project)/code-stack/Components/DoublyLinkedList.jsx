'use client'
import  { useState } from 'react';

export default function DoublyLinkedList() {
  // Doubly Linked List Node
  class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }

  const [head, setHead] = useState(null);
  const [_, triggerRender] = useState(0);

  const forceUpdate = () => triggerRender((x) => x + 1);

  const push = (data) => {
    if (!data) return;
    const newNode = new Node(parseInt(data));
    newNode.next = head;
    if (head) head.prev = newNode;
    setHead(newNode);
  };

  const append = (data) => {
    if (!data) return;
    const newNode = new Node(parseInt(data));
    if (!head) {
      setHead(newNode);
      return;
    }
    let last = head;
    while (last.next !== null) last = last.next;
    last.next = newNode;
    newNode.prev = last;
    forceUpdate();
  };

  const insertAfterValue = (targetData, newData) => {
    if (!targetData || !newData) return;
    let current = head;
    while (current !== null && current.data !== parseInt(targetData)) {
      current = current.next;
    }
    if (!current) {
      alert("Node not found");
      return;
    }

    const newNode = new Node(parseInt(newData));
    newNode.next = current.next;
    newNode.prev = current;

    if (current.next) {
      current.next.prev = newNode;
    }
    current.next = newNode;
    forceUpdate();
  };

  const deleteNode = (delNode) => {
    if (!head || !delNode) return;

    if (head === delNode) {
      setHead(delNode.next);
    }

    if (delNode.next) {
      delNode.next.prev = delNode.prev;
    }

    if (delNode.prev) {
      delNode.prev.next = delNode.next;
    }

    forceUpdate();
  };

  const getForwardList = () => {
    const list = [];
    let current = head;
    while (current !== null) {
      list.push(current.data);
      current = current.next;
    }
    return list;
  };

  const getReverseList = () => {
    let current = head;
    const list = [];
    if (!current) return list;

    while (current.next !== null) current = current.next;
    while (current !== null) {
      list.push(current.data);
      current = current.prev;
    }
    return list;
  };

  const getNodes = () => {
    const nodes = [];
    let current = head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  };

  const initList = () => {
    const tempHead = new Node(6);
    const n2 = new Node(7);
    const n3 = new Node(1);

    n2.next = tempHead;
    tempHead.prev = n2;

    n3.next = n2;
    n2.prev = n3;

    setHead(n3);
    append(4);
    insertAfterValue(7, 8);
    forceUpdate();
  };

  const initializeListForDelete = () => {
    const values = [2, 4, 8, 10];
    setHead(null);
    values.forEach(val => push(val));
    forceUpdate();
  };

  const performDeletions = () => {
    if (!head) return;

    const first = head;
    const second = first?.next;
    const third = second?.next;

    deleteNode(first);
    deleteNode(second);
    deleteNode(third);
    forceUpdate();
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap gap-3">
        <button onClick={() => append(prompt("Enter value to append:"))} className="bg-blue-600 text-white px-4 py-2 rounded">Append</button>
        <button onClick={() => push(prompt("Enter value to push at beginning:"))} className="bg-green-600 text-white px-4 py-2 rounded">Push</button>
        <button
          onClick={() => {
            const target = prompt("Insert after which value?");
            const val = prompt("Enter new value:");
            insertAfterValue(target, val);
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Insert After
        </button>
        <button onClick={initList} className="bg-purple-600 text-white px-4 py-2 rounded">Initialize List (Insert)</button>
        <button onClick={initializeListForDelete} className="bg-indigo-600 text-white px-4 py-2 rounded">Initialize List (10 ⇄ 8 ⇄ 4 ⇄ 2)</button>
        <button onClick={performDeletions} className="bg-red-600 text-white px-4 py-2 rounded">Delete First, Middle, Last</button>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Forward Traversal:</h2>
        <p>{getForwardList().join(' → ') || "Empty"}</p>

        <h2 className="text-lg font-semibold mt-4">Reverse Traversal:</h2>
        <p>{getReverseList().join(' ← ') || "Empty"}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-4">Interactive Node List (with delete):</h2>
        <div className="flex gap-2 flex-wrap items-center mt-2">
          {getNodes().map((node, index) => (
            <div
              key={index}
              className="bg-white/10 border px-3 py-1 rounded shadow flex items-center gap-2"
            >
              <span>{node.data}</span>
              <button
                className="text-red-500 font-bold"
                onClick={() => deleteNode(node)}
              >
                ×
              </button>
            </div>
          ))}
          {getNodes().length === 0 && <span className="text-gray-500">List is empty</span>}
        </div>
      </div>
    </div>
  );
}
