// Try load Web App
try{
    // 1. instatiate history object & router
    window.RouterObject = Router;
    window.History_ = RouterObject.history_object;
    window.Pager_ = new Pager();
    RouterObject.initHistory();
}

// If fail, show this
catch(error){
    // If cant load, then show browser error
    $(".App").load("/components/landing/index.html").addClass("body_main_")
}

// Artist Corner Login Landing
var artistCorner = function(){
    // If Browser is Supported Load regualr code
    try {
        // undeclared global variables for listeners
        window.dataChangeListener = ''; window.chatChangeListener = ''; window.messageListener = '';
        window.activityChangeListener = '';
        
        // 1. instatiate App State
        window.State = new Store.constructor();
        
        // 3. On AppLoad, instatiate Navigation and render Navigation
        window.navigation = new Navigation.constructor();
        State.navigation.currentState = navigation.getNavItems();
        
        // 4. instatiate Firebase DB for songs
        window.fireInit_ = (window.fireInit_ == undefined)? new initFirebase.constructor() : window.fireInit_;
        
        // 5. Load home Page into DOM 
        var int_app_mn_ = setInterval(() => {
            if(window.f_as != undefined && window.f_st != undefined){
                clearInterval( int_app_mn_ );
                Login.sState();
            }
        }, 10);
    
    }
    // Switch Error resolver
    catch (error) {
        console.log(error.message)
        
        switch(error.message){
            case "firebase is not defined":
                RouterObject.Router("Landing")
                return alert("Oops. Seems you have No internet Connection")
            default:
                return $(".App").load("/components/landing/index.html").addClass("body_main_")
        }
    }
}