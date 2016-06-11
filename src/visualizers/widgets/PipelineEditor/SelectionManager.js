/*globals define*/

define([
    'widgets/EasyDAG/SelectionManager',
    './Buttons',
    'underscore'
], function(
    EasyDAGSelectionManager,
    Buttons,
    _
) {
    'use strict';

    var SelectionManager = function(widget) {
        EasyDAGSelectionManager.call(this, widget);
    };

    _.extend(SelectionManager.prototype, EasyDAGSelectionManager.prototype);

    SelectionManager.prototype.createActionButtons = function(width/*, height*/) {
        // move the 'x' to the top left
        new Buttons.DeleteOne({
            context: this._widget,
            $pEl: this.$selection,
            item: this.selectedItem,
            x: 0,
            y: 0
        });
        // If the operation has a user-defined base type,
        // show a button for jumping to the base def
        new Buttons.GoToBase({
            context: this._widget,
            $pEl: this.$selection,
            item: this.selectedItem,
            x: width,
            y: 0
        });
    };

    SelectionManager.prototype.deselect = function() {
        EasyDAGSelectionManager.prototype.deselect.call(this);
        // Update the widget's 'port connecting' state
        this._widget.onDeselect();
    };

    return SelectionManager;
});