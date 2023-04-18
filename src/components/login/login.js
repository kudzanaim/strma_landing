
var Login = {
    types: {
        LOGIN: "login",
        SIGNUP: "signup",
        ARTIST: "artist",
        SIGNEDIN: "signedin"
    },
    sState: function(){
        var state_setter = function(){
            localStorage.setItem("a_state", 0);
            return localStorage.getItem("a_state")
        }

        // Get App init State
        var app_state = ( localStorage.getItem("a_state") ) ? parseInt(localStorage.getItem("a_state") ) : parseInt(state_setter());

        switch(  app_state  ){
            case 1:
                var u = JSON.parse( localStorage.getItem("u_ac") );
                var e = u.e;
                var p = u.p;

                return this.signIn(e,p)
            case 0:
                return window.location.href = "https://strma.app/open.artistcorner.html"
        }

    },
    loadHome: function(){
        // Load Navigation
        this.render_navigation();

        // Get Login Home Body
        var landing = this.landing_page();

        $(".loginRoot").append(landing);

        try{ fbq('trackCustom', 'artistCornerlanding', { time: Date.now()})}catch(e){};

    },
    loadLoginSignOut: function(){

        // Define page markup
        var nav = `<div class="loginNav"><div class="navItems"></div></div>`;
        var root = `<div class="loginRoot"></div>`;
        var footer = `
            <div mobile_foot_er_>
                <div class="footerItem_login" onclick="hme()">© Strma, Inc.</div>
                <div class="footerItem_login about_btn" onclick="about()">About</div>
                <div class="footerItem_login" onclick="footerClick(this)">Terms of Service</div>
                <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon" src="/assets/icon/facebook.png"></a>
                <a class="footerItem_login" href="https://www.instagram.com/strmamusic/" target="_blank"><img class="footer_icon" src="/assets/icon/instagram.png"></a>
            </div>
        `;
        
        // Remove and add class
        $("body").removeClass("body-logged-in").addClass("nscr")
        $(".navigation").html(nav);
        $(".root").html(root);
        $(".footer").html(footer).addClass("artist_corner_foot");
        $(".loginNav").removeClass("terms_Header_mobile");

        // Correct header To Padding
        $(".logo_art").css("padding-top", "2%");

        // Landing main Container
        var landing = this.landing_page();
        $(".loginRoot").append(landing);

        // Main Navigation
        Login.render_navigation();

        // Change title and URL
        // window.history.pushState(null, null, "/");
        // $(document).prop('title', `Strma | Artist Corner Login`);
    },
    landing_page: function(){
        var mobile_body = this.mobileLoginBody();
        var output = `
                
        `;
        return output
    },
    mobileLoginBody: function(){
        var output = `
            <div class="body_mobile_headr">
                Manage music.
            </div>
            <div class="body_mobile_desc">
                An Easy way to upload music, track downloads & get paid.
            </div>
        `;
        return output
    },
    render_navigation: function(){
        // Nav Items
        var nav_items = [
            {item: "Strma", onclick: "home_login()", style: "logo-login-btn"},
            {item: "Log In", onclick: "login_button()", style: "nav_item_login loginIn-login-btn ripple"},
            {item: "Sign Up", onclick: "sign_button()", style: "nav_item_login signup-login-btn ripple"}
        ]

        // Map thru Nav Items
        nav_items.map(function(item, index){
            if(item.item != "Strma"){
                var markup = Login.login_nav_item(item.item, item.onclick, item.style );
                return $(".navItems").append(markup);
            }
            else if(item.item == "Strma"){
                var logoURL = `../../assets/logoartist.png`;
                var markup = Login.login_nav_item(item.item, item.onclick, item.style, logoURL );
                return $(".navItems").append(markup);
                
            }
        })
    },
    signIn: function(email, password){
        
        var signIn_ = function(){
            f_as.auth().signInWithEmailAndPassword(email, password)
            .then(function(){
                // Save init_state:
                localStorage.setItem("a_state",1);
                // get user database:
                Login.getUserDB(email, password);
                (!State.et('al'))?(function(){$.post(lgnmtrc,{type:"al"}, function(d){State.e(d.sv)})})() :null;
            })
            // a. load home page
            .then(function(){
                // Load Home to Body
                let markup = Login.homeMarkup();
                // If initial login
                $(".App").html( markup ).addClass("body-logged-in").attr("data-id", Login.types.SIGNEDIN);
                // Add Spinner
                var loadingApp = Login.appLoadingMarkup();
                $(".root").prepend( loadingApp );
                // Render navigation
                renderNavigation.renderNav();
                // ii. Change Page Title
                $(document).prop('title', `Strma Artist Corner | Home`);
                window.history.pushState(null, null, "/open.artistcorner/home");
            })
            .catch(function(error) {
                return console.log( error.message ), alert( error.message )
            });
        }
        return signIn_()
    },
    homeMarkup: function(){
        return `
            <!-- Main Navigation -->
            <div class="navigation mainNav"></div><!-- Root of  the App -->
            
            <!-- Mobile Navigation Container -->
            <div class="mobile_navigation"></div>

            <!-- App Root -->
            <div class="root logged"></div>
            <div class="coup"></div>
            
            <!-- Main app Footer -->
            <div class="footer artist_corner_foot">
                <div class="footerItem_login footerItem_login_" onclick="hme()">© Strma, Inc.</div>
                <div class="footerItem_login footerItem_login_" onclick="about()">About</div>
                <div class="footerItem_login footerItem_login_" onclick="footerClick(this)">Terms of Service</div>
                <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon" src="/assets/icon/facebook.png"></a>
                <a class="footerItem_login" href="https://www.instagram.com/strmamusic/" target="_blank"><img class="footer_icon" src="/assets/icon/instagram.png"></a>
            </div>
        `
       
    },
    getUserData: function(data){
        var setdata = function(){
            // set User Data to State
            State.user = data;
            // get image
            State.profilePic = data.profileImageUrl;
            // set signIn state
            State.user.userSignedIn = true;
            //  Set activities to State
            State.getActivities();
            // instantiate listener on data changes
            State.setListener();

            // Dsipatch event data received
            getAllMetrics( data );
        }
        return setdata()
    },
    getUserDB: function(e, p){
        f_as.database().ref('artists').orderByChild("accountDetails/email").startAt(e).endAt(e+"\uf8ff").once("child_added").then(function(snapshot){
            if(p == snapshot.val().accountDetails.password){
                
                // get userkey and set to State Object
                State.userKey = snapshot.key;

                // Save uState
                localStorage.setItem("u_ac", JSON.stringify({e:e, p:p}))
                
                // set data to State
                Login.getUserData(  snapshot.val() );
            }
        })
    },
    login_nav_item: function(item, onclick, style, logo_url){
        switch (item) {
            case "Strma":
                var markup = `<div class="logo-login-btn" onclick="home_login()"><img class="Logo" src="/assets/icon/strma_logo.png" onclick=""><div class="logoDetail">| Artist Corner</div></div></div>`;
                return markup
            default:
                var markupp = `<div class="`+style+`" onclick="`+onclick+`">`+item+`</div>`;
                return markupp
        }
    },
    fbartist:function(type){
        var m;
        var fblistner = setInterval(function(){
            if( $(".fbhide").length > 0 ){
                clearInterval(fblistner);
                State.fbnode = $(".fbhide");
                m = $(".fbhide");
                k()
            } else if( State.fbnode ){
                clearInterval(fblistner);
                m = State.fbnode;
                k();
            }
        }, 100);

        function k(){
            switch(type){
                case "lgn":
                    $(".login_form_cont").append(m);
                    $(".login_form_cont").append(m);
                    $(".fbhide").css("display", "")
                    return
                case "reg":
                    $(".signup_form_cont").append(m);
                    $(".fbhide").css("display", "");
                    $(".social-btns-logn").addClass("social-btns-reg")
                    $(".orlogwith_").addClass("orlogwith_reg")
                    return 
            }
        }

    },
    renderLoginForm: function(){
        // clear Page
        // Login.loadLoginSignOut();
        window.history.pushState(null, null, "/open.artistcorner/sign-in");

        // Get markup
        var loginform = this.login_form_markup();

        // Delete anyn sign_up widget || header
        $(".login_form_cont").remove();
        $(".signup_form_cont").remove();
        $(".header-login").css("display","none");
        
        // Append to DOM
        $(".login-body-origin").css("display","none");

        return $(".org-hold-inner").prepend(loginform) 
    },
    login_form_markup: function(type){
        var type_ = (type == undefined || type == "") ? "desktop" : type ;
        var output = `
        <div class="login_form_cont">
            <div class="loginformheader">Sign In</div>
            <div class="loginformdescdesk">Log-in to access your dashboard</div>
            <div class="loginformfields"> 
                <div class="form-fieldcontainer-auth">
                    <label class="form-label-auth">Email or Username</label>
                    <input class="username_loginfrm loginfrm" type="email" placeholder="Username">
                </div>
                <div class="form-fieldcontainer-auth">
                    <label class="form-label-auth">Password</label>
                    <input class="passwrd_loginfrm loginfrm"  type="password" placeholder="Password">
                </div>
            </div>
            <div class="btn_container_loginform">
                <div class="login_btn_login ripple" onclick="login_btn_signin()">Login</div>
                <div class="registernow_btn_login ripple ripple" onclick="sign_button()">Register Now</div>
            </div>
        </div>
        `;
        var mobile = `
        <div class="login_form_cont">
            <div class="login_form_cont_inner">
                <div class="logomobileartist">
                    <img class="navimgmn" src="https://strma.app/assets/icon/strma_logo.png">
                </div>
                <div class="pg_cls_cnt"><img onclick="cls_page()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
                <div class="loginformheader">Sign In</div>
                <div class="loginformdesc">Log-in to access your dashboard</div>
                <div class="loginformfields">
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Email/Username</label>
                        <input type="email" class="username_loginfrm loginfrm" placeholder="Username or email">
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Password</label>
                        <input class="passwrd_loginfrm loginfrm"  type="password" placeholder="Password">
                    </div>
                </div>
                <div class="btn_container_loginform">
                    <button class="login_btn_login ripple" onclick="login_btn_signin()">Login</button>
                    <button class="registernow_btn_login ripple ripple" onclick="mobile_signup()">Register Now</button>
                </div>
            </div>
        </div>
        `;

        switch (type_) {
            case "desktop":
                return output
            case "mobile":
                return mobile
        }
        return output
    },
    get_form_data: function(type, additional){
        
        // Validate Form Data if not Empty
        var validation_state = this.validate(type);
 
    
        // If Data valid
        if( validation_state == true){
            // Form 1 Data
            var firstname = (  $(document)[0].body.clientWidth < 600 )? $(".first_sgnup_m").val() : $(".first_sgnup").val();                    
            var lastname = (  $(document)[0].body.clientWidth < 600 )? $(".lastnme_sgnup_m").val() : $(".lastnme_sgnup").val();
            var artistname = (  $(document)[0].body.clientWidth < 600 )? $(".artistname_sgnup_m").val() : $(".artistname_sgnup").val();              
            var country = (  $(document)[0].body.clientWidth < 600 )? $(".country_origin_m").val() : $(".country_origin").val();                   
            var DoB = (  $(document)[0].body.clientWidth < 600 )? $(".date_sgnup_m").val() : $(".date_sgnup").val();
            var cellphone = (  $(document)[0].body.clientWidth < 600 )? $(".cellphone_sgnup_m").val() : $(".cellphone_sgnup").val();
    
            // Form 2 Data
            var email = $(".email_sgnup").val();           var username = $(".username_sgnup").val();
            var password = $(".password_sgnup").val();
    
            // Conditional get data on relevant FORM
            switch (type){
                case State.types.form1:
                    // Create Sign UP data buffer
                    State.signupData = [];
                    // Organise into object
                    var data = {  firstname, lastname, artistname, address:{city:"Not Set", street_address:"Not Set", country}, DoB: new Date(DoB).getTime(), cellphone}
                    // Puh to tree for later use
                    State.signupData.push( data );

                    return Login.next_sgnup()
                    
                case State.types.form2:
                    // Merge Sign Up data into one object and attach to State
                    var data2 = { email, username, password };
                    State.signupData = Object.assign({},  State.signupData[0], data2);

                    return State.signupData

                case State.types.formfb:
                    // Merge Sign Up data into one object and attach to State
                    var data3 = { email:additional + State.types.mail, additional, additional };
                    State.signupData = Object.assign({},  State.signupData[0], data2);

                    return State.signupData
            }
        }
        else if(validation_state == false){
            return alert("Form not completed, ensure all fields are field!")
        }
        else if(validation_state == "password error"){
            return alert( "Passwords do not match!!!");
        }
        else{
            return alert( "Unkown Error Occured, please refresh page to proceed!")
        }
    },
    validate: function(type){
        switch (type) {
            case "form1":
                // Validate Form 1
                var validate1 = function(){
                    if(  $(document)[0].body.clientWidth < 600 ){
                        var firstname = $(".first_sgnup_m")[0].value;          var lastname = $(".lastnme_sgnup_m")[0].value;   var artistname = $(".artistname_sgnup_m")[0].value; 
                        var country = $(".country_origin_m")[0].value;         var DoB = $(".date_sgnup_m")[0].value;           var cellphone = $(".cellphone_sgnup_m")[0].value; 
                    }else{
                        var firstname = $(".first_sgnup_m")[0].value;          var lastname = $(".lastnme_sgnup_m")[0].value;   var artistname = $(".artistname_sgnup_m")[0].value; 
                        var country = $(".country_origin_m")[0].value;         var DoB = $(".date_sgnup_m")[0].value;           var cellphone = $(".cellphone_sgnup_m")[0].value; 
                    }

                    if(firstname == "" || artistname == "" || lastname == ""  || country == ""|| DoB == "" || cellphone== ""){
                        return false
                    } else{ return   true}
                }
                return validate1()
            case "form2":
                // Validate Form 2
                var validate2 = function(){
                    if(  $(document)[0].body.clientWidth < 600 ){
                        var email = $(".email_sgnup").val();    var username = $(".username_sgnup").val();      var password = $(".password_sgnup").val();      var pass_confirm = $(".confirm_passwrd_sgnup").val();
                    }else{
                        var email = $(".email_sgnup_m").val();    var username = $(".username_sgnup_m").val();      var password = $(".password_sgnup_m").val();      var pass_confirm = $(".confirm_passwrd_sgnup_m").val();
                    }

                    if( email == "" || username == "" || password == "" ){
                        return false
                    }
                    else if( email != "" && username != "" && password != "" && pass_confirm != password ){
                        return "password error"
                    }
                    else{ return true}
                }
                return validate2()
        }
    }, 
    render_signup: function(){
        // Close Coupon
        $(".couponOverlayCont").remove();

        // Clear Page
        // Login.loadLoginSignOut();
        window.history.pushState(null, null, "/open.artistcorner/register");

        // Get markup
        var markup = this.signup_markup("personal");

        // Delete anyn sign_in widget || header
        $(".login_form_cont").remove();
        $(".signup_form_cont").remove();
        $(".login-body-origin").css("display","none");

        // Append to DOM 
        return $(".org-hold-inner").prepend(markup)

    },
    next_sgnup: function(){

        // Get markup
        var markup = this.signup_markup("account");

        // remove personal fields
        $(".signup_form_fields_cont").remove(); 

        // Change next button
        var finish_button = ``+markup+`<button class="sign_btn_login ripple" onclick="finish_signup()">Finish</button>`;
        
        return $(".btn_container_signinform").html(finish_button)

    },
    signup_markup: function(type){
        var country_list = this.country_list();
        var personal = `
            <div class="signup_form_cont">
                <div class="pg_cls_cnt"><img onclick="cls_page()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
                <div class="loginformheader">Sign Up</div> 
                <div class="loginformdescdesk">Create an account and begin conneting your music to the world.</div>
                <div class="signup_form_fields_cont">
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">First Name</label>
                        <input type="name" class="loginfrm first_sgnup" placeholder="First Name"  required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Last Name</label>
                        <input class="loginfrm lastnme_sgnup" placeholder="Last Name" required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Stage Name</label>
                        <input class="loginfrm artistname_sgnup" placeholder="Perfomance Name"  required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Date of Birth</label>
                        <input type="date" class="loginfrm date_sgnup" placeholder="Date of Birth" required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Cellphone</label>
                        <input type="tel" class="loginfrm cellphone_sgnup" placeholder="Cell Phone e.g. (77-843-3245)" required>
                    </div>
                    <div class="city_country">
                        <label class="form-label-auth">Country</label>
                        `+country_list+`
                    </div>
                    <div class="btn_container_signinform lgn_btn_">
                        <button class="sign_btn_login ripple" onclick="next_signup()">Next</button>
                    </div> 
                </div>  
                <div class="btn_container_signinform ">
                    <button class="sign_btn_login ripple mbl_btn" onclick="next_signup()">Next</button>
                </div> 
                    
            </div>
        `;
        
        var account = `
            <div class="acount_setup_sgnup">
                <input class="loginfrm username_sgnup" placeholder="Username" required>
                <input type="email" class="loginfrm email_sgnup" placeholder="Email"  required>
                <input type="password" class="loginfrm password_sgnup" placeholder="Password"  required>
                <input type="password" class="loginfrm confirm_passwrd_sgnup" placeholder="Type Password Again" required>
            </div>
        `;

        // Switch
        switch (type) {
            case "personal":
                return personal
            case "account":
                return account
        }
    },
    country_list: function(class_){
        var _class_ = (class_ == undefined)? "": class_;
        var m_ob = ( $(document)[0].body.clientWidth < 600  )? "country_origin_m": '';
        
        var output = `
            <select type="country" class="country_origin loginfrm `+_class_+` `+m_ob+`">
                <option value="">Select Country</option>
                <option value="Algeria">Algeria</option>
                <option value="Angola">Angola</option>
                <option value="Benin">Benin</option>
                <option value="Botswana">Botswana</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Congo">Congo</option>
                <option value="DRC">Democratic Republic of Congo</option>
                <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Ghana">Ghana</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea Bissau">Guinea-Bissau</option>
                <option value="Kenya">Kenya</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Mali">Mali</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Namibia">Namibia</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra">Sierra Leone</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Sudan">Sudan</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Tanzania">Tanzania, United Republic of</option>
                <option value="Togo">Togo</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Uganda">Uganda</option>    
                <option value="Western Sahara">Western Sahara</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
            </select>
        `;
        return output
    },
    appLoadingMarkup: function(){
        return `
            <div class="apploadcontainer_art">
                <div class="mk-spinner-centered mk-spinner-ring spinnerartistload"></div>
                <h1 class="apploadheader_">Creating your Dashboard.</h1>
            </div>
        `
    },
    registerUser: function(){
        // Validate and Get form Data
        var validate_ = State.registerData;

        // Make request to register
        if( validate_ != undefined && typeof(validate_) == "object"){
            var userdata_ = validate_;

            // Ajax request to endpoint
            axios.post(urglur, userdata_).then(function( response ){

                // Break Down response object
                var email = response.data.email;
                var password = response.data.password;

                // Login User
                if( email == validate_.email && password == validate_.password ){
                    // Render Home Page
                    $("._agreement_cont_").remove();
                    Login.signIn(email, password, Login.types.SIGNUP );
                }
                else{
                    return alert("Error occured whilst signing in!")
                }
            })
        }
        else{
            alert("Error Registering your account, please refresh Page!!")
        }
    },
    openAggr:function(){
        // Add register data to State
        State.registerData = this.get_form_data("form2");
        return agreement.render()
    },
    mobileSignUpPage: function(type){
        var country_list = this.country_list();
        var personal = `
        <div class="mobile_signup_cont">
            <div class="signup_form_cont">
                <div class="logomobileartist">
                    <img class="navimgmn" src="https://strma.app/assets/icon/strma_logo.png">
                </div>
                <div class="pg_cls_cnt"><img onclick="cls_page()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
                <div class="loginformheadermb">Sign Up</div> 
                <div class="loginformdescmb">Log-in to access your dashboard</div>
                <div class="signup_form_fields_cont">
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">First Name</label> 
                        <input type="name" class="loginfrm rgfrm first_sgnup_m" placeholder="First Name"  required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Last Name</label> 
                        <input class="loginfrm rgfrm lastnme_sgnup_m" placeholder="Last Name" required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Artist name</label> 
                        <input class="loginfrm rgfrm artistname_sgnup_m" placeholder="Perfomance Name" required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Date of Birth</label> 
                        <input type="date" class="loginfrm rgfrm date_sgnup_m" placeholder="Date of Birth"  required>
                    </div>
                    <div class="form-fieldcontainer-auth">
                        <label class="form-label-auth">Cellphone</label> 
                        <input type="tel" class="loginfrm rgfrm cellphone_sgnup_m" placeholder="Cell Phone e.g. (77-843-3245)"  required>
                    </div>
                    <div class="city_country">
                        <label class="form-label-auth">Country</label> 
                        `+country_list+`
                    </div>
                    <div class="btn_container_signinform lgn_btn_">
                        <button class="sign_btn_login ripple" onclick="next_signup()">Next</button>
                    </div> 
                </div>  
                <div class="btn_container_signinform ">
                    <button class="sign_btn_login ripple mbl_btn" onclick="next_signup()">Next</button>
                </div> 
                    
            </div>
        </div>
        `;
        
        var account = `
            <div class="acount_setup_sgnup">
                <input class="loginfrm username_sgnup_m" placeholder="Username"  required>
                <input type="email" class="loginfrm email_sgnup_m" placeholder="Email" required>
                <input type="password" class="loginfrm password_sgnup_m" placeholder="Password" required>
                <input type="password" class="loginfrm confirm_passwrd_sgnup_m" placeholder="Type Password Again" required>
            </div>
        `;

        // Switch
        switch (type) {
            case "personal":
                return personal
            case "account":
                return account
        }
    
    },
    renderMobileSignUp: function(){

        // Close Coupon
        $(".couponOverlayCont").remove()

        // Get Sign Up html
        var markup = this.mobileSignUpPage("personal");

        // Clear page of BS
        $(".landing-body-auth-inner").html("");
        $(".btn-login-cont-mobile").html("");

        // Append sign up form Page
        return $(".landing-body-auth-inner").html(markup)
    },
    renderMobileLogin: function(){
        // Get Sign Up html
        var markup = this.login_form_markup("mobile");

        // Clear page of BS
        $(".landing-body-auth-inner").html("");
        $(".btn-login-cont-mobile").html("");

        // Append sign up form Page
        return $(".landing-body-auth-inner").html(markup), setTimeout(function(){
            Login.fbartist("lgn");
            State.fbtype_ = 'lgn';
        },200)

    },
    clspage:function(){
        location.pathname = "/open.artistcorner.html"
    }
}

var cls_page = function(){Login.clspage()};
// login button navigation menu
var login_button = function(){Login.renderLoginForm()};
// Sign Up Button
var sign_button = function(){Login.render_signup()};
// Mobile Sign Up
var mobile_signup = function(){ return Router.Router("Artist Register") };
// Mobile Login
var mobile_login = function(){     return Router.Router("Artist Sign-In") };
// Next button sign up
var next_signup = function(){ return Login.get_form_data("form1") };
// Finish Button
var finish_signup = function(){  var password = $(".password_sgnup").val();  ( password.length < 6)? alert("Password must be atleast 6 characters.") : ( password.length >= 6)? Login.openAggr() : null; }
// Home
var home_login = function(){ return RouterObject.Router("Landing") };
// Landing
var hme = function(){ return RouterObject.Router("Landing") };
// login button sig in form
var login_btn_signin = function(){
    var username = $(".username_loginfrm").val();       var password = $(".passwrd_loginfrm").val(); 
    // Validate, if empty alert User
    ( username == "" || password == "")? alert("Please ensure all fields are filled properly.") : Login.signIn(username, password);
}


















