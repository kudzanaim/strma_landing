var browser_check = {
    page: function(){
        var output = `
            <div class="loginNav" style="background: #2b2929;">
                <div class="navItems1" >
                    <div class="logo-login-btn" onclick="home_login()" >
                        <img class="logo_art" src="/assets/logoartist.png">
                    </div>
                </div>
            </div>
            <div class="main_check_cont">
                <h1 class="oops_header">Oops!</h1>
                <h1 class="check_header">It seems that you're using a old browser.</h1>
                <p class="check_para">
                For the best experience, we recommend that you upgrade your browser to latest version, or use Chrome, Edge or Firefox browser.
                </p>
                <div class="btn_cont_404">
                    <button class="btn_to_home ripple">Back to Main</button>
                    <button class="btn_to_support ripple">Contact Support</button>
                </div>

                <div class="header_brws">Get access to Artist Corner</div>
                <div class="desc_brws">To use Google Maps, download and use latest version of one of the following browsers:</div>
                <div class="browsers_cont">
                    <div class="brws_item"><img class="brws_item_logo" src="./assets/icon/edge.png"><div class="brws_item_title">Microsoft Edge</div></div>
                    <div class="brws_item"><img class="brws_item_logo" src="./assets/icon/chrome.png"><div class="brws_item_title">Google Chrome</div></div>
                    <div class="brws_item"><img class="brws_item_logo" src="./assets/icon/firefox.png"><div class="brws_item_title">Mozilla Firefox</div></div>
                    <div class="brws_item"><img class="brws_item_logo" src="./assets/icon/safari.png"><div class="brws_item_title">Safari</div></div>
                </div>

            </div>
            <div class="footer1">
                <div class="footerItem_login">© Strma, Inc.</div>
                <div class="footerItem_login about_btn" onclick="about()">About</div>
                <div class="footerItem_login terms_btn_foot" onclick="footerClick(this)">Terms of Service</div>
                <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon1" src="/assets/icon/facebook.png"></a>
                <a class="footerItem_login" href="https://www.instagram.com" target="_blank"><img class="footer_icon1" src="/assets/icon/instagram.png"></a>
            </div>
        `;
        return output
    },
    render: function(){
        // Render Error to DOM
        var markup = browser_check.page();
            
        // Change page backgroud and append markup
        document.getElementsByTagName("html")[0].style.background = "#fefff9"
        document.getElementsByTagName("body")[0].innerHTML = markup;
    }
} 