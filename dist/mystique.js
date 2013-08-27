if (typeof require == 'undefined'){
    require = function(arg1, arg2){
        var mid,
            deps = [],
            def,
            i;

        if (arg1.cache){
            for (i in arg1.cache){
                require.cache[i] = arg1.cache[i];
            }
            return;
        }

        for (i = 0; i < arg1.length; i++){
            mid = arg1[i];
            if (mid == 'mystique/messages!'){
                deps.push(require.cache['url:mystique-common/translations/messages.json']);
            } else {
                if (!require.defs[mid]){
                    define.loadingMid = mid;
                    require.cache[mid]();
                }
                def = require.defs[mid];

                deps.push(require(def.deps, def.factory));
            }
        }

        return arg2.apply({}, deps);
    }
    require.micro = true;
    require.cache = {};
    require.defs = {};

    define = function(arg1, arg2, arg3){
        var mid,
            deps,
            factory,
            factoryFactory = function(result){
                return function(){return result};
            };
        if (typeof arg1 == 'string'){
            mid = arg1;
            deps = arg2;
            factory = arg3;
        } else {
            mid = define.loadingMid;
            deps = arg1;
            factory = arg2;
        }
        if (!factory){
            factory = factoryFactory(deps);
            deps = [];
        }
        require.defs[mid] = {
            deps: deps,
            factory: factory
        }
    }
}//>>built
require({cache:{"mystique/Alpha":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({regex:/^[a-zA-Z]+$/,_isValid:function(b){var a=new d({value:!0});this.regex.test(b)||(a.set("value",!1),a.addMessage("alpha"));return a}})})},"mystique/Base":function(){define([],function(){var c=function(){},d={useCache:!0,isValidator:!0,maxCacheSize:50,isValid:function(a){var b=JSON.stringify(a);if(this.useCache){this._validatedValuesCache||(this._validatedValuesCache={});var c=
this._validatedValuesCache[b];if(c)return c}a=this._isValid(a);this.useCache&&this._addToCache(b,a);return a},_isValid:function(a){},_addToCache:function(a,b){var c=this,d=function(b){b.get("value").then?b.value.then(function(a){d(a)}):(c._validatedValuesCache.length>c.maxCacheSize&&c._validatedValuesCache.shift(),c._validatedValuesCache[a]=b)};d(b)}},b;for(b in d)c.prototype[b]=d[b];c.extend=function(a){var c=function(a){for(b in a)this[b]=a[b]};c.prototype=new this;c.prototype.constructor=c;c.constructor=
this.prototype.constructor;for(b in a)c.prototype[b]=a[b];c.extend=this.extend;return c};return c})},"mystique/Result":function(){define(["mystique/messages!"],function(c){var d=function(a){for(var b in a)this[b]=a[b]},b={set:function(a,b){if(this[a+"Setter"])this[a+"Setter"](b);this[a]=b},get:function(a){return this[a+"Getter"]?this[a+"Getter"]():this[a]},messagesGetter:function(){if(!this.messages)return[];var a=[],b,d,g;for(d in this.messages)if("string"==typeof this.messages[d])a[d]=c[this.messages[d]]?
c[this.messages[d]]:this.messages[d];else{b=this.messages[d];c[b[0]]&&(b[0]=c[b[0]]);for(g=1;g<b.length;g++)b[0]=b[0].replace("${"+g+"}",b[g]);a[d]=b[0]}return a},addMessage:function(a){this.messages||(this.messages=[]);this.messages.push(a)}},a;for(a in b)d.prototype[a]=b[a];return d})},"mystique/Boolean":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_isValid:function(b){var a=new d({value:!0});!0!==b&&!1!==b&&(a.set("value",!1),a.addMessage("boolean"));return a}})})},
"mystique/Chain":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_isValid:function(b){if(this.validators)return this._concatResultList(this._loop(b,0,[]))},_loop:function(b,a,c){if(this.validators.length<=a)return c;var e=this.validators[a],f=this._currentValue(c);if((!e.skipOnPass||!f)&&(!e.skipOnFail||f))if(f=this._getResult(e,b),f.value.then){var g={then:function(a,b,c){this.callBack=a;this.errBack=b;this.progressBack=c},resolve:function(a){this.callBack(a)}},
k=this;c[a]=new d({value:g,messages:f.messages});f.value.then(function(d){c[a]=d;!0===d.value?e.haltOnPass&&(h=!0):e.haltOnFail&&(h=!0);h?g.resolve(k._concatResultList(c)):g.resolve(k._concatResultList(k._loop(b,a+1,c)))})}else{c[a]=f;var h=!1;!0===f.value?e.haltOnPass&&(h=!0):e.haltOnFail&&(h=!0);if(!h)return this._loop(b,a+1,c)}return c},_getResult:function(b,a){return b.isValid(a)},_concatResultList:function(b){var a=new d({value:this._currentValue(b)}),c;for(c in b)b[c].messages&&(a.messages||
(a.messages=[]),a.messages=a.messages.concat(b[c].messages));return a},_currentValue:function(b){var a=!0,c;for(c in b)if(!1===b[c].value)a=!1;else if(b[c].value.then){a=b[c].value;break}return a}})})},"mystique/CreditCard":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_cardInfo:{mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4(?:[0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(?:0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(?:0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",
jcb:"(?:3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(?:014|149)[0-9]{11}"},_isValid:function(b){var a=new d({value:!0}),c;b=String(b).replace(/[- ]/g,"");for(c in this._cardInfo)if(b.match("^"+this._cardInfo[c]+"$"))return a;a.set("value",!1);a.addMessage("creditCard");return a}})})},"mystique/CreditCardExpiry":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_isValid:function(b){var a=new d({value:!0});if(!/^\d{1,2}$/.test(b.month)||!/^\d\d\d\d$/.test(b.year))a.set("value",
!1),a.addMessage("creditCardExpiry");var c=parseInt(b.month);b=parseInt(b.year);var e=(new Date).getUTCMonth()+1,f=(new Date).getUTCFullYear();if(1>c||12<c||b<f||b==f&&c<e)a.set("value",!1),a.addMessage("creditCardExpiry");return a}})})},"mystique/Cvv":function(){define(["mystique/Length","mystique/Int","mystique/Chain"],function(c,d,b){return b.extend({validators:[new c({min:3,max:4}),new d]})})},"mystique/Length":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({min:0,
max:255,_isValid:function(b){var a=new d({value:!0});b=""+b;if(!b.length||b.length<this.min||b.length>this.max)a.set("value",!1),a.addMessage(["length",this.min,this.max]);return a}})})},"mystique/Int":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_isValid:function(b){var a=new d({value:!0});if(parseFloat(b)!=parseInt(b)||isNaN(b))a.set("value",!1),a.addMessage("int");return a}})})},"mystique/Date":function(){define(["mystique/Base","mystique/Result"],function(c,
d){return c.extend({_isValid:function(b){var a=new d({value:!0});b instanceof Date||(a.set("value",!1),a.addMessage("date"));return a}})})},"mystique/Email":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({regex:/^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@(((?:(?:[\da-zA-Z](?:[-\da-zA-Z]{0,61}[\da-zA-Z])?)\.)+(?:[a-zA-Z](?:[-\da-zA-Z]{0,6}[\da-zA-Z])?)\.?)|(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])|(0[xX]0*[\da-fA-F]?[\da-fA-F]\.){3}0[xX]0*[\da-fA-F]?[\da-fA-F]|(0+[0-3][0-7][0-7]\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\d{0,8}|[1-3]\d{9}|4[01]\d{8}|42[0-8]\d{7}|429[0-3]\d{6}|4294[0-8]\d{5}|42949[0-5]\d{4}|429496[0-6]\d{3}|4294967[01]\d{2}|42949672[0-8]\d|429496729[0-5])|0[xX]0*[\da-fA-F]{1,8}|([\da-fA-F]{1,4}\:){7}[\da-fA-F]{1,4}|([\da-fA-F]{1,4}\:){6}((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])))$/i,
_isValid:function(b){var a=new d({value:!0});this.regex.test(b)||(a.set("value",!1),a.addMessage("email"));return a}})})},"mystique/Equal":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({compare:0,_isValid:function(b){var a=new d({value:!0});if((b!==this.compare||b instanceof Date)&&!(b instanceof Date&&this.compare instanceof Date&&b.toUTCString()==this.compare.toUTCString()))a.set("value",!1),a.addMessage(["equal",this.compare,b]);return a}})})},"mystique/Float":function(){define(["mystique/Base",
"mystique/Result"],function(c,d){return c.extend({_isValid:function(b){var a=new d({value:!0});if(!(parseFloat(b)||0===parseInt(b))||isNaN(b))a.set("value",!1),a.addMessage("float");return a}})})},"mystique/GreaterThan":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({compare:0,_isValid:function(b){var a=new d({value:!0});b>this.compare||(a.set("value",!1),a.addMessage(["greaterThan",this.compare,b]));return a}})})},"mystique/GreaterThanEqual":function(){define(["mystique/Base",
"mystique/Result"],function(c,d){return c.extend({compare:0,_isValid:function(b){var a=new d({value:!0});b>=this.compare||(a.set("value",!1),a.addMessage(["greaterThanEqual",this.compare,b]));return a}})})},"mystique/HexColor":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({regex:/^#[0-9A-F]{6,6}$/,_isValid:function(b){var a=new d({value:!0});this.regex.test(b)||(a.set("value",!1),a.addMessage("hexColor"));return a}})})},"mystique/LessThan":function(){define(["mystique/Base",
"mystique/Result"],function(c,d){return c.extend({compare:0,_isValid:function(b){var a=new d({value:!0});b<this.compare||(a.set("value",!1),a.addMessage(["lessThan",this.compare,b]));return a}})})},"mystique/LessThanEqual":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({compare:0,_isValid:function(b){var a=new d({value:!0});b<=this.compare||(a.set("value",!1),a.addMessage(["lessThanEqual",this.compare,b]));return a}})})},"mystique/NotEqual":function(){define(["mystique/Base",
"mystique/Result"],function(c,d){return c.extend({compare:0,_isValid:function(b){var a=new d({value:!0});if((b===this.compare||b instanceof Date)&&!(b instanceof Date&&this.compare instanceof Date&&b.toUTCString()!=this.compare.toUTCString()))a.set("value",!1),a.addMessage(["equal",this.compare,b]);return a}})})},"mystique/NotRequired":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_isValid:function(b){var a=new d({value:!0});this.haltOnPass=!1;if(void 0===b||
null===b||""==b)this.haltOnPass=!0;return a}})})},"mystique/Password":function(){define(["mystique/Base","mystique/Length","mystique/Result"],function(c,d,b){return c.extend({length:new d({min:6,max:40}),containAlphaRegEx:/[a-zA-Z]/,containNumRegEx:/[0-9]/,_isValid:function(a){var c=new b({value:!0});this.length.isValid(a).value||(c.set("value",!1),c.addMessage("passwordLength"));this.containAlphaRegEx.test(a)||(c.set("value",!1),c.addMessage("passwordAlpha"));this.containNumRegEx.test(a)||(c.set("value",
!1),c.addMessage("passwordNum"));return c}})})},"mystique/Regex":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({regex:/^$/,_isValid:function(b){var a=new d({value:!0});this.regex.test||(this.regex=RegExp(this.regex));this.regex.test(b)||(a.set("value",!1),a.addMessage(["regex",this.regex.source]));return a}})})},"mystique/Required":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({haltOnFail:!0,regex:/^\s+$/g,_isValid:function(b){var a=
new d({value:!0});if(void 0===b||null===b||""===b||this.regex.test(b))a.set("value",!1),a.addMessage("required");if("object"==typeof b){var c,e=0;for(c in b)e++;0==e&&(a.set("value",!1),a.addMessage("required"))}"array"==typeof b&&0==b.length&&(a.set("value",!1),a.addMessage("required"));return a}})})},"mystique/Slug":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({regex:/^[a-z0-9-]+$/,min:3,max:255,_isValid:function(b){var a=new d({value:!0});if(!this.regex.test(b)||
!b.length||b.length<this.min||b.length>this.max)a.set("value",!1),a.addMessage(["slug",this.min,this.max]);return a}})})},"mystique/String":function(){define(["mystique/Base","mystique/Result"],function(c,d){return c.extend({_isValid:function(b){var a=new d({value:!0});"string"!=typeof b&&(a.set("value",!1),a.addMessage("string"));return a}})})},"url:mystique-common/translations/messages.json":{alpha:"Must contain only the characters a-z, or A-Z","boolean":"Must be true or false",creditCard:"Must be a valid credit card number",
creditCardExpiry:"Must be a valid credit card expiry date",cvv:"Must be a valid ccv card number",date:"Must be a valid date",email:"Must be a valid email address",equal:"Must be equal to ${1}","float":"Must be a number",greaterThan:"Must be greater than ${1}",greaterThanEqual:"Must be greater than or equal to ${1}",hexColor:"Must be a valid RGB color hex","int":"Must be a valid while number",length:"Must be between ${1} and ${2} characters long",lessThan:"Must be less than ${1}",lessThanOrEqual:"Must be less than or equal to ${1}",
notEqual:"Must not be equal to ${1}",passwordLength:"Must be between 6 and 40 characters long.",passwordAlpha:"Must contain at least one alpha character (a-z, A-Z)",passwordNum:"Must contain at least one numeric character (0-9)",regex:"Must match the {$1} pattern",required:"This value is required",slug:"Must contain only the characters a-z, 0-9, or -, and between ${1} and ${2} characters long",string:"This value must be text"}}});
define("mystique/mystique","mystique/Alpha mystique/Base mystique/Boolean mystique/Chain mystique/CreditCard mystique/CreditCardExpiry mystique/Cvv mystique/Date mystique/Email mystique/Equal mystique/Float mystique/GreaterThan mystique/GreaterThanEqual mystique/HexColor mystique/Int mystique/Length mystique/LessThan mystique/LessThanEqual mystique/NotEqual mystique/NotRequired mystique/Password mystique/Regex mystique/Required mystique/Result mystique/Slug mystique/String".split(" "),function(c,
d,b,a,l,e,f,g,k,h,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C){mystique={Alpha:c,Base:d,Boolean:b,Chain:a,CreditCard:l,CreditCardExpiry:e,Cvv:f,Date:g,Email:k,Equal:h,Float:m,GreaterThan:n,GreaterThanEqual:p,HexColor:q,Int:r,Length:s,LessThan:t,LessThanEqual:u,NotEqual:v,NotRequired:w,Password:x,Regex:y,Required:z,Result:A,Slug:B,String:C}});require(["mystique/mystique"],function(){});
//@ sourceMappingURL=mystique.js.map