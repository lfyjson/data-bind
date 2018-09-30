var DB = require('data-bind');

// example 1
new DB('app', {
    context: 'Hello World',
    autor: '哈哈'
});

// example 2
window.data = {
    name: '小丸子',
    age: 20
}


new DB('main', data);