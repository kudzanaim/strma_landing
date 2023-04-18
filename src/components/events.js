


// Receive User Data
window.addEventListener("getAllMetrics", function(data){
    // Get _MostPopular data_ Database
    Totals.getstats();
})

// Dispatch Event for User Data
var getAllMetrics = function(data){
    var event = new CustomEvent('getAllMetrics',{
        detail:{
            userData: data
        }
    })
    window.dispatchEvent(event)
}










// Stats Ready
window.addEventListener("statsready", function(data){
    // Get _MostPopular data_ Database
    dashboardMain.appDataLoaded();
})
// Dispatch Event for User Data
var statsready = function(data){
    var event = new CustomEvent('statsready',{
        detail:{
            userData: data
        }
    })
    window.dispatchEvent(event)
}





// Get Widget Data & Calculations
window.addEventListener("homeRenderReady", function(data){
    // Render Home
    Home.render();
})
// Dispatch Event for User Data
var homeRenderReady = function(data){
    var event = new CustomEvent('homeRenderReady',{
        detail:{
            widgetData: data
        }
    })
    window.dispatchEvent(event)
}


// Get Stats for all widgets
window.addEventListener("getStats", function(data){
    // Render Home
    Totals.render();
})
// Dispatch Event for User Data
var getStatsAll = function(data){
    var event = new CustomEvent('getStats',{
        detail:{
            getStats: data
        }
    })
    window.dispatchEvent(event)
}



// New Activity
window.addEventListener("activityAdded", function(data){
    // Update Database
    State.dbRefUpdate();
})
// Dispatch New Activity
var activityAdded = function(data){
    var event = new CustomEvent('activityAdded',{
        detail:{
            activity: data
        }
    })
    window.dispatchEvent(event)
}