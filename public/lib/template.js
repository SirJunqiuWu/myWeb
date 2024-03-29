/*!
 * template.js v0.7.1 (https://github.com/yanhaijing/template.js)
 * API https://github.com/yanhaijing/template.js/blob/master/doc/api.md
 * Copyright 2015 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/template.js/blob/master/MIT-LICENSE.txt)
 */

/* eslint-disable */
;(function(root, factory) {
    const template = factory(root);
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('template', () => {
            return template;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = template;
    } else {
        // Browser globals
        const _template = root.template;

        template.noConflict = function() {
            if (root.template === template) {
                root.template = _template;
            }

            return template;
        };
        root.template = template;
    }
}(this, (root) => {
    
    let o = {
        sTag: '<%',// 开始标签
        eTag: '%>',// 结束标签
        compress: false,// 是否压缩html
        escape: true, // 默认输出是否进行HTML转义
        error (e) {},// 错误回调
    };
    const functionMap = {}; // 内部函数对象
    // 修饰器前缀
    const modifierMap = {
        '': function (param) {return nothing(param);},
        'h': function (param) {return encodeHTML(param);},
        'u': function (param) {return encodeURI(param);},
    };

    const toString = {}.toString;
    const slice = [].slice;
    function type(x) {
        if(x === null){
            return 'null';
        }

        const t= typeof x;

        if(t !== 'object'){
            return t;
        }

        const c = toString.call(x).slice(8, -1).toLowerCase();
        if(c !== 'object'){
            return c;
        }

        if(x.constructor==Object){
            return c;
        }

        return 'unknown';
    }

    function isObject(obj) {
        return type(obj) === 'object';
    }
    function isFunction(fn) {
        return type(fn) === 'function';
    }
    function isString(str) {
        return type(str) === 'string';
    }
    function extend() {
        const target = arguments[0] || {};
        const arrs = slice.call(arguments, 1);
        const len = arrs.length;
     
        for (let i = 0; i < len; i++) {
            const arr = arrs[i];
            for (const name in arr) {
                target[name] = arr[name];
            }
     
        }
        return target;
    }
    function clone() {
        const args = slice.call(arguments);
        return extend(...[{}].concat(args));
    }
    function nothing(param) {
        return param;
    }
    function encodeHTML(source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    }
    function compress(html) {
        return html.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
    }
    function consoleAdapter(cmd, msg) {
        typeof console !== 'undefined' && console[cmd] && console[cmd](msg);
    }
    function handelError(e) {
        let message = 'template.js error\n\n';

        for (const key in e) {
            message += `<${  key  }>\n${  e[key]  }\n\n`;
        }
        message += `<message>\n${  e.message  }\n\n`;
        consoleAdapter('error', message);

        o.error(e);
        function error() {
            return 'template.js error';
        }
        error.toString = function () {
            return '__code__ = "template.js error"';
        };
        return error;
    }
    function parse(tpl, opt) {
        let code = '';
        const sTag = opt.sTag;
        const eTag = opt.eTag;
        const escape = opt.escape;
        function parsehtml(line) {
            // 单双引号转义，换行符替换为空格
            line = line.replace(/('|")/g, '\\$1');
            const lineList = line.split('\n');
            let code = '';
            for (let i = 0; i < lineList.length; i++) {
                code += `;__code__ += ("${  lineList[i]  }${i === lineList.length - 1 ? '")\n' : '\\n")\n'}`;
            }
            return code;
        }
        function parsejs(line) {              
            // var reg = /^(:?)(.*?)=(.*)$/;
            const reg = /^(?:=|(:.*?)=)(.*)$/;
            let html;
            let arr;
            let modifier;

            // = := :*=
            // :h=123 [':h=123', 'h', '123']
            if (arr = reg.exec(line)) {
                html = arr[2]; // 输出
                if (arr[1]) {
                    // :开头
                    modifier = arr[1].slice(1);
                } else {
                    // = 开头
                    modifier = escape ? 'h' : '';
                }

                return `;__code__ += __modifierMap__["${  modifier  }"](typeof (${  html  }) !== "undefined" ? (${  html  }) : "")\n`;
            }
            
            // 原生js
            return `;${  line  }\n`;
        }

        const tokens = tpl.split(sTag);

        for (let i = 0, len = tokens.length; i < len; i++) {
            const token = tokens[i].split(eTag);

            if (token.length === 1) {
                code += parsehtml(token[0]);
            } else {
                code += parsejs(token[0], true);
                if (token[1]) {
                    code += parsehtml(token[1]);
                }
            }
        }
        return code;
    }
    function compiler(tpl, opt) {
        const mainCode = parse(tpl, opt);

        const headerCode = '\n' + 
        '    var html = (function (__data__, __modifierMap__) {\n' + 
        '        var __str__ = "", __code__ = "";\n' + 
        '        for(var key in __data__) {\n' + 
        '            __str__+=("var " + key + "=__data__[\'" + key + "\'];");\n' + 
        '        }\n' + 
        '        eval(__str__);\n\n';

        const footerCode = '\n' + 
        '        ;return __code__;\n' + 
        '    }(__data__, __modifierMap__));\n' + 
        '    return html;\n';

        let code = headerCode + mainCode + footerCode;
        code = code.replace(/[\r]/g, ' '); // ie 7 8 会报错，不知道为什么
        try {
            const Render = new Function('__data__', '__modifierMap__', code); 
            Render.toString = function () {
                return mainCode;
            };
            return Render;
        } catch(e) {
            e.temp = `function anonymous(__data__, __modifierMap__) {${  code  }}`;
            throw e;
        }  
    }
    function compile(tpl, opt) {
        opt = clone(o, opt);

        try {
            var Render = compiler(tpl, opt);
        } catch(e) {
            e.name = 'CompileError';
            e.tpl = tpl;
            e.render = e.temp;
            delete e.temp;
            return handelError(e);
        }

        function render(data) {
            data = clone(functionMap, data);
            try {
                let html = Render(data, modifierMap);
                html = opt.compress ? compress(html) : html;
                return html;
            } catch(e) {
                e.name = 'RenderError';
                e.tpl = tpl;
                e.render = Render.toString();
                return handelError(e)();
            }            
        }

        render.toString = function () {
            return Render.toString();
        };
        return render;
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        const fn = compile(tpl);
        if (!isObject(data)) {
            return fn;
        }

        return fn(data);
    }

    template.config = function (option) {
        if (isObject(option)) {
            o = extend(o, option);
        }
        return clone(o);
    };

    template.registerFunction = function(name, fn) {
        if (!isString(name)) {
            return clone(functionMap);
        }
        if (!isFunction(fn)) {
            return functionMap[name];
        }

        return functionMap[name] = fn;
    };
    template.unregisterFunction = function (name) {
        if (!isString(name)) {
            return false;
        }
        delete functionMap[name];
        return true;
    };

    template.registerModifier = function(name, fn) {
        if (!isString(name)) {
            return clone(modifierMap);
        }
        if (!isFunction(fn)) {
            return modifierMap[name];
        }

        return modifierMap[name] = fn;
    };
    template.unregisterModifier = function (name) {
        if (!isString(name)) {
            return false;
        }
        delete modifierMap[name];
        return true;
    };

    template.__encodeHTML = encodeHTML;
    template.__compress = compress;
    template.__handelError = handelError;
    template.__compile = compile;
    template.version = '0.7.1';
    return template;
}));
