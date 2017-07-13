angular.module('cms.roles').run(['$templateCache',function(t){t.put('/Admin/Modules/Roles/Js/UIComponents/FormFieldPermissionsCollection.html','<cms-form-field-container>    <cms-table-container cms-loading="permissionsLoadState.isLoading">        <table>            <tbody ng-repeat="group in permissionGroups">                <tr>                    <th colspan="2">                        <cms-table-group-heading>{{group.title}}</cms-table-group-heading>                    </th>                    <th style="width:30px; text-align:center;">                        <input type="checkbox"                               ng-disabled="globalLoadState.isLoading"                               ng-show="formScope.editMode"                               ng-click="toggleGroup($event, group)">                    </th>                </tr>                <tr ng-repeat="permission in group.permissions">                    <td><label for="{{permission.uniqueId}}">{{permission.permissionType.name}}</label></td>                    <td>{{permission.permissionType.description}}</td>                    <td class="row-type" style="width:30px; text-align:center;">                        <input type="checkbox"                               id="{{permission.uniqueId}}"                               name="{{permission.uniqueId}}"                               ng-disabled="globalLoadState.isLoading || !formScope.editMode || (!permission.isRead && !group.isReadPermitted)"                               ng-model="permission.selected"                               ng-change="permissionChanged(permission, group)">                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-form-field-container>');
t.put('/Admin/Modules/Roles/Js/Routes/AddRole.html','<cms-page-header cms-title="Create"                 cms-parent-title="Roles"></cms-page-header><cms-form cms-name="mainForm"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <cms-page-actions>        <cms-button-submit cms-text="Save"                           ng-disabled="vm.mainForm.$invalid"                           cms-loading="vm.globalLoadState.isLoading"></cms-button-submit>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <cms-form-section cms-title="Role">            <cms-form-field-text cms-title="Title"                                 cms-model="vm.command.title"                                 maxlength="50"                                 required></cms-form-field-text>            <cms-form-field-dropdown cms-title="User Area"                                     cms-options="vm.userAreas"                                     cms-option-name="name"                                     cms-option-value="userAreaCode"                                     cms-model="vm.command.userAreaCode"                                     ng-if="vm.userAreas.length > 1"                                     required></cms-form-field-dropdown>        </cms-form-section>        <cms-form-section cms-title="Permissions">            <cms-form-field-permissions-collection cms-model="vm.command.permissions"                                                   cms-global-load-state="vm.globalLoadState"></cms-form-field-permissions-collection>        </cms-form-section>    </cms-page-body></cms-form>');
t.put('/Admin/Modules/Roles/Js/Routes/RoleDetails.html','<cms-page-header cms-title="{{vm.role.title}}"                 cms-parent-title="Roles"></cms-page-header><cms-form cms-name="mainForm"          cms-edit-mode="vm.editMode"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <!-- Default toolbar -->    <cms-page-actions ng-show="!vm.editMode">        <cms-button class="main-cta"                    cms-text="Edit"                    ng-if="::vm.canUpdate"                    ng-click="vm.edit()"                    ng-show="!vm.editMode && !vm.role.isSuperAdministrator"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Delete"                    ng-if="::vm.canDelete"                    ng-click="vm.deleteRole()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"                    ng-show="!vm.role.specialistRoleTypeCode"></cms-button>    </cms-page-actions>    <!-- Edit toolbar -->    <cms-page-actions ng-show="vm.editMode">        <cms-button-submit cms-text="Save"                           ng-show="vm.editMode"                           ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"                           cms-loading="vm.saveLoadState.isLoading"></cms-button-submit>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"                    ng-show="vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Scrollable content area -->    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--MAIN-->        <cms-form-section cms-title="Role">            <cms-form-field-readonly cms-title="User Area"                                     cms-model="vm.role.userArea.name"></cms-form-field-readonly>            <cms-form-field-text cms-title="Title"                                 cms-model="vm.command.title"                                 cms-disabled="vm.role.isAnonymousRole"                                 maxlength="50"                                 required></cms-form-field-text>        </cms-form-section>        <cms-form-section cms-title="Permissions">            <cms-form-field-permissions-collection cms-model="vm.command.permissions"                                                   cms-global-load-state="vm.globalLoadState"></cms-form-field-permissions-collection>        </cms-form-section>    </cms-page-body></cms-form>');
t.put('/Admin/Modules/Roles/Js/Routes/RoleList.html','<!--HEADER--><cms-page-header cms-title="Roles &amp; Permission"></cms-page-header><cms-page-sub-header>    <cms-page-header-buttons>        <a class="btn-icon" cms-text="Filter"           ng-click="vm.toggleFilter()">            <i class="fa fa-search"></i>        </a>        <!--FILTER-->        <cms-search-filter cms-query="vm.query"                           cms-filter="vm.filter"                           ng-show="vm.isFilterVisible">            <cms-form-field-text cms-title="Text"                                 cms-model="vm.filter.text"></cms-form-field-text>        </cms-search-filter>    </cms-page-header-buttons></cms-page-sub-header><!-- Default toolbar --><cms-page-actions>    <cms-button-link class="main-cta"                     cms-text="Create"                     cms-icon="plus"                     cms-href="#/new"                     ng-if="::vm.canCreate"></cms-button-link>    <cms-pager cms-result="vm.result"               cms-query="vm.query"></cms-pager></cms-page-actions><!-- Scrollable content area --><cms-page-body cms-content-type="form"               cms-sub-header="with-header">    <cms-table-container cms-loading="vm.gridLoadState.isLoading">        <table>            <thead>                <tr>                    <th>User Area</th>                    <th>Title</th>                    <th cms-table-column-actions>Actions</th>                </tr>            </thead>            <tbody>                <tr ng-if="!vm.result.items.length">                    <td colspan="100" class="empty">Sorry, no roles could be found.</td>                </tr>                <tr ng-repeat="role in vm.result.items">                    <td>{{::role.userArea.name}}</td>                    <td>                        <a href="#/{{::role.roleId}}">{{::role.title}}</a>                    </td>                    <td cms-table-column-actions>                        <a href="#/{{::role.roleId}}"                           class="btn-icon"                           title="Edit"                           ng-if="::vm.canUpdate">                            <i class="fa fa-pencil-square-o"></i>                        </a>                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-page-body>');}]);