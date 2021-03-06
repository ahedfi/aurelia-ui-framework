System.register(['./_tslib.js', 'aurelia-framework', 'aurelia-event-aggregator', './ui-internal.js', 'resize-observer-polyfill', './ui-common.js'], function (exports) {
  'use strict';
  var __decorate, __metadata, bindable, customElement, inlineView, containerless, viewResources, child, UIInternal, ResizeObserver, calculateOverflow;
  return {
    setters: [function (module) {
      __decorate = module.a;
      __metadata = module.b;
    }, function (module) {
      bindable = module.bindable;
      customElement = module.customElement;
      inlineView = module.inlineView;
      containerless = module.containerless;
      viewResources = module.viewResources;
      child = module.child;
    }, function () {}, function (module) {
      UIInternal = module.U;
    }, function (module) {
      ResizeObserver = module.default;
    }, function (module) {
      calculateOverflow = module.c;
    }],
    execute: function () {

      var UIBreadcrumbs = (function () {
          function UIBreadcrumbs(element) {
              var _this = this;
              this.element = element;
              this.items = [];
              this.hasOverflow = false;
              this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
              this.obResize.observe(element);
          }
          UIBreadcrumbs.prototype.attached = function () {
              var _this = this;
              UIInternal.queueTask(function () { return _this.calculateOverflow(); });
          };
          UIBreadcrumbs.prototype.detached = function () {
              this.obResize.disconnect();
          };
          UIBreadcrumbs.prototype.calculateOverflow = function () {
              this.resetOverflow();
              if (this.wrapperEl.offsetWidth > this.element.offsetWidth) {
                  this.hasOverflow = true;
                  while (this.wrapperEl.offsetWidth > this.element.offsetWidth - 50) {
                      this.overflowEl.appendChild(this.wrapperEl.firstElementChild);
                  }
              }
              else {
                  this.hasOverflow = false;
              }
          };
          UIBreadcrumbs.prototype.resetOverflow = function () {
              var _this = this;
              this.hasOverflow = false;
              var currentFirstChild = this.wrapperEl.firstElementChild;
              this.overflowEl.children.forEach(function (child) {
                  _this.wrapperEl.insertBefore(child, currentFirstChild);
              });
          };
          __decorate([
              bindable(),
              __metadata("design:type", Array)
          ], UIBreadcrumbs.prototype, "items", void 0);
          UIBreadcrumbs = __decorate([
              customElement("ui-breadcrumbs"),
              inlineView("<template class=\"ui-breadcrumbs\">\n  <div class=\"ui-breadcrumbs__overflow\" show.bind=\"hasOverflow\">\n  <ui-button type=\"tool\" size=\"xs\" no-caret ui-theme=\"secondary\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"ellipsis\"></ui-svg-icon>\n    <ui-drop close-on-click=\"false\"><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n  </div>\n  <div class=\"ui-breadcrumbs__wrapper\" ref=\"wrapperEl\">\n  <template repeat.for=\"item of items\">\n    <template if.bind=\"item.href\">\n    <a class=\"ui-breadcrumbs__link\" href.bind=\"item.href\"><ui-icon if.bind=\"item.icon\" icon.bind=\"item.icon\"></ui-icon>${item.label}</a>\n    </template>\n    <template else>\n    <span class=\"ui-breadcrumbs__label\"><ui-icon if.bind=\"item.icon\" icon.bind=\"item.icon\"></ui-icon>${item.label}</span>\n    </template>\n  </template>\n  </div>\n</template>"),
              __metadata("design:paramtypes", [Element])
          ], UIBreadcrumbs);
          return UIBreadcrumbs;
      }());

      var MenuItem = (function () {
          function MenuItem() {
              this.noitemsLabel = "No Menu";
          }
          MenuItem.prototype.onClick = function ($event) {
              if (this.item.items) {
                  $event.stopPropagation();
              }
              if (this.item.handler) {
                  this.item.handler();
              }
              return true;
          };
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], MenuItem.prototype, "item", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], MenuItem.prototype, "noitemsLabel", void 0);
          MenuItem = __decorate([
              containerless(),
              customElement("menu-item"),
              inlineView("<template>\n  <template if.bind=\"item.group\">\n    <ui-menu-group label.bind=\"item.group\">\n      <menu-item repeat.for=\"groupItem of item.items\" item.bind=\"groupItem\"></menu-item>\n    </ui-menu-group>\n  </template>\n  <template if.bind=\"item.label\">\n    <ui-menu-item label.bind=\"item.label\" href.bind=\"item.href\"\n    icon.bind=\"item.icon\" icon-color.bind=\"item.iconColor\" ui-badge=\"value.bind:item.badge; theme.bind:item.badgeTheme;\"\n    disabled.bind=\"typeof item.disabled === 'function' ? item.disabled() : item.disabled\"\n    active.bind=\"typeof item.active === 'function' ? item.active() : item.active\"\n    hide.bind=\"typeof item.hidden === 'function' ? item.hidden() : item.hidden\"\n    click.delegate=\"onClick($event)\">\n      <ui-drop view-model.ref=\"dropEl\" if.bind=\"item.items\">\n        <ui-menu if.bind=\"dropEl.isOpen\" menu-items.bind=\"item.items\" noitems-label.bind=\"noitemsLabel\"></ui-menu>\n      </ui-drop>\n    </ui-menu-item>\n  </template>\n  <template if.bind=\"item === '-'\">\n    <ui-divider></ui-divider>\n  </template>\n</template>")
          ], MenuItem);
          return MenuItem;
      }());

      var UIMenu = (function () {
          function UIMenu(element) {
              this.element = element;
              this.noitemsLabel = "No Menu";
              this.isLoading = false;
          }
          UIMenu.prototype.attached = function () {
              var _this = this;
              this.loadMenuItems();
              UIInternal.queueTask(function () {
                  var active = _this.element.querySelector(".ui-menu__item__link[data-active='true']");
                  if (active) {
                      active.scrollIntoView({ block: "center", inline: "nearest" });
                  }
              });
          };
          UIMenu.prototype.loadMenuItems = function () {
              var _this = this;
              if (isFunction(this.menuItems)) {
                  this.isLoading = true;
                  var ret = this.menuItems();
                  if (ret instanceof Promise) {
                      ret.then(function (items) {
                          _this.items = items;
                          _this.isLoading = false;
                      });
                  }
                  else {
                      this.items = ret;
                      this.isLoading = false;
                  }
              }
              else if (isArray(this.menuItems)) {
                  this.items = this.menuItems;
              }
              else {
                  this.items = undefined;
              }
          };
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], UIMenu.prototype, "menuItems", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenu.prototype, "noitemsLabel", void 0);
          UIMenu = __decorate([
              customElement("ui-menu"),
              viewResources(MenuItem),
              inlineView("<template class=\"ui-menu\"><slot>\n  <div if.bind=\"isLoading\" ui-padding=\"xs\" ui-align=\"center\"><ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon></div>\n  <template if.bind=\"!isLoading && items && items.length\">\n    <menu-item repeat.for=\"item of items\" item.bind=\"item\" noitems-label.bind=\"noitemsLabel\"></menu-item>\n  </template>\n  <template if.bind=\"!isLoading && items && items.length===0\">\n    <div ui-padding=\"xs\" ui-color=\"muted\" ui-font=\"sm\" innerhtml.bind=\"noitemsLabel\"></div>\n  </template>\n</slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIMenu);
          return UIMenu;
      }());

      var UIMenuGroup = (function () {
          function UIMenuGroup(element) {
              this.element = element;
              this.label = "";
              this.collapsed = false;
          }
          UIMenuGroup.prototype.attached = function () {
              if (this.element.hasAttribute("collapsible")) {
                  this.vmElement.classList.add("ui-menu__group--collapsible");
              }
          };
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenuGroup.prototype, "label", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Boolean)
          ], UIMenuGroup.prototype, "collapsed", void 0);
          UIMenuGroup = __decorate([
              containerless(),
              customElement("ui-menu-group"),
              inlineView("<template><fieldset class=\"ui-menu__group\" data-collapsed.bind=\"collapsed\" ref=\"vmElement\">\n    <legend class=\"ui-menu__group__label\" if.bind=\"label\" innerhtml.bind=\"label\" click.trigger=\"collapsed = !collapsed\"></legend>\n    <div class=\"ui-menu__group__container\"><slot></slot></div>\n  </fieldset></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIMenuGroup);
          return UIMenuGroup;
      }());

      var view = "<template class=\"ui-menu__item\" value.bind=\"value\">\n  <a ref=\"badgeEl\" data-active.bind=\"active\" data-disabled.bind=\"disabled\" click.trigger=\"fireClick($event)\" class=\"ui-menu__item__link\" data-open.bind=\"!split && dropEl.isOpen\">\n    <ui-icon class=\"ui-menu__item__icon\" icon.bind=\"icon\" if.bind=\"icon\" ui-color.bind=\"iconColor\"></ui-icon>\n    <span class=\"ui-menu__item__label\">\n      <slot>${label}</slot>\n    </span>\n    <ui-svg-icon if.bind=\"!split && hasDrop\" class=\"ui-menu__item__caret\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <a data-active.bind=\"split && dropEl.isOpen\" class=\"ui-menu__item__caret ui-menu__item__caret--split\" if.bind=\"split && hasDrop\" click.trigger=\"toggleDrop()\" data-open.bind=\"split && dropEl.isOpen\">\n    <ui-svg-icon class=\"ui-icon__caret split\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <slot name=\"ui-drop\"></slot>\n</template>\n";

      var UIMenuItem = (function () {
          function UIMenuItem(element) {
              this.element = element;
              this.label = "";
              this.href = "";
              this.icon = "";
              this.iconColor = "";
              this.active = false;
              this.disabled = false;
              this.dropIcon = "caret";
              this.isInMenubar = false;
              this.hasDrop = false;
              this.split = element.hasAttribute("split");
          }
          UIMenuItem.prototype.attached = function () {
              var _this = this;
              UIInternal.queueTask(function () {
                  _this.hasDrop = !!_this.elDropdown;
                  _this.isInMenubar = hasParent(_this.element, "ui-menu__bar");
                  var isInDropdown = hasParent(_this.element, "ui-drop__body");
                  if (_this.hasDrop) {
                      _this.dropEl = getSlotViewModel(_this.elDropdown);
                      if (isInDropdown || !_this.isInMenubar) {
                          _this.dropIcon = "page-next";
                          _this.dropEl.position = "tl";
                          _this.dropEl.anchorPosition = "tr";
                          _this.dropEl.stretch = false;
                          _this.dropEl.attachToViewport = isInDropdown;
                      }
                      _this.dropEl.tether(_this.element);
                  }
              });
              this.hrefChanged();
          };
          UIMenuItem.prototype.hrefChanged = function () {
              if (this.badgeEl) {
                  if (this.href) {
                      this.badgeEl.href = this.href;
                  }
                  else if (this.badgeEl.attributes.getNamedItem("href")) {
                      this.badgeEl.attributes.removeNamedItem("href");
                  }
              }
          };
          UIMenuItem.prototype.activeChanged = function () {
              if (this.active) {
                  this.element.scrollIntoView({ block: "center", inline: "nearest" });
              }
          };
          UIMenuItem.prototype.fireClick = function ($event) {
              if (!this.href) {
                  if (this.hasDrop && !this.split) {
                      return this.toggleDrop();
                  }
                  return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
              }
          };
          UIMenuItem.prototype.toggleDrop = function () {
              var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
              var afterEvent = this.dropEl.isOpen ? "close" : "open";
              if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                  this.dropEl.toggleDrop();
                  this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
              }
              return false;
          };
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenuItem.prototype, "label", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenuItem.prototype, "href", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenuItem.prototype, "icon", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenuItem.prototype, "iconColor", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIMenuItem.prototype, "id", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Boolean)
          ], UIMenuItem.prototype, "active", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Boolean)
          ], UIMenuItem.prototype, "disabled", void 0);
          __decorate([
              child(".ui-drop"),
              __metadata("design:type", Element)
          ], UIMenuItem.prototype, "elDropdown", void 0);
          UIMenuItem = __decorate([
              customElement("ui-menu-item"),
              inlineView(view),
              __metadata("design:paramtypes", [Element])
          ], UIMenuItem);
          return UIMenuItem;
      }());

      var UIMenubar = (function () {
          function UIMenubar(element) {
              var _this = this;
              this.element = element;
              this.hasOverflow = false;
              this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
              this.obResize.observe(element);
          }
          UIMenubar.prototype.attached = function () {
              var _this = this;
              UIInternal.queueTask(function () { return _this.calculateOverflow(); });
          };
          UIMenubar.prototype.detached = function () {
              this.obResize.disconnect();
          };
          UIMenubar.prototype.calculateOverflow = function () {
              this.hasOverflow = calculateOverflow(this.wrapperEl, this.overflowEl);
          };
          UIMenubar = __decorate([
              customElement("ui-menubar"),
              inlineView("<template class=\"ui-menu__bar\">\n  <div class=\"ui-menu__bar__wrapper\" ref=\"wrapperEl\"><slot></slot></div>\n  <ui-button type=\"tool\" size=\"xs\" no-caret class=\"ui-menu__overflow\" ui-theme=\"secondary\" show.bind=\"hasOverflow\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n    <ui-drop close-on-click=\"false\"><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n</template>"),
              __metadata("design:paramtypes", [Element])
          ], UIMenubar);
          return UIMenubar;
      }());

      var Menus = exports('Menus', [UIMenu, UIMenuGroup, UIMenuItem, UIMenubar, UIBreadcrumbs]);

    }
  };
});
//# sourceMappingURL=ui-menus.js.map
