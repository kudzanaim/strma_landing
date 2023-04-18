
// Show
var log_contas_ = function(type){
    if( type == State.types.reg ){
        ($( document)[0].body.clientWidth < 600 )? (
            $(".social-btns-logn").addClass("social-btns-logn-mobile"),   
            $(".orlogwith_").addClass("orlogwith_mobile"), mobilefb()
        ): $('.social-btns-logn').css({"display": "inline-flex", "position": "fixed", "top": "82vh", "left":"1vw", "z-index": "10", "width": "100%", "place-content": "center"}); 
    }else if( type == State.types.reg){
        ($(document)[0].body.clientWidth < 600 )? (
            $(".social-btns-logn").addClass("social-btns-logn-mobilelgn"),   
            $(".orlogwith_").addClass("orlogwith_mobile"), lgnmobile()
        ): ($('.social-btns-logn').css({"display": "inline-flex", "position": "fixed", "top": "62vh", "left":"1vw", "z-index": "10", "width": "100%", "place-content": "center"}), 
            $(".fbhide").css("display",""), $(".orlogwith_").css("top", "56vh")
        )
    }
}

// Complete
var loginComplete = function(dataReceived){
    FB.getLoginStatus(function(response) {
        State.fbID = {id:response.authResponse.userID, status:response.status};
        ( State.fbtype == State.types.reg)? (Lib.fbsign(), $(".registeruser_cont_").css({"grid-template-rows":"10% 72.5% 18%"})):Lib.lgn_in( response.authResponse.userID + State.types.mail, response.authResponse.userID );
        $(".fbhide").css("display:none");
        reversefb();
    });
}

function mobilefb(){
    var k = $(".fbhide");
    var tswism = setInterval(() => {
        $(".fbhide").remove();
        $(".registeruser_cont_").append( k );
        clearInterval(tswism)
    }, 100);
}

function lgnmobile(){
    var k = $(".fbhide");
    var tswism = setInterval(() => {
        $(".fbhide").remove();
        $("._loginform_cont_p").append( k );
        $(".fbhide").css("display",""),
        clearInterval(tswism);

    }, 100);
}

function reversefb(){
    var k = $(".fbhide");
    $('.fbconnect_js').after(k);
    $(".fbhide").css("display", "none");
}

// Artist Successfull Login
function artstmobsign(){
    FB.getLoginStatus(function(response) {
        console.log(response);
        State.fbID = {id:response.authResponse.userID, status:response.status};
        ( State.fbtype_ == State.types.reg )? ( Login.get_form_data( State.types.formfb, response.authResponse.userID ) ) : ( State.fbtype_ == State.types.lgn )? Login.signIn( response.authResponse.userID + State.types.mail, response.authResponse.userID ):null;
        $(".fbhide").css("display","none");

        return reversefb();
    });
}
