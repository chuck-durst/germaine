!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=r(1);e.exports=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=r.isStatic,u=r.delay;if("string"!=typeof e)throw new Error("germaine error: you must provide the path to the file used as database.");if("string"!=typeof e)throw new Error("germaine error: the path must be a string.");u="object"===n(u)?u:{min:u||0,max:u||0};try{t=JSON.parse(o.readFileSync(e,"utf8"))}catch(e){throw new Error(e)}return function(r,n){var a=r.url;if(!1!==i)try{t=JSON.parse(o.readFileSync(e,"utf8"))}catch(t){console.error(t),n.status(500).json({error:{message:"germaine error : cannot read the file "+e,status:500,name:"general error"}})}var f=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").split("/"),r=Object.assign({},t);return e.map(function(e){r=r&&r[e]?r[e]:void 0}),r}(a=(a=a.replace(/\/$/,"").replace(/^\/+/g,"")).substring(a.indexOf("/")+1));f?setTimeout(function(){n.json(f)},function(e,t){return Math.random()*(t-e)+e}(u.min,u.max)):n.status(404).json({error:{message:"Sorry, we didn't find this. What's it called again? 404?",status:404,name:"not found"}})}}},function(e,t){}]);