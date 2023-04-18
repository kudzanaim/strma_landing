var About = {
    render: function(){

        // Get MarkUp
        var markup = this.markup();

        // Change title and URL
        $(document).prop('title', `Strma | About Us`);     
        
        // Darken NAv
        $(".navmain").addClass("navFAQ");

        // Render Page
        $(".root").html(markup);

        $(".App").removeClass("body_main_");

        $('.footer').removeClass('footerlanding');

        // Correct Padding if on Landing
        return ( $(".navigation").find(".loginNav").length <= 0)  ? $(".about_page").css({ "overflow-y": "scroll"}) : null;
        
    },
    markup: function(){
        var output = `
            <div class="about_pagecontainer">
                <div class="hmmaintitkebnr"><div class="hmmaintitkebnrtxt">Get to know us!</div></div>

                <div class="about_page">
                    <div class="about_page_content">
                        <div style="left: 0vw;" class="menu_gutter adspggutter">
                            <div class="menu_badgeads"><img  src="./../../assets/icon/strma_logo.png" class="badge_logo"></div>
                            <a class="menu_close" href="/"><img style="right: -20vw;" src="./../../assets/icon/close_menu.png" class="close_icon_"></a>
                        </div>
                        <div class="aboutpgbodycnt">
                            <h1 class="adsbdyitemhdr">About Us</h1>
                            <p style="margin-bottom: 90px;" class="adsbdyitempara">Find your favourite Zimbabwean music, whilst enjoying the ability 
                            to discover new artists and playlists right on your mobile phone.<br />
                            <br />
                            Strma offers a deep library of African music, so whether you're in search of Zim-Dancehall, 
                            Gospel or Sungura, the music is always right at your fingertips.
                                Create your own playlists and choose what you
                            want to listen to. <br />
                            <br />
                            Soundtrack your life with Strma. Subscribe or listen for free.
                            </p>

                            
                            <h1 class="adsbdyitemhdr">Strma Artist Corner</h1>
                            <p style="margin-bottom: 90px;" class="adsbdyitempara">Artist Corner is a specially designed platform for Artists, Producers & Record Labels to manage
                            their music portfolio on Strma. With Artist Corner, Users can monitor how their music is perfoming
                            through key metrics such "Total Streams", 
                            "Weekly Streams" and "Total Royalty Earnings".
                            The artist dashboard also allows artists to Upload Singles & Albums, Edit Songs, manage their profile account 
                            details.<br />
                            <br />
                            The most important feature of the artist dashboard is that Artists can provide their payment details
                            such that they can receive payment for their music streams & downloads. Payments will be sent though 
                            the artists mobile Wallet of choice (e.g. EcoCash or One Wallet).
                            </p>
                            
                            <h1 class="adsbdyitemhdr">Operations and Partners</h1>
                            <p style="margin-bottom: 90px;" class="adsbdyitempara">
                            Currently Strma operates in Zimbabwe, but offers its service to users in South Africa, Uk, Canada, Australia,
                            and Botswana. As a growing service we welcome users, artists and partners from across the world. If you
                            want to see the Strma service in your country, or partner with us to bring Strma to your community, or other business
                            iniatives, we invite you to reach out to our team.
                            </p>
                        </div>

                    </div>
                    <div class="aboutright"><div class="flowerhldr"> <img class="flower" src="./../../assets/icon/flower.png"> </div></div>
                </div>
            </div>
        `;
        return output
    }
}

window.about = function(){
    return About.render()
}

window.About = About;


var css_style = ` border-bottom: solid 1px #e3e0e0;
   width: 90%;
   position: absolute;
   left: 5vw;`;