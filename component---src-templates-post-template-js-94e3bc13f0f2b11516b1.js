(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{181:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(182),o=a(56),s=(a(190),a(223)),l=a(171),u=a.n(l),c=function(e){var t=e.data.site.siteMetadata.author;return r.a.createElement("div",{className:u.a.author},r.a.createElement("p",{className:u.a.author__bio},r.a.createElement("span",{className:u.a.author__photo},r.a.createElement("img",{src:Object(o.withPrefix)(t.photo),alt:t.name})),r.a.createElement("span",null,r.a.createElement("strong",null,t.name),r.a.createElement("br",null),r.a.createElement("span",null,t.bio))))},d=function(){return r.a.createElement(o.StaticQuery,{query:"3509649085",render:function(e){return r.a.createElement(c,{data:e})},data:s})},m=(a(26),a(224)),f=a(225),p=a.n(f),g=function(e){var t=e.data,a=e.postTitle,n=e.postSlug,i=t.site.siteMetadata,o=i.url,s=i.disqusShortname;return s?r.a.createElement(p.a,{shortname:s,identifier:a,title:a,url:o+n}):null},h=function(e){return r.a.createElement(o.StaticQuery,{query:"1989642023",render:function(t){return r.a.createElement(g,Object.assign({},e,{data:t}))},data:m})},v=a(172),y=a.n(v),E=function(e){var t=e.body,a=e.title;return r.a.createElement("div",{className:y.a.content},r.a.createElement("h1",{className:y.a.content__title},a),r.a.createElement("div",{className:y.a.content__body,dangerouslySetInnerHTML:{__html:t}}))},b=a(188),_=a.n(b),w=a(173),N=a.n(w),k=function(e){var t=e.date;return r.a.createElement("div",{className:N.a.meta},r.a.createElement("p",{className:N.a.meta__date},"Published ",_()(t).format("D MMM YYYY")))},O=a(174),j=a.n(O),S=function(e){var t=e.tags,a=e.tagSlugs;return r.a.createElement("div",{className:j.a.tags},r.a.createElement("ul",{className:j.a.tags__list},a.map(function(e,a){return r.a.createElement("li",{className:j.a["tags__list-item"],key:t[a]},r.a.createElement(o.Link,{to:e,className:j.a["tags__list-item-link"]},"# ",t[a]))})))},q=a(175),M=a.n(q),P=function(e){var t=e.data,a=e.post,n=a.frontmatter,i=n.tags,s=n.title,l=n.date,u=a.html,c=a.fields.tagSlugs;return r.a.createElement("div",{className:M.a.post},r.a.createElement(o.Link,{className:M.a["post__home-button"],to:"/"},"All Articles"),r.a.createElement("div",{className:M.a.post__content},r.a.createElement(E,{body:u,title:s})),r.a.createElement("div",{className:M.a.post__footer},r.a.createElement(k,{date:l}),r.a.createElement(S,{tags:i,tagSlugs:c}),r.a.createElement(d,null)),r.a.createElement("div",{className:M.a.post__comments},r.a.createElement(h,{postSlug:a.fields.slug,postTitle:a.frontmatter.title,data:t})))};a.d(t,"query",function(){return C});var C="2186358131";t.default=function(e){var t=e.data,a=t.site.siteMetadata,n=a.title,o=a.subtitle,s=t.markdownRemark.frontmatter,l=s.title,u=s.description,c=null!==u?u:o;return r.a.createElement(i.a,{title:l+" - "+n,description:c},r.a.createElement(P,{post:t.markdownRemark,data:t}))}},182:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(194),o=a.n(i),s=a(158),l=a.n(s),u=function(e){var t=e.children;return r.a.createElement("div",{className:l.a.layout},r.a.createElement(o.a,{defaultTitle:"Kingso's blog"},r.a.createElement("html",{lang:"en"}),r.a.createElement("meta",{name:"google-site-verification",content:"mbgLz8ZMqCut4Jt1gFK1_ie6CSHvAN39Mijkn1EpPGc"})),t)};a.d(t,"a",function(){return u})},223:function(e){e.exports={data:{site:{siteMetadata:{author:{name:"Kingso",bio:"각자의 방식대로",photo:"/photo.jpg"}}}}}},224:function(e){e.exports={data:{site:{siteMetadata:{disqusShortname:"kingsoblog",url:"https://kingso.netlify.com"}}}}},225:function(e,t,a){"use strict";e.exports=a(226)},226:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=s(a(0)),o=s(a(1));function s(e){return e&&e.__esModule?e:{default:e}}var l=["shortname","identifier","title","url","category_id","onNewComment","language"],u=!1;function c(e,t){var a=t.onNewComment,n=t.language,r=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["onNewComment","language"]);for(var i in r)e.page[i]=r[i];e.language=n,a&&(e.callbacks={onNewComment:[a]})}var d=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(e,t){return e.identifier!==this.props.identifier}},{key:"render",value:function(){var e=this,t=Object.keys(this.props).reduce(function(t,a){return l.some(function(e){return e===a})?t:n({},t,function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}({},a,e.props[a]))},{});return i.default.createElement("div",t,i.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!u){var e=this.disqus=document.createElement("script"),t=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];e.async=!0,e.type="text/javascript",e.src="//"+this.props.shortname+".disqus.com/embed.js",t.appendChild(e),u=!0}}},{key:"loadDisqus",value:function(){var e=this,t={};l.forEach(function(a){"shortname"!==a&&e.props[a]&&(t[a]=e.props[a])}),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){c(this,t),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){c(this,t)},this.addDisqusScript())}}]),t}();d.displayName="DisqusThread",d.propTypes={id:o.default.string,shortname:o.default.string.isRequired,identifier:o.default.string,title:o.default.string,url:o.default.string,category_id:o.default.string,onNewComment:o.default.func,language:o.default.string},d.defaultProps={url:"undefined"==typeof window?null:window.location.href},t.default=d}}]);
//# sourceMappingURL=component---src-templates-post-template-js-94e3bc13f0f2b11516b1.js.map