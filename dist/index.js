(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FocusUtils = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 深拷贝
     * @param obj 需要深拷贝的对象
     * @returns
     */
    var deepClone = function (obj) {
        // 不是引用类型或者是null的话直接返回
        if (typeof obj !== "object" || typeof obj == null) {
            return obj;
        }
        // 初始化结果
        var result;
        if (obj instanceof Array) {
            result = [];
        }
        else {
            result = {};
        }
        for (var key in obj) {
            // 保证不是原型上的属性
            if (obj.hasOwnProperty(key)) {
                // 递归调用
                result[key] = deepClone(obj[key]);
            }
        }
        return result;
    };

    var formatMoney = {};

    /*!
     * format-money-js v1.6.3
     * (c) 2020-2023 Yurii Derevych
     * URL: https://github.com/dejurin/format-money-js
     * Sponsored:
     * https://cr.today/
     * https://currencyrate.today/
     * Released under the BSD-2-Clause License.
     */
    Object.defineProperty(formatMoney, "__esModule", {
      value: true
    });
    var FormatMoney_1 = formatMoney.FormatMoney = void 0;
    class FormatMoney {
      constructor(options) {
        this.options = options;
        this.version = '1.6.3';
        this.defaults = {
          grouping: true,
          separator: ',',
          decimalPoint: '.',
          decimals: 0,
          symbol: '',
          append: false,
          leadZeros: true
        };
        // Format
        this.from = (value, options = {}, parse = false) => {
          // Merge custom options
          const customOptions = Object.assign(Object.assign({}, this.options), options);
          // If value not number return undefined
          if (typeof value !== 'number') return undefined;
          // If value is NaN
          if (Number.isNaN(value)) return undefined;
          // Set a sign for negative number
          let negativeSign = value < 0 ? '-' : '';
          let result;
          let left;
          let body;
          let prefix = '';
          let suffix = '';
          result = Math.abs(value).toFixed(customOptions.decimals);
          if (parseFloat(result) === 0 || result === '0') {
            negativeSign = '';
          }
          if (!customOptions.leadZeros) {
            const resultFloat = parseFloat(result);
            result = resultFloat.toString();
          }
          const resultArr = result.split('.');
          [left] = resultArr;
          const right = resultArr.length > 1 ? customOptions.decimalPoint + resultArr[1] : '';
          if (customOptions.grouping) {
            body = '';
            for (let i = 0, len = left.length; i < len; i += 1) {
              if (i !== 0 && i % 3 === 0) {
                body = customOptions.separator + body;
              }
              body = left[len - i - 1] + body;
            }
            left = body;
          }
          if (customOptions.append) {
            suffix = customOptions.symbol;
          } else {
            prefix = customOptions.symbol;
          }
          if (parse) {
            return {
              source: value,
              negative: value < 0,
              fullAmount: left + right,
              amount: left,
              decimals: right,
              symbol: customOptions.symbol
            };
          }
          return negativeSign + prefix + left + right + suffix;
        };
        // Unformat
        this.un = (value, options) => {
          // Merge custom options
          const customOptions = Object.assign(Object.assign({}, this.options), options);
          if (typeof value === 'number') return value;
          if (typeof value !== 'string') return undefined;
          // Build regex to strip out everything except digits, decimal point and minus sign:
          const regex = new RegExp(`[^0-9-${customOptions.decimalPoint}]`, 'g');
          const unFormatted = parseFloat(value.replace(/\((?=\d+)(.*)\)/, '-$1') // replace bracketed values with negatives
          .replace(regex, '') // strip out any cruft
          .replace(`${customOptions.decimalPoint}`, '.'));
          return !Number.isNaN(unFormatted) ? unFormatted : 0;
        };
        // Merge options
        this.options = Object.assign(Object.assign({}, this.defaults), options);
      }
    }
    FormatMoney_1 = formatMoney.FormatMoney = FormatMoney;

    var fm = new FormatMoney_1({
        decimals: 2,
    });
    var fmtMoney = function (num) {
        return String(fm.from(num, { symbol: '$' }));
    };

    var add = function (a, b) {
        return a + b;
    };

    var FocusMapClass = /** @class */ (function () {
        function FocusMapClass() {
        }
        FocusMapClass.prototype.init = function (element, url) {
            url = url || 'http://124.133.19.202:18090/iserver/services/3D-local3DCache-huanghedadaowubiaoduan220704/rest/realspace';
            // @ts-ignore
            var viewer = new Cesium.Viewer(element, { infoBox: false });
            //使用本地的一张图片初始化地球，建议图片长宽比2:1
            // viewer.imageryLayers.addImageryProvider(
            //     // @ts-ignore
            //     new Cesium.SingleTileImageryProvider({
            //         url: img ?  img : "../images/worldimage.jpg",
            //     })
            // );
            var scene = viewer.scene;
            scene.open(url);
        };
        return FocusMapClass;
    }());

    var Focus = {
        deepClone: deepClone,
        fmtMoney: fmtMoney,
        add: add,
        FocusMapClass: FocusMapClass
    };

    exports.Focus = Focus;

}));
//# sourceMappingURL=index.js.map
