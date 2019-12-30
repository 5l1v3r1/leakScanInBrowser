# leakScanInBrowser

用于检测站点git泄漏等的浏览器插件。

## update log:

20191230:bug太多, 等我先改下吧。

20191229:开源第一版。



### 0x01 初始化

需求：扫描站点每层目录下存在的各类泄漏。

不知道在哪儿看到过有类似的东西, 问了一圈没师傅知道, 考虑到找的时间成本可能比自己自己动手写的还多, 拔刀吧。

### 0x02 加载中

需要扫哪些东西?

**1.每层目录下面的git/svn泄漏。**

比如url为:

```
https://www.baidu.com/index.html
```

那么需要扫描的目录包括但不限于：

```
https://www.baidu.com/.git/config
https://www.baidu.com/.svn/wc.db
```

**2.每层目录的泄漏**

比如url为:

```
https://www.baidu.com/test/index.html
```

那么需要扫描的目录包括但不限于：

```
https://www.baidu.com/test.zip
https://www.baidu.com/test/test.zip
```

**3.域名相关的备份泄漏**

比如域名为:

```
www.baidu.com
```

那么需要扫描的目录包括但不限于：

```
https://www.baidu.com/www.baidu.com.zip
https://www.baidu.com/wwwbaiducom.zip
https://www.baidu.com/www.zip
https://www.baidu.com/baidu.zip
https://www.baidu.com/com.zip
```

**4.Head方式扫描,扫描时及时提醒。**


思路准备好接下来就是撸代码了,以检测每层目录下面的git/svn泄漏为例：


![-w1226](https://github.com/TheKingOfDuck/leakScanInBrowser/blob/master/icons/1.jpg)

```
line 19-33 发包函数
line 37 需要扫描的文件, 以及判断的状态码。
line 39-46 遍历字典, 拼接成目标Url并发包。
```

就是如此而已...代码完成。


### 0x03 加载成功

完整的代码见：


```
https://github.com/TheKingOfDuck/leakScanInBrowser
```

firefox安装：

```
about:debugging#/runtime/this-firefox
```

临时载入附加组件

![E39E98BF-1910-4229-9F28-9CCE08455E](https://github.com/TheKingOfDuck/leakScanInBrowser/blob/master/icons/2.png)

chrome安装：


```
chrome://extensions/
```
加载已解压的扩展程序

![12F0A52E-A6DE-4FE9-BA57-CBF8040B80BE](https://github.com/TheKingOfDuck/leakScanInBrowser/blob/master/icons/3.png)


效果图：

![92DCFFD9-62A7-4D34-BBFB-419A2F940158](https://github.com/TheKingOfDuck/leakScanInBrowser/blob/master/icons/4.png)
