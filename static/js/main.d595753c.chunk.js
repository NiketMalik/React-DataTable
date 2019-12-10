(this["webpackJsonpdata-table"]=this["webpackJsonpdata-table"]||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(8),c=n.n(r),i=n(2),s=n(3),l=n(5),u=n(4),h=n(6),d=n(9),m=n(1),f=function(e){var t=e.columns,n=e.isSelectAll,a=e.isSticky,r=e.onSelectionChange,c=a?"div":"tr",i=a?"div":"th";return o.a.createElement(c,{className:"table-head ".concat(a?"table-head-sticky":"")},o.a.createElement(i,{className:"table-head-column"},o.a.createElement("input",{type:"checkbox",className:"checkbox",checked:!!n,onChange:function(e){r&&r(e.target.checked)}})),t.map((function(e){var t={};return e.width?t.width=e.width:t.flex="1",o.a.createElement(i,{key:e.id,className:"table-head-column ".concat(e.numeric?"table-head-column_is-numeric":""),style:t},e.label)})))},b=n(10);var w=function(e){var t=e.config,n=e.onClick,a=e.onSelectionChange,r=e.row,c=r.id,i=r.selected,s=Object(b.a)(r,["id","selected"]);return o.a.createElement("tr",{className:"table-row","data-row-id":c,onClick:function(e){return n&&n()},style:{height:"".concat(t.rowHeight,"px"),top:"".concat(t.rowStartIndex,"px")}},o.a.createElement("td",{className:"table-row-item"},o.a.createElement("input",{type:"checkbox",className:"checkbox",checked:!!i,onClick:function(e){e.stopPropagation()},onChange:function(e){a&&a(e.target.checked)}})),t.keys.map((function(e,n){var a={};return t.width[n]?a.width=t.width[n]:a.flex="1",o.a.createElement("td",{key:"TableRow_".concat(e,"_").concat(c),style:a,className:"table-row-item ".concat(t.numeric[n]?"table-row-item_is-numeric":"")},s[e])})))};function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){Object(d.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={computedRows:e.rows.slice(0,2*e.visibleRows),isLoading:!1,rows:e.rows,rowStartIndex:0,page:0,visibleRows:e.visibleRows},n.tableRef=o.a.createRef(),n.tableBodyRef=o.a.createRef(),n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(this.props.onLoadMore){var t=this.tableRef.current,n=this.tableBodyRef.current;t.addEventListener("scroll",(function(a){var o=t.scrollTop,r=t.clientHeight,c=n.scrollHeight;e._throttle(e._handleRowVisibility.bind(e),10)(o),e.state.isLoading||c-r<=o&&e.setState({isLoading:!0},(function(){e._loadMore()}))}))}}},{key:"_throttle",value:function(e,t){var n=!1;return function(){n||(e.apply(null,arguments),n=!0,setTimeout((function(){n=!1}),t))}}},{key:"_handleRowVisibility",value:function(e){var t=this.props.rowHeight,n=this.state,a=n.rows,o=n.visibleRows,r=Math.floor(e/t),c=r-2*o,i=r+4*o,s=c>0?c:0,l=[];a.slice(s,r).forEach((function(e){return l.push(e)})),a.slice(r,i).forEach((function(e){return l.push(e)})),this.setState({computedRows:l,rowStartIndex:s})}},{key:"_loadMore",value:function(){var e=this,t=this.props.onLoadMore,n=this.state.page+1;t(n).then((function(t){e.setState((function(e){return{isLoading:!1,page:n,rows:[].concat(Object(m.a)(e.rows),Object(m.a)(t))}}))}))}},{key:"_recomputeRows",value:function(){var e=this.state,t=e.rows,n=e.computedRows.map((function(e){return t.find((function(t){return t.id===e.id}))}));this.setState({computedRows:n})}},{key:"_rowSelectionChangeHandler",value:function(e,t){var n=this,a=this.props.onSelectionChange;this.setState((function(n){var o=Object(m.a)(n.rows);return o[e].selected=t,a&&a(o.filter((function(e){return!!e.selected})).map((function(e){return e.id}))),{rows:o}}),(function(){n._recomputeRows()}))}},{key:"_selectAllHandler",value:function(e){var t=this,n=this.props.onSelectionChange;this.setState((function(t){var a=Object(m.a)(t.rows).map((function(t){return g({},t,{selected:e})}));return n&&n((e?t.rows:[]).map((function(e){return e.id}))),{rows:a}}),(function(){t._recomputeRows()}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,a=t.columns,r=t.config,c=t.onRowClick,i=t.rowHeight,s=t.visibleRows,l=this.state,u=l.computedRows,h=l.isLoading,d=l.rows,m=l.rowStartIndex,b=!!r.stickyHeader,p=d.length>0&&d.filter((function(e){return!!e.selected})).length===d.length,y={keys:[],numeric:[],rowHeight:i,width:[]};a.forEach((function(e){y.keys.push(e.id),y.numeric.push(e.numeric),y.width.push(e.width)}));var v={columns:a,isSelectAll:p,onSelectionChange:this._selectAllHandler.bind(this)},k=s*i;return 0===d.length&&(k=50),o.a.createElement("div",{className:"data-table ".concat(n||""),"data-is-loading":h},h&&o.a.createElement("div",{className:"loader"}),b&&o.a.createElement(f,Object.assign({},v,{isSticky:!0})),o.a.createElement("table",{ref:this.tableRef,cellPadding:"0",cellSpacing:"0",style:{height:"".concat(k,"px")}},!b&&o.a.createElement("thead",null,o.a.createElement(f,Object.assign({},v,{isSticky:!1}))),o.a.createElement("tbody",{ref:this.tableBodyRef,className:"data-table-body",style:{height:"".concat(d.length*i,"px")}},0===d.length&&o.a.createElement("tr",{className:"table-row empty-rows"},o.a.createElement("td",{className:"table-row-item"},"No Data")),d.length>0&&u.map((function(t,n){return o.a.createElement(w,{key:"DataTable_TableRow_".concat(t.id),config:g({},y,{rowStartIndex:(m+n)*i}),row:t,onClick:function(e){return c(t,m+n)},onSelectionChange:function(t){return e._rowSelectionChangeHandler(m+n,t)}})})))))}}]),t}(o.a.Component),v=(n(16),n(17),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={isLoading:!0,errorToast:!1,rows:[]},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.loadRows(0).then((function(t){e.setState({rows:t})})).catch((function(t){e.setState({errorToast:"Something went wrong. Check console for more info."},(function(){setTimeout((function(){e.setState({errorToast:!1})}),2500)})),console.error(t)})).finally((function(t){return e.setState({isLoading:!1})}))}},{key:"generateRows",value:function(e){return e.map((function(e){return{id:"album_".concat(e.id),thumbnail:o.a.createElement("img",{className:"demo-thumbnail",src:e.thumbnailUrl,alt:e.title}),title:o.a.createElement("span",{className:"demo-title"},e.title),url:e.url}}))}},{key:"loadRows",value:function(e){return fetch("https://jsonplaceholder.typicode.com/photos?_page=".concat(e+1)).then((function(e){return e.json()})).then(this.generateRows.bind(this))}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.rows;return o.a.createElement("div",{className:"demo"},o.a.createElement("div",{className:"loader","data-is-loading":t}),o.a.createElement("h1",{className:"header"},"Photo Album"),!t&&n.length&&o.a.createElement(y,{onLoadMore:this.loadRows.bind(this),onRowClick:function(e){window.open(e.url,"_blank"),console.log(e)},onSelectionChange:console.log,config:{stickyHeader:!0},columns:[{id:"thumbnail",label:"Thumbnail",numeric:!1,width:"250px"},{id:"title",label:"Title",numeric:!1}],rows:n,rowHeight:200,visibleRows:3}))}}]),t}(o.a.Component));c.a.render(o.a.createElement(v,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.d595753c.chunk.js.map