System.register(['./_tslib.js', 'aurelia-framework', './ui-internal.js'], function (exports) {
  'use strict';
  var __decorate, __metadata, computedFrom, containerless, inlineView, processContent, UIInternal;
  return {
    setters: [function (module) {
      __decorate = module.a;
      __metadata = module.b;
    }, function (module) {
      computedFrom = module.computedFrom;
      containerless = module.containerless;
      inlineView = module.inlineView;
      processContent = module.processContent;
    }, function (module) {
      UIInternal = module.U;
    }],
    execute: function () {

      var BaseInput = exports('B', (function () {
          function BaseInput(element) {
              this.element = element;
              this.maxlength = 0;
              this.allowClear = false;
              this.showCounter = false;
              this.readonly = false;
              this.disabled = false;
              this.isDisabled = false;
              this.allowClear = element.hasAttribute("clear") || element.hasAttribute("clear.trigger");
              this.showCounter = element.hasAttribute("counter");
          }
          BaseInput.prototype.focus = function () {
              this.inputEl.focus();
          };
          BaseInput.prototype.disable = function (b) {
              this.isDisabled = b;
          };
          Object.defineProperty(BaseInput.prototype, "classes", {
              get: function () {
                  var classes = [];
                  if (this.errors && this.errors.length > 0) {
                      classes.push("ui-input--invalid");
                  }
                  if (this.isTrue("readonly")) {
                      classes.push("ui-input--readonly");
                  }
                  if (this.isTrue("disabled") || this.isDisabled) {
                      classes.push("ui-input--disabled");
                  }
                  return classes.join(" ");
              },
              enumerable: true,
              configurable: true
          });
          BaseInput.prototype.bind = function () {
              this.readonly = this.isTrue("readonly");
              this.disabled = this.isTrue("disabled");
          };
          BaseInput.prototype.clear = function () {
              this.value = "";
              this.inputEl.focus();
              this.element.dispatchEvent(UIInternal.createEvent("clear"));
              this.element.dispatchEvent(UIInternal.createEvent("change"));
          };
          BaseInput.prototype.fireEnter = function ($event) {
              if ($event.keyCode === 13) {
                  $event.stopEvent();
                  this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
              }
              return true;
          };
          BaseInput.prototype.canToggleDrop = function (evt) {
              if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
                  this.toggleDrop(false);
              }
          };
          BaseInput.prototype.toggleDrop = function (open) {
              var _this = this;
              if (open === true && this.dropEl.isOpen) {
                  UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
                  return;
              }
              var beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
              var afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
              if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                  this.dropEl.toggleDrop(open);
                  this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
                  if (this.dropEl.isOpen) {
                      this.inputEl.select();
                      return true;
                  }
                  else {
                      return false;
                  }
              }
          };
          BaseInput.prototype.isTrue = function (prop) {
              return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
          };
          __decorate([
              computedFrom("isDisabled", "disabled", "readonly", "errors", "errors.length"),
              __metadata("design:type", String),
              __metadata("design:paramtypes", [])
          ], BaseInput.prototype, "classes", null);
          return BaseInput;
      }()));

      var view = "<template>\n  <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n    <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n    <ul>\n      <li repeat.for=\"err of errors\">${err.message || err}</li>\n    </ul>\n  </div>\n  <div class=\"ui-input__counter\" if.bind=\"showCounter && (value.length > 0 || maxlength > 0)\">\n    ${counter}\n  </div>\n  <div class=\"ui-input__clear\" if.bind=\"allowClear && value.length > 0\" click.trigger=\"clear()\">\n    <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n  </div>\n  <div class=\"ui-input__drop-handle\" if.bind=\"dropHandle\" click.trigger=\"toggleDrop()\">\n    <ui-svg-icon icon.bind=\"dropHandle\"></ui-svg-icon>\n  </div>\n  <slot></slot>\n</template>\n";

      var InputWrapper = exports('I', (function () {
          function InputWrapper() {
          }
          InputWrapper = __decorate([
              containerless(),
              inlineView(view),
              processContent(function (compiler, resources, node, instruction) {
                  instruction.inheritBindingContext = true;
                  return true;
              })
          ], InputWrapper);
          return InputWrapper;
      }()));

    }
  };
});
//# sourceMappingURL=input-wrapper.js.map
