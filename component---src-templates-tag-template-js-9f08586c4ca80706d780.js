(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{177:function(e,a,t){"use strict";t.r(a),t.d(a,"query",function(){return m});var n=t(0),r=t.n(n),i=t(182),s=t(183),l=t(186),o=t(184),c=t(187),m="2403895038";a.default=function(e){var a=e.data,t=e.pageContext,n=a.site.siteMetadata,m=n.title,d=n.subtitle,f=t.tag,u=t.currentPage,g=t.prevPagePath,p=t.nextPagePath,_=t.hasPrevPage,v=t.hasNextPage,P=a.allMarkdownRemark.edges,E=u>0?'All Posts tagged as "'+f+'" - Page '+u+" - "+m:'All Posts tagged as "'+f+'" - '+m;return r.a.createElement(i.a,{title:E,description:d},r.a.createElement(s.a,null),r.a.createElement(o.a,{title:f},r.a.createElement(l.a,{edges:P}),r.a.createElement(c.a,{prevPagePath:g,nextPagePath:p,hasPrevPage:_,hasNextPage:v})))}},185:function(e,a,t){var n;!function(){"use strict";var t={}.hasOwnProperty;function r(){for(var e=[],a=0;a<arguments.length;a++){var n=arguments[a];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(this&&this[n]||n);else if(Array.isArray(n))e.push(r.apply(this,n));else if("object"===i)for(var s in n)t.call(n,s)&&n[s]&&e.push(this&&this[s]||s)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(a,[]))||(e.exports=n)}()},186:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(188),s=t.n(i),l=t(56),o=t(156),c=t.n(o),m=function(e){var a=e.edges;return r.a.createElement("div",{className:c.a.feed},a.map(function(e){return r.a.createElement("div",{className:c.a.feed__item,key:e.node.fields.slug},r.a.createElement("div",{className:c.a["feed__item-meta"]},r.a.createElement("time",{className:c.a["feed__item-meta-time"],dateTime:s()(e.node.frontmatter.date).format("MMMM D, YYYY")},s()(e.node.frontmatter.date).format("MMMM YYYY")),r.a.createElement("span",{className:c.a["feed__item-meta-divider"]}),r.a.createElement("span",{className:c.a["feed__item-meta-category"]},r.a.createElement(l.Link,{to:e.node.fields.categorySlug,className:c.a["feed__item-meta-category-link"]},e.node.frontmatter.category))),r.a.createElement("h2",{className:c.a["feed__item-title"]},r.a.createElement(l.Link,{className:c.a["feed__item-title-link"],to:e.node.fields.slug},e.node.frontmatter.title)),r.a.createElement("p",{className:c.a["feed__item-description"]},e.node.frontmatter.description),r.a.createElement(l.Link,{className:c.a["feed__item-readmore"],to:e.node.fields.slug},"Read"))}))};t.d(a,"a",function(){return m})},187:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(185),s=t.n(i),l=t(56),o=t(189),c=t(157),m=t.n(c),d=s.a.bind(m.a),f=function(e){var a=e.prevPagePath,t=e.nextPagePath,n=e.hasNextPage,i=e.hasPrevPage,s=d({"pagination__prev-link":!0,"pagination__prev-link--disable":!i}),c=d({"pagination__next-link":!0,"pagination__next-link--disable":!n});return r.a.createElement("div",{className:m.a.pagination},r.a.createElement("div",{className:m.a.pagination__prev},r.a.createElement(l.Link,{rel:"prev",to:a,className:s},o.b.PREV_PAGE)),r.a.createElement("div",{className:m.a.pagination__next},r.a.createElement(l.Link,{rel:"next",to:t,className:c},o.b.NEXT_PAGE)))};t.d(a,"a",function(){return f})}}]);
//# sourceMappingURL=component---src-templates-tag-template-js-9f08586c4ca80706d780.js.map