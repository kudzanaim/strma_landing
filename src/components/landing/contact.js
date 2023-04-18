var Contact = {
    render: function(){
        var markup = this.markup();
        $('.body_main_').addClass('backremover');

        $('.footer').removeClass('footerlanding');

        return $('.root').html(markup)
    },
    markup: function(){
        return `
            <div class="contact" data-page="contact">
                <div class="menu_gutter contactpggutter">
                    <div class="menu_badgecontact"><img src="./../../assets/icon/strma_logo.png" class="badge_logo"></div>
                    <a class="menu_close" href="/"><img src="./../../assets/icon/close_menu.png" class="close_icon_"></a>
                </div>
                <div class="contactgrid">
                    <div class="contleftpanel">
                        <div class="flowerhldr"> <img class="flower" src="./../../assets/icon/flower.png"> </div>
                        <div class="contactrighthdr">Contact US.</div>
                        <div class="contactlefttext">Feel like getting in touch with us? Submit your enquiry 
                        here  and we will reach out to you as soon as 
                        possible.</div>
                    </div>
                    <div class="contrightpanel">
                        <div class="contactpgformholder">
                            <div style="color: white;"  class="contactpgfrmhdr">Leave message.</div>
                            <div  style="color: #c7c7c7;"  class="contactpgfrmtext">Feel like getting in touch with us? Submit.</div>
                            <div class="contactpgform">
                                <input class="contactpgformfiled" placeholder="Name" data-name="name">
                                <input class="contactpgformfiled" placeholder="Subject" data-name="subject">
                                <select class="contactpgformfiled contacttopic" data-name="topic">
                                    <option value="null">Choose Topic</option>
                                    <option value="report">Report a Problem</option>
                                    <option value="promotion">Advertisements</option>
                                    <option value="artist">I am an Artist</option>
                                    <option value="label">Labels</option>
                                </select>
                                <textarea class="contactpgformfiled contacttxtarea" placeholder="Message" data-name="message"></textarea>
                                <button class="submitcontactpgfrm" onclick="Contact.sbmt()">Submit</button>
                                
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
        var t = $('.contactpgformfiled[data-name="topic"]').val();
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

