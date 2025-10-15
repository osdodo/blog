---
title: '构建Huffman Tree来压缩数据'
summary: '如果文件中存在大量重复的字符效果很明显，由于Python运行效率低，所以压缩1M左右的文件作为演示，要想压缩大文件那慢的不得了，不过构建Huffman树还是很快的，这不是问题完全可以用C重写，方法是一样的'
coverImage: ''
date: '2016-06-28'
tags: []
author:
  name: 喝牛奶的鸵鸟
  picture: '/avatar.jpeg'
ogImage:
  url: ''
---

`Huffman Tree`的主要应用在数据压缩和通信等方面，权重高(出现次数多)的字符靠近根节点，权重低的字符远离根节点，这样编码为可变字长。

![Huffman](/assets/blog/huffman-tree/0.png)

### 代码：

```python
#优先队列 priorityqueue.py

class HeapNode:
    def __init__(self,value,level):
        self.value = value
        self.level = level

class PriorityQueue:
    def __init__(self):
        self.heapList = [HeapNode(None,None)]
        self.size = 0

    def buildQueue(self,dic):
        print(f'构建{dic}的优先队列......')
        i = len(dic) // 2
        self.size = len(dic)
        for k,v in dic.items():
            node = HeapNode(k,v)
            self.heapList.append(node)
        while (i > 0):
            self.adjustDown(i)
            i = i - 1

    def adjustDown(self,i):
        while (i * 2) <= self.size:
            mlc = self.maxLevelChild(i)
            if self.heapList[i].level < self.heapList[mlc].level:
                self.heapList[i],self.heapList[mlc] = self.heapList[mlc],self.heapList[i]
            i = mlc
            
    def maxLevelChild(self,i):
        if i * 2 + 1 > self.size:
            return i * 2
        else:
            if self.heapList[i*2].level > self.heapList[i*2+1].level:
                return i * 2
            else:
                return i * 2 + 1

    def enqueue(self,value,level):
        node = HeapNode(value,level)
        self.heapList.append(node)
        self.size = self.size + 1
        self.adjustUp(self.size)
        print(f'{value}入队,优先级为：{level}')
    
    def adjustUp(self,i):
        while i // 2 > 0:
            if self.heapList[i].level > self.heapList[i // 2].level:
                self.heapList[i],self.heapList[i // 2] = self.heapList[i // 2],self.heapList[i]
            i = i // 2

    def dequeue(self):
        pop = self.heapList[1]
        self.heapList[1] = self.heapList[self.size]
        self.size = self.size - 1
        self.heapList.pop()
        self.adjustDown(1)
        print(f'{pop.value}出队,优先级为：{pop.level}')

if __name__ == '__main__':    
    pq = PriorityQueue()
    pq.buildQueue({'数据a':1,'数据b':2,'数据c':3,'数据d':4,'数据e':5})
    pq.enqueue('数据f', 6)
    pq.dequeue()
    pq.dequeue()
    pq.dequeue()
    pq.enqueue('数据g', 7)
    pq.dequeue()
    pq.dequeue()

```

```python 
from priorityqueue import PriorityQueue
from collections import defaultdict

class Node:
    def __init__(self, character, weight):
        self.parent = None
        self.leftChild = None
        self.rightChild = None
        self.character = character
        self.weight = weight
        self.huffmancode = None
        self.isLeaf = False

class Huffman:
    def __init__(self, message):
        self.message = message
        self.pq = PriorityQueue()
        self.root = None
        self.huffmanEncode = defaultdict(list)
        self.huffmanDecode = defaultdict(list)

        dic = defaultdict(lambda: 0)
        for c in self.message:
            dic[c] += 1
        for k in dic.keys():
            node = Node(k, dic[k])
            self.pq.enqueue(node, dic[k])

    def createHuffmanTree(self):
        while self.pq.size > 0:
            if self.pq.size == 1:
                root = self.pq.dequeue()
                break
            nd1 , nd2 = self.pq.dequeue() , self.pq.dequeue()
            nd1.huffmancode , nd2.huffmancode = '0' , '1'
            if not nd1.leftChild:
                nd1.isLeaf = True
            if not nd2.rightChild:
                nd2.isLeaf = True
            root = Node(None, nd1.weight + nd2.weight)
            root.leftChild , root.rightChild = nd1 , nd2
            nd1.parent , nd2.parent = root , root
            self.pq.enqueue(root, root.weight)
        self.dfs(root)

    def dfs(self, node):
        if node:
            self.dfs(node.leftChild)
            self.dfs(node.rightChild)
            if node.isLeaf:
                code = ''
                temp = node
                while temp.parent:
                    code = ''.join([code, temp.huffmancode])
                    temp = temp.parent
                self.huffmanEncode.setdefault(node.character,code[::-1])
                self.huffmanDecode.setdefault(code[::-1],node.character)

    def encode(self):
        return ''.join([self.huffmanEncode[i] for i in self.message])

    def decode(self, ecs):
        decode = ''
        temp = ''
        for i in ecs:
            temp = ''.join([temp, i])
            if temp in self.huffmanDecode.keys():
                decode = ''.join([decode, self.huffmanDecode[temp]])
                temp = ''
        return decode

    def compress(self,ec):
        result = ''
        start = 0
        i = 16
        while i <= len(ec):
            result = ' '.join([result, str(int(ec[i - 16:i], 2))])
            start = i
            i = i + 16
        if len(ec) % 16 != 0:
            result = ' '.join([result, '123456789', ec[start:]])
        return result

    def decompression(self,ectext):
        result = ''
        ecList = ectext.split()
        for i in ecList:
            ec = int(i)
            if ec == 123456789:
                result = ''.join([result, ecList[-1]])
                break
            else:
                result = ''.join([result, bin(ec).replace('0b', '').rjust(16, '0')])
        result = self.decode(result)
        return result

if __name__ == '__main__':
    print('开始构建Huffman Tree...')
    with open('源文件.txt', 'r') as f:
        hfm = Huffman(f.read())
    hfm.createHuffmanTree()
    print('Huffman Tree构建完毕！')
    print('开始压缩...')
    ec = hfm.encode()
    result = hfm.compress(ec)
    with open('压缩文件', 'w') as f:
        f.write(result.strip())
    print('压缩完毕！')
    print('开始解压...')
    with open('压缩文件', 'r') as f:
        codetext = f.read()
    result2 = hfm.decompression(codetext)
    with open('解压文件.txt', 'w') as f:
        f.write(result2)
    print('解压完毕！')
```

### 运行:
![Huffman1](/assets/blog/huffman-tree/1.png)
![Huffman2](/assets/blog/huffman-tree/2.png)
如果文件中存在大量重复的字符效果很明显，由于Python运行效率低，所以压缩1M左右的文件作为演示，要想压缩大文件那慢的不得了，不过构建Huffman树还是很快的，这不是问题完全可以用C重写，方法是一样的。
