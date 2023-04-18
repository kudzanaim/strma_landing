

// i. Main Container
var Home = {
    markUp(){
        var output = `
            <div > 
                <h1 class="headerTest">Artist Dashboard</h1>
            </div>
        `;
        return output
    },
    render(){        
        // Remove Spinner
        $(".apploadcontainer_art").remove();
        Totals.render();
        dashboardMain.render_dashboard(dashboardMain.getData("widgets"));
    }
}

// ii. Total objects on Home Page
var Totals = {
    getstats:function(){
        // i. Get data from Data Method,  
        State.getStats();
    },
    // b. Map thru data and render to DOM
    render: function(){
        // i. Get HTML Page
        var pageHeader = Home.markUp();

        // ii. render header & SmallTotal Widgets
        var totalsContainer = `<div class="totalsCont"></div>`;

        // ii. create stats object
        var totals_Values = State.totals;
        var totalItems = [
            {title:"Singles<br/>Uploaded", value: abbreviateNumber(totals_Values.singlesUploaded), style:"singlesC ripple"},
            {title:"Albums<br/>Uploaded", value: abbreviateNumber(totals_Values.albumsUploaded), style:"singlesC ripple"},
            {title:"Total<br/>Streams", value: abbreviateNumber(State.totalStreams), style:"singlesC ripple"},
            {title:"Royalties<br/>Earned", value: `$`+ abbreviateNumber(totals_Values.totalRoyalties) , style:"singlesC ripple"}
        ];
        // ii. Render Header into DOM and append totals Container to DOM
        $(".root").html( pageHeader );
        $(".root").append( totalsContainer );

        // iii. Map thru the Totals Data and pass data to MrkUp generating Method
        totalItems.map( function(item, index){     // will map thru users database to get Music Portfolio information
            var t = Totals.markUp(item.title.trim(), item.value, item.style );
                return  $(".totalsCont").append( t) 
        })

    },
    // c. Generate MarkUp
    markUp: function(title_, value, styleClass){
        var output = `
            <div class="`+ styleClass +`">
                
                <div class="card-title">`+ title_ +`: </div>
                <div class="card-value">`+ (value) +` </div>
            </div>
        `;
        return output
    }
}

// iii. Main DashBoard Elements
var dashboardMain = {
    appDataLoaded: function(){

        // 1. Get _MostPopular data_ Database
        var get_data_promise = new Promise( function(res, rej){
            // a. Get Songs
            var songs_ = [];        var sorted_Array;         var artistName = State.user.artistName; // Must replace with Name from Actual User Database

            fbxe.database().ref("songs").orderByChild("artist").equalTo(artistName).once("value").then( function(snapshot){
                var data = ( snapshot.val() != null ) ? Object.values(snapshot.val()) : [];
                songs_.push(data);
            })
            // b. Sort Song Array
            .then(function(){
                sorted_Array = songs_[0].sort(function(a,b){
                    return b.streamCount - a.streamCount
                })
            })
            // c. Return sorted Array
            .then(function(){
                // If Array empty or not
                if( sorted_Array.length != 0 && sorted_Array.length == songs_[0].length){
                    // clearInterval(setCheck);
                    State.mostPopular = sorted_Array;
                    // ii. if Data Length > 5
                    if( State.mostPopular.length > 5){   State.mostPopular.length = 5;    }
                } 
                else{
                    // clearInterval(setCheck);
                    State.mostPopular = [];
                }
                // Resolve Main Promise
                res()
            })
        })

        // 2. Dashboard Widget Array
        .then(function(){
            State.dashboard_widgets = [
                {title:"Account Balance", style:"activities"},
                {title:"Download Statistics", style:"activities"},
                {title:"Quick Upload", style:"activities"},
                {title:"Recent Activity", style:"activities1"},
                {title:"Most Popular", style:"activities"}
            ];
        })

        // 3. Dispatch Home Render Resdy
        .then(function(){
            homeRenderReady()
        })
    },
    // Get data after object instatiatioon
    getData: function(type){
            switch(type){
                case "widgets":
                    return State.dashboard_widgets
                case "activities":
                    return State.activities
                case "royalties":
                    return State.royaltiesData
                case "streams":
                    return State.streamsData
                case "most_popular":
                    return State.mostPopular
            }
    },
    // Render Widgets to DOM
    render_dashboard: function(widgets){
        
        // Define Widget container markup
        var small_widget_container = `<div class="smllWdgtCont"></div>`;
        
        // Render container for smaller widgets
        $(small_widget_container).insertAfter(".totalsCont");

        // Remove and Add Logged in class to body
        $("body").removeClass("body-login-main");
        $("body").addClass("body-logged-in");

        // b. Map thru widget array and render to DOM
        widgets.map( function(item, index){
            switch( item.title){
                
                case "Recent Activity":
                    var output = dashboardMain.markup( item.title, item.style );
                    var activity_array = dashboardMain.getData("activities")
                    $(".root").append( output );
                    return dashboardMain.renderAccntActivity( activity_array )

                case "Account Balance":
                    var output = dashboardMain.markup( item.title, item.style );
                    var royaltiesArray_ = dashboardMain.getData("royalties");
                    
                    // i. Append Widget
                    $(".smllWdgtCont").append( output );
                    // ii. Apppend Items inside Widget
                    return royaltiesWidget.render(royaltiesArray_)

                case "Download Statistics":
                    var output = dashboardMain.markup( item.title, item.style );
                    var streamsArray_ = dashboardMain.getData("streams");
                    
                    // i. Append Widget
                    $(".smllWdgtCont").append( output );
                    // ii. Apppend Items inside Widget
                    return streamsWidget.render(streamsArray_)

                case "Most Popular":
                    var output = dashboardMain.markup( item.title, item.style );
                    var mst_popular_Array = dashboardMain.getData("most_popular");
                    
                    // i. Append Widget
                    $(".smllWdgtCont").append( output );
                    // ii. Apppend Items inside Widget
                    return mostPopular.render(mst_popular_Array)

                case "Quick Upload":
                    var output = dashboardMain.markup( item.title, item.style );
                    
                    // i. Append Widget
                    $(".smllWdgtCont").append( output );
                    // ii. Apppend Items inside Widget
                    return quickUploadWidget.render()

                default:
                    var output = dashboardMain.markup( item.title, item.style );
                    return $(".smllWdgtCont").append( output )
            }              
        })
    },
    // generate widget markup
    markup: function(widget_name, style_){
        switch (widget_name) {

            // a. Account Balance Widget
            case "Account Balance":
                var currentYear = new Date().getFullYear();
                var annualTotal = abbreviateNumber((State.totalStreams * 0.00033));
                var markup_ = `
                <div class="`+style_+`">
                    <div class="activity">`+widget_name+`</div>
                    <div class="accntAnnualTotal">
                        <div class="annualTotalVal"><span class="dlSign">$</span>`+ annualTotal +`</div>
                        <div class="annualTotalHeadr"> Total Earnings `+currentYear+`</div>
                    </div>
                    <div class="RoyaltyItemsCont">  </div>
                </div>`;
                return markup_
 
            // b. Streams Widget
            case "Download Statistics":
                var currentYear = new Date().getFullYear();
                var annualTotal = abbreviateNumber(State.totalStreams);
                var markup_ = `
                <div class="`+style_+`">
                    <div class="activity">`+widget_name+`</div>
                    <div class="streamAnnualTotal">
                        <div class="annualTotalstream"><span class="dlSign"></span>`+ annualTotal +`</div>
                        <div class="annualTotalHeadr">Total Streams to date</div>
                    </div>
                    <div class="StreamsItemsCont">  </div>
                </div>`;
                return markup_

            // c. Most Popular Widget
            case "Most Popular":
                var markup_ = `
                <div class="`+style_+`">
                    <div class="activity">`+widget_name+`</div>
                    <div class="headerContMstPop">
                                <div class="activity_name">Song Title</div>
                                <div class="activity_name1">Streams</div>
                    </div>
                    <div class="popularSongsCont">  </div>
                </div>`;
                return markup_

            // d. Quick Upload Widget
            case "Quick Upload":
                var markup_ = `
                <div class="`+style_+` uploadItemMobile">
                    <div class="activity">`+widget_name+`</div>
                    <div class="buttonQckUpload">  </div>
                </div>`;
                return markup_

            default:
                var markup_ = `<div class="`+style_+`"><div class="activity">`+widget_name+`</div></div>`;
                return markup_
        }
    },
    renderAccntActivity: function(temp_Array_){
        // a. Get Data Array
        var temp_Array = temp_Array_;

        // Trim Array to 12 items
        temp_Array.length = ( temp_Array.length >= 12)? 12:temp_Array_.length;

        // b. Append Containers to Activity DIV
        var conteiner_Activity =  this.activityContainerMkUp();
        $(".activities1").append(conteiner_Activity);

        // c. Map thru activities and render Activity Container
        temp_Array.map( function(item, index){
            if( item.date ){
                var output = `
                    <div class="activityCont_ ripple">
                        <div class="nameACT ripple">`+item.activity+`</div>
                        <div class="dateACT">`+item.date+`</div>
                    </div>
                `;
                // if rendering last item
                if( index == (temp_Array.length - 2)  ){ 
                }
                return $(".itemContAct").append( output )
            }
        })
    },
    activityContainerMkUp: function(){
        var output = `
            <div class="acctActivityGrid">  
                <div class="headerContAct" >
                        <div class="activity_name"> Activity </div>
                        <div class="activity_name1" > Date </div>
                </div>
                <div class="itemContAct"></div>
            </div>`;
        return output
    }    
}

// a. account balance Widget
var royaltiesWidget = {
    markUp: function(period_, amount_){
        var output = `
            <div class="royaltyItem">
                <div class="royalty_period">`+period_+`</div>
                <div class="royalty_amount">$`+(amount_)+`</div>
            </div>
        `;
        return output
    },
    render: function(itemsArray_){
        // i. Get royalty data
        var items_ =  itemsArray_;
        
        // ii. Map thru widget items
        items_.map( function(item, index){ 
            var markUp = royaltiesWidget.markUp( item.period, abbreviateNumber(item.value));
            return $(".RoyaltyItemsCont").append(markUp)
        })
    }
}
// b. streams widget
var streamsWidget = {
    markUp: function(period_, amount_){
        var output = `
            <div class="streamItem">
                <div class="royalty_period">`+period_+`</div>
                <div class="royalty_amount">`+ amount_ +`</div>
            </div>
        `;
        return output
    },
    render: function(itemsArray_){
        // i. Get royalty data
        var items_ =  itemsArray_;
        
        // ii. Map thru widget items
        items_.map(function(item){ 
            var item_ = abbreviateNumber(item.value);
            var markUp = streamsWidget.markUp( item.period, item_);
            return $(".StreamsItemsCont").append(markUp)
            
        })

    }   
}
// c. most popular widget
var mostPopular = {
    markUp: function( sngTitle_, artist_, streamCount_ ){
        var output = `
            <div class="mstPopItem ripple">
                <div class="mstPopSongTitle"><div class="mstpop_insideItem">`+ sngTitle_ +`</div></div>
                <div class="mstPopArtist"><div class="mstpop_insideItem">`+ artist_ +`</div></div>
                <div class="mstPopStreamCount"><div class="mstpop_insideItem">`+ streamCount_ +`</div></div>
            </div>
        `;
        return output
    },
    render: function(itemsArray_){
        // i. Get royalty data
        var items_ =  itemsArray_;
        
        // ii. Map thru widget items
        items_.map( function(item, index){ 
            var markUp = mostPopular.markUp(  item.songTitle, item.artist, abbreviateNumber(item.downloads) );
            return $(".popularSongsCont").append(markUp)
            // console.log( item)
        })
    }
}
// d. Quick upload Widget
var quickUploadWidget = {
    markUp: function(){
        var output = `
            <div class="uploadItem ripple" onclick="uploadSong(this)">
                <svg  class="single_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 487.001 487.001" style="enable-background:new 0 0 487.001 487.001;" xml:space="preserve"><g><g>
                    <g><path d="M83.389,472.892c46.052,0,83.385-37.334,83.385-83.385c0-0.021-0.003-0.047-0.003-0.067h0.003V118.911h267.828v193.182    c-9.582-3.842-20.029-5.975-30.984-5.975c-46.052,0-83.384,37.334-83.384,83.385c0,46.053,37.329,83.389,83.382,83.389    c46.054,0,83.386-37.334,83.386-83.385c0-0.021-0.002-0.047-0.002-0.067h0.002V118.911V14.109H434.6H166.773H114.37v104.802    v193.182c-9.583-3.842-20.03-5.975-30.985-5.975C37.333,306.119,0,343.453,0,389.503C0,435.556,37.336,472.892,83.389,472.892z" data-original="#000000" fill="#ffffff"/>
                </g></g></g>
                </svg>
                <div class="uploadtxt">UPLOAD SINGLE</div>
            </div>

            <div class="uploadItem ripple"  onclick="uploadSong(this)">
            <svg class="album_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"  viewBox="0 0 417.027 417.027" style="enable-background:new 0 0 417.027 417.027;" xml:space="preserve" class=""><g><g>
                <polygon points="110.647,83.942 322.464,83.942 285.127,3.231  " data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                <polygon points="362.397,313.626 417.027,288.352 362.397,170.267  " data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                <polygon points="16.839,127.339 0,135.135 16.839,171.521  " data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                <path d="M34.502,413.796h314.166V99.644H34.502V413.796z M127.082,288.039c9.804-3.911,19.761-4.509,27.633-2.293v-51.979   c-0.016-0.129-0.042-0.253-0.042-0.381v-35.017c0-2.677,2.17-4.841,4.853-4.841l87.253-16.158c2.669,0,4.837,2.158,4.837,4.833   v25.407c0.085,0.469,0.133,0.942,0.133,1.436v93.649c0,1.306-0.325,2.532-0.897,3.618c-2.722,9.27-11.723,18.438-24.294,23.46   c-18.177,7.253-36.912,3.105-41.849-9.27c-4.929-12.371,5.797-28.28,23.97-35.518c9.796-3.907,19.747-4.492,27.63-2.284v-58.709   l-66.147,12.267v69.489c0,1.31-0.329,2.544-0.9,3.626c-2.725,9.27-11.722,18.423-24.299,23.443   c-18.174,7.254-36.906,3.106-41.844-9.269C98.176,311.189,108.908,295.288,127.082,288.039z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/></g></g>
            </svg>
                <div class="uploadtxt">UPLOAD ALBUM</div>
            </div>
        `;
        return output
    },
    render: function(){
        var markup = quickUploadWidget.markUp();
        return $(".buttonQckUpload").append(markup)
    }
}

function abbreviateNumber(number) {
    var SI_POSTFIXES = ["", " k", " Million", " Billion", " Trillion"];
    var tier = Math.log10(Math.abs(number)) / 3 | 0;
    if(tier == 0) return parseFloat(number).toFixed(2);
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    var formatted = scaled.toFixed(2) + '';
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2);
    return formatted + postfix;
}

 
