(function(g){g.touchyOptions={useDelegation:!1,longpress:{preventDefault:{start:!0,move:!0,end:!0},requiredTouches:1,msThresh:800,triggerStartPhase:!1,data:{startDate:null},proxyEvents:["TouchStart","TouchEnd"]},drag:{preventDefault:{start:!0,move:!0,end:!0},requiredTouches:1,msHoldThresh:100,data:{startPoint:null,startDate:null,movePoint:null,moveDate:null,held:!1},proxyEvents:["TouchStart","TouchMove","TouchEnd"]},pinch:{preventDefault:{start:!0,move:!0,end:!0},requiredTouches:2,pxThresh:0,data:{startPoint:null,
startDate:null,movePoint:null,moveDate:null},proxyEvents:["TouchStart","TouchMove","GestureChange","TouchEnd"]},rotate:{preventDefault:{start:!0,move:!0,end:!0},requiredTouches:1,data:{},proxyEvents:["TouchStart","TouchMove","GestureChange","TouchEnd"]},swipe:{preventDefault:{start:!0,move:!0,end:!0},requiredTouches:1,velocityThresh:1,triggerOn:"touchmove",data:{startPoint:null,startDate:null,movePoint:null,moveDate:null},proxyEvents:["TouchStart","TouchMove","TouchEnd"]}};var t={handleTouchStart:function(a){var b=
this.context,e=j(a,b);if(e){var d=a.originalEvent,f=d.targetTouches,c="touchy"+b.charAt(0).toUpperCase()+b.slice(1),c=e.data(c),m=c.settings;m.preventDefault.start&&d.preventDefault();if(f.length===m.requiredTouches)switch(b){case "drag":p(c,f,a.timeStamp);a=c.startPoint;e.trigger("touchy-drag",["start",e,{movePoint:a,lastMovePoint:a,startPoint:a,velocity:0}]);break;case "swipe":q(c,f,a.timeStamp);break;case "pinch":if(b=n(a))c.startPoint={x:b.centerX,y:b.centerY},c.startDistance=Math.sqrt(Math.pow(b.x2-
b.x1,2)+Math.pow(b.y2-b.y1,2));break;case "longpress":c.startPoint={x:f[0].pageX,y:f[0].pageY};c.startDate=a.timeStamp;m.triggerStartPhase&&e.trigger("touchy-longpress",["start",e]);c.timer=setTimeout(g.proxy(function(){e.trigger("touchy-longpress",["end",e])},this),m.msThresh);break;case "rotate":1===f.length?k(c,f,a.timeStamp):(b=n(a),c.startPoint={x:b.centerX,y:b.centerY},c.startDate=a.timeStamp),a=c.startPoint,e.trigger("touchy-rotate",["start",e,{startPoint:a,movePoint:a,lastMovePoint:a,velocity:0,
degrees:0}])}}},handleTouchMove:function(a){var b=this.context,e=j(a,b);if(e){var d=a.originalEvent,f=d.targetTouches,c="touchy"+b.charAt(0).toUpperCase()+b.slice(1),c=e.data(c),g=c.settings;g.preventDefault.move&&d.preventDefault();if(f.length===g.requiredTouches)switch(b){case "drag":p(c,f,a.timeStamp);var g=c.movePoint,b=c.lastMovePoint,h=g.x===b.x&&g.y===b.y?0:Math.sqrt(Math.pow(g.x-b.x,2)+Math.pow(g.y-b.y,2)),d=c.moveDate-c.lastMoveDate;c.held&&e.trigger("touchy-drag",["move",e,{movePoint:g,
lastMovePoint:b,startPoint:c.startPoint,velocity:0===d?0:h/d}]);break;case "swipe":q(c,f,a.timeStamp);!c.swipeExecuted&&(c.swiped&&"touchmove"===g.triggerOn)&&(c.swipeExecuted=!0,r(c,e));break;case "pinch":if(a=n(a))c.currentPoint={x:a.centerX,y:a.centerY},"object"!=typeof window.ongesturechange&&(h=Math.sqrt(Math.pow(a.x2-a.x1,2)+Math.pow(a.y2-a.y1,2)),b=c.previousScale=c.scale||1,d=c.startDistance,h=c.scale=h/d,h*d>g.pxThresh&&e.trigger("touchy-pinch",[e,{scale:h,previousScale:b,currentPoint:c.currentPoint,
startPoint:c.startPoint,startDistance:d}]));break;case "rotate":var l,b=c.lastMovePoint=c.movePoint||c.startPoint,d=c.lastMoveDate=c.moveDate||c.startDate,g=c.movePoint={x:f[0].pageX,y:f[0].pageY},h=c.moveDate=a.timeStamp;if(1===f.length){if(!(f=c.targetPageCoords)){a=a.target;var k=function(a,b,c){var e=a.offsetParent;b.x+=a.offsetLeft-(e?e.scrollLeft:0);b.y+=a.offsetTop-(e?e.scrollTop:0);if(e){if(1==e.nodeType){var d=c.getComputedStyle(e,"");"static"!=d.position?(b.x+=parseInt(d.borderLeftWidth),
b.y+=parseInt(d.borderTopWidth),"TABLE"==e.localName?(b.x+=parseInt(d.paddingLeft),b.y+=parseInt(d.paddingTop)):"BODY"==e.localName&&(d=c.getComputedStyle(a,""),b.x+=parseInt(d.marginLeft),b.y+=parseInt(d.marginTop))):"BODY"==e.localName&&(b.x+=parseInt(d.borderLeftWidth),b.y+=parseInt(d.borderTopWidth));for(a=a.parentNode;e!=a;)b.x-=a.scrollLeft,b.y-=a.scrollTop,a=a.parentNode;k(e,b,c)}}else"BODY"==a.localName&&(d=c.getComputedStyle(a,""),b.x+=parseInt(d.borderLeftWidth),b.y+=parseInt(d.borderTopWidth),
c=c.getComputedStyle(a.parentNode,""),b.x-=parseInt(c.paddingLeft),b.y-=parseInt(c.paddingTop)),a.scrollLeft&&(b.x+=a.scrollLeft),a.scrollTop&&(b.y+=a.scrollTop),(a=a.ownerDocument.defaultView)&&a.frameElement&&k(a.frameElement,b,a)},f={x:0,y:0};a&&k(a,f,a.ownerDocument.defaultView)}a=c.targetPageCoords=f;a=c.centerCoords=c.centerCoords||{x:a.x+0.5*e.width(),y:a.y+0.5*e.height()}}else if(a=n(a),a=c.centerCoords={x:a.centerX,y:a.centerY},"object"==typeof window.ongesturechange)break;f=Math.atan2(g.y-
a.y,g.x-a.x);l=c.lastDegrees=c.degrees;f=c.degrees=f*(180/Math.PI);l=l?f-l:0;d=h-d;d=c.velocity=0===d?0:l/d;e.trigger("touchy-rotate",["move",e,{startPoint:c.startPoint,startDate:c.startDate,movePoint:g,lastMovePoint:b,centerCoords:a,degrees:f,degreeDelta:l,velocity:d}])}}},handleGestureChange:function(a){var b=this.context,e=j(a,b);if(e){var e=g(a.target),d=a.originalEvent;a="touchy"+b.charAt(0).toUpperCase()+b.slice(1);a=e.data(a);a.preventDefault.move&&d.preventDefault();switch(b){case "pinch":var b=
a.previousScale=a.scale||1,d=a.scale=d.scale,f=a.startPoint,c=a.currentPoint||f,h=a.startDistance;d*h>a.settings.pxThresh&&e.trigger("touchy-pinch",[e,{scale:d,previousScale:b,currentPoint:c,startPoint:f,startDistance:h}]);break;case "rotate":f=a.lastDegrees=a.degrees,b=a.degrees=d.rotation,d=f?b-f:0,f=a.moveDate-a.lastMoveDate,f=a.velocity=0===f?0:d/f,e.trigger("touchy-rotate",["move",e,{startPoint:a.startPoint,startDate:a.startDate,movePoint:a.movePoint,lastMovePoint:a.lastMovePoint,centerCoords:a.centerCoords,
degrees:b,degreeDelta:d,velocity:f}])}}},handleTouchEnd:function(a){var b=this.context,e=j(a,b);if(e){var d=a.originalEvent;a="touchy"+b.charAt(0).toUpperCase()+b.slice(1);a=e.data(a);var f=a.settings;f.preventDefault.end&&d.preventDefault();switch(b){case "drag":if(a.held){var b=a.movePoint||a.startPoint,d=a.lastMovePoint||a.startPoint,f=b.x===d.x&&b.y===d.y?0:Math.sqrt(Math.pow(b.x-d.x,2)+Math.pow(b.y-d.y,2)),c=a.moveDate-a.lastMoveDate;e.trigger("touchy-drag",["end",e,{movePoint:b,lastMovePoint:d,
startPoint:a.startPoint,velocity:0===c?0:f/c}])}g.extend(a,{startPoint:null,startDate:null,movePoint:null,moveDate:null,lastMovePoint:null,lastMoveDate:null,held:!1});break;case "swipe":a.swiped&&"touchend"===f.triggerOn&&r(a,e);g.extend(a,{startPoint:null,startDate:null,movePoint:null,moveDate:null,lastMovePoint:null,lastMoveDate:null,swiped:!1,swipeExecuted:!1});break;case "pinch":g.extend(a,{startPoint:null,startDistance:0,currentPoint:null,pinched:!1,scale:1,previousScale:null});break;case "longpress":clearTimeout(a.timer);
g.extend(a,{startDate:null});break;case "rotate":e.trigger("touchy-rotate",["end",e,{startPoint:a.startPoint,startDate:a.startDate,movePoint:a.movePoint,lastMovePoint:a.lastMovePoint,degrees:a.degrees,degreeDelta:a.lastDegrees?a.degrees-a.lastDegrees:0,velocity:a.velocity}]),g.extend(a,{startPoint:null,startDate:null,movePoint:null,moveDate:null,lastMovePoint:null,lastMoveDate:null,targetPageCoords:null,centerCoords:null,degrees:null,lastDegrees:null,velocity:null})}}}},p=function(a,b,e){k(a,b,e);
var d=a.moveDate||a.startDate;a.held||e-d>a.settings.msHoldThresh?g.extend(a,{held:!0,lastMoveDate:d,lastMovePoint:a.movePoint&&a.movePoint.x?a.movePoint:a.startPoint,moveDate:e,movePoint:{x:b[0].pageX,y:b[0].pageY}}):g.extend(a,{held:!1,lastMoveDate:0,lastMovePoint:a.startPoint,moveDate:0,movePoint:a.startPoint})},q=function(a,b,e){k(a,b,e);var d=a.settings,f=a.startPoint,c=a.moveDate||a.startDate;b={x:b[0].pageX,y:b[0].pageY};var h=b.x-f.x,f=b.y-f.y,j=e-c;g.extend(a,{lastMoveDate:c,lastMovePoint:a.movePoint&&
a.movePoint.x?a.movePoint:a.startPoint,moveDate:e,movePoint:b,hDistance:h,vDistance:f});if(!a.swiped&&(Math.abs(h)/j>d.velocityThresh||Math.abs(f)/j>d.velocityThresh))a.swiped=!0},r=function(a,b){var e=a.movePoint,d=a.lastMovePoint,f=e.x===d.x&&e.y===d.y?0:Math.sqrt(Math.pow(e.x-d.x,2)+Math.pow(e.y-d.y,2)),c=a.moveDate-a.lastMoveDate,f=0===c?0:f/c,c=a.hDistance,g=a.vDistance;f>a.settings.velocityThresh&&(c=Math.abs(c)>Math.abs(g)?0<c?"right":"left":0<g?"down":"up",b.trigger("touchy-swipe",[b,{direction:c,
movePoint:e,lastMovePoint:d,startPoint:a.startPoint,velocity:f}]))},k=function(a,b,e){a.startPoint||(a.startPoint={x:b[0].pageX,y:b[0].pageY});a.startDate||(a.startDate=e)},n=function(a){var b=!1;a=a.originalEvent.touches;2===a.length&&(b={x1:a[0].pageX,y1:a[0].pageY,x2:a[1].pageX,y2:a[1].pageY},b.centerX=(b.x1+b.x2)/2,b.centerY=(b.y1+b.y2)/2);return b},j=function(a,b){var e,d=!1,f=0,c=h[b].length;if(g.touchyOptions.useDelegation)for(;f<c;f+=1){if(e=g(h[b][f]).has(a.target),0<e.length){d=e;break}}else h[b]&&
-1!=h[b].index(a.target)&&(d=g(a.target));return d},h={},s={};g.each(g.touchyOptions,function(a){if("useDelegation"!==a){var b=a.charAt(0).toUpperCase()+a.slice(1);h[a]=g([]);s[a]=new function(){this.context=a};g.event.special["touchy-"+a]={setup:function(){h[a]=h[a].add(this);g(this).data("touchy"+b,g.extend({},g.touchyOptions[a].data));g(this).data("touchy"+b).settings=g.extend({},g.touchyOptions[a]);delete g(this).data("touchy"+b).settings.data;1===h[a].length&&g.each(g.touchyOptions[a].proxyEvents,
function(b,d){g(document).bind(d.toLowerCase()+".touchy."+a,g.proxy(t["handle"+d],s[a]))})},teardown:function(){h[a]=h[a].not(this);g(this).removeData("touchy"+b);0===h[a].length&&g.each(g.touchyOptions[a].proxyEvents,function(b,d){g(document).unbind(d.toLowerCase()+".touchy."+a)})},add:function(a){g.extend(g(this).data("touchy"+b).settings,a.data);var d=a.handler;a.handler=function(a){return d.apply(this,arguments)}}}}})})(jQuery);