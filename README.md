# LunaNovaCSS
LunaNovaCSS 
動的に"Object"を"CSS"に変換するフレームワーク
他のCSSフレームワークとの併用が可能です。
必要のない、他でも実装できる機能は出来るだけ省いているので、高速です。

## Reference

基本はCSObjectと呼ばれるobjectを操作することでCSSを使用します。

####　基本の型
```js
UserProperty = {
    "nav-box": {
        self: [
            ["border", "1px solid black"],
            ["background-color", "blue"]
        ],
        pse: [
            [":after",
                [
                    ["content", "'test'"],
                    ["color", "red"],
                ]
            ],
        ]
    }
}
```

の形式で書きます。

"nav-box"の部分が「Class名」になります。
```html
<p class="nav-box">test</p>
```

とする事で使用できます。

**基本の型**は
```css
.nav_box {
    border: 1px solid black;
    background-color: blue;
}

.nav_box:after {
    content: "test";
    color: red;
}
```

と変換されます。

UserPropertyのObjectを動かす事で実装可能です。

又、各propertyの値は、文字列として管理されています。

### Methods

LunaNovaCSSにはCSObjectを操作するための便利な関数が複数用意されています。

今後追加

###  予定

Methodsの開発
Jsonからの読み込み
minfy
その他 UserPropertyの操作