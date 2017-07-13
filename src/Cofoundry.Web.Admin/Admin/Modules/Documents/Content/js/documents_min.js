/*! UberCMS 2017-07-17 */
angular.module("cms.documents",["ngRoute","cms.shared"]).constant("_",window._).constant("documents.modulePath","/Admin/Modules/Documents/Js/"),angular.module("cms.documents").config(["$routeProvider","shared.routingUtilities","documents.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"Document")}]),angular.module("cms.documents").factory("documents.documentService",["$http","$upload","shared.documentService",function(a,b,c){function d(a,c,d){var e=_.omit(c,"file");return b.upload({url:a,data:e,file:c.file,method:d})}var e=_.extend({},c);return e.add=function(a){return d(e.getBaseRoute(),a,"POST")},e.update=function(a){return d(e.getIdRoute(a.documentAssetId),a,"PUT")},e.remove=function(b){return a["delete"](e.getIdRoute(b))},e}]),angular.module("cms.documents").controller("AddDocumentController",["$location","_","shared.focusService","shared.stringUtilities","shared.LoadState","documents.documentService",function(a,b,c,d,e,f){function g(){j(),m.save=h,m.cancel=k,m.onFileChanged=i,m.editMode=!1,m.saveLoadState=new e}function h(){m.saveLoadState.on(),f.add(m.command).progress(m.saveLoadState.setProgress).then(l)["finally"](m.saveLoadState.off)}function i(){var a=m.command;a.file&&a.file.name&&(a.title=d.capitaliseFirstLetter(d.getFileNameWithoutExtension(a.file.name)),a.fileName=d.slugify(a.title),c.focusById("title"))}function j(){m.command={}}function k(){l()}function l(){a.path("")}var m=this;g()}]),angular.module("cms.documents").controller("DocumentDetailsController",["$routeParams","$q","$location","_","shared.LoadState","shared.modalDialogService","shared.permissionValidationService","documents.documentService","documents.modulePath",function(a,b,c,d,e,f,g,h,i){function j(){u.edit=k,u.save=l,u.cancel=m,u.remove=n,u.editMode=!1,u.globalLoadState=new e,u.saveLoadState=new e,u.formLoadState=new e(!0),u.canUpdate=g.canUpdate("COFDOC"),u.canDelete=g.canDelete("COFDOC"),p(u.formLoadState)}function k(){u.editMode=!0,u.mainForm.formStatus.clear()}function l(){s(u.saveLoadState),h.update(u.command).then(o.bind(null,"Changes were saved successfully",u.saveLoadState))["finally"](t.bind(null,u.saveLoadState))}function m(){u.editMode=!1,u.previewDocument=d.clone(u.document),u.command=q(u.document),u.mainForm.formStatus.clear()}function n(){function a(){return s(),h.remove(u.document.documentAssetId).then(r)["catch"](t)}var b={title:"Delete Document",message:"Are you sure you want to delete this document?",okButtonTitle:"Yes, delete it",onOk:a};f.confirm(b)}function o(a,b){return p(b).then(u.mainForm.formStatus.success.bind(null,a))}function p(b){function c(){return h.getById(a.id).then(function(a){u.document=a,u.previewDocument=a,u.command=q(a),u.editMode=!1})}return c().then(t.bind(null,b))}function q(a){return d.pick(a,"documentAssetId","title","fileName","description","tags")}function r(){c.path("")}function s(a){u.globalLoadState.on(),a&&d.isFunction(a.on)&&a.on()}function t(a){u.globalLoadState.off(),a&&d.isFunction(a.off)&&a.off()}var u=this;j()}]),angular.module("cms.documents").controller("DocumentListController",["_","shared.LoadState","shared.SearchQuery","shared.urlLibrary","shared.permissionValidationService","documents.documentService",function(a,b,c,d,e,f){function g(){k.gridLoadState=new b,k.query=new c({onChanged:i}),k.filter=k.query.getFilters(),k.toggleFilter=h,k.getDocumentUrl=d.getDocumentUrl,k.canCreate=e.canCreate("COFDOC"),k.canUpdate=e.canUpdate("COFDOC"),h(!1),j()}function h(b){k.isFilterVisible=a.isUndefined(b)?!k.isFilterVisible:b}function i(){h(!1),j()}function j(){return k.gridLoadState.on(),f.getAll(k.query.getParameters()).then(function(a){k.result=a,k.gridLoadState.off()})}var k=this;g()}]);