var MyMusic = {
    markUp(){
        var output = `
            <div class="portfolio_container"> 
                <h1 class="headerTest">My Portfolio</h1>
            </div>
        `;
        return output
    },
    render(){
        // i. Get HTML Page
        var pageHTML = MyMusic.markUp();
        var libraryGrid = MyMusic.libraryGridContainer();
        var render = function(){
            $(".root").html( pageHTML); $(".portfolio_container").append( libraryGrid); 
            MyMusic.renderAlbum();
        }
            
        return render();
    },
    libraryGridContainer(){
        var output = `
            <div class="libraryGridContainer">
                <div class="grid-tabs">
                    <div class="albums-grid-tab tab-active" onclick="album_click()">Albums</div>
                    <div class="singles-grid-tab" onclick="single_click()">Singles</div>
                </div>
                <div class="prev-library-container">
                   
                </div>
            </div>
        `;
        return output
    },
    renderAlbum(){
        // close album currently being viewed in State object
        State.currentAlbumInEditOpen = "undefined";
        var album_grid = MyMusic.albumPreview();
        var render_albums = function(){
            $(".prev-library-container").html( album_grid );
            MyMusic.renderAlbums();
        }
        return render_albums()
    },
    renderSingle(){
        var singleGrid = MyMusic.singlePreview();
        var render = function(){
            $(".prev-library-container").html( singleGrid )
            MyMusic.getSingles()
        }

        return render()
    },
    albumPreview(albumName){
        var albumName = (albumName != undefined) ? albumName : "Album Name";
        var output = `
            <div class="albumPreview">
                <div class="albums-all-view">
                    <div class="albums_all_hdr">Albums</div>
                    <div class="albums_all_grid"></div>
                </div>
                <div class="album-opened">
                    <div class="prev-header-albums">
                        <div class="album-nme-prev">`+albumName+`</div>
                        <div class="album-operations-btns">
                            <div class="btn-album-rename ripple" onclick="renameAlbum()">Rename Album</div>
                            <div class="btn-album-delete ripple" onclick="deleteAlbum()">Delete Album</div>
                        </div>
                    </div>
                    <div class="album-song-legend">
                        <div class="title-legend">Title</div>
                        <div class="artist-legend">Artist</div>
                        <div class="date-legend">Date</div>
                        <div class="producer-legend-streams">Streams</div>
                        <div class="producer-legend">Downloads</div>
                    </div>
                    <div class="song-prev-container"></div>
                </div>
            </div>
        `;
        var mobile = `
            <div class="albumPreview_mobile">
                <div class="albums-all-view">
                    <div class="albums_all_hdr">Albums</div>
                    <div class="albums_all_grid"></div>
                </div>
            </div>`;

        return ($(".navigation").css("display") != "none") ? output : mobile
    },
    singlePreview(){ 
        var output = `
            <div class="singlePreview">
                <input class="serchbar_single_prev" placeholder="Search song here..." onkeyup="search_bar()">
                <div class="single-prev-cont">
                    <div class="song-legend">
                        <div class="title-legend">Title</div>
                        <div class="artist-legend">Artist</div>
                        <div class="date-legend">Date</div>
                        <div class="producer-legend-streams">Streams</div>
                        <div class="producer-legend">Downloads</div>
                    </div>
                    <div class="song-prev-container sinle-view-constraint"></div>
                </div>
            </div>
        `;
        return output
    },
    renderAlbums(){
        var artist = State.user.artistName;
        // clear div b4 appending new albums
        $(".albums_all_grid").html("");
        // Get all albums
        fbxe.database().ref("albums").orderByChild("Artist").startAt(artist).endAt(artist+"\uf8ff").once("value").then( function(snap){
            var albums = ( snap.val() != null ) ? Object.values(snap.val()) : [];
            // Loop thru albums
            albums.map(function(album){
                // Get image storage url
                // var storageRef = firebase_storage.storage().ref().child("songArtwork/"+album.albumArtwork);
                // storageRef.getDownloadURL().then(function(url) {
                    // Create a root referenc
                    var markup = MyMusic.albumMarkUp(album, album.albumArtwork);
                    $(".albums_all_grid").append(markup);  
                // })
            })
        })
    },
    albumMarkUp(album, imageURL){
        var output = `
            <div class="album-item ripple" onclick="album_item_Click(this)">
                <div class="album-image-item">
                    <img src="`+imageURL+`" class="album-img-div">
                </div>
                <div class="album-title-item">`+album.albumTitle+`</div>
            </div>
        `;

        var mobile = `
            <div class="album-item ripple" onclick="album_mobile_item_Click(this)">
                <div class="album-image-item">
                    <img src="`+imageURL+`" class="album-img-div">
                </div>
                <div class="album-title-item">`+album.albumTitle+`</div>
            </div>
        `;

        return (  $(".navigation").css("display") != "none"  ) ? output : mobile
    },
    // Mobile preview_Album_Pane
    mobilePreviewPane(albumName){
        var albumName = (albumName != undefined) ? albumName : "Album Name";
        var output = `
            <div class="album-opened">
                <div class="prev-header-albums">
                    <div class="album-nme-prev">`+albumName+`</div>
                    <div class="album-operations-btns">
                        <div class="btn-album-rename ripple" onclick="renameAlbum()">Rename Album</div>
                        <div class="btn-album-delete ripple" onclick="deleteAlbum()">Delete Album</div>
                    </div>
                </div>
                <div class="album-song-legend">
                    <div class="title-legend">Title</div>
                    <div class="artist-legend">Artist</div>
                    <div class="date-legend">Date</div>
                    <div class="producer-legend">Downloads</div>
                </div>
                <div class="song-prev-container"></div>
            </div>       
        `;
        return output
    },
    // Desktop ALbum Render
    getAlbumTracks(param){
        var album = $(param).find(".album-title-item").text();
        $('.album-nme-prev').text(album);
        $('.prev-header-albums').css("opacity","1");
 
        fbxe.database().ref("albums").orderByChild("albumTitle").startAt(album).endAt(album+"\uf8ff").once("child_added").then( function(snap){
            // i. album object and tracklist
            var album_ = snap.val();
            var tracklist = album_.Tracklist; 
             
            // ii. get album name attach song  to state
            var artist = State.user.artistName;
            State.currentAlbumInEditOpen = {album: album, artist: artist, key: snap.key, album_object: album_};
            // iii. loop thru tracklist
            tracklist.map(function(track, index){
                fbxe.database().ref("songs").orderByChild("songTitle").startAt(track).endAt(track+"\uf8ff").once("value").then( function(snapshot){
                    var songResults = Object.values(snapshot.val());
                     
                    for(song of songResults){ 
                        if(song.artist==artist && song.songTitle==track){
                            var id = _.findKey(snapshot.val(), {songTitle:track, artist:song.artist});
                            var date_convert = new Date(song.timeStamp);
                            var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
                            var markup = MyMusic.renderTracks(song, date, id);

                            return $(".song-prev-container").append( markup )
                        }   
                    }
                    
				})
            })  
        })
    },
    // Mobile Album Render
    getAlbum_mobile_Tracks(param){
        // Get LAbum Name
        var album = $(param).find(".album-title-item").text();

        // Append album Preview PAne to DOM
        var previewpane = this.mobilePreviewPane(album);
        $(".albums-all-view").html(previewpane);
        
        fbxe.database().ref("albums").orderByChild("albumTitle").startAt(album).endAt(album+"\uf8ff").once("child_added").then( function(snap){
            // i. album object and tracklist
            var album_ = snap.val();
            var tracklist = album_.Tracklist;

            // ii. get album name attach song  to state
            var artist = State.user.artistName;
            State.currentAlbumInEditOpen = {album: album, artist: artist, key: snap.key, album_object: album_};
            
            // iii. loop thru tracklist
            tracklist.map(function(track, index){ 
                fbxe.database().ref("songs").orderByChild("songTitle").startAt(track).endAt(track+"\uf8ff").once("value").then( function(snapshot){
                    var results = snapshot.val() || {};
                    
                    Object.values(results).forEach(function(a){
                        var artist = a.artist;
                        var title = a.songTitle;
                        if(artist==album_.Artist && title==track){
                            var date_convert = new Date(a.timeStamp);
                            var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
                            var markup = MyMusic.renderTracks(a, date, a.key);
        
                            $(".song-prev-container").append( markup)
                        }
                    })
				})
            })
        })
    },
    // MarkUp album tracks
    renderTracks(track, date, id){
        var output = `
            <div class="track-item-port track_item ripple" onclick="edit_album_pane(this)" data-id="`+id+`">
                <div class="track-item-title"><div class="songTitle_holder">`+track.songTitle+`</div></div>
                <div title="`+ track.artist +`" class="track-item-artist"><div style="width:1000%">`+ track.artist +`</div></div>
                <div class="track-item-date">`+date+`</div>
                <div class="track-item-streams">`+abbreviateNumber(track.streamCount)+`</div>
                <div class="track-item-downloads">`+abbreviateNumber(track.downloads)+`</div>
            </div>
        `;
        return output
    },
    // MarkUp song tracks
    renderTracksSingle(track, date, id){
        var output = `
            <div class="track-item-port track_item_single ripple" onclick="edit_song_pane(this)" data-id="`+id+`">
                <div class="track-item-title">`+track.songTitle+`</div>
                <div title="`+track.artist+`" class="track-item-artist"><div style="width:1000%">`+track.artist+`</div></div>
                <div class="track-item-date">`+date+`</div>
                <div class="track-item-streams">`+abbreviateNumber(track.streamCount)+`</div>
                <div class="track-item-downloads">`+abbreviateNumber(track.downloads)+`</div>
            </div>
        `;
        return output
    },
    getSingles(){

        var artist = State.user.artistName;

        // Query Database of all songs by artist
        fbxe.database().ref("songs").orderByChild("artist").startAt(artist).endAt(artist+"\uf8ff").once("value").then(function(snap){
            var songs = ( snap.val() != null ) ? Object.values(snap.val()) : [];
            
            // map thru songs and render to DOM
            Object.values(snap.val()).map(function(a){ 
                var song = a;
                var id=_.findKey(snap.val(), {songTitle: a.songTitle });
                if( song != "appended here"){
                    var date_convert = new Date(song.timeStamp);
                    var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
                    var markUp = MyMusic.renderTracksSingle( song, date, id);
                        
                    return $(".song-prev-container").append( markUp )
                }
            }) 
            
        })
    },
    getAlbumTracksReload(tracklist_, albumArtist){
        console.log(albumArtist);
        // clear div
        $(".song-prev-container").html("");
        // render new tracks
        tracklist_.map(function(track){
            fbxe.database().ref("songs").orderByChild("songTitle").startAt(track).endAt(track+"\uf8ff").once("value").then( function(snapshot){
                var songResult = snapshot.val() || {};

                Object.values(songResult).map(function(a){
                    var title=a.songTitle;
                    var artist=a.artist;
                    if(title==track && artist==albumArtist){
                        var id=_.findKey(snap.val(), {songTitle: track, artist:albumArtist });
                        var date_convert = new Date(songResult.timeStamp);
                        var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
                        var markup = MyMusic.renderTracks(songResult, date, id);
        
                        return $(".song-prev-container").append( markup)
                    }
                });
            })
        })
    },
    searchSong(search_value){
        var artist = State.user.artistName;

        // i. if bar empty do nothing
        if(  $(".serchbar_single_prev").val().length == 0 ){
            
            // a. set all songs when input empty
            $(".song-prev-container").html("");
            MyMusic.getSingles();
        }
        // ii. if input bar empty and state not saved
        else {
            // Query Database
            fbxe.database().ref("songs").orderByChild("artist").startAt(artist).endAt(artist+"\uf8ff").once("value").then(function(snap){
                var songs = ( snap.val() != null ) ? Object.values(snap.val()) : [];

                // b. map thru songs
                return MyMusic.renderSearchResults( songs, search_value);         
            })
        }
            
    },
    searchResultMarkup(song){
        var songTitle = song.songTitle;
        var artist = song.artist;
        var date_convert = new Date(song.timeStamp);
        var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
        var streams = song.streamCount;
        var downloads = song.downloads;

        var output = `
            <div class="track-item-port track_item_single ripple" onclick="edit_song_pane(this)">
                <div class="track-item-title">`+songTitle+`</div>
                <div title="`+artist+`" class="track-item-artist"><div style="width:1000%">`+artist+`</div></div>
                <div class="track-item-date">`+date+`</div>
                <div class="track-item-streams">`+abbreviateNumber(streams)+`</div>
                <div class="track-item-downloads">`+abbreviateNumber(downloads)+`</div>
            </div>
        `;
        return output
    },
    renderSearchResults(songArray, term){
        // a. trim array
        var array = songArray;
        // b. Clear result pane
        $(".song-prev-container").html("");

        array.map(function(song){
            var songName = song.songTitle.toLowerCase();
            if(	songName.includes(term.toLowerCase()) == true ){
                var markup = MyMusic.searchResultMarkup(song);
                $(".song-prev-container").append(markup);
            }
        })
    },
    edit_pane(songname, artist, image, type, id){
        var album = `
            <div class="editpane_cont_mm">
                <div class="edit_pane_mm">
                    <div class="mm_pane_header">
                        <div class="img_cont_mm">
                            <img src="`+image+`" class="songimage_mm">
                        </div>
                        <div class="meta_mm">
                            <div class="songname_mm">`+songname+`</div>
                            <div class="artistname_mm">`+artist+`</div>
                        </div>
                    </div>
                    <div class="mm_button_container">
                        <div class="copy_song_mm mm_button ripple" onclick="copy_share_link('album','`+id+`')" >Copy Link</div>
                        <div class="edit_song_mm mm_button ripple" onclick="edit_album_mm('`+id+`')" >Edit</div>
                        <div class="delete_song_mm mm_button ripple" onclick="deleteSong('`+id+`')" >Delete</div>
                    </div>
                </div>
                <div class="close_support_widget_mm ripple" onclick="closeSongEdit()">Close</div>
            </div>
        `;
        var song = `
            <div class="editpane_cont_mm">
                <div class="edit_pane_mm">
                    <div class="mm_pane_header">
                        <div class="img_cont_mm">
                            <img src="`+image+`" class="songimage_mm">
                        </div>
                        <div class="meta_mm">
                            <div class="songname_mm">`+songname+`</div>
                            <div class="artistname_mm">`+artist+`</div>
                        </div>
                    </div>
                    <div class="mm_button_container">
                        <div class="copy_song_mm mm_button ripple" onclick="copy_share_link('song','`+id+`')">Copy Link</div>
                        <div class="edit_song_mm mm_button ripple" onclick="edit_song_mm('`+id+`')">Edit</div>
                        <div class="delete_song_mm mm_button ripple" onclick="deleteSong('`+id+`')" data-id="`+id+`">Delete</div>
                    </div>
                </div>
                <div class="close_support_widget_mm ripple" onclick="closeSongEdit()">Close</div>
            </div>
        `;
        switch (type) {
            case "song":
                return song
            case "album":
                return album
        }
    },
    render_edit_pane(param, type){ 
        // a. get title and artist
        var id = $(param)[0].dataset.id; 
        // b. connect to DB and get image url
        fbxe.database().ref(`songs/`+id+``).once("value").then(function(snap){ 
            // i. set to State
            State.songToEdit = {  song: snap.val().songTitle , artist:  snap.val().artist  };
            // ii. get imageURL from storage
            var image = snap.child("image").val();  
            var markup = MyMusic.edit_pane(snap.val().songTitle , snap.val().artist, image, type, id);
            $(".root").append(markup) 
        })
        
    },
    // song and album edit form markup
    edit_song_form(type, id){
        var output = `
            <div class="edit_song_formCont_mm">
                <div class="edit_song_form_mm">
                    <h1 class="editDataContHeader">Edit Song</h1>
                    <div class="lineStyler">
                        <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                    </div>
                    <div class="fields_edit_mm">
                        <input class="songtitle_edit_mm upload_field" placeholder="Song Title">
                        <input class="artistName_edit_mm upload_field" placeholder="Featured Artists">
                    </div>
                    <div onclick="save_song_edt_mm(`+id+`)" class="song_edit_save_mm upload_button_mm ripple" >Save</div>
                </div>
                <div class="close_support_widget_mm ripple" onclick="close_edit_song_form()">Close</div>
            </div>
        `;
        var album = `
            <div class="edit_song_formCont_mm">
                <div class="edit_song_form_mm">
                    <h1 class="editDataContHeader">Edit Song</h1>
                    <div class="lineStyler">
                        <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                    </div>
                    <div class="fields_edit_mm">
                        <input class="songtitle_edit_mm  upload_field" placeholder="Song Title">
                    </div>
                    <div onclick="save_albumSong(`+id+`)" class="song_edit_save_mm upload_button_mm ripple" >Save</div>
                </div>
                <div class="close_support_widget_mm ripple" onclick="close_edit_song_form()">Close</div>
            </div>
        `;
        switch (type) {
            case "album":
                return album  
            case "song":
                return output
        }
    },
    // render edit song
    render_edit_song_mm(id){
        var markup = MyMusic.edit_song_form("song", id);
        // append to root
        return $(".root").append(markup)
    },
    // render edit album
    render_edit_album_mm(id){
        var markup = MyMusic.edit_song_form("album", id);
        // append to root
        return $(".root").append(markup)
    },
    // Delete Song from DB
    songDelete(id){
         // get song and ensure its the same title and artist then call delete function
        fbxe.database().ref("songs/"+id).once("value").then( function(snap){ 
            // delete Song
            fbxe.database().ref(`songs/`+id+``).remove(); 
            // close edit pane 
            closeSongEdit();
            // show delete confirmation
            songDeletedMessageConfirmation(snap.val().songTitle, "delete");
            // Push activity to State
            State.addActivity("song_deleted", snap.val().songTitle);         
        })
    },
    // save Edited song
    save_song_edt_mm(id){        
        fbxe.database().ref("songs/"+id).once("value").then(function(snap){
            var songName =snap.val().songTitle;
            var artist = snap.val().artist; 
            
            // i. define old song objct and key
            var song = snap.val(); 
            var update_ref = function(song_){
                return fbxe.database().ref(`songs/`+id+``).update(song_),
                    // Re-render songs
                    MyMusic.getSingles(),
                    // Song delete message
                    songDeletedMessageConfirmation(songName, "update"),
                    // Close edit Widget
                    closeSongEdit(),
                    // Push activity to State
                    State.addActivity("song_edit", songName)
            }

            // ii. update song object with new data
            song.songTitle = songName;
            song.artist = artist;

            return update_ref(song)
        })

    },
    // save album edited song
    save_albumsong_edt_mm(){
        var songName = $(".songtitle_edit_mm").val();
        var songToFind = State.songToEdit.song;
		var albumName = State.currentAlbumInEditOpen.album;
        var albumKey = State.currentAlbumInEditOpen.key;

        fbxe.database().ref("albums").orderByChild("albumTitle").startAt(albumName).endAt(albumName+"\uf8ff").once("child_added").then( function(snap){
            
            // i. define old song objct and key
            var album = snap.val();

            // a. update song in songs ref
            (fbxe.database().ref("songs").orderByChild("songTitle").startAt(songToFind).endAt(songToFind+"\uf8ff").once("child_added").then(function(snap){
                    
                    // get songkey and songobject
                    var songkey_ = snap.key;
                    var song = snap.val();

                    // change song object songTitle
                    song.songTitle = songName;
                    
                    return fbxe.database().ref(`songs/`+ songkey_ +``).update( song ), song_object_change(album)
            }))
            // b. update song object with new data
            var song_object_change = function( album_object ){
                album_object.Tracklist.map(function(song, index){
                    if(  song == songToFind  ){
                        album.Tracklist[index] = songName;
                        return  update_ref(album),
                            // Push activity to State
                            State.addActivity("song_edit", "", songToFind)
                    }
                });
            }
            // c. push new_song object to update DB
            var update_ref = function(album_){
                return fbxe.database().ref(`albums/`+albumKey+``).update(album_),   MyMusic.getAlbumTracksReload(album_.Tracklist, album.Artist), songDeletedMessageConfirmation(songName, "update"), closeSongEdit();
            }

        })

    },
    // Render Edit form for Album
    renderalbumEditForm(){
        var markup = MyMusic.editAlbum_form();
            return $(".root").append( markup )
    },
    // save album edited
    saveAlbum( new_album_name ){
        // i. album detailks
        var albumName = State.currentAlbumInEditOpen.album;
        var artist = State.currentAlbumInEditOpen.artist;
        var album_key = State.currentAlbumInEditOpen.key;
        var album = State.currentAlbumInEditOpen.album_object;

        // ii. edit object
        var confirmAlbumName  = confirm(`Click ok to change Album Name to: "`+new_album_name+`"` );
        album.albumTitle = new_album_name;
        
        // update db function
        var updateDB = function(album__){
            // a. update database
            fbxe.database().ref(`albums/`+album_key+``).update(album__);
            // b. show confirmation alert
            songDeletedMessageConfirmation( albumName, "album update");
            // c. re-render view
            MyMusic.renderAlbums();
            // d. Push activity to State
            State.addActivity("album_edit", "", albumName)

                return closeSongEdit()
        }

        // Update album
        ( confirmAlbumName == true) ?  updateDB(album): null;

    },
    editAlbum_form(){
        var output = `
        <div class="edit_song_formCont_mm album_edit_form_mm">
            <div class="edit_song_form_mm">
                <h1 class="editDataContHeader">Edit Album Name</h1>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>
                <div class="fields_edit_mm">
                    <input class="albumtitle_edit_mm upload_field" placeholder="Album Title">
                </div>
                <div onclick="save_album_edt_mm()" class="album_edit_save_mm upload_button_mm ripple" >Save</div>
            </div>
            <div class="close_support_widget_mm ripple" onclick="close_edit_song_form()">Close</div>
        </div>
    `;
    return output
    },
    copy_share_link: function(type, id){

        for(var i=0;i<5;i++){
            // Create elemnt
            var clipBoardUrl = `https://app.strma.app/`+type+`/`+id+``;
            var k = document.createElement('input');
            k.style.opacity = '0'; k.style.position = 'fixed'; k.style.top = '0';  k.value = clipBoardUrl; k.className = 'clipbrditem'
            // Append
            $('body').append( k );
            // Copy to clipboard
            document.execCommand('copy',false);
            k.select();
            setTimeout(function(){$(".clipbrditem").remove()},1000)
        };         

        // close edit pane 
        closeSongEdit();
    },
    // delete album
    deleteAlbum(){
        var album = State.currentAlbumInEditOpen.album_object; 
        var title = State.currentAlbumInEditOpen.album; 
        var key = State.currentAlbumInEditOpen.key; 
        
        // confirm delete
        var confirmDelete = confirm(`Are you sure you want to Delete Album: "`+ title +`"`);
        // delete album
        var t = function(){
            // Delete Album
            fbxe.database().ref(`albums/`+key+``).remove();
            fbxe.database().ref(`albums`).push(album);
            // Push activity to State
            State.addActivity("album_deleted", "",albumName)
        }
        ( confirmDelete == true ) ?  t() : null;
    },
    editbutton_mm(type){
        // edit_song_mm
        alert(type)
    }
}


// click functions
window.album_click = function(){

    var changeClass = function(){
        // change tab color
        $(".singles-grid-tab").removeClass("tab-active");
        $(".albums-grid-tab").addClass("tab-active");
        // render single grid
        MyMusic.renderAlbum();        
    }
    return changeClass()
}
window.single_click = function(){
    var changeClass = function(){
        // change tab color
        $(".albums-grid-tab").removeClass("tab-active");
        $(".singles-grid-tab").addClass("tab-active");

        // render single grid
        $(".song-prev-container").html("");
        MyMusic.renderSingle();

    }
    return changeClass()
}
// Desktop album Click
window.album_item_Click = function(param){
    var render = function(){
        // i. open album and render songs
        $(".song-prev-container").html("");
        MyMusic.getAlbumTracks(param)
    }
    return render()
}
// Mobile ALbum Click
window.album_mobile_item_Click = function(param){
    var render = function(){
        // i. open album and render songs
        $(".song-prev-container").html("");
        $(".albums-all-view").html("");
        MyMusic.getAlbum_mobile_Tracks(param)
    }
    return render()
}
window.search_bar = function(){
    var search_value = $(".serchbar_single_prev").val();
    MyMusic.searchSong(search_value)
}
window.edit_song_pane = function(param){
    return MyMusic.render_edit_pane(param, "song")
}
window.edit_album_pane = function(param){
    return MyMusic.render_edit_pane(param, "album")
}
window.closeSongEdit = function(){
    var t = function(){
        return $(".editpane_cont_mm").remove(), $(".edit_song_formCont_mm").remove();
    }
    return t()
}
// song edit form
window.edit_song_mm = function(id){
    return MyMusic.render_edit_song_mm(id)
}
// album edit form 
window.edit_album_mm = function(id){
    return MyMusic.render_edit_album_mm(id)
}
// album Copy form 
window.copy_share_link = function(type, id){
    return MyMusic.copy_share_link(type, id)
}
window.delete_song = function(){
    return alert("deleted")
}
window.close_edit_song_form = function(){
    // re-set State property to string undefined
    State.songToEdit = "undefined";
    return $(".edit_song_formCont_mm").remove();
}
window.deleteSong = function(id){
    // Show Pop Up to confirm delete
    var delete_confirm = confirm("You are about to Delete this Song. Do you want to proceed?");
    ( delete_confirm == true) ? MyMusic.songDelete(id) : null
}
window.songDeletedMessageConfirmation = function(song, type){
    // i. append functions
    var deletemessge = function(){
        var update_msg_2 = `<div class="del_conf_msg">Song "`+song+`" has been Updated Successfully!</div>`;
        $(".headerTest").append(update_msg_2);
        return  setTimeout(function(){     $('.del_conf_msg').remove()      }, 5000)
    }
    var updatemessge = function(){
        var delete_msg_1 = `<div class="del_conf_msg">Song "`+song+`" has been Updated Successfully!</div>`;
        $(".headerTest").append(delete_msg_1);
        return  setTimeout(function(){     $('.del_conf_msg').remove()      },5000)
    }
    var album_updatemessge = function(){
        var delete_msg_1 = `<div class="del_conf_msg">Album "`+song+`" has been Updated Successfully!</div>`;
        $(".headerTest").append(delete_msg_1);
        return  setTimeout(function(){     $('.del_conf_msg').remove()      },5000)
    }
    // ii. switch conditional
    switch(type){
        case "update":
            return updatemessge()
        case "delete":
            return deletemessge()
        case "album delete":
            return alert("Album Deleted")
        case "album update":
            return album_updatemessge()
    }
}
window.save_song_edt_mm = function(id){
    return MyMusic.save_song_edt_mm(id)
}
window.renameAlbum =function(){
    // a. if no album selected
    if(State.currentAlbumInEditOpen == "undefined"){
        return alert("No Album selected or Open!");
    }
    // b. if album selected
    else{
        return MyMusic.renderalbumEditForm()
    }
}
window.save_album_edt_mm = function(){
    // get new Album name in Form
    var inputValue = $(".albumtitle_edit_mm").val();
    var field_value = ( inputValue.length > 0 ) ? $(".albumtitle_edit_mm").val() : undefined ;

    ( field_value == undefined ) ? alert("No text entered!") : MyMusic.saveAlbum(field_value)
}
window.save_albumSong = function(){
    return MyMusic.save_albumsong_edt_mm()
}
window.deleteAlbum = function(){
    return MyMusic.deleteAlbum();
}

window.MyMusic = MyMusic