

// f. page changer
function Pager(){ 
        this.renderPage = function(page, additional_args){

            // Reset root background on page change
            $(".root").removeClass("regBackground");
            $(".root").removeClass("uploads");
            // Kill intervals
            clearInterval( window.form_listener )

            // a. determine pageName & render respective Page
            switch(page){
                case "My Music":
                    $(".App").attr("class", "App appouter");
                    return MyMusic.render()
                case "Upload Music":
                    $(".App").attr("class", "App appouter");
                    return Uploads.render(additional_args)
                case "Log Out":
                    $(".App").attr("class", "App appouter arcobacking");
                    return alert("You've been logged out!")
                case "My Account":
                    $(".App").attr("class", "App appouter");
                    return MyAccount.render()
                case "Home":
                    $(".App").attr("class", "App appouter");
                    return Home.render()
                case "Overview":
                    $(".App").attr("class", "App appouter");
                    return Home.render()
                case "Landing":
                    $(".App").attr("class", "App appouter");
                    $(".navigation").removeClass("mainNav");
                    $(".footer").removeClass("artist_corner_foot");
                    $(".App").addClass("body_main_");
                    return Landing.render()
                case "Payment Settings":
                    $(".App").attr("class", "App appouter arcobacking");
                    return myPayments.render()
                case "Payment Mobile":
                    $(".App").attr("class", "App appouter arcobacking");
                    return myPayments.render()
                case "Terms of Service":
                    $(".App").attr("class", "App appouter backremover");
                    return Terms.render()
                case "Our Story":
                    $(".App").attr("class", "App");
                    return OurStory.render()
                case "FAQs":
                    $(".App").attr("class", "App");
                    return FAQs.render()
                case "Artist Corner":
                    $(".navigation").addClass("mainNav");
                    $(".App").attr("class", "App appouter arcobacking");
                    $("body").attr("class", "")
                    return artistCorner()
                case "Register Account":
                    $(".App").attr("class", "App");
                    return Register.render()
                case "Create Account":
                    return Landing.crt_user()
                case "Artist Sign-In":
                    return Login.renderMobileLogin()
                case "Artist Register":
                    return Login.renderMobileSignUp()
                default:
                    break 
            }
        }
}


window.Pager = Pager;