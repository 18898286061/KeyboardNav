// 1. 初始化数据
var hashA = init();
var keys = hashA['keys'];
var hash = hashA['hash'];

// 2. 生成键盘
// 遍历keys，生成kbd标签
generateKeyboard(keys, hash);

// 3. 监听用户动作
listenToUser(hash)



// 工具函数

// 初始化数据
function init() {
    var keys = {
        '0': {0: 'q', 1:'w', 2:'e', 3:'r', 4:'t', 5:'y', 6:'u', 7:'i', 8:'o', 9:'p', length: 10},
        '1': {0: 'a', 1:'s', 2:'d', 3:'f', 4:'g', 5:'h', 6:'j', 7:'k', 8:'l', length: 9},
        '2': {0: 'z', 1:'x', 2:'c', 3:'v', 4:'b', 5:'n', 6:'m', length: 7},
        'length': 3
    }
    var hash = {
        'w': 'weibo.com',
        'e':'ele.me', 
        't': 'tencent.com',
        'y': 'youtube.com',
        'p': 'panda.tv',
        'a': 'amazon.com',
        'd': 'douban.com',
        'j': 'jd.com',
        'm': 'meituan.com'
    }
    // 取出localStorage 中的 zzz 对应的hash
    var hashInLocalStorage = getFromLocalStorage('zzz')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }
}


// 提取localStorage数据
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}


// 创建标签
function tag(tagName) {
    return document.createElement(tagName);
}

// 创建span标签
function createSpan(textContent) {
    var span = tag('span');
    span.textContent = textContent;
    span.className = 'text';
    return span;
}

// 创建button按钮
function createButton(id) {
    var button = tag('button');
    button.textContent = "编辑"
    button.id = id;
    button.onclick = function(xzkjcnxlkcjlk) {
        // xzkjcnxlkcjlk['target'] 就是用户点击的元素
        var button2 = xzkjcnxlkcjlk['target'];
        console.log(xzkjcnxlkcjlk.target);
        var img2 = button2.previousSibling;
        var key = button2['id']; // q w e r t
        var x = prompt('请输入网址');
        hash[key] = x; // hash 变更
        img2.src = 'http://' + x + '/favicon.ico';
        // 监听图片加载失败事件
        img2.onerror = function(xxx) {
            xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }
        // 保存数据进localStorage
        localStorage.setItem('zzz', JSON.stringify(hash));
    }
    return button;
}

// 初始化图片
function createImage(domain) {
    var img = tag('img');
    if(domain) {
        img.src = 'http://' + domain + '/favicon.ico';
    } else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    img.onerror = function(xxx) {
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    return img;
}


// 生成键盘
function generateKeyboard(keys, hash) {
    for(var index = 0; index < keys.length; index++) {
        var div = tag('div');
        div.className = 'row';
        main.appendChild(div);

        var row = keys[index] // 第一个数组, 第二个数组, 第三个数组
        for(var index2 = 0; index2 < row.length; index2++) {
            var span = createSpan(row[index2]);
            var button = createButton(row[index2]);
            var img = createImage(hash[row[index2]]);
            
            var kbd = tag('kbd');
            kbd.className = 'key';
            
            div.appendChild(kbd);
            
            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(button);
        }   
    }
}

// 监听用户动作
function listenToUser(hash) {
    document.onkeypress = function(xzkjcnxlkcjlk) {
        var key = xzkjcnxlkcjlk['key']; // q w e
        var website = hash[key];
        //location.href = 'http://'+website (相当于在地址栏输入)
        window.open('http://'+website, '_blank');
    }
}
