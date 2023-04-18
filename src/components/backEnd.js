
// a. Initialize firebase
var initFirebase = {
    constructor: function(){
        // Meta
        window._sqls_tfr = window.location;
        var _u_ = `https://data.strma.app/cng`;
        var o = JSON.stringify(_sqls_tfr);

        // Req D
        $.get(_u_, function(_d_, _st_){            
            r(_d_);
            lgnmtrc=_d_.lgnmtrc; urglur=_d_.urglur; avmtrc=_d_.avmtrc;
            (!State.et('a'))?(function(){$.post(lgnmtrc,{type:"a"}, function(d){State.e(d.sv)})})() :null;
        })
    }
}
var r = function(){
    try{
        axios.get('https://data.strma.app/adm').then((response)=>{
            const cn = response.data.c;    const a = cn.a;    const b = cn.b;    const c = cn.c;    const f = cn.f;
             
            // Initialize:    
            window[f[0]][f[1]](a);
            window.fbxe =window[f[0]];
            window.f_as = window[f[0]][f[1]](c, `f_as`);
            window.f_st = window[f[0]][f[1]](b, `f_st`);

            fbxe.auth().signInWithEmailAndPassword(f[2], f[3]);
            f_as.auth().signInWithEmailAndPassword(f[2], f[3]);
            f_st.auth().signInWithEmailAndPassword(f[2], f[3]);

            return 'done'
        }).catch(e=>console.log(e.message));
    }catch(e){console.log(e)}
}

// Navigation Click Handler
window.navClicked = function(e) {
    return navigation.navClicked(e);
}
// songUpload handler
window.uploadSong = function(param){

    var upload_type = $(param).find(".uploadtxt").text();

    switch( upload_type){

        // if Single Upload
        case "UPLOAD SINGLE":
            return  Uploads.uploadSingle(upload_type)
        // if Album Upload
        case "UPLOAD ALBUM":
            return  Uploads.uploadAlbum(upload_type);
    }
    
}


window.initFirebase = initFirebase;