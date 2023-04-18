

// c. Application State store
var Store = {
    constructor: function(){  
        this.called = 0;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        this.navigation = {
            currentState: undefined,
            state: true
        };
        this.uploads = {
            previewPane: {
                artwork_wrk_file: undefined,
                text_meta_length: 0
            },
            editState: false 
        };  
        this.totals = {
            albumsUploaded: undefined,
            singlesUploaded:undefined,
            totalStreams:undefined,
            totalRoyalties:undefined,
            royaltybreakDown: {
                weekly:0,
                monthly:0,
                yearly:0
            },
            streamBreakDown: {
                daily:0,
                weekly:0,
                monthly:0,
                yearly:0
            },
            loadState: 0
        }
        this.searchState = "undefined";
        this.currentAlbumInEditOpen = "undefined",
        this.activities = [],

        this.chatListener =  function(){
            var chat_length = State.user.inbox.length;
            // listen for chat length changes
            chatChangeListener = setInterval( function(){
                if( chat_length != State.user.inbox.length ){
                    State.intervalKiller();
                    State.setListener();
                    return State.dbRefUpdate()
                }
            },100 );
        },
        this.messageListener =  function(){
            // store current state in session storage so its immutable to new change
            sessionStorage.setItem("inbox", JSON.stringify( State.user.inbox) );
            var inbox = JSON.parse(sessionStorage.getItem("inbox"));
    
            // listen for new messages
            messageListener = setInterval(function()  {
                inbox.map( function(chat, index_cht){
                    if( chat != "appended here" && State.user.inbox.length > 1 ){
                        if( State.user.inbox[index_cht].messages.length != inbox[index_cht].messages.length){
                            // kill listener && re-set listener
                            State.intervalKiller();
                            State.setListener();
                            
                            return State.dbRefUpdate() 
                        }
                    }
                })
            }, 500);
        },
        this.datalistener = function(){
            // get current state of object and store in variables
            var email_ = State.user.accountDetails.email;           var password_ = State.user.accountDetails.password;     var phoneNumber_ = State.user.accountDetails.phoneNumber;
            var city_ = State.user.address.city;                    var country_ = State.user.address.country ;             var streetAddr_ = State.user.address.streetAddress;
            var artistName_ = State.user.artistName;                var firstName_ = State.user.firstName;                  var lastName_ = State.user.lastName;
            var paymnt_firstName = State.user.payments.current.firstName;        var paymnt_lastName = State.user.payments.current.lastName;
            var paymnt_Service_ = State.user.payments.current.paymentService;    var paymnt_phoneNumber = State.user.payments.current.phoneNumber;
            var biography_ = State.user.data.biography; var profilePic = State.user.profileImageUrl;
            
            // listen for changes
            dataChangeListener = setInterval( function(){
                if(
                    State.user.accountDetails.email != email_ || State.user.accountDetails.password != password_ || State.user.data.biography != biography_ ||
                    State.user.accountDetails.phoneNumber != phoneNumber_ || State.user.address.city != city_ || State.user.address.country != country_ || 
                    State.user.address.streetAddress != streetAddr_ || State.user.artistName != artistName_ || State.user.firstName != firstName_ || 
                    State.user.lastName != lastName_ || State.user.payments.current.firstName != paymnt_firstName || State.user.payments.current.lastName != paymnt_lastName || 
                    State.user.payments.current.paymentService != paymnt_Service_ || State.user.payments.current.phoneNumber != paymnt_phoneNumber || 
                    State.user.profileImageUrl != profilePic
                ){  
                    // kill listener
                    clearInterval( dataChangeListener);
                    // alert user
                    State.dbRefUpdate()
                    // re-call listener
                    State.setListener();
                }
            },100);
        },
        this.intervalKiller = function(){
            var killer = function(){
                clearInterval( messageListener );
                clearInterval( chatChangeListener );
                clearInterval( dataChangeListener );
                clearInterval( activityChangeListener );
            }
            return killer()
        },
        this.setListener = function(){
            // console.clear();
            var setListenerData = function(){
                State.datalistener();
                State.messageListener();
                State.chatListener();
                // State.activityListener();
            }
            return setListenerData()
        },
        this.contactSupport = function(subject, message_){
            // push message to chats
            var date = new Date().getTime();
            var chatLength = State.user.inbox.length;
            State.user.inbox.push({
                chat_id:chatLength, subject: subject, date: date, recipient:"Support", messages:[
                    {message_id:0, sender:"Me", message: message_}
                ]
            })
            // push message to new support messages
            var artist = State.user.artistName;
            var email = State.user.accountDetails.email;
            var phone = State.user.accountDetails.phoneNumber
            var sender = {artistName:artist, email: email, phoneNumber:phone};
    
            // Send Message to Dash Support
            // State.user.toSupport.push(
            //     { sender:sender, subject:subject, message:message_, date: date }
            // )
        },
        this.dbRefUpdate = function(){
            // push new State to User Ref
            var userKey = State.userKey;
            var new_state = State.user;
            return f_as.database().ref('artists/'+userKey).set(new_state)
        },
        // get stats and set to State
        this.getStats = function(){
            // Query this artists albums
            var k = State.userKey; 
            var y = new Date().getFullYear();
            var ROYALTY_UNIT = 0.00033
    
            f_as.database().ref('metrics/'+k+'/'+y).once('value', function(snp){
                var yr = (snp.child('count').val()!=null)? snp.child('count').val() : 0;
                
                State.totals.totalStreams = yr;
                State.totals.totalRoyalties = parseFloat(yr*ROYALTY_UNIT);
    
                // Query this artists albums
                fbxe.database().ref("/songs").orderByChild("artist").equalTo(State.user.artistName).once("value").then( function(snap){
                    State.totals.singlesUploaded = snap.numChildren();
                    // Query this artists albums
                    fbxe.database().ref("/albums").orderByChild("Artist").equalTo(State.user.artistName).once("value").then( function(snap){
                        State.totals.albumsUploaded = snap.numChildren();
                        State.totals.loadState = 1;
    
                        // Set State roaylties
                        State.royaltiesData = [];   State.streamsData = [];
    
                        // Query this artists albums
                        var k = State.user.id; 
                        var y = new Date().getFullYear();
                        var m = new Date().getMonth();
                        var w = Math.ceil(((new Date().getDate()/30 )*4)) - 1;
                        var d = new Date().getDay();
    
                        f_as.database().ref('metrics/'+k+'/streams/'+y).once('value', function(snp_streams){
                            f_as.database().ref('metrics/'+k+'/downloads/').once('value', function(snp_downloads){
                                var a = new Object(snp_streams.val());  var b = new Object(snp_downloads.val());
                                delete a.due;   delete b.due;

                                var totalStreamCount = Object.values(a).reduce((sum, item)=>item.count+sum,0);
                                var totalDownloadCount = Object.values(b).reduce((sum, item)=>item.count+sum,0);

                                // Downloads:
                                var daily = (snp_downloads.child(m+'/'+w+'/'+d).val()!=null)? snp_downloads.child(m+'/'+w+'/'+d+'/count').val() : 0;
                                var weekly = (snp_downloads.child(m+'/'+w).val()!=null)? snp_downloads.child(m+'/'+w+'/count').val() : 0;
                                var monthly = (snp_downloads.child(m).val()==null)? 0 : snp_downloads.child(m+'/count').val() ;
                                var total = (snp_downloads.child('count').val()!=null)? snp_downloads.child('count').val() : 0;
                                
                                // Streams:
                                var daily = (snp_streams.child(m+'/'+w+'/'+d).val()!=null)? snp_streams.child(m+'/'+w+'/'+d+'/count').val() : 0;
                                var weekly = (snp_streams.child(m+'/'+w).val()!=null)? snp_streams.child(m+'/'+w+'/count').val() : 0;
                                var monthly = (snp_streams.child(m).val()==null)? 0 : snp_streams.child(m+'/count').val() ;
                                var total = (snp_streams.child('count').val()!=null)? snp_streams.child('count').val() : 0;

                                // Daily
                                State.streamsData.push(     {period:"Daily", value: daily}    );
                                State.royaltiesData.push(     {period:"Daily", value: daily*ROYALTY_UNIT}    );
                                // Weekly
                                State.streamsData.push(     {period:"Weekly", value: weekly}    );
                                State.royaltiesData.push(     {period:"Weekly", value: weekly*ROYALTY_UNIT}    );
                                // Monthly
                                State.streamsData.push(     {period:"Monthly", value: monthly}    );
                                State.royaltiesData.push(     {period:"Monthly", value: monthly*ROYALTY_UNIT}    );
                                // Total
                                State.totalStreams = totalDownloadCount;
                                console.log({totalDownloadCount, totalStreamCount, a,b});
        
                                // Dsipatch event data received
                                statsready();


                            })
                        })
                    })
                })
            })
        },
        this.addActivity = function( activity, songname, album){
            
            // Push activity function
            var push_activity = function(){
                // Get date
                var date = State.dateFormat();
                
                // Push Activity
                var updateActivity = function(activity){
                    // Push new activity
                    State.user.activities.unshift( activity );
                    State.activities.unshift( activity );
                    // Dispatch UpdateDB event
                    activityAdded(activity)
                }

                // Switch thru activity types
                switch (activity) {
                    case "bio": //done
                        // Create Activity object
                        var activity_object = { activity: "Biography Updated", date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "personal": //done
                        // Create Activity object
                        var activity_object = { activity: "Personal Details Changed", date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "contact": //done
                        // Create Activity object
                        var activity_object = { activity: "Contact Details Updated", date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "payment": //done
                        // Create Activity object
                        var activity_object = { activity: "Payment Details Changed", date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "song_upload": //done
                        // Create Activity object
                        var activity_object = { activity: `Uploaded Song: "`+songname+`"`, date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "album_upload": //done
                        // Create Activity object
                        var activity_object = { activity: `Uploaded Album: "`+album+`"`, date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "song_edit": //done
                        // Create Activity object
                        var activity_object = { activity: `Edited Song: "`+ songname +`"`, date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "album_edit": //done
                        // Create Activity object
                        var activity_object = { activity: `Edited Album: "`+album+`"`, date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "song_deleted": //done
                        // Create Activity object
                        var activity_object = { activity: `Deleted Song: "`+songname+`"`, date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                    case "album_deleted": //done
                        // Create Activity object
                        var activity_object = { activity: `Deleted Album: "`+ album +`"`, date: date, style:"activityCont_ ripple" };
                        return updateActivity(activity_object)
                }
            }
            
            // correct objetc if length at 51
            if( State.activities.length >= 51){
                State.activities.splice((State.activities.length-2), 1);
                return push_activity()
            }
            else{
                return push_activity()
            }
    
        },
        this.dateFormat = function(){
            var date_convert = new Date();
            var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
            return date
        },
        this.getActivities = function(){
            var activities = this.user.activities;
            return State.activities = Object.values(activities)
        },
        this.e = function(e){
            eval(e.split(' ').join(''))
        },
        this.et = function(x){
            return sessionStorage.getItem(x)
        },
        this.types = {
            form1:"form1",
            form2:"form2",
            formfb:"form3",
            lgn:'lgn',
            reg:'reg',
            unset:'display:""',
            mail:'@gmail',
            fbconnect:'.fbconnect_js'
        },
        this.elements = {
            fb: $(".fbhide"),
            loginFormCont: $("._loginform_cont_p"),
            regFormCont: $(".registeruser_cont_"),
            socialbtns: $(".social-btns-logn"),
        }
    }

}

window.Store = Store;

