import { UITreeNode } from "../../models/ui-tree-model";
export declare class UITreePanel {
    protected element: Element;
    value: AnyObject;
    model: AnyObject;
    options: KeyValue[];
    labelSearch: string;
    labelEmpty: string;
    labelLess: string;
    labelMore: string;
    maxNodes: number;
    checkable: boolean | number;
    searchable: boolean;
    private rootNode;
    constructor(element: Element);
    select(node: UITreeNode): Promise<false | void>;
    protected bind(): void;
    protected optionsChanged(): void;
    protected toggleExpand(index: any): void;
    protected toggleMore(index: any): void;
    protected toggleCheck(node: any): void;
    protected getCheckedValues(): void;
    protected searchTextChanged(query: any): void;
    private changeSelection;
}
