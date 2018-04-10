<h1 align="center">中文转拼音或者首字母</h1>

## 说明

该工具有以下两点功能：

   * 中文转拼音
   * 中文转首字母

可以传入不同的参数控制输出结果。

    


## 安装

使用npm安装:

```
npm install Chinese2Pinyin
```

## 使用

    const convert = require('Chinese2Pinyin');
    
    // 输出拼音ZhongWenZhuanPinYinHuoShouZiMu
    convert({ 
        cn: '中文转拼音或首字母',
        result: 'P'
    })

    // 输出首字母ZWZPYHSZM
    convert({ 
        cn: '中文转拼音或首字母',
        result: 'F'
    })

    // 输出结果为包含两个key(pinyin和first)的对象
    convert({ 
        cn: '中文转拼音或首字母',
        result: 'A'
    })

    
    /* 使用threshold */

    //  threshold=5输出ZWZPYHSZM，threshold=9输出ZhongWenZhuanPinYinHuoShouZiMu
    convert({ 
        cn: '中文转拼音或首字母',
        result: 'P',
        threshold: 5
    })

    /* 使用concatKey */

    // 输出Zhong_Wen_Zhuan_Pin_Yin_Huo_Shou_Zi_Mu
    convert({
        cn: '中文转拼音或首字母',
        result: 'P',
        concatKey: '_'
    })

    /* 使用remainSpecial */
    
    // remainSpecial为true输出ZW-Z-PYH_SZM，否则输出ZWZPYHSZM
    convert({
        cn: '中文-转-拼音或_首字母',
        result: 'F',
        remainSpecial: true
    })

    /* 使用double */

    //double为true输出ZHWZHPYHSHZM，否则输出ZWZPYHSZM
    convert({
        cn: '中文-转-拼音或_首字母',
        result: 'F',
        double: true
    })

    
## 参数

| 参数            | 描述                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `cn`            | 默认值：空字符串，输入的中文字符串，可包非中文字符，根据`remainSpecial`值选择是否保留输出        |
| `result`        | 默认值：P， 可选值：P(输出拼音)、F(输出首字母)、A(输出对一个对象，包含两个key，pinyin和first)    |
| `threshold`     | 默认值：`undefined`，仅`result`为P时生效，cn长度大于`threshold`返回首字母，否则返回拼音          |
| `concatKey`     | 默认值：`undefined`，输出结果含有拼音的话，拼音之间用concat连接                                  |
| `remainSpecial` | 默认值：`false`，是否保留非中文字符，例如值为`true`时输入'中文_转_拼音'返回ZhongWen_Zhuan_PinYin |
| `double`        | 默认值：`false`， 是否返回翘舌音（zh、ch、sh）全部生母，还是仅返回一个字母例如zh返回z            |
    

       
