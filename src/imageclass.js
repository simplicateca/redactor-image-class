(function(t) {
    t.add('plugin', 'imageclass', {

        translations: {
            en: {
                imageStyle: 'Image Style',
            },
        },

        init: function(app) {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.selection = app.selection;
            this.inspector = app.inspector;
            this.opts = app.opts;
            this.selectedClass = '';
        },


        /**
         * listen for when the image module edits and existing image
         */
        onimage: {            
            changed: function(figureObj) {
                if( this.opts.imageClasses ) {
                    var element = figureObj.first()
                    this._removeClasses( element )
                    this.selectedClass.split(" ").forEach( function(className) {
                        element.addClass(className);
                    });
                }
            },
        },

        
        /**
         * listen for when the image edit modal opens
         */
        onmodal: {
            imageedit: {
                open: function (modal, form) {
                    if( this.opts.imageClasses ) {
                        this.$modal = modal;
                        this.$form = form;
                        this._setup();
                        this._startingClass()
                    }
                }
            }
        },


        /**
         * setup the class name <select> in the image module edit modal
         */
        _setup: function () {            
            if (0 === (e = this.$modal.find("#redactor-image-styles")).length) {               
                var n = this.$modal.getBody();
                fi = t.dom('<div class="form-item form-item-link" />');
                lb = t.dom('<label for="redactor-image-styles">' + this.lang.get('imageStyle') + '</label>');
                se = t.dom('<select id="redactor-image-styles" name="class"></select></div>');
                opt = t.dom("<option value=''></option>");
                se.append(opt);

                this.opts.imageClasses.forEach(function(element) {
                    opt = t.dom(`<option value='${element.class}'>${element.label}</option>`);
                    se.append(opt);
                });
               
                se.on("change", this._select.bind(this));
                
                fi.append(lb).append(se);

                // try to place the field before the new tab target checkbox
                var $target = this.$form.find('div.form-item-target')
                if( $target.nodes.length > 0 ) {
                    $target.before(fi)
                } else {
                    this.$form.append(fi)
                }
            }
        },


        /**
         * set the class that the <select> should load with when the modal opens
         */
        _startingClass: function() {
            this.selectedClass = '';
            
            var currentImage = this._getCurrent();

            if( currentImage && currentImage.nodes[0].className ) {
                var className = currentImage.nodes[0].className
                    className = className.replaceAll( /redactor[\w\-]*/ig, '' ).trim()

                // create an array of possible class name string
                var possibleClassNames = this.opts.imageClasses
                                            .map(a => a.class)
                                            .sort(function(a, b){
                                                return a.length - b.length;
                                            });

                var foundClass = ''
                possibleClassNames.forEach(function(name) {
                    if( className.includes(name) ) {
                        foundClass = name
                    }
                });

                this.$form.find('select[name=class]').val(foundClass);
                this.selectedClass = foundClass;
            }
        },

        
        /**
         * when the class name <select> changes, store its value
         */
        _select: function(i) {
            var data = this.$form.getData();
            this.selectedClass = data.class ?? '';
        },


        /**
         * find the first currently selected image in the editor (if one exists)
         */
         _getCurrent: function () {
            var t = this.selection.getCurrent(),
                e = this.inspector.parse(t),
                i = $R.dom(t).closest("figure");

            return i
        },


        /**
         * removes all classes from DOM element
         */
         _removeClasses: function(e) {
            if( this.opts.imageClasses ) {
                this.opts.imageClasses.forEach(function(styleOption) {
                    styleOption.class.split(" ").forEach( function(className) {
                        e.removeClass( className );
                    });
                });
            }
            return e;
        },
    });
})(Redactor);