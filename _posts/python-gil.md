---
title: 'Python GIL的问题'
summary: 'python的GIL问题导致python同时只能解释一个线程，下面举例说明…'
coverImage: ''
date: '2016-11-20'
tags: []
author:
  name: 喝牛奶的鸵鸟
  picture: ''
ogImage:
  url: ''
---

python的GIL问题导致python同时只能解释一个线程，下面举例说明：
### 多进程测试：
```python
from multiprocessing import Process

def loop():
    while True:
        pass

p1 = Process(target=loop)
p1.start()
loop()
```
运行结果如下，可以看到有两个核跑满了:
![gil_01](/assets/blog/python-gil/gil_01.png)

### 多线程测试：
```python
from threading import Thread

def loop():
    while True:
        pass

t1 = Thread(target=loop)
t1.start()
loop()
```
运行结果如下，可以看到没有一个核跑满,只是切换线程执行:
![gil_02](/assets/blog/python-gil/gil_02.png)

### 解决方法：
由于GIL的存在，不能同时解释多个线程，那么可以让python解释器解释主线程，别的线程可以是静态编译型语言编译后的动态链接库，这样就可以充分利用多核了。
```c
//loop.c ，使用　gcc loop.c -shared -o libloop.so 编译
void loop(){
    while(1){
        ;
    }
}
```

```python

from ctypes import *
from threading import Thread

def loop():
    while True:
        pass

lib = cdll.LoadLibrary('./libloop.so')
t1 = Thread(target=lib.loop)
t1.start()
loop()
```
运行结果如下，此时可以发现多线程和多进程一样有两个核跑满了:
![gil_03](/assets/blog/python-gil/gil_03.png)
