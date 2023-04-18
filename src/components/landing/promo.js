var promo = {
    render: function(){
        var markup = this.markup();
        $('.body_main_').addClass('backremover');

        $('.footer').removeClass('footerlanding');

        return $('.root').html(markup)
    },
    markup: function(){
        return `
            <div class="ads" data-page="ads">
                <div class="hmmaintitkebnr">
                    <div class="hmmaintitkebnrtxt">Advertising on Strma</div>
                    <p class="hmmaintitkebnrp">A quick guide on how Strma Ads Platform works and how to run ads.</p>
                </div>
                <div class="adscontainr">
                    <div class="menu_gutter adspggutter">
                        <div class="menu_badgeads"><img  src="./../../assets/icon/strma_logo.png" class="badge_logo"></div>
                        <a class="menu_close" href="/"><img style="right: -20vw;" src="./../../assets/icon/close_menu.png" class="close_icon_"></a>
                    </div>
                    <div class="adspgbody">
                        <div class="adsbodyhold">
                            <article class="adscntitem">
                                <h1 class="adsbdyitemhdr">Ads Platform</h1>
                                <p class="adsbdyitempara">
                                    Strma Ads platform allows businesses to run advertisement campaigns on our music applications. Ads are delivered to users on our
                                    website music player & android mobile application. Currently the ads platform is in beta mode, as we continue to learn and strengthen
                                    the application. We welcome businesses to partner with us in promoting your products/services. Strma ads can also be used by music artists 
                                    to promote their music. For sign up, please contact our team through the form on this page.
                                </p>
                            </article>
                            <article class="adscntitem">
                                <h1 class="adsbdyitemhdr">Ad Types</h1>
                                <p class="adsbdyitempara">
                                    Advertisement on Strma can be delivered in 3 forms, large, small and full screen. Large and small sized ads are 
                                    delivered on the "Latest music" tab. On desktop screens these ads will appear on the right side of the page, and on mobile 
                                    screens, they will appear at the bottom of and in between music content list.<br><br>

                                    Full screen ads cover the entire screen can run for 9, 15 and 30 seconds. This type will pause the music, and will require the user 
                                    manually click a button "Close Ad" to remove the ad and resume music play. The "Close Ad" button will become clickable once the
                                    ad has ended.

                                    See below how the different ad types look:
                                </p>
                                <section class="adsbdyimagecont">
                                    <div class="adsbdyimgitmcont">
                                        <h4 class="adsbdyimgitmhdr">Large Ad</h4>
                                        <img src="./../../assets/ads/large.png" class="adsbdyimgitm">
                                    </div>
                                    <div class="adsbdyimgitmcont">
                                        <h4 class="adsbdyimgitmhdr">Fullscreen Ad</h4>
                                        <img src="./../../assets/ads/fs.png" class="adsbdyimgitm">
                                    </div>
                                    <div class="adsbdyimgitmcont">
                                        <h4 class="adsbdyimgitmhdr">Small Ad</h4>
                                        <img src="./../../assets/ads/small.png" class="adsbdyimgitm">
                                    </div>
                                    <div class="adsbdyimgitmcont">
                                        <h4 class="adsbdyimgitmhdr">Mobile Phone Ad</h4>
                                        <img src="./../../assets/ads/mobile.PNG" class="adsbdyimgitm">
                                    </div>
                                </section>
                                
                            </article>
                            <article class="adscntitem">
                                <h1 class="adsbdyitemhdr">Ad Formats</h1>
                                <p class="adsbdyitempara">
                                    Currently we accept image ads only, which we refer to as static ads. Video and audio ads will be open for use starting <span class="importanttext">January 1st 2020</span>. 
                                    Audio & video ads will only run on full screen ads, whilst image ads will run on large, small and full screen ads. We are open for the 
                                    application of all ad types. 
                                </p>
                            </article>
                            <article class="adscntitem">
                                <h1 class="adsbdyitemhdr">Ad Delivery</h1>
                                <p class="adsbdyitempara">
                                    Before we deliver your ads to users, each ad must go through a digital auction where it will compete with other ads for both 
                                    placement and position in the ad queue. An ad queue is a list of ads sorted in descending order by their bid value. Bid value
                                    is the amount the advertiser is willing to spend on each viewing cycle. Those ads with higher bid are ranked at the top, meaning 
                                    they will be the first to be served to users. Ads that are at the bottom of the ad queue, stand a chance of not being delivered 
                                    to the user, as it might take a longer time for them to be eventually served to the user, as we deliver those with higher posisitons 
                                    in the ad queue.
                                    <br>
                                    <br>
                                    Large and small ads are delivered on the right side of the page on desktop sessions. We serve 3 ads per view cycle to the user.
                                    We have many ads to deliver to the user that are in the ad queue, so instead of showing all ads at once, we only serve 3 ads to be viewed at a time. 
                                    These ads will be on the page for 30 seconds, and this period is what we call a "View Cycle". When a view cycle is complete, we 
                                    remove the ads, pick the next 3 ads in the queue, and then serve them to the page. This will be for the entire period the user is on 
                                    the page.
                                    <br>
                                    <br>
                                    Full screen ads are delivered after every 10 songs. We do not run these as often as they interupt the user experience. However
                                    these ads will perform better and get the best results as they stop all interaction on the application for the duration of the ad, whilst
                                    also requiring the user to physically click to close the ad. These are also delivered based on the budget & bid amount proposed. 
                                </p>
                            </article>
                            <article class="adscntitem">
                                <h1 class="adsbdyitemhdr">Cost and Pricing</h1>
                                <p class="adsbdyitempara">
                                    Our Ads platform is currnetly on a free trial basis, meaning advertisers can run ads on Strma for free without paying. 
                                    This promotion will run until <span class="importanttext">April 1st 2021</span>. During this period, ads will be 
                                    ranked based on a on the proposed future budget and First-In-First-Out basis. We encourage all advertisers to capitalize on this 
                                    opportunity.
                                    <br>
                                    <br>
                                    To start advertisisng now, please get in touch with us on the below contact form with your enquiry and contact details, and our Ads team
                                    will be in touch you to discuss next steps.
                                </p>
                            </article>
                        </div>
                    </div>
                    <div class="adspgform">
                        <div class="contactpgformholder">
                            <div class="adspgfrmhdr">Leave message.</div>
                            <div class="contactpgfrmtext">Feel like getting in touch with us? Submit.</div>
                            <div class="contactpgform">
                                <input class="contactpgformfiled" placeholder="Organisation Name" data-name="name">
                                <input class="contactpgformfiled" placeholder="Subject" data-name="subject">
                                <textarea class="contactpgformfiled contacttxtarea adstxtarea" placeholder="Message" data-name="message"></textarea>
                                <button class="submitcontactpgfrm" onclick="Contact.sbmt()" data-name="ads">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    sbmt:function(){
        var n = $('.contactpgformfiled[data-name="name"]').val();
        var s = $('.contactpgformfiled[data-name="subject"]').val();
        var t = 'promotion';
        var m = $('.contactpgformfiled[data-name="message"]').val();

        if( n.length >3 && s.length > 3 && t != 'null' && m.length > 10 ){
            $(".submitcontactpgfrm").after('<div class="formstatus">Your message has been Successfully</div>');

            jq.c(jq.y, {n,s,t,m}, function(){
                setTimeout(() => {
                    location.pathname ='/';
                    alert('We have received your message. Our team will be in touch with you soon!');
                }, 1000);
            })
        }
        else if(n.length < 3 ){ alert('Name is not entered properly!') }
        else if(s.length < 3 ){ alert('Subject is not entered or detailed enough!') }
        else if(t == 'null'){ alert('Please select a topic!') }
        else if(m.length < 3 ){ alert('Message too short or not entered!') }
    },
    c:function(){
        location.pathname ='/';
    }
}