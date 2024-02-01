import{j as h}from"./lit-element-gscy3ROI.js";function m(t){for(var i=[],o=1;o<arguments.length;o++)i[o-1]=arguments[o];var n=Array.from(typeof t=="string"?[t]:t);n[n.length-1]=n[n.length-1].replace(/\r?\n([\t ]*)$/,"");var d=n.reduce(function(e,p){var u=p.match(/\n([\t ]+|(?!\s).)/g);return u?e.concat(u.map(function(l){var s,f;return(f=(s=l.match(/[\t ]/g))===null||s===void 0?void 0:s.length)!==null&&f!==void 0?f:0})):e},[]);if(d.length){var a=new RegExp(`
[	 ]{`+Math.min.apply(Math,d)+"}","g");n=n.map(function(e){return e.replace(a,`
`)})}n[0]=n[0].replace(/^\r?\n/,"");var r=n[0];return i.forEach(function(e,p){var u=r.match(/(?:^|\n)( *)$/),l=u?u[1]:"",s=e;typeof e=="string"&&e.includes(`
`)&&(s=String(e).split(`
`).map(function(f,g){return g===0?f:""+l+f}).join(`
`)),r+=s+n[p+1]}),r}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=(t,i)=>i===void 0?(t==null?void 0:t._$litType$)!==void 0:(t==null?void 0:t._$litType$)===i,{global:_}=__STORYBOOK_MODULE_GLOBAL__,{simulatePageLoad:c,simulateDOMContentLoaded:L}=__STORYBOOK_MODULE_PREVIEW_API__;var{Node:O}=_,M=(t,i)=>{let{id:o,component:n}=i;if(!n)throw new Error(`Unable to render story ${o} as the component annotation is missing from the default export`);let d=document.createElement(n);return Object.entries(t).forEach(([a,r])=>{d[a]=r}),d};function T({storyFn:t,kind:i,name:o,showMain:n,showError:d,forceRemount:a},r){let e=t();if(n(),y(e)){(a||!r.querySelector('[id="root-inner"]'))&&(r.innerHTML='<div id="root-inner"></div>');let p=r.querySelector('[id="root-inner"]');h(e,p),c(r)}else if(typeof e=="string")r.innerHTML=e,c(r);else if(e instanceof O){if(r.firstChild===e&&!a)return;r.innerHTML="",r.appendChild(e),L()}else d({title:`Expecting an HTML snippet or DOM node from the story: "${o}" of "${i}".`,description:m`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var $={renderer:"web-components"};export{$ as parameters,M as render,T as renderToCanvas};
