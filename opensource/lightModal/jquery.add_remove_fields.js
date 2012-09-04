(function($) {

    $.fn.addRemoveFields = function(opts) {
        //debug(this);

        // build main options before element iteration
        var options = $.extend({}, $.fn.addRemoveFields.defaults, opts);
        var currentSelector = this.selector;

        // iterate and reformat each matched element
        return this.each(function() {
            var $this, clonedHtml, container, addButton, elementIncrementCountMap;
            $this = $(this);
            // build element specific options
            var o = $.meta ? $.extend({}, options, $this.data()) : options;

            if(o.elementToReplicate === ''){
                throw "No element to replicate is specified";
            }

            $this = $(this);
            container = this;

            clonedHtml = $(o.elementToReplicate + ':last', $this).clone('withDataAndEvents').wrapAll("<div/>").parent().html(); //Get the outerHtml

            addAddButton();
            initialiseExistingClones();
            setElementInitialIncrementCountMap();

            //End initialise ===

            //Initialises pre-existing elements (this might happen after serverside validation)
            function initialiseExistingClones(){
                $(currentSelector + ' ' + o.elementToReplicate, $this).each(function(index){
                    if(index > 0 && o.keepFirst == true || o.keepFirst == false){
                        addDeleteButton($(this));
                    }
                });
            }

            function incrementCloneIds($element){
                var indexOfNumberToIncrement, elementId, newElementId;

                $.each(o.elementsWithIdsToIncrement, function(index, selector){
                    //search for the id of the specified element
                    elementId = $(selector, clonedHtml).attr('id');
                    indexOfNumberToIncrement = elementId.search(/-[0-9]/) + 1;

                    newElementId = elementId.replace(
                        '-' + elementId.substring(indexOfNumberToIncrement),
                        '-' + (parseInt(elementIncrementCountMap[index]) + 1)
                        );

                    $('[for="' + elementId + '"]', $element).attr('for', newElementId);

                    $(selector, $element).attr('id', newElementId);


                    //increment for the next time an element is added.
                    elementIncrementCountMap[index] ++;
                });

            }

            function setElementInitialIncrementCountMap()
            {
                var indexOfNumberToIncrement, elementId;

                elementIncrementCountMap = [];

                $.each(o.elementsWithIdsToIncrement, function(index, selector){
                    elementId = $(selector, clonedHtml).attr('id');

                    if( /-[0-9]+$/.test(elementId) === false ){
                        throw "jquery.add_remove_fields.js error: element specified in elementsWithIdsToIncrement doesn't have a default increment number";
                    }

                    indexOfNumberToIncrement = elementId.search(/-[0-9]/) + 1;

                    //Map element increment count to their respective element
                    elementIncrementCountMap[index] = parseInt(elementId.substring(indexOfNumberToIncrement));
                });
            }

            //Append the cloned html to the container
            function addNewClone(){
                
                if(_canAddClone()){
                    var $clonedHtml = $(clonedHtml);
                    $clonedHtml.hide().appendTo($this);
                    postAppendActions();

                    if($.browser.msie && $.browser.version <= "7.0"){
                        $clonedHtml.show();
                    }else{
                        $clonedHtml.slideDown(500);
                    }
                }
            }

            function postAppendActions(){
                var $elementJustAdded;
                // Clear fields and add remove button
                $elementJustAdded = $(o.elementToReplicate+':last', $this);
                clearFields($elementJustAdded);
                removeIgnoredElements($elementJustAdded);
                addDeleteButton($elementJustAdded);
                incrementCloneIds($elementJustAdded);
                $this.trigger("add_remove_fields:field_added");
                $.fn.addRemoveFields.afterElementAddHook(o, $elementJustAdded);
            }

            function deleteClone($element){
                if(getNumberOfClones() == o.maximumClones){
                    // Show the add button if there are still elements able to be added
                    $this.next('.add-element').show();
                }
                $element.fadeTo(200, 0, 'linear').slideUp(500, 'linear', function(){
                    $this.trigger("add_remove_fields:field_removed");
                    $element.remove();
                    $this.trigger("add_remove_fields:post_field_removed");
                });
            }

            //Adds an add button after the container
            function addAddButton(){

                $this.after('<a class="add-element" href="#"><span>'+ o.addText +'</span></a>');
                var $addButton = $this.next('.add-element');
                if(_canAddClone() == false){
                    $addButton.hide();
                }

                $addButton.bind('click', function(event){
                    event.preventDefault();
                    if(_canAddClone()){
                        addButton = this;
                        addNewClone($this, clonedHtml);

                        //Now see if we can still add elements, if not, then hide this button
                        if(_canAddClone() == false){
                            $(addButton).hide();
                        }
                    }
                });
            }

            //Adds a delete button after each cloned html container
            function addDeleteButton($element){
                $element.append('<a class="delete-element" href="#"><span>'+ o.deleteText +'</span></a>');

                $('.delete-element', $element).bind('click', function(event){
                    event.preventDefault();
                    deleteClone($element);
                    $(this).remove();
                });
            }

            function clearFields($element){
                $('select', $element).val($("option:first", $element).val());
                $('input', $element).val('');
            }

            function removeIgnoredElements($element){
                var arrayLength = o.ignoredElements.length;
                for(var i = 0; i < arrayLength; i++){
                    $(o.ignoredElements[i], $element).remove();
                }
            }

            //Returns the number of replicated elements in the container
            function getNumberOfClones(){
                return $(o.elementToReplicate, $this).length - 1;
            }

            function _canAddClone(){
                var numberOfClones = getNumberOfClones();

                if(o.maximumClones > 0 && numberOfClones < o.maximumClones || o.maximumClones == 0 ){
                    return true;
                }else{
                    return false;
                }
            }


        });
    };

    $.fn.addRemoveFields.defaults = {
        keepFirst: true, //disallows deletion of the first element
        maximumClones: 0, //Maximum number of clones
        elementToReplicate: '', //the selector of the block element to replicate
        elementsWithIdsToIncrement: '', //if there are any elements with Id's that require incrementing, specify the selector here
        ignoredElements: ['.error', 'errors'], //ignore the cloning of certain elements
        addText: 'Add another', //the text on the "add" button
        deleteText: 'Delete' //the text on the "delete" button
    };

    // Called after an element is added to the dom
    $.fn.addRemoveFields.afterElementAddHook = function(options, $element){

    }
})(jQuery);

