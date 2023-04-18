var Uploads = {
    markUp: function(type_){

        var output_single = `
            <div class="upload_music_container"> 
                <h1 class="headerTest">Upload Music</h1>
                <div class="uploadPageContainer">   </div>
            </div>
            <div class="panePrevCont">
                <h1 class="paneHeader">Preview Pane</h1>
                <div class="lineStyler2">    <div class="L_one1"></div>     </div>
                <div class="no_image">     <p>No Artwork Set</p>   </div>

                <div class="paneItemCont">  
                    <img onchange="" class="test_image" src=null>
                    <audio class="song_player" src=null></audio>
                    <div class="prevMeta">
                        <div class="prevSongTitle"><span class="labelprev">Title:</span><div class="prevValue"> </div></div>
                        <div class="prevArtist"><span class="labelprev">Artist: </span><div class="prevValue"></div></div>
                        <div class="prevProducers"><span class="labelprev">Prod By: </span><div class="prevValue"></div></div>
                        <div class="prevSongYear"><span class="labelprev">Year: </span><div class="prevValue"></div></div>
                    </div>
                    <div class="audioPrevCont ripple2"> 
                        <div class="media-buttons">
                            <img onclick="on_media_click(this)" class="playButton" src="/assets/icon/play.png">
                            <img onclick="on_media_click(this)" class="pauseButton" src="/assets/icon/pause.png">
                        </div>
                        <div class="audio-status-message">No Song Loaded</div>
                    </div>    

                </div>
            </div>
        `;
        var output_album = `
            <div class="upload_music_container"> 
                <h1 class="headerTest">Upload Album</h1>
                <div class="uploadAlbumContainer">   </div>
            </div>
        `;
        switch(type_){
            case "single":
                return output_single
            case "album":
                return output_album
        }
    },
    render: function(type_){
        // i. Get HTML Page
        var pageHTML = Uploads.markUp(type_);

        // iv. add Class to rootElement to add GridTemplate
        $(".root").addClass("uploads");
        
        return $(".root").html( pageHTML)
    },
    uploadSingle: function(e){

        // Route to Uploads Page
        RouterObject.Router("Upload Music", "single");

        // Render Upload Single Widget
        var upload_widget = Uploads.uploadWidget(e);
        $(".uploadPageContainer").append( upload_widget );

    },
    uploadAlbum: function(e){
        // Route to Uploads Page
        RouterObject.Router("Upload Music", "album");

        // Render Album_details widget
        var album_details_widget = Uploads.album_details();
        $(".uploadAlbumContainer").append( album_details_widget );
    },
    flhdlr:function(e){
        var d = $(e)[0].dataset.name;
        if(d=='a'){
            ( $(e)[0].files[0].name.includes('.mp3') == true )? Uploads.ad(e) : ($(e).val(null), alert('Only MP3 can be uploaded!') );
        }
        else if(d=='i'){
            ( $(e)[0].files[0].name.includes('.mp3') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.wav') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.ogg') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.mp4') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.mov') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.wmv') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.3pg') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.flac') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
            ( $(e)[0].files[0].name.includes('.m4a') )? ($(e).val(null), alert('Only images can be uploaded!') ): Uploads.id(e);
        }
    },
    ad:function(e){ $('.alabel').css('display','block'); $('.songFile').css('display','none');  $('.alabelcnt').text( $(e)[0].files[0].name ); },
    id:function(e){ $('.ilabel').css('display','block'); $('.artwork').css('display','none'); $('.ilabelcnt').text( $(e)[0].files[0].name ); },
    uploadWidget: function(uploadType){
        var markUp = `
            <div class="uploadWidget">
                <h1 class="headerTestUpload">`+uploadType+`</h1>
                
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>

                <div class="inputContainer">  
                    <input onkeyup="form_listener_change()" class="upload_field songTitle upld_fld " placeholder="Song Title"  >
                    <div class="labelcntfield">
                        <label class="uploadfieldlabel">Seperate featured artists with a comma</label>
                    </div>
                    <input onkeyup="form_listener_change()" class="upload_field artists upld_fld" placeholder="Featuring Artists Only" >
                    <select onkeyup="form_listener_change()" class="upload_field genre upld_fld" placeholder="Select Genre" data-type="genre">
                        <option value="">Select Genre</option>
                        <option value="urbanswing">Urban Swing</option>
                        <option value="zimdancehall">Zim Dancehall</option>
                        <option value="helmet">Helmet</option>
                        <option value="reggae">Reggae</option>
                        <option value="gospel">Gospel</option>
                        <option value="podcast">Podcast</option>
                        <option value="business">Business</option>
                        <option value="urbangrooves">Urban Grooves</option>
                        <option value="hiphop">Hip Hop</option>
                        <option value="popular">Popular</option>
                        <option value="museve">Museve</option>
                        <option value="sungura">Sungura</option>
                        <option value="afrojazz">Afro-Jazz</option>
                        <option value="mbira">Mbira</option>
                        <option value="afrobeat">Afro Beat</option>
                    </select>
                    <input onkeyup="form_listener_change()" class="upload_field year_created" placeholder="Year song Created"  >
                    <div class="choose_cont">
                            <input onchange="form_listener_change(this)" type="file" class="upload_field_file artwork" placeholder="Song Artwork" data-name="i" accept="image/*" >
                            <div class="browseSongButton ilabel"><div class="ilabelcnt">Upload Artwork</div></div>
                    </div>
                    <div class="choose_cont">
                            <input onchange="form_listener_change(this)" type="file" class="upload_field_file songFile" placeholder="Add Song" data-name="a"  accept="audio/*">
                            <div class="browseSongButton alabel"><div class="alabelcnt">Upload Song</div></div>
                    </div>
                    
                </div>

                <div class="success_upload_song"></div>

                <div class="buttonContainer">
                    <div class="cancel_Upload ripple" onclick="Uploads.c()">Cancel</div>
                    <div class="submit_Upload ripple" onclick="upload_Song()">Upload Song</div>
                </div>
            </div>
        `;
        return markUp
    },
    previewWidget: function(songTitle_, artistName_, producer_, year_){
        var markup = `
            <img onchange="" class="test_image" src=null>
            <audio class="song_player" src=null></audio>
            <div class="prevMeta">
                <div class="prevSongTitle"><span class="labelprev">Title:</span><div class="prevValue"> `+songTitle_+`</div></div>
                <div class="prevArtist"><span class="labelprev">Artist: </span><div class="prevValue">`+artistName_+`</div></div>
                <div class="prevProducers"><span class="labelprev">Prod By: </span><div class="prevValue">`+producer_+`</div></div>
                <div class="prevSongYear"><span class="labelprev">Year: </span><div class="prevValue">`+year_+`</div></div>
            </div>
            <div class="audioPrevCont ripple2"> 
                <div class="media-buttons">
                    <img onclick="on_media_click(this)" class="playButton" src="/assets/icon/play.png">
                    <img onclick="on_media_click(this)" class="pauseButton" src="/assets/icon/pause.png">
                </div>
                <div class="audio-status-message">No Song Loaded</div>
            </div>
        `;
        return markup
    },
    read_image: function(image_file){
        
        // i. render image
        var reader = new FileReader();
        reader.onload = function(e) {   $(".test_image").attr('src', reader.result );   };
        reader.readAsDataURL(image_file);

        // ii. set onchange attribute
        $(".test_image").attr('onchange', "image_onchange()" );
    },
    read_audio: function(audio_file){
        // i. render image
        var reader = new FileReader();
        reader.onload = function(e) {   $(".song_player").attr('src', reader.result );  };
        reader.readAsDataURL(audio_file);
    },
    audio_play_pause: function(song_file){
        // a. read audio file
        Uploads.read_audio( song_file );
        // b. listen for song_load to DOM_element
        var audio_dom_listener = setInterval( function() {
            if( $(".song_player")[0].duration > 0 ){
                
                // i. kill listener
                clearInterval( audio_dom_listener);
                // ii. change status message
                $('.audio-status-message').text("Now Playing...")
                // iii. Play audio Song
                $(".song_player")[0].play();
            }
        },10)
    },
    // Remove Test values in HTML value
    album_details: function(){
        var output = `
        <div class="album_details_cont">
            <h1 class="AD_header">Upload Album</h1>
            <h1 class="AD_headerp">Add album details below</h1>
            <div class="lineStyler">
                <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
            </div>
            <div class="formContainer">
                <input class="upload_field album_title upload_fieldmobile" placeholder="Album Title" >
                <select onchange="Uploads.altype(this)" class="upload_field albumtype upload_fieldmobile" placeholder="Album Type" data-name="albumtype">
                    <option value="">Select Album Type</option>
                    <option value="regular">Regular Album</option>
                    <option value="joint">Joint Collab Album</option>
                    <option value="Riddim">Riddim</option>
                </select>
                <select onkeyup="form_listener_change(e)" class="upload_field albumgenre upload_fieldmobile" placeholder="Select Genre" data-type="genre">
                    <option value="">Select Genre</option>
                    <option value="urbanswing">Urban Swing</option>
                    <option value="dancehall">Dancehall</option>
                    <option value="helmet">Helmet</option>
                    <option value="reggae">Reggae</option>
                    <option value="gospel">Gospel</option>
                    <option value="podcast">Podcast</option>
                    <option value="business">Business</option>
                    <option value="urbangrooves">Urban Grooves</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="popular">Popular</option>
                    <option value="museve">Museve</option>
                    <option value="sungura">Sungura</option>
                    <option value="afrojazz">Afro-Jazz</option>
                    <option value="mbira">Mbira</option>
                    <option value="afroBeat">Afro-Beat</option>
                </select>
                <div style="display:none" class="labelcntfield">
                    <label class="uploadfieldlabel">Seperate artists with a comma</label>
                    <label class="uploadfieldlabelalert"> You will share royalty with these artists</label>
                </div>
                <input style="display:none" class="upload_field constributing_artists upload_fieldmobile" placeholder="Name of Collaborating Artist" >
                <input class="upload_field year upload_fieldmobile" placeholder="Year of Release" >
                <input class="upload_field producer upload_fieldmobile" placeholder="Album Producer" >
                <div style="border-bottom:none" class="choose_cont">
                            <input onchange="form_listener_change()" type="file" class="upload_field_file album_artwork upload_fieldmobile" placeholder="Song Artwork">
                            <div class="browseSongButton">Upload Artwork</div>
                </div>
            </div>
            <div class="next_button" onclick="get_album_details()">Next</div>
        </div>
        `;
        return output
    },
    altype:function(e){
        if( $(e)[0].value=='joint'){  
            $('.constributing_artists').css({'display':'block'});
            $('.albumtype').css('color','#f94e61');
            $('.labelcntfield').css('display','block')
        }else{
            $('.constributing_artists').css({'display':'none'});
            $('.albumtype').css('color','#f94e61');
            $('.labelcntfield').css('display','none')
        }
    },
    add_tracks_widget: function(){
        var output = `
            <div class="tracklist_builder_cont">
                <h1 class="add_to_tracklist">Add Song to TrackList</h1>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>
                <div class="tracklist_form">
                    <input class="upload_fld song_title upload_fieldmobile" placeholder="Name of Song" >
                    <div class="labelcntfield">
                        <label class="uploadfieldlabel">Seperate artists with a comma:</label>
                    </div>
                    <input class="upload_fld contributing_artists upload_fieldmobile" placeholder="Featuring Artists  (e.g. Winky D, Kinnah)">
                    <input type="file" style="padding-top: 6px; height: 28px; width: 90%;" class="upload_fld song_file upload_fieldmobile" placeholder="Song File"  accept="audio/*" required >
                </div>
                <div class="add_song_button" onclick="new_song_to_tracklist_details()">Add to Tracklist</div>
            </div>
        `;
        return output
    },
    tracklist_preview_widget: function( album_title_, cont_artists_, year_released_, album_length){
        var output = `
        <div class="album_prev_container">
            <div class="previewHeader">
                <div class="preview_header">Album Preview</div>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>
                <div class="album_meta_head">
                    <img class="album_prev_artwrk" src="">
                    <div class="prev_meta_details">
                        <h1 class="albumTitle_prv">`+album_title_+`</h1>
                        <p class="albumArtist_prv">`+cont_artists_+`</p>
                        <p class="year_prv">`+year_released_+`</p>
                        <p class="albumlength_prv">`+album_length+` Songs</p>
                    </div>
                </div>
                <div class="tracklist_legend">
                    <div>#</div>
                    <div>Song Title</div>
                    <div>Contributing Artists</div>
                </div>
                <div class="tracklist_prev">
                    
                </div>
            </div>
            <div class="button_Cont_prev" >
                <div class="edit_songs ripple" onclick="edit_songs()">Edit Songs</div>
                <div class="upload_button ripple" onclick="album_save()">Upload Album</div>
            </div>
        </div>
        `;
        return output
    },
    read_image_album: function(_artwork){
        // i. render image
        var reader = new FileReader();
        reader.onload = function(e) {  
             $(".album_prev_artwrk").attr('src', reader.result );   
            };
        reader.readAsDataURL(_artwork);
    },
    render_album_builder: function(album_data){

        // get data from Form_Object
        var title_ = album_data.album_title;    var artist_ = album_data.cont_artists;
        var year_ = album_data.year_released;   var artwork_ = album_data.artwork;
        var album_length = 'NA';          var contributing  = album_data.featured;
        
        // Get markUp for widgets
        var add_tracks_widget = Uploads.add_tracks_widget();
        var album_preview_pane = Uploads.tracklist_preview_widget( title_, artist_, year_, album_length);

        State.AlbmToUpd = {Artist:artist_, timeStamp:new Date().getTime(), albumTitle:title_, contributing:contributing, Tracklist:[], albumArtwork:'', releaseDate:year_, Producer:'' };

        // render widgets to DOM
        $(".upload_music_container").append( add_tracks_widget);
        $(".upload_music_container").append( album_preview_pane);

        // render artwork to preview_pane
        Uploads.read_image_album( artwork_ );

        // instantiate listener for tracklist_added
        Uploads.tracklist_view()
    },
    tracklist_view: function(){

        // instatiate listener
        var tracklist_listener = setInterval( function(){

            var tracklist = State.uploads.album.tracklist;
            var tracklistCount = State.uploads.album.tracklistCount;

            if( tracklist.length != tracklistCount){
                
                // a. Kill event listener
                clearInterval( tracklist_listener );
                // b. increment tracklist count
                Uploads.render_tracklist_tracks()
                State.uploads.album.tracklistCount = tracklistCount + 1;
                // c. reset listener
                Uploads.tracklist_view()

                return console.log(State.uploads.album.tracklist)
            }
        },10)
    },
    track_markup: function( songTitle_, artist_, index_){
        var output = `
            <div class="trackContainer ripple">
                <div class="songIndex">`+(index_+1)+`.</div>
                <div class="songtitle">`+songTitle_+`</div>
                <div class="songartist">`+artist_+`</div>
            </div>
        `;
        return output
    },
    render_tracklist_tracks: function(){
        // delete old tracklist
        $(".tracklist_prev").html("")
        // get data array
        var tracklist = State.uploads.album.tracklist;

        // Map thru tracklist array and render
        tracklist.map( function(item, index){
            var markup = Uploads.track_markup(  item.songTitle, item.artist, index  );
            return $(".tracklist_prev").append( markup)
        })
    },
    // song edit markUP
    edit_song_widget: function(){
        var output = `
            <div class="outer_edit_song_contmob">
                <div class="edit_pane">
                    <h1 class="edit_pane_header">Edit Song</h1>
                    <div class="lineStyler lineStylermobile">
                        <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                    </div>
                    <div class="editpn_form_fields">
                        <div class="song_index">1</div>
                        <input class="upload_field song_title_edit upload_fieldmobile" placeholder="Name of Song" >
                        <input class="upload_field contributing_artists_edit upload_fieldmobile" placeholder="Contributing/Featuring Artists">
                        <input type="file" class="upload_field song_file_edit upload_fieldmobile" placeholder="Song File"  required = "required">
                    </div>
                    <div class="edt_pane_btn_cnt">
                        <div class="add_song_button_save" onclick="save_song_edit()">Save Edit</div>
                        <div class="add_song_button_cancel" onclick="close_edit_pane()">Cancel</div>
                    </div>
                </div>
                <div class="instruction_edit_song">Please Select the song you want to edit and it will appear inside the form!!</div>
            </div>
        `;
        return output
    },
    // rendr edit_pane_widget
    render_edit_pane: function(){
        var edit_widget = Uploads.edit_song_widget();
        return $(".upload_music_container").append( edit_widget);
    },
    add_event_listener_on_edit: function(){
        // i. get edit pne state
        var state = State.uploads.editState;
        // ii. switch statement based on state
        switch(state){
            case true:
                return Uploads.add_edit_onclick()
            case false:
                return Uploads.remove_edit_onclick()
        } 
    },
    // update tracklist with new edited data
    updateTracklist: function(song_title, artists, song_file, index){
        
        // change song in State.tracklist
        State.uploads.album.tracklist[    index   ].songTitle = song_title;
        State.uploads.album.tracklist[    index   ].artist = artists;
        State.uploads.album.tracklist[    index   ].songFile = song_file;

        // re-render tracklist_pane
        Uploads.render_tracklist_tracks();
    },
    form_listener_change: function(e){
        // a. Get Data from form
        var songTitle = $(".songTitle").val();              var contributingArtists = $(".artists").val();
        var producer = $(".producers").val();               var genre = $(".genre").val();
        var year = $(".year_created").val();                var song_artwork = ($(".artwork").length)? $(".artwork")[0].files[0] : undefined;

        // b. render metadata
        $(".prevSongTitle").find(".prevValue").text(songTitle);
        $(".prevArtist").find(".prevValue").text(contributingArtists);
        $(".prevProducers").find(".prevValue").text(producer);
        $(".prevSongYear").find(".prevValue").text(year);

        // c. render image into view
        if(  song_artwork  != undefined ) {
            Uploads.read_image( song_artwork );
            $(".test_image").css({ "opacity":"1" });
        }else{
            $(".test_image").css({
                "opacity":"0", "display":"inline"
            });
        }

        if( e ){
            if($(e)[0].dataset.name=='i' || $(e)[0].dataset.name == 'a'){ Uploads.flhdlr(e) }
        };
    },
    upload_Song: function(){
        var count = 0;

        // validate all fields entered
        var length = $("input").length;

        // Get all input fields
        var all_fields = Object.values($("input"));

        // Correct length of object
        all_fields.length = length;

        // Map thru fields and check if empty
        all_fields.map( function(field, index){
            if( $(field).val() != ""  || $(field).hasClass('artists') ){
                count++;
                if(index == (length-1) && count == length){
                    // a. Get Data from form
                    var songTitle = $(".songTitle").val();              var songFile = $(".songFile")[0].files[0];          
                    var producer = $(".producers").val();               var genre = $(".genre").val();
                    var year = $(".year_created").val();                var song_artwork = $(".artwork")[0].files[0];
                    var artworkURL;                                     
                    var featuringArtists = ($(".artists").val().trim().length>1)? 
                        String($(".artists").val()).split(",").map(a=>a.trim()).join(',') 
                        : false ;

                    var songURL;                                     
                    var songID;

                    var isShared = (featuringArtists.length>0)? true : false;
                    var owners = (featuringArtists.length>0)? featuringArtists.length : 1;
                    var isRiddim = false;

                    // c. Ensure user confirms the upload
                    var confirm_upload = confirm("Press Ok to Complete Upload!");
                    // d. if User clicks OK to complete upload
                    if(confirm_upload == true){
                        // Push song object to storage
                        var file_songTitle = songFile.name;
                        
                        // Render Progress Bar
                        Uploads.render_song_progress(songTitle, "song");
                        
                        // Create a root reference
                        var songnme = State.user.artistName + ' - ' + file_songTitle;
                        var song_storageRef = f_st.storage().ref().child(`songsAll/`+songnme +``);
                         
                        // Success and Error call backs
                        var push_song_to_DB = function( ){
                            // Get date in milliseconds
                            var date = new Date().getTime();
                            // Define song objhect
                            var song_object = {
                                artist: State.user.artistName.trim(),
                                iframe: songFile.name,
                                image: artworkURL,
                                genre: genre,
                                songURL: songURL,
                                songTitle: songTitle.trim(),
                                streamCount: 0,
                                timeStamp: date,
                                downloads: 0,
                                featured: featuringArtists,
                                isShared: isShared,
                                isRiddim:isRiddim,
                                owners: owners,
                                id:"undefined"
                            };
                            // Create ID
                            var id = fbxe.database().ref("songs").push().key;
                            // Add Song id
                            song_object.id = id;
                            // Push to DB
                            fbxe.database().ref("songs/"+id).update(song_object).then(function(s){
                                var i = featuringArtists.split(',').map(a=>a.split(' ').join('') );
                                    songID = id;
                                _.forEach(i, (a)=>{
                                    var idx = {};
                                        idx[id] = id;

                                        fbxe.database().ref('index/'+a+'/songs').update(idx).then(function(){});
                                })
                            }).then(function(){
                                alert('Song Upload Successful');
                                $('.logowelcome').click();
                                $('.mobile_overview').click();
                            });
                        }
                        var success = function(e){
                            // remove widget
                            $(".progress_widget_cont").remove();
            
                            songURL = e.downloadURL;

                            // prompt user => successful upload
                            $(".success_upload_song").text("Song Uploaded Successfully");
                            setTimeout(function(){    $(".success_upload_song").text("")  },3500);
                                
                            // clear fields
                            Uploads.reset_input_fields();
            
                            // push to firebaseDatabase
                            return upload_artwork(e.downloadURL),
                                // d. Push activity to State
                                State.addActivity("song_upload", songTitle)
                        }
                        var error = function(){
                            return console.log("Error")
                        }
            
                        // Upload artwork
                        var upload_artwork = function(songurl){
                            var nme = State.user.artistName + ' - ' + song_artwork.name;
                            var storageRef = f_st.storage().ref().child(`songArtwork/`+ nme +``);
                            // Push Artwork
                            storageRef.put( song_artwork ).on("state_changed", function(){}, function(){ }, function(e){
                                window.imageRef = storageRef;
                                // // Get artwork URL
                                storageRef.getDownloadURL().then(function(downloadURL) {
                                    // Change Song Artwork
                                    artworkURL = downloadURL;
                                    // Upload All data t oDB
                                    push_song_to_DB(songurl)
                                });
                            });
                        }
            
                        // Start Song File Upload
                        var pushfile = song_storageRef.put(songFile);
                        
                        pushfile.on('state_changed', function(snap){
                            var progress =  Math.ceil( (snap.bytesTransferred / snap.totalBytes)*100 ) + "%";
                            // Update progress bar
                            $(".inner_prgrss_bar").css("width",progress);
                            $(".inner_prgrss_percent").text(progress);
                        },
                        error);
            
                        pushfile.then(success);
            
                        try{fbq('trackCustom', 'songUpload', { time: Date.now()})}catch(e){};
                        
                    }
                }
            }
            else if(index == (length-1) && count != length){ alert("Please make sure all fields are filled!") }
        })

    },
    // MarkUp for song widget
    upload_status_widget: function(songName_, type_, countString){
        var output = `
            <div class="progress_widget_cont">
                <div class="progress_widget">
                    <div class="progress_hrd">Upload Progress</div>
                    <div class="prgrss_meta">
                        <div class="songname_prgrss">Uploading Song: `+songName_+`</div>
                        <div class="count_tally">Tally: 1/1</div>
                    </div>
                    <div class="progressBarCont">
                        <div class="moving_bar">
                            <div class="inner_prgrss_bar"></div>
                        </div>
                        <div class="inner_prgrss_percent">0%</div>
                    </div>            
                </div>
            </div>
        `;
        var album = `
        <div class="progress_widget_cont">
            <div class="progress_widget">
                <div class="progress_hrd">Upload Progress</div>
                <div class="prgrss_meta">
                    <div class="songname_prgrss">Uploading Song: `+songName_+`</div>
                    <div class="count_tally">Tally:`+countString+`</div>
                </div>
                <div class="progressBarCont">
                    <div class="moving_bar">
                        <div class="inner_prgrss_bar"></div>
                    </div>
                    <div class="inner_prgrss_percent">0%</div>
                </div>            
            </div>
        </div>
        `;
        switch (type_) {
            case "song":
                return output
            case "album":
                return album
        }
        return output
    },
    // Render song progress widget
    render_song_progress: function(songName_, type_, countString){
        var markup = Uploads.upload_status_widget(songName_, type_,  countString);
        // render to DOM
        $(".root").append(markup)
    },
    reset_input_fields: function(){
        var reset = function(){
            return $(".test_image").css("display", "none"),
            $(".test_image").attr("src", null),
            $(".prevValue").text(""),
            $("input").val(""),
            $('.ilabelcnt').text(''),
            $('.alabelcnt').text(''),
            $('.browseSongButton').css('display','none'),
            $('.upload_field_file').css('display','')
        }
        return reset()
    },
    mobileSelectUploadType: function(){
        // Get selection markup
        var markup = this.selectUploadtypeMarkUp();
        // Append to DOM
        return $(".root").html(markup)
    },
    selectUploadtypeMarkUp: function(){
        var options = quickUploadWidget.markUp();
        var output = `
            <div class="select_upload_type_container">
                <h1 class="uploadTypeHeader">Select Upload Type</h1>
                <div class="select_holder_type">${options}</div>
            </div>
        `;
        return output
    },
    c:function(){
        Pager_.renderPage('Home')
    },
    album_save:function(){
        // Get alubm State
        var album_data = State.uploads.album.album_data;
        var album = State.uploads.album;
        var tracklist = album.tracklist;
        var songObjects = [];
        var _artworkURL_;  
        var date = new Date().getTime();
        
        // Album object
        var album_meta = {
            Artist: State.user.artistName,
            featured: album_data.cont_artists,
            isRiddim:album_data.isRiddim,
            genre: album_data.genre,
            Producer: album_data.producer,
            Tracklist: [],
            timeStamp: date,
            albumArtwork: album_data.artwork.name,
            albumTitle: album_data.album_title,
            releaseDate: album_data.year_released,
            id:"undefined"
        }

        // Upload Album
        tracklist.map( function(track){
            // Date
            var featured = (track.artist.length>0)? track.artist : false;
            var isShared = (track.artist.length>0)? true : false;
            var owners = (track.artist.length>0)? track.artist.split(',').map(a=>a.trim()).length + 1 : false;

            // Song Object
            var song_ = {
                artist: State.user.artistName,
                iframe: track.songFile.name,
                image: album_data.artwork.name,
                genre: album_data.genre,
                songURL: null,
                songTitle: track.songTitle,
                streamCount: 0,
                timeStamp: date,
                downloads: 0,
                featured: featured,
                isShared: isShared,
                owners: owners,
                isRiddim:album_data.isRiddim,
            };
            var k = {songObject: song_, file: track.songFile};
            // Push song to songObjects 
            songObjects.push(k);
            return album_meta.Tracklist.push(track.songTitle)
        });
        
        // Push to Storage day
        var push_to_storage = function( songObject, countString_){

            // On Success
            var success = function(e){
                // Close progress widget
                $(".progress_widget_cont").remove();

                // Add Song URL
                songObject.songObject.songURL = e.downloadURL;
                
                // Push Song to DB
                var pushToDB = function(){
                    var id = fbxe.database().ref("songs").push().key;
                    // update id of song
                    var songtoupload = new Object(songObject.songObject);
                    songtoupload["id"] = id;
                    // Upload the song object
                    fbxe.database().ref("songs/"+id).update(songtoupload);
                    // Update royalty shares
                    var i = songObject.songObject.featured.split(',').map(a=>a.split(' ').join('') );
                    // Map Thru Featured Artists and index
                    for(a of i){
                        if(a.length>0){
                            var idx = {};
                            idx[id] = id;
                            // index 
                            fbxe.database().ref('index/'+a+'/songs').update(idx);
                        }
                    };
                    // Complete upload
                    (function(){
                        alert('Album Upload Successful');
                        $('.logowelcome').click();
                        $('.mobile_overview').click();
                    })()
                }

                return pushToDB()
            };

            // On Error
            var error = function(){};

            // Storage link
            var nme = songObject.songObject.artist+' - '+songObject.songObject.songTitle;
            var storageRef = f_st.storage().ref().child(`songsAll/`+nme+``);
            
            // render progress widget
            Uploads.render_song_progress( songObject.songObject.songTitle, "album", countString_ );

            // Push file to Storage
            var pushedfile = storageRef.put(songObject.file);

            pushedfile.then(success);

            pushedfile.on('state_changed', function(snap){
                // get progress percentage
                var progress =  Math.ceil( (snap.bytesTransferred / snap.totalBytes)*100 ) + "%";
                // Update progress bar
                $(".inner_prgrss_bar").css("width",progress);
                $(".inner_prgrss_percent").text(progress);
            },
            error);
        };

        // Map thru songObjects tracklist array & form song objects 
        var create_songObject = function(){
            // Map thru Array
            songObjects.map(function(song, index){
                let _song_ = song;
                // Create Tally String
                var countString = index + "/" + songObjects.length;
                // Change Song Artwork to storage URL
                _song_.songObject.image = _artworkURL_;
                return push_to_storage(_song_, countString);
            })

        }

        // Get Length of tracklist
        var trackLength = album_meta.Tracklist.length;
        
        // Listen for tracklist loaded
        var setlistener = setInterval(function() {
            if( trackLength == tracklist.length ){

                // Clear interval
                clearInterval(setlistener);
                
                // Create Album ID
                var albumID = fbxe.database().ref("albums").push().key;

                // Upload artwork 
                var storageRef = f_st.storage().ref().child(`songArtwork/`+albumID+``);
                storageRef.put( album_data.artwork ).on('state_changed', function(){}, function(){ }, function(){

                    // Get artwork URL
                    storageRef.getDownloadURL().then(function(downloadURL) {
                        // Change Song Artwork
                        _artworkURL_ = downloadURL;
                        
                        // Change Album Artwork to storageURL
                        album_meta.albumArtwork = _artworkURL_;
                        
                        // Add album ID
                        album_meta.id = albumID;
                        // Push Album to DB
                        fbxe.database().ref("albums/"+albumID).update(album_meta).then(function(snp){
                            // Push album to fetured artists
                            var ftd = State.uploads.album.album_data.featured.split(',').map(function(a){return a.split(' ').join('')});

                            (ftd.length>0 && ftd[0]!="")? ftd.map(function(s){
                                var r = {};
                                    r[snp.key] = snp.key;
                                    fbxe.database().ref('index/'+s+'/albums').update(r);
                            }) : null;

                        })
                        .then(function(){
                            // d. Push activity to State
                            State.addActivity("album_upload", album_meta.albumTitle)    
                        });

                        // Create song object
                        create_songObject();

                        try{fbq('trackCustom', 'albumUpload', { time: Date.now()}); }catch(e){}
                    });
                })

                    
            }
        }, 10);
    },
    get_song:function(param){
        // i. get values from clicked item
        var songName = $(param).find(".songtitle").text();
        var artist = $(param).find(".songartist").text();
        var index = $(param).find(".songIndex").text();
        index = parseInt(  index.substr( 0, (index.length - 1))  );
        
        // ii. load song into into edit_widget_pane
        $(".song_title_edit").val( songName );
        $(".contributing_artists_edit").val( artist );
        $(".song_index").text( index );
    },
    remove_edit_onclick:function(){
        var t = $(".trackContainer");
        var object_length = t.length;
        var data = Object.values(t);
        data.length = object_length;

        for( var i=0; i<data.length; i++){
            var event_listener = "play_song(this)";
            $($(".trackContainer")[i]).attr("onclick", event_listener);
        }
    },
    add_edit_onclick:function(){
        var t = $(".trackContainer");
        var object_length = t.length;
        var data = Object.values(t);
        data.length = object_length;
        
        for( var i=0; i<data.length; i++){
            var event_listener = "get_song(this)";
            $($(".trackContainer")[i]).attr("onclick", event_listener);
        }
    },
    close_edit_widget:function(){
        // remove pane
        $(".edit_pane").remove();
        $(".outer_edit_song_contmob").remove();
        // change state in Store
        State.uploads.editState = !State.uploads.editState;
        // change border color to normal grey
        Uploads.change_border_color();
    },
    change_border_color:function(){
        var state = State.uploads.editState;

        switch(state){
            case true:
                return $(".tracklist_prev").css( {"border":"solid 2px #651222", "border-bottom":"none"});
            case false:
                return $(".tracklist_prev").css( {"border":"solid 1px #292727", "border-bottom":""});
        }
    },
    save_song_edit:function(){
        // a. update tracklist with new data
        var song_title = $(".song_title_edit").val();           var artists = $(".contributing_artists_edit").val();
        var song_file = $(".song_file_edit")[0].files[0];            var index = (parseInt( $(".song_index").text())  - 1);
        
        // b. close the widget
        if( song_title != "" || artists != "" || song_file != undefined ){
            Uploads.updateTracklist(song_title, artists, song_file, index);
            Uploads.close_edit_widget();
        }
        else{
            alert("Please fill in all fields before proceeding!")
        }
    },
    edit_songs:function(){
        if( $(".upload_music_container").find(".edit_pane").length == 1){
       
        }
        else if( $(".upload_music_container").find(".edit_pane").length == 0 ){
            Uploads.render_edit_pane();
            State.uploads.editState = !State.uploads.editState;
            Uploads.change_border_color();
            Uploads.add_event_listener_on_edit();
        }
    },
    song_format_error:function(){
        // alert user of error
        alert( "The song you want to upload is not an mp3 file, please ensure it is an mp3 format!" );
        // outline field with error
        outline_changer( ".song_file", undefined, 5000);
    },
    image_onchange:function(){
        var image_ = $(".artwork")[0].files[0];
        return Uploads.read_image(image_)
    },
    outline_changer:function(class_, color, time_){
        var colr_ = (color == undefined) ? "#791f30": color;
        var time_ms = ( time_ == undefined) ? 3500 : time_;
        // change color to alert red
        $(class_).css({ "border": `solid 1px `+colr_+``, "background":"#2f2a2c" });
        // Change color to default grey
        setTimeout(function(){ $(class_).css({ "border": "", "background":"" })}, time_);
    },
    new_song_to_tracklist_details:function(){
        if($(".song_file")[0].files[0]){
            var song_title = $(".song_title").val().trim();
            var artists = $(".contributing_artists").val().trim();
            var song_file = $(".song_file")[0].files[0];
        
            // Check if values not undefined
            if(  song_title != "" &&  song_file != undefined  &&  song_file.name.includes('.mp3') ){
                // add track StateObject
               State.uploads.album.tracklist.push({     songTitle: song_title, artist: artists, songFile: song_file     });
            }
            // else alert user with error
            else{
                (  song_title == "")  ?  outline_changer(".song_title") : null ;
                (  artists == "")  ?  outline_changer(".contributing_artists") : null ;
                (  song_file == undefined )  ?  outline_changer(".song_file") :  null ;
                (  song_file.name.includes('.mp3') == false )  ?  song_format_error() :  null ;
                
            }
        }
        else{
            alert('No songs File Added!')
        }
    },
    get_album_details:function(){
        if( $('.albumtype')[0].value != "false" && $(".year").val() && $('.albumtype').val() && $(".album_artwork")[0].files[0] && $(".producer").val() &&  $('.albumgenre').val() ){
            // Collect form data
            var album_title = $(".album_title").val().trim();           var cont_artists = State.user.artistName; 
            var year_released = $(".year").val();                       var producer = $(".producer").val();
            var artwork = $(".album_artwork")[0].files[0];              var genre = $('.albumgenre').val();
            var featured = $('.constributing_artists').val().trim();           var type = $('.albumtype').val();
            var isRiddim = ( $(".albumtype").val() == "Riddim" )? true:false;
        
            // add album data tp State
            var album_data = { album_title, cont_artists, year_released, artwork, producer, genre, featured, type, isRiddim };
            State.uploads.album = { album_data, tracklist:[], tracklistCount:0};
        
            // remove album_details_widget
            $(".uploadAlbumContainer").remove();
        
            // Call method to render_widgets
            return Uploads.render_album_builder( album_data );
        }else{alert('Make sure all fields are filled!')}
    },
    on_media_click:function(){
        // a. Check if song playing the End
        if( $(".song_player")[0].duration > 0 &&  $(".song_player")[0].paused == false){
            
            // // a. Stop Song
            $('.audio-status-message').html("");
            $(".song_player")[0].pause();
            $(".song_player").attr("src", "");
            
            // b. change message
            $('.audio-status-message').append("Song Stopped...");
            $(".playButton").toggle();
            $(".pauseButton").toggle();

            // c. re-correct message
            setTimeout( function() {
                $('.audio-status-message').text("No Song Loaded");
            },1500)
        }
        // b. Proceed to load new song to DOM & play
        else{
            var song_file =  $(".songFile")[0].files[0];
            switch( song_file){
                case undefined:
                    return alert( "No song Loaded")
                default:
                    // a. toggle buttons
                    $(".playButton").toggle();
                    $(".pauseButton").toggle();
        
                    return Uploads.audio_play_pause(song_file)
            }
        }
    }
}









// play onclick handler
var on_media_click = function(){ Uploads.on_media_click() }
// get album_details on NEXT_Click
var get_album_details = function(){ Uploads.get_album_details() }
// get song_details form Add_Song_to_tracklist_Widget
var new_song_to_tracklist_details = function(){ Uploads.new_song_to_tracklist_details() }
// field outline color changer if form field empty
var outline_changer = function(class_, color, time_){ Uploads.outline_changer(class_, color, time_) };
// render new image on change
var image_onchange = function(){ Uploads.image_onchange() }
// song uploaded wrong format
var song_format_error = function(){ Uploads.song_format_error() }
// edit songs in album preview pane
var edit_songs = function(){ Uploads.edit_songs() }
var save_song_edit = function(){ Uploads.save_song_edit() }
var close_edit_pane = function(){Uploads.close_edit_widget()}
// get song details on click_edit
var get_song = function(p){Uploads.get_song(p) }
// listen for changes on form
var form_listener_change = function(e){Uploads.form_listener_change(e)}
// upload song
var upload_Song = function(){Uploads.upload_Song()}
// save album
var album_save = function(){ Uploads.album_save() }