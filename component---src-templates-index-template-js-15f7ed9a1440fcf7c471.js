(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{179:function(e,a,t){"use strict";t.r(a),t.d(a,"query",function(){return m});var n=t(0),r=t.n(n),i=t(182),s=t(183),l=t(186),c=t(184),o=t(187),m="653655127";a.default=function(e){var a=e.data,t=e.pageContext,n=a.site.siteMetadata,m=n.title,d=n.subtitle,f=t.currentPage,u=t.hasNextPage,p=t.hasPrevPage,g=t.prevPagePath,_=t.nextPagePath,v=a.allMarkdownRemark.edges,P=f>0?"Posts - Page "+f+" - "+m:m;return r.a.createElement(i.a,{title:P,description:d},r.a.createElement(s.a,{isIndex:!0}),r.a.createElement(c.a,null,r.a.createElement(l.a,{edges:v}),r.a.createElement(o.a,{prevPagePath:g,nextPagePath:_,hasPrevPage:p,hasNextPage:u})))}},185:function(e,a,t){var n;!function(){"use strict";var t={}.hasOwnProperty;function r(){for(var e=[],a=0;a<arguments.length;a++){var n=arguments[a];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(this&&this[n]||n);else if(Array.isArray(n))e.push(r.apply(this,n));else if("object"===i)for(var s in n)t.call(n,s)&&n[s]&&e.push(this&&this[s]||s)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(a,[]))||(e.exports=n)}()},186:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(188),s=t.n(i),l=t(56),c=t(156),o=t.n(c),m=function(e){var a=e.edges;return r.a.createElement("div",{className:o.a.feed},a.map(function(e){return r.a.createElement("div",{className:o.a.feed__item,key:e.node.fields.slug},r.a.createElement("div",{className:o.a["feed__item-meta"]},r.a.createElement("time",{className:o.a["feed__item-meta-time"],dateTime:s()(e.node.frontmatter.date).format("MMMM D, YYYY")},s()(e.node.frontmatter.date).format("MMMM YYYY")),r.a.createElement("span",{className:o.a["feed__item-meta-divider"]}),r.a.createElement("span",{className:o.a["feed__item-meta-category"]},r.a.createElement(l.Link,{to:e.node.fields.categorySlug,className:o.a["feed__item-meta-category-link"]},e.node.frontmatter.category))),r.a.createElement("h2",{className:o.a["feed__item-title"]},r.a.createElement(l.Link,{className:o.a["feed__item-title-link"],to:e.node.fields.slug},e.node.frontmatter.title)),r.a.createElement("p",{className:o.a["feed__item-description"]},e.node.frontmatter.description),r.a.createElement(l.Link,{className:o.a["feed__item-readmore"],to:e.node.fields.slug},"Read"))}))};t.d(a,"a",function(){return m})},187:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(185),s=t.n(i),l=t(56),c=t(189),o=t(157),m=t.n(o),d=s.a.bind(m.a),f=function(e){var a=e.prevPagePath,t=e.nextPagePath,n=e.hasNextPage,i=e.hasPrevPage,s=d({"pagination__prev-link":!0,"pagination__prev-link--disable":!i}),o=d({"pagination__next-link":!0,"pagination__next-link--disable":!n});return r.a.createElement("div",{className:m.a.pagination},r.a.createElement("div",{className:m.a.pagination__prev},r.a.createElement(l.Link,{rel:"prev",to:a,className:s},c.b.PREV_PAGE)),r.a.createElement("div",{className:m.a.pagination__next},r.a.createElement(l.Link,{rel:"next",to:t,className:o},c.b.NEXT_PAGE)))};t.d(a,"a",function(){return f})}}]);
//# sourceMappingURL=component---src-templates-index-template-js-15f7ed9a1440fcf7c471.js.map