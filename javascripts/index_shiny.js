lfd = {}
lfd.site = {}

lfd.site = function() {
    var self = this;

    this.$imgLogoWater = $('.img-logo-water');
    this.$logoSmallCog = $('.img-logo-small-cog');
    this.$logoLargeCog = $('.img-logo-large-cog');
    this.$imgLogoSmallCog = $('.img-logo-small-cog img');
    this.$imgLogoLargeCog = $('.img-logo-large-cog img');
    this.$imgLogoFire = $('.img-logo-fire');
    this.$imgLogoText = $('.img-logo-text');
    this.$imgLogoSpiel = $('.img-logo-spiel');
    this.$imgBrowser = $('.img-browser', '#what-are-web-applications');

    // Creative simple ...
    this.$creativeSell = $('.sell', '#creative-simple-web-solutions');
    this.$creativeAnimation = $('.animation', '#creative-simple-web-solutions');

    // Random cogs
    this.$largeCog1 = $('.img-large-cog-1');
    this.$imgLargeCog1 = $('.img-large-cog-1 img');
    this.$xLargeCog1 = $('.img-xlarge-cog-1');
    this.$imgXLargeCog1 = $('.img-xlarge-cog-1 img');
    this.$smallCog1 = $('.img-small-cog-1');
    this.$imgSmallCog1 = $('.img-small-cog-1 img');

    // Hand crafted web applications ...
    this.$handCraftedSell = $('.sell', '#crafted-precise-applications');
    this.$handCraftedAnimation = $('.animation', '#crafted-precise-applications');
    
    this.$handCrafted = $('#crafted-precise-applications');
    this.$imgSpanner = $('.img-spanner img');
    this.$imgPen = $('.img-pen img');


    // Tested web applications ...
    this.$testedSell = $('.sell', '#testing');
    this.$testedAnimation = $('.animation', '#testing');
    this.$imgHammer = $('.img-hammer img');
    this.$imgBoxingGlove = $('.img-boxing-glove img');

    // Event bindings
    $(window).resize(function(){
        self.resizeSection.call(self);
    });

    $(window).scroll(function(){
        self.scroll.call(self);
    });


    $('#page').height('4500px')

    // Initialise
    self.resizeSection(self);
    self.scroll(self);


    
}

lfd.site.prototype.resizeSection = function() {
    var self, dimensions
    // self = this;
    // dimensions = self.getWindowDimensions();

    // sectionHeight  =  dimensions.height < 640 ? 640 : dimensions.height;
    // $('section').css('height', sectionHeight);
};

lfd.site.prototype.getWindowDimensions = function() {
    var windowHeight, windowWidth;

    windowHeight = $(window).height();
    windowWidth = $(window).width();

    return {
        height: windowHeight,
        width: windowWidth
    };

}

lfd.site.prototype.scroll = function() {
    var self, dimensions, middle, scrollPosition, newPosition, max, eq;
    self = this;

    dimensions = self.getWindowDimensions();
    scrollPosition = $(window).scrollTop();
    middle = dimensions.width/2;

    // console.log( scrollPosition );

    max = 1380;

    // Logo Water and cogs
    // ====================
    max = 360;
    eq = function(x){
        return 100 - x/5;
    }

    self.$imgLogoWater.css('position', 'fixed');
    if(scrollPosition < max){        
        self.$imgLogoWater.css('top', eq(scrollPosition) + 'px');
        self.$logoSmallCog.css('top', eq(scrollPosition) + 305 + 'px');
        self.$logoLargeCog.css('top', eq(scrollPosition) + 343 + 'px');
    }else{
        self.$imgLogoWater.css('top',  eq(max) + 'px');

        if( scrollPosition < 1143){
            self.$logoSmallCog.css('position', 'fixed');
            self.$logoLargeCog.css('position', 'fixed');
            self.$logoSmallCog.css('top', eq(max) + 305 + 'px');
            self.$logoLargeCog.css('top', eq(max) + 343 + 'px');
        }
    }

    // Logo Fire
    // =============
    max = 387;
    eq = function(x){
        return 1000 - x * 2;
    }
    
    self.$imgLogoFire.css('position', 'fixed');
    if( scrollPosition < max ) {
        self.$imgLogoFire.css('top', eq(scrollPosition) + 'px');
        self.$imgLogoText.fadeOut();
    }else{
        self.$imgLogoFire.css('top', eq(max) + 'px');
        self.$imgLogoText.fadeIn();
    }

    // Logo text
    // =============
    max = 620;
    eq = function(x){
        return 1500 -  x * 1.5;
    }

    self.$imgLogoText.css('position', 'fixed');
    if( scrollPosition < max ) {
        self.$imgLogoText.css('top', eq(scrollPosition) + 'px');
        self.$imgLogoSpiel.fadeOut();
    }else{
        self.$imgLogoText.css('top', eq(max) + 'px');
        self.$imgLogoSpiel.fadeIn();
    }
    
    // Logo spiel
    // =============
    max = 710;
    eq = function(x){
        return 1700 -  x * 1.5 ;
    }

    self.$imgLogoSpiel.css('position', 'fixed');
    if( scrollPosition < max ) {
        self.$imgLogoSpiel.css('top', eq(scrollPosition) + 'px');
    }else{
        self.$imgLogoSpiel.css('top', eq(max) + 'px');
    }

    // Logo cog
    // ==========
    self.rotateElement( self.$imgLogoLargeCog, scrollPosition + 16, -1);
    self.rotateElement( self.$imgLogoSmallCog, scrollPosition, 1.5);


    // Post-logo transformation
    // =============
    if( scrollPosition > max ) {
        // self.$imgLogoText.fadeTo(0, 1 - (scrollPosition-max)/200)
        self.positionFixedToAbsolute(self.$imgLogoWater, max)
        self.positionFixedToAbsolute(self.$imgLogoFire, max)
        self.positionFixedToAbsolute(self.$imgLogoText, max)
        self.positionFixedToAbsolute(self.$imgLogoSpiel, max)
        self.$creativeAnimation.fadeIn();

        eq = function(x){
            return max - x;
        }

    }else{
        self.$creativeAnimation.fadeOut();
    }

    if( scrollPosition > 1143) {
        self.$creativeSell.fadeIn();
        self.positionFixedToAbsolute(this.$logoLargeCog,1143)
        self.positionFixedToAbsolute(this.$logoSmallCog,1143)
        self.rotateElement( self.$imgLargeCog1, scrollPosition, 1);
        self.rotateElement( self.$imgXLargeCog1, scrollPosition, 1);
        self.rotateElement( self.$imgSmallCog1, scrollPosition, -3.0);
    }else{
        self.$creativeSell.fadeOut();
    }

    if( scrollPosition > 1700 ) {
        self.$handCraftedAnimation.fadeIn();
        self.rotateElement(self.$imgSpanner,  180 * Math.sin(scrollPosition/40), 0.33 )
        self.rotateElement(self.$imgPen,  50 * Math.sin(scrollPosition/20), 0.1 )
        this.$imgPen.css('top', Math.sin(scrollPosition/10) * 5)
    }else{
        self.$handCraftedAnimation.fadeOut();
    }
    
    if( scrollPosition > 2000){
        self.$handCraftedSell.fadeIn();
    }else{
        self.$handCraftedSell.fadeOut();
    }

    if( scrollPosition > 2400 ){
        self.$testedAnimation.fadeIn();
        self.rotateElement(self.$imgHammer,  240 + 180 * Math.sin(scrollPosition/30), 0.10 )
        self.rotateElement(self.$imgBoxingGlove,  50 * Math.sin(scrollPosition/25), 0.15 )
        this.$imgBoxingGlove.css('right', Math.sin(scrollPosition/15) * 50)
    }else{
        self.$testedAnimation.fadeOut();
    }
    
    if( scrollPosition > 2700 ){
        self.$testedSell.fadeIn();
    }else{
        self.$testedSell.fadeOut();
    }

    if(scrollPosition > 3227 || $(window).height() + scrollPosition > $('#page').height() ){
        $('#this-is-low-fire-danger').fadeIn();
    }else{
        $('#this-is-low-fire-danger').fadeOut();
    }




};

lfd.site.prototype.positionFixedToAbsolute = function($el, offset) {
    if( $el.css('position') != 'absolute' ) {
        var top = parseInt($el.css('top'));
        
        $el.css('position', 'absolute');
        $el.css('top', offset + top + 'px');
    }
};

lfd.site.prototype.positionAbsoluteToFixed = function($el) {
    if( $el.css('position') != 'fixed' ) {
        var position = $el.position();
        
        $el.css('position', 'fixed');
        $el.css('top', position.top + 'px');
    }
};

lfd.site.prototype.rotateElement = function($el, degrees, multiplier) {
        
    $el.css({
        '-webkit-transform':'rotate(' + degrees * multiplier + 'deg)',
        '-moz-transform':'rotate(' + degrees * multiplier + 'deg)',
        '-o-transform':'rotate(' + degrees * multiplier + 'deg)',
        '-ms-transform':'rotate(' + degrees * multiplier + 'deg)',
        'transform':'rotate(' + degrees * multiplier + 'deg)'
    });
};

$(document).ready(function(){
    new lfd.site();
});
