## data-bind

一个简单的双向数据绑定类库，适用于没有引入MV*框架，同时也需要数据绑定的场景

## Example
http://design.applinzi.com

## Installing
```
npm install data-bind --save
```

## How to use

#### html
```
<p bind-main="name"></p>
<input type="text" model-main="name" />
```

#### js
```
import DB from 'data-bind'

new DB('main', {
  name: '小丸子'
});
```

## Flow chart
![Foo](http://p1.meituan.net/codeman/dbfcef5301455b5d855b529177a48f2018891.png)

## Run the example

```
npm install
npm run dev
```
