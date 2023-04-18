var Coupon = {
    render: function(type){
        // Set type
        State.cpnType = type;
        // Get Markup
        var markup = this.getMarkup(type);
        // Render to Page
        if( type=="user"){
            ( $(".couponOverlayCont").length == 0 )? $(".App_Root").append(markup) : null;
        }else{
            ( $(".couponOverlayCont").length == 0 )? $(".root").append(markup) : null;
        }
    },
    renderCpnEnter: function(){
        // Markup
        var markup = this.enterCouponMarkup();
        
        // Change button click
        ( State.cpnType == "artist")? $(".cpn-btn-finish").attr("onclick", "proceed()") : $(".cpn-btn-finish").attr("onclick", "proceed()");
        $(".cpn-btn-finish").text("Proceed");
        // Delete coupon Options
        $(".couponOptions").remove();
        // Remove cpn_reg_hdr header
        $(".cpn_reg_hdr").remove();
        // Render markup
        $(".signUpClickArea").append(markup);
    },
    getMarkup: function( type ){
        // Widget Conditional Settings
        var settings = {
            user: {
                mainClass:"coupmain",
                class: "userCouponCont",
                clickHandler: "lgnusrsgn()",
                regform: 'regusrsgn()',
                buttonText: "I have an existing Account!",
                artistCouponText: ""
            },
            artist: {
                mainClass:"",
                class: "artistCouponCont",
                clickHandler: "haveaccnt()",
                regform: 'sign_button()',
                buttonText: "I have an existing Account!",
                userCouponText: ""
            }
        }

        // Responsive settings
        settings.artist.regform = ( $(document)[0].body.clientWidth < 600)? "mobile_signup()" : "sign_button()";

        // Define Output
        var markup = (wdgt_data)=> Coupon.markup(wdgt_data)

        // Get and return widget by type
        switch(type){
            case "user":
                return markup(settings.user)
            case "artist":
                return markup(settings.artist)
        }
    },
    markup: function(type){
        return `
            <div class="couponOverlayCont `+type.mainClass+`">
                <div class="`+type.class+`">
                    <div class="signUpClickArea">
                        <section class="couponClose_btn" onclick="closeCoupon()">
                            <div class="closeCoup">`+this.closesvg()+`</div>
                        </section>
                        <h1 class="cpn_reg_hdr">Register Account</h1>
                        <section class="couponOptions">
                            <div class="regularSignup" onclick="`+type.regform+`" >
                                <div class="regCoupIcon">       `+Coupon.avatar()+`     </div>
                                <div class="regCoupText">
                                    <h1 class="regCoupText_h3">Sign Up</h1>
                                    <p class="regCoupText_p">Sign up normally without a coupon.</p>
                                    <div class="cpn_liner"></div>
                                </div>
                            </div>
                            <div class="couponSignup" onclick="entercpn()">
                                <div class="regCoupIcon">     `+Coupon.cpnicon()+`     </div>
                                <div class="regCoupText">
                                    <h1 class="regCoupText_h3">Register with Coupon</h1>
                                    <p class="regCoupText_p">If you have a received a coupon from a referral.</p>
                                    <div class="cpn_liner"></div>
                                </div>    
                            </div>
                        </section>
                    </div>
                    <div class="CouponButtonContainer">
                        <button class="cpn-btn-finish" onclick="`+type.clickHandler+`">`+type.buttonText+`</button>
                    </div>
                </div>
            </div>
        `
    },
    enterCouponMarkup:function(){
        return `
            <div class="couponEnter">
                <h1 class="cpn_header">Enter coupon code</h1>
                <p class="cpn_desc_">Please enter coupon code you received with your referral.</p>
                <input class="cpn_input" placeholder="xxxx-xxxx-xxxx">
            </div>
        `
    },
    avatar: function(){
        return `<svg class="cpn_avatar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 258.75 258.75" style="enable-background:new 0 0 258.75 258.75;" xml:space="preserve" width="512px" height="512px" class=""><g><g>
            <circle cx="129.375" cy="70" r="60" data-original="#000000" class="active-path" fill="#000000"/>
            <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" data-original="#000000" class="active-path" fill="#000000"/>
        </g></g> </svg>`
    },
    cpnicon:function(){
        return `<?xml version="1.0"?>
        <svg class="cpn_avatar" xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="512px" viewBox="0 0 512 512" width="512px" class=""><g><path d="m499.91 167.29-155.181-155.18c-7.81-7.81-18.2-12.11-29.24-12.11-11.05 0-21.43 4.3-29.25 12.11l-274.141 274.14c-16.13 16.12-16.13 42.35 0 58.48l155.18 155.17c8.06 8.07 18.65 12.1 29.24 12.1s21.18-4.03 29.24-12.1l274.152-274.13c16.12-16.13 16.12-42.36 0-58.48zm-393.482 182.5c-3.84 0-7.67-1.46-10.6-4.39-5.86-5.86-5.86-15.36 0-21.22l78.08-78.08c5.86-5.86 15.36-5.86 21.22 0s5.86 15.35 0 21.21l-78.09 78.09c-2.93 2.93-6.77 4.39-10.61 4.39zm35.36 35.36c-3.84 0-7.68-1.47-10.61-4.4-5.85-5.85-5.85-15.35 0-21.21l56.88-56.87c5.86-5.86 15.35-5.86 21.21 0s5.86 15.35 0 21.21l-56.87 56.87c-2.93 2.93-6.77 4.4-10.61 4.4zm124.051-47.12-78.08 78.08c-2.93 2.93-6.77 4.39-10.61 4.39s-7.68-1.46-10.61-4.39c-5.86-5.86-5.86-15.36 0-21.21l78.09-78.09c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.22zm142.37-132.53c-2.72 2.72-6.48 4.4-10.63 4.4l-12.41-.02c-1.7 7.86-4.78 15.49-9.23 22.48l8.82 8.83c5.86 5.86 5.86 15.35 0 21.21-5.85 5.86-15.35 5.86-21.21 0l-8.81-8.81c-6.98 4.45-14.58 7.54-22.43 9.26l.02 12.36c.01 4.15-1.67 7.91-4.39 10.63-2.71 2.71-6.45 4.39-10.58 4.4-8.29.01-15.02-6.69-15.03-14.98l-.02-12.42c-7.89-1.73-15.55-4.84-22.57-9.33l-8.76 8.76c-5.85 5.86-15.35 5.86-21.21 0-5.86-5.85-5.86-15.35 0-21.21l8.75-8.75c-4.5-7.03-7.62-14.69-9.35-22.6l-12.48-.02c-8.28-.01-14.99-6.74-14.98-15.02.02-8.29 6.74-14.99 15.03-14.98l12.42.02c1.72-7.84 4.79-15.43 9.24-22.39l-8.83-8.83c-5.85-5.85-5.85-15.35 0-21.21 5.86-5.86 15.36-5.86 21.22 0l8.82 8.82c6.98-4.45 14.59-7.53 22.44-9.24l-.02-12.48c-.01-8.29 6.69-15.01 14.98-15.03 8.28-.01 15.01 6.69 15.02 14.98l.02 12.56c7.87 1.73 15.51 4.83 22.51 9.31l8.76-8.76c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.22l-8.75 8.75c4.48 6.99 7.59 14.61 9.33 22.47l12.51.02c8.29.01 14.99 6.74 14.98 15.02-.009 4.13-1.68 7.88-4.39 10.58zm-119.15-38.73c-15.42 15.42-15.37 40.57.12 56.06s40.64 15.54 56.06.12 15.37-40.57-.12-56.06-40.64-15.54-56.06-.12z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#383636"/></g> </svg>
        `
    },
    closesvg: function(){
        return `<?xml version="1.0"?>
        <svg class="cls_cpn_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve" width="512px" height="512px" class=""><g><g>
            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" data-original="#000000" class="active-path" fill="#000000"/>
        </g></g> </svg>        
        `
    },
    closeCoupon: function(){
        return $(".couponOverlayCont").remove()
    },
    haveaccnt:function(){
        // Close Container
        $(".couponOverlayCont").remove();
        // Render login form
        login_button()  
    },
    openform:function(){
        alert("openform")
    },
    proceed: function(){
        if( $(".cpn_input").val() == "" ){
            return alert("Please Enter Coupon into text field!")
        }
        else if( $(".cpn_input").val().length < 16){
            return alert("Please ensure coupon code is 16 characters long!")
        }
        else if( $(".cpn_input").val().length == 16){
            function types_(){
                try { return {     artist: { desktop: sign_button, mobile: mobile_signup },    user: { desktop: regusrsgn, mobile: regusrsgn }     }; } catch (e) {
                    return {     artist: { desktop: "", mobile: "" },    user: { desktop: regusrsgn, mobile: regusrsgn }     };
                }
            }
            // Types
            let types = types_();
            // Onclicks
            let onclicks_ = ( State.cpnType == "user" )? types.user : types.artist ;
            // Set onclick by device type
            let onclick =  ( $(document)[0].body.clientWidth < 600)? onclicks_.mobile : onclicks_.desktop ;
            // Code
            var cde = $(".cpn_input").val();
            // attch 2 ste
            State.cpnCode = cde;
            // Render reg form
            // (State.cpnType == "artist")? sign_button() : sgnup();
            (State.cpnType == "artist")? onclick() : sgnup();
            // Close container
            this.closeCoupon()
        }
    },
    regusrsgn: function(){
        return (
            sgnup(), this.closeCoupon()
        )
    },
    lgnusrsgn: function(){
        return (
            lgn(), this.closeCoupon()
        )
    },
    welcome: function(type){
        // Get mkup
        var markup = this.welcome_markup(type);
        // Append MArkup
        if( type=="user"){
            ( $(".couponOverlayCont").length == 0 )? $(".App_Root").append(markup) : null;
        }else{
            ( $(".couponOverlayCont").length == 0 )? $(".root").append(markup) : null;
        }
    },
    welcome_markup:function(type){
        // Hold Clickhandler
        var types_ = {
            user: {
                clickHandler: "refer('user')",
                platform: 'Music',
                message:`Welcome to Strma`
            },
            artist: {
                clickHandler: "refer('artist')",
                platform: 'Artist Corner',
                message:``
            }
        };
        var type_ = ( type == "user")? types_.user : types_.artist ;
        var clickHandler = ( type == "user" )? types_.user.clickHandler : types_.artist.clickHandler;

        // Render Dynamically
        return `
            <div class="couponOverlayCont">
                <div class="usercpnwelcCont">
                    <div class="logowelcome2">
                        <img class="Logo" src="/assets/icon/strma_logoblack.png" onclick="`+ type_.clickHandler +`">
                        <div class="logoDetailcoupon">| `+ type_.platform +`</div>
                    </div>
                    <div class="signUpClickArea">
                        <section class="couponWelClose_btn" onclick="closeCoupon()">
                            <div class="closeCoup">`+this.closesvg()+`</div>
                        </section>
                        <h1 class="cpn_welcome_hdr">Welcome to Strma</h1>
                        <p class="welcometostrma">
                           `+type_.message+`
                        </p>
                        <div class="btncouponsoffercont">
                            <button class="btncouponsoffer" onclick="`+clickHandler+`">Click here <br>to get 60days free trial!</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    refer: function(type, code){
        // Markup
        var markup = this.refermarkup(type, code);
        // Render
        if( type=="user"){
            ( $(".couponOverlayCont").length == 0 )? $(".App_Root").append(markup) : null;
        }else{
            ( $(".couponOverlayCont").length == 0 )? $(".coup").append(markup) : null;
        }
    },
    refermarkup:function(type, code){
        // Hold Clickhandler
        var types_ = {
            user: {
                clickHandler: "refer('user')",
                header: "Invite your Friends",
                description: "Share the code below with your 4 friends, and if they all use it on sign up, you will automatically receive 60days unlimited access.",
                top: "top: 0vh",
                platform: "Music"
            },
            artist: {
                clickHandler: "refer('artist')",
                header: "Invite other Artists",
                description: "Share this code with 4 other artists, and if they use the code on sign up, your royalty status will upgraded.",
                top: "",
                platform: "Artist Corner"
            }
        };

        // Map Type
        var type_ = ( type == "user" )? types_.user : types_.artist;

        return `
            <div style="`+ type_.top +`" class="couponOverlayCont">
                <div class="usercpnwelcCont">
                <div class="logowelcome2">
                    <img class="Logo" src="/assets/icon/strma_logoblack.png" onclick="navClicked(this)">
                    <div class="logoDetailcoupon">| `+ type_.platform +`</div>
                </div>
                    <div class="signUpClickArea">
                        <section class="couponWelClose_btn" onclick="closeCoupon()">
                            <div class="closeCoup">`+this.closesvg()+`</div>
                        </section>
                        <h1 class="cpn_welcome_hdr">`+type_.header+`</h1>
                        <p class="welcometostrma">
                            `+type_.description+`
                        </p>
                        <div class="couponcodehldr">
                            <div class="clckcpymessge">Click code to copy</div>
                            <input class="cpncodefield" placeholder="`+code+`" value="`+code+`" onclick="copycode()">
                            <div style=" display:none; color: #ef1515; font-family: roboto;  font-weight: 500; font-size: 13px;  position: relative; top: 10px; text-align: center;" class="copymessage_">Copied</div>
                        </div>
                        <div class="btncpndonecont">
                            <button class="dnereferbtn" onclick="dnrefer()">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    copycode:function(){
        /* Get the text field */
        $(".cpncodefield").select();

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Show copy essage for 3seconds */
        $(".clckcpymessge").text("Copied!")
        
        // BOx outline
        setTimeout(()=>{
            $(".cpncodefield").css("border", "2px solid #008c65");
        },500)
    }
}


var closeCoupon = function(){
    return Coupon.closeCoupon()
}
var opnCoupon = function(){
    return Coupon.render("artist")
}

var entercpn = function(){
    return Coupon.renderCpnEnter()
}
var openform = function(){
    return Coupon.openform()
}
var haveaccnt = function(){
    return Coupon.haveaccnt()
}
var proceed = function(){
    return Coupon.proceed()
}

var regusrsgn = function(){
    return Coupon.regusrsgn()
}

var lgnusrsgn = function(){
    return Coupon.lgnusrsgn()
}

var refer = function(){
    return Coupon.refer()
}

var dnrefer = function(){
    return Coupon.closeCoupon()
}

var copycode = function(){
    return Coupon.copycode()
}


































