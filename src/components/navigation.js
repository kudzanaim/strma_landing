// All the View Based Classes are stored here
var renderNavigation =  {
    // Render Navigation into DOM
    renderNav: function() {
        var nav = navigation.getNavItems();
        var mobile_navigation = this.mobileNavigation();
        var markUp;
        var rightnav = ``;
        var leftnav = ``;

        // i. Render mobile navigation
        $(".mobile_navigation").append(mobile_navigation);

        // ii. LIsten for when navArray mapping is doe
        var setListener = setInterval(function(){
            if (markUp.length == nav.length) {
                clearInterval(setListener);
                var nav_ = ``+rightnav+`<div class="leftnavcont">`+leftnav+`</div>`;
                renderNavigation.appendToDOM(nav_)
            }
        })

        // iii. map thur array stateObject and return markUp objects
        markUp = nav.map(function(item, index) {
            switch(item.title){
                case "Home":
                    var output = `<div class="leftnavcont"><div class="logowelcome dash" data-name="`+item.title+`" onclick="`+ item.onclick +`">
                    <img class="`+ item.style +` dash" src="/assets/icon/strma_logo.png" ><div class="logoDetail dash">| Artist Corner</div></div></div>`;
                    leftnav+=output;
                    return output
                default:
                var output = `<div class="`+ item.style +`" onclick="` + item.onclick + `" data-name="`+item.title+`"> ` + item.title + `</div>`;
                rightnav+=output;
                return output
            }
        });
    },
  
    // Append Navigation Markup to DOM
    appendToDOM: function(nav) {
        var markUp_ = nav;
        return $(".navigation").append(nav);
        markUp_.map(function(navitem){
            return $(".navigation").append(navitem);
        })
    },

    // Mobile navigation
    mobileNavigation: function(){
        var output = `
                <div class="mobile_nav_item mobile_overview" onclick="nav_click_mobile(this)">Overview</div>
                <div class="mobile_nav_item mobile_mymusic" onclick="nav_click_mobile(this)">My Music</div>
                <div class="mobile_nav_item mobile_accnt" onclick="nav_click_mobile(this)">Upload</div>
                <div class="mobile_nav_item mobile_payment" onclick="nav_click_mobile(this)">Payment</div>
                <div class="mobile_nav_item mobile_account" onclick="nav_click_mobile(this)">Account</div>
        `;
        return output
    },

    nav_mobile_click: function(e){
        
        // Get Page Name
        var pagename = $(e).text().trim();

        // Clear all Active Buttons
        $(".mobile_nav_item").removeClass("active_mobile_navbutton");

        // Highlight active Button
        $(e).addClass("active_mobile_navbutton");

        // Page change onCLick
        switch(pagename){
            case "Overview":
                return RouterObject.Router("Home")
            case "My Music":
                return RouterObject.Router("My Music")
            case "Payment":
                return RouterObject.Router("Payment Mobile")
            case "Upload":
                return Uploads.mobileSelectUploadType()
            case "Account":
                return RouterObject.Router("My Account")
        }
    }

}

window.nav_click_mobile = function(param){
    return renderNavigation.nav_mobile_click(param)
}


window.renderNavigation = renderNavigation;

