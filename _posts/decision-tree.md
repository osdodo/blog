---
title: '决策树的简单实现'
summary: '最近同学说食堂饭很难吃，我常去食堂，发现其实并不是经常性的难吃，只是偶尔有几次吃得想吐，由于宿舍楼里就这么一个食堂，大家都很懒，还是有很多人去排队吃食堂，下面以此作为一个例子简单实现一下，来简单预测一下明天的情况…'
coverImage: ''
date: '2016-10-11'
tags: []
author:
  name: 喝牛奶的鸵鸟
  picture: ''
ogImage:
  url: ''
---

### 熵
我第一次接触这个字是在高中的化学课堂上，这里的<a href="https://zh.wikipedia.org/wiki/%E7%86%B5" target="_blank">熵</a>是用来衡量一个系统混乱程度的度量。`信息熵`是信息论创始人<a href="https://zh.wikipedia.org/wiki/%E5%85%8B%E5%8A%B3%E5%BE%B7%C2%B7%E9%A6%99%E5%86%9C" target="_blank">香农</a>提出的，它和上面提到的`熵`其实是正相关的。当我们面对一件非常不确定的事件时，我们需要大量的信息才能掌控此事件，也就是说信息量的大小和事件的不确定性有着直接的关系。
设X是一个有限状态的离散型随机变量,熵与概率之间的关系：
$$
\begin{equation}\begin{split} H(X) &= -(p_1log_2{p_1} + p_2log_2{p_2} + ... + p_nlog_2{p_n}) \\ 
&= - \sum_{i}^n{p_i(x)log_2{p_i(x)}}
\end{split}\end{equation}
$$
### 决策树
最近同学说食堂饭很难吃，我常去食堂，发现其实并不是经常性的难吃，只是偶尔有几次吃得想吐，由于宿舍楼里就这么一个食堂，大家都很懒，还是有很多人去排队吃食堂，下面以此作为一个例子简单实现一下，来简单预测一下明天的情况：

<table>
<tbody>
    <tr>
        <th>序号</th>
        <th>天气</th>
        <th>菜</th>
        <th>就餐人数</th>
    </tr>
    <tr>
        <th>1</th>
        <th>雨</th>
        <th>丰富</th>
        <th>多</th>
    </tr>
    <tr>
        <th>2</th>
        <th>雨</th>
        <th> 差</th>
        <th>多</th>
    </tr>
    <tr>
        <th>3</th>
        <th>雨</th>
        <th>一般</th>
        <th>多</th>
    </tr>
    <tr>
        <th>4</th>
        <th>晴</th>
        <th>丰富</th>
        <th>多</th>
    </tr>
    <tr>
        <th>5</th>
        <th>晴</th>
        <th>差</th>
        <th>少</th>
    </tr>
    <tr>
        <th>6</th>
        <th>晴</th>
        <th>一般</th>
        <th>少</th>
    </tr>
</tbody>
</table>

**信息增益**:得知特征A的信息而使得数据集D的信息的不确定性减少的程度
$$
Gain(D,A) = H(D) - H(D|A)
$$
通过信息增益生成决策树:
计算一下Gain(天气):
$$
H(D) = -\frac{4}{6}log_2\frac{4}{6} - \frac{2}{6}log_2\frac{2}{6} = 0.918(bit)
$$
$$
\begin{equation}\begin{split} H(D|天气) &= \frac{3}{6} \times (-\frac{3}{3}log_2\frac{3}{3} - \frac{0}{3}log_2\frac{0}{3}) \\ 
&+\frac{3}{6} \times (-\frac{1}{3}log_2\frac{1}{3} - \frac{2}{3}log_2\frac{2}{3}) \\
&\approx 0.459(bit)
\end{split}\end{equation}
$$
$$
\begin{equation}\begin{split} H(天气) &= H(D) -  H(D|天气) \\ 
&= 1 - 0.459 \\
&= 0.514(bit)
\end{split}\end{equation}
$$

同理算出 Gain(菜) = 0.252 bit，根据计算结果，Gain最大的作为起始开始生成决策树：

<tree-container class='w-full flex justify-center'>
    <div class='text-green-600'>
        <div>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
            <code>天气<span style="color: red">？</span></code>
        </div>
        <div>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
            <code>/&nbsp;&nbsp;&nbsp;&nbsp;\</code>
        </div>
        <div>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;</code>
            <code>人多&nbsp;&nbsp;&nbsp;菜<span style="color: red">？</span></code></div>
        <div>
            <code>&nbsp;&nbsp;&nbsp;</code>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;｜&nbsp;\</code>
        </div>
        <div>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
            <code>人多&nbsp;&nbsp;人少&nbsp;人少</code>
        </div>
    </div>
</tree-container>

### 代码实现：
```python
from math import log
from collections import defaultdict
import json

def createDataSet():
    features = ['天气','菜']
    dataSet =[['雨','丰富','多'],
              ['雨','差','多'],
              ['雨','一般','多'],
              ['晴','丰富','多'],
              ['晴','差','少'],
              ['晴','一般','少']]
    return dataSet,features

def _entropy(dataSet):
    '''
    计算数据集的熵
        :param dataSet: 数据集
    '''
    dic = defaultdict(lambda: 0)
    for line in dataSet:
        dic[line[-1]] += 1
    ent = 0.0
    n = float(len(dataSet))
    for v in dic.values():
        p = v / n
        ent = ent - p * log(p,2)
    return ent

def _splitDataSet(dataSet,index,value):
    '''
    划分数据集
        :param dataSet: 数据集
        :param index: 特征索引
        :param value: 特征值
    '''
    subDataSet = []
    for line in dataSet:
        if line[index] == value:
            subDataSet.append(line[:index] + line[index+1:])
    return subDataSet       
    
def _gain(dataSet,index):
    '''
    计算信息增益
        :param dataSet: 数据集
        :param index: 特征索引
    '''
    n = float(len(dataSet))
    featureValueSet = set([line[index] for line in dataSet])
    subEnt = 0.0
    for value in featureValueSet:
        subDataSet = _splitDataSet(dataSet,index,value)
        p = len(subDataSet) / n
        subEnt = subEnt + p * _entropy(subDataSet)
    return _entropy(dataSet) - subEnt

def _bestFeatureIndex(dataSet,features):
    '''
    根据最大信息增益找到最好的特征
        :param dataSet: 数据集
        :param features: 全部特征
    '''
    maxGain , bestFeatureIndex = 0.0 , 0
    for i, _ in enumerate(features):
        g = _gain(dataSet,i)
        if g > maxGain:
            maxGain = g
            bestFeatureIndex = i
    return bestFeatureIndex

def createTree(dataSet,features):
    '''
    创建树
        :param dataSet: 数据集
        :param features: 全部特征 
    '''
    result = [line[-1] for line in dataSet]
    if len(set(result)) == 1:
        return result[0]
    i = _bestFeatureIndex(dataSet,features)
    bestFeature = features[i]
    tree = {
        bestFeature: {}
    }
    del(features[i])
    bestFeatureValueSet = set([line[i] for line in dataSet])
    for value in bestFeatureValueSet:
        subFeature = features[:]
        tree[bestFeature][value] = \
            createTree(_splitDataSet(dataSet,i,value),subFeature)
    return tree

def testID3(tree,feat,testValue):
    '''
    测试
        :param tree: 决策树
        :param feat: 特征
        :param testValue: 测试值 (e.g.,['晴','一般'])
    '''
    root = ''.join(tree.keys())
    nextDic = tree[root]
    featureIndex = 0
    for i,f in enumerate(feat):
        if f == root:
            featureIndex = i
    for key in nextDic.keys():
        if testValue[featureIndex] == key:
            if isinstance(nextDic[key], dict):
                return  testID3(nextDic[key],feat,testValue)
            else:
                return  nextDic[key]
 
dataSet,features = createDataSet()
feat = features[:]
tree = createTree(dataSet,features)
data = json.dumps(tree,ensure_ascii=False,indent=1)
print(data)
with open('data.json', 'w') as f:
    json.dump(data, f)
result = testID3(tree,feat,['晴','差'])
print(f'['晴','差']---->{result}')
```