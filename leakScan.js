//  __________
// < leakScan >
//  ----------
//         \   ^__^
//          \  (oo)\_______
//             (__)\       )\/\
//                 ||----w |
//                 ||     ||
//
// Author  : CoolCat
// Version : 0.1
// GitHub  : https://github.com/TheKingOfDuck/


// 遍历URL最后一层目录
// target = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length)


function sendReq(url,statusCode) {

    //发送请求
    var httpRequest = new XMLHttpRequest(); 
    httpRequest.open('HEAD', url, true); 
    httpRequest.send(); 
    console.log(url);

    // 处理数据，判断
    httpRequest.onreadystatechange = function() {
        if (httpRequest.status == statusCode) {
            alert('leak:' + url);
        }
    };

}

//扫描每层目录下存在的泄漏

scanFile = {'.svn/wc.db':200,'.git/config':200,'.DS_store':200,'www.zip':200,'wwwroot.zip':200,'.bash_history':200}

for (var file in scanFile) {

    statusCode = scanFile[file];

    url1 = window.location.href.replace(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length),file);
    sendReq(url1,statusCode);

}

//扫描每层目录下存在的泄漏


exts = {'.zip':200,'.rar':200,'.7z':200,'.tar.gz':200,'.tar':200,'.gz':200}

for (var ext in exts) {

    statusCode = exts[ext];

    //目录外的泄漏
    url2 = window.location.href.replace(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') , window.location.pathname.length),ext);
    sendReq(url2,statusCode);

    //目录内的泄漏
    url2 = window.location.href.replace(window.location.pathname.substring(window.location.pathname.lastIndexOf('/'), window.location.pathname.length),'');
    url2 = url2 + '/' + url2.substring(url2.lastIndexOf('/') + 1,url2.length) + ext;
    sendReq(url2,statusCode);

}

//扫描域名相关的泄漏

exts = {'.zip':200,'.rar':200,'.7z':200,'.tar.gz':200,'.tar':200,'.gz':200}

for (var ext in exts) {

    statusCode = exts[ext];

    //域名

    url3 = window.location.protocol+"//"+window.location.host + '/' +  window.location.host + 'ext'; //https://www.baidu.com/www.baidu.com.zip
    sendReq(ur3,statusCode);
    url4 = window.location.protocol+"//"+window.location.host + '/' +  window.location.host.replace('.','') + 'ext'; //https://www.baidu.com/wwwbaiducom.zip
    sendReq(url4,statusCode);

    //拆开域名
    all = window.location.host.split('.');
    for (var d in all) {
        file = all[d] + ext;
        url5 = window.location.protocol+"//"+window.location.host + '/' +  file; //https://www.baidu.com/baidu.zip
        sendReq(url5,statusCode);
    }
}
