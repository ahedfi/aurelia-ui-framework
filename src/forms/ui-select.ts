/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, bindingMode, customElement, viewResources } from "aurelia-framework";
import { InputWrapper } from "./input-wrapper";
import { ListMaker } from "./list-maker";

@autoinject()
@customElement("ui-select")
@viewResources(InputWrapper)
export class UISelect extends ListMaker {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: AnyObject = undefined;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public model: AnyObject = undefined;

  @bindable()
  public errors: string[];

  @bindable()
  public name: string = "";
  @bindable()
  public placeholder: string = "";

  @bindable()
  public labelProperty: string = "";
  @bindable()
  public valueProperty: string = "";
  @bindable()
  public groupProperty: string = "";
  @bindable()
  public query: ({ query }) => AnyObject[];
  @bindable()
  public options: AnyObject[];

  @bindable()
  public readonly: boolean = false;
  @bindable()
  public disabled: boolean = false;

  @bindable()
  public noOptionsText: string = "No Options";

  @bindable()
  public matcher: ({ model, value }) => boolean;

  constructor(protected element: Element) {
    super(element);
    this.dropHandle = "caret";
    this.multiple = element.hasAttribute("multiple");

    this.template = this.element.querySelector("template");
  }

  protected attached(): void {
    this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
    this.dropEl.closeOnClick = !this.multiple;
    this.dropEl.tether(this.element);
  }

  protected bind(): void {
    if (!isNull(this.model)) {
      if (this.multiple) {
        this.value = this.multiple
          ? this.model.map(o => o[this.valueProperty] || o)
          : this.model[this.labelProperty] || this.model;
      }
    }
    this.isGrouped = !!this.groupProperty;
    this.valueChanged();
  }
}
