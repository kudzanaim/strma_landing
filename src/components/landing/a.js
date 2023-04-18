var am = {
    render: function(){
        var markup = this.markup();
        am.jq = {c:$.post};
        console = {};
        $('.body_main_').addClass('backremover');

        $('.footer').removeClass('footerlanding');

        $('.root').html(markup); 
        
        setTimeout(function(){$('.adscformsubmitbtn').on('click', function(){
            am.sbmt()
        })},1);

        if(  sessionStorage.getItem('am')  ){
            var a = JSON.parse(sessionStorage.getItem('am'));
            am.sbmt(a.a,a.b);
        };

        am.State = {
            ad:{
                c:{
                    name:'',
                    e:'',
                    p:'',
                    c:'',
                },
                d:{
                    t:'',
                    dsc:'',
                    bdt:'',
                    img:'',
                    btnlnk:'',
                    e:'',
                    d:'',
                },
                id:''
            }
        };
    },
    markup: function(){
        return `
            <div class="ads" data-page="ads">
                <div class="hmmaintitkebnr">
                    <div class="hmmaintitkebnrtxt">Ads Manager Login</div>
                    <p class="hmmaintitkebnrp" data-tz="cloudfunctions.net/adsauth">Sign into the Ads Manager using the auth details provided on account creation. To create an account, contact Ad Support here and apply for Ad Account. </p>
                </div>
                <div class="adsmcontainr">
                    <div class="adscinn" data-name="adscinn">
                        <div class="adscinnlft" data-name="adscinnlft">
                            <div class="adscttl" data-name="adscttl"> <h1 class="adscttlhdr" data-name="adscttlhdr">Sign In to Ads Console here</h1> </div>
                            <div class="adscformcnt" data-name="adscformcnt">
                                <div class="adscformcntinn" data-name="adscformcntinn">
                                    <div class="adscformfldhld">
                                        <label class="adscformlbl" data-name="adscformlbl">Username</label>
                                        <input class="adscforminpt" type="email" placeholder="Enter username/email" data-name="adscforminptuser">  
                                    </div>
                                    <div class="adscformfldhld">
                                        <label class="adscformlbl" data-name="adscformlbl">Password</label>
                                        <input class="adscforminpt" type="password" placeholder="Enter Password" data-name="adscforminptpass">  
                                    </div>
                                    <div class="adscformsubmit">
                                        <button class="adscformsubmitbtn" onclick="" data-name="adscformsubmitbtn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="adscinnrgt" data-name="adscinnrgt">
                            <div class="adscinnrgtinn" data-name="adscinnrgtinn" data-tx="us-central1-strmamedia.">
                                <div class="adscinnrgtinnhdr">Apply for Ad Account</div>
                                <div class="adscinnrgtinnlist">
                                    <ul class="adscinnrgtinnul">
                                        <div class="adscinnrgtinnli adscinnrgtinnlixr" data-x="https://">Our Ads platform is currently available for eligible applicants. Businesses will need to apply for an 
                                        account, and our Ads Team will review your application, then out to your team for next steps. Eligible accounts need to meet the folowing requirements:
                                        </div>
                                        <br/>
                                        <br/>
                                        <li class="adscinnrgtinnli">Business must be a registered company in Zimbabwe.</li>
                                        <li class="adscinnrgtinnli">Have a physical product your own or service you have a created.</li>
                                        <li class="adscinnrgtinnli">Able to run ads at a minimum budget of $200 per campaign.</li>
                                        <li class="adscinnrgtinnli">Not a pyramid, get rich quick or multi-level marketing company.</li>
                                    </ul>
                                </div>
                                <div class="adscinnrgtinnbtncnt">
                                    <button class="adscinnrgtinnbtn" onclick="" data-name="adscinnrgtinnbtn">Apply Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    buffer:function(){
        return `
            <div class="ambuff">
                <div class="ambuffinn" data-name="ambuffinn">
                    <div style="padding-top: 40vh;" class="spinner_container"><div class="mk-spinner-centered mk-spinner-ring"></div> <div style="font-size: 25px; color: white; font-family: roboto; font-weight: 500;display: block; text-align: center; padding-top: 50px;"class="spin_text">Signing you In...</div></div>
                </div>
            </div>
        `
    },
    sbmt:function(u,p){
        var a = (u)? u:$('.adscforminpt[data-name="adscforminptuser"]').val();
        var b = (p)? p:$('.adscforminpt[data-name="adscforminptpass"]').val();
        var bf = am.buffer();

        (!u)? sessionStorage.setItem('am', JSON.stringify({a:a, b:b})): null;

        if( a.length >3 && b.length > 3 ){           
            $('.root').append(bf);

            var tx = $(`.adscinnrgtinnlixr`)[0].dataset.x;
            var ty = $(`.adscinnrgtinn`)[0].dataset.tx;
            var tz = $(`.hmmaintitkebnrp`)[0].dataset.tz;
 
            am.jq.c((tx+ty+tz), {u:a,p:b,t:'L'}, function(d){
                if(d.d){
                    setTimeout(() => {
                        am.mk = d.m;
                        am.pm = d.p;
                        am.bi = d.bi;
                        am.a = 'overview';
                        am.d = d.d.A;
                        am.tx = (tx+ty+tz);

                        $('.root').html(am.acc());   
                        
                        $('.amtabbtn[data-name="overview"]').click();

                        $('.adsmcrtbtninn').on('click',function(e){
                            am.crt(e.target);
                        });

                        am.s = false;
                        
                        $('.ambuff').remove();

                        // calc spend:
                        var sp = 0;     var cl = 0;  var vws = 0;
                        var spl = 0;    var cll = 0;    var vwsl = 0;
                        
                        _.each(am.d, function(a,b){
                            sp= sp+parseFloat(a.spent);
                            spl=spl+1;

                            (spl==_.size(am.d))? _.each(am.d, function(a,b){
                                cl=cl+parseInt(a.impressions.clicks);
                                cll=cll+1;
                                
                                (cll==_.size(am.d))?  _.each(am.d, function(a,b){
                                    vws=vws+parseInt(a.impressions.views);
                                    vwsl=vwsl+1;
                                    (vwsl==_.size(am.d))? (function(){
                                        vws = Number(parseFloat(vws).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0});
                                        cl = Number(parseFloat(cl).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0});
                                        sp = Number(parseFloat(sp).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2});
                                        // Update Totals
                                        $(`.ammcntpgttlsfldtxt[data-name="vws"]`).text(vws);
                                        $(`.ammcntpgttlsfldtxt[data-name="cl"]`).text(cl);
                                        $(`.ammcntpgttlsfldtxt[data-name="sp"]`).text('$'+sp);

                                        am.ttls = {cl,sp,vws};
                                    })():null;
                                }) : null;
                            }) : null;
                        });
                       
                        am.b = (d.b)?d.b:{};
                        am.bb = (d.b.balance)?d.b.balance:0;


                    }, 1500);
                }else{
                    alert('Account not found! Please contact Administrator.')
                }
            })
        }
        else if(a.length < 8 ){ alert('Username is not entered properly!') }
        else if(a.length < 8 ){ alert('Please enter a valid password!') };
        
        setTimeout(function(){$('.ambuff').remove(); }, 3000);    
    },
    cttls:function(){
        _.each(am.d, function(a,b){
            sp= sp+parseFloat(a.spent);
            spl=spl+1;

            (spl==_.size(am.d))? _.each(am.d, function(a,b){
                cl=cl+parseInt(a.impressions.clicks);
                cll=cll+1;
                
                (cll==_.size(am.d))?  _.each(am.d, function(a,b){
                    vws=vws+parseInt(a.impressions.views);
                    vwsl=vwsl+1;
                    (vwsl==_.size(am.d))? (function(){
                        vws = Number(parseFloat(vws).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0});
                        cl = Number(parseFloat(cl).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0});
                        sp = Number(parseFloat(sp).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2});
                        // Update Totals
                        $(`.ammcntpgttlsfldtxt[data-name="vws"]`).text(vws);
                        $(`.ammcntpgttlsfldtxt[data-name="cl"]`).text(cl);
                        $(`.ammcntpgttlsfldtxt[data-name="sp"]`).text('$'+sp);
                    })():null;
                }) : null;
            }) : null;
        });
    },
    appl:function(){
        // jq.c(jq.y, {a,b}, function(){
        //     setTimeout(() => {
        //         alert('Thank for you for applying for Advertising Account. We have received your message & our team will be in touch with you 48/72hours!');
        //         $('.adscforminpt[data-name="adscforminptuser"]').val("");
        //         $('.adscforminpt[data-name="adscforminptpass"]').val("");
        //     }, 1000);
        // })
    },
    acc:function(){

        $('.artcor').text('Sign Out').attr('href','open.adsmanager.html')
        $('.artcorc').addClass('ams');
        $('.adsmc').css('display', 'none');
        $('.cont_nav_item_lndg_left').css('display', 'none');
        $('.logoMain').append(`<div class="adslogo">Ads Manager</div>`);

        var ab = am.q();
        var mk = am.mk;

        return mk
    },
    q:function(){
        var t = (am.ttls)? am.ttls:{cl:'Loading...', sp:'Loading...',vws:'Loading...'};
        return `
            <div class="ammcnthldlgd">
                <div class="ammcnthldlgdi">
                    <div class="ammcnthldfld adtitlefld"></div>
                    <div class="ammcnthldfld adtitlefld">Ad Title</div>
                    <div class="ammcnthldfld adtitlefld">Status</div>
                    <div class="ammcnthldfld budgetfld">Budget</div>
                    <div class="ammcnthldfld startdatefld">Start Date</div>
                    <div class="ammcnthldfld enddatefld">End Date</div>
                    <div class="ammcnthldfld clicksfld">Clicks</div>
                    <div class="ammcnthldfld reachfld">Reach</div>
                    <div class="ammcnthldfld reachfld">Spent</div>
                    <div class="ammcnthldfld reachfld"></div>
                </div>
            </div>
            <div class="ammcntpg" data-name="ammcntpg">

            </div>
            <div class="ammcntpgttlsctn" data-name="ammcntpgttlscnt">
                <div class="ammcntpgttls">
                    <div class="ammcnthldfld adtitlefld"></div>

                    <div class="ammcntpgttlsfldc">
                        <div class="ammcntpgttlsfldh">Total Clicks</div>
                        <div class="ammcntpgttlsfldtxt" data-name="cl">`+t.cl+`</div>
                    </div>

                    <div class="ammcntpgttlsfldc">
                        <div class="ammcntpgttlsfldh">Total Reach</div>
                        <div class="ammcntpgttlsfldtxt" data-name="vws">`+t.vws+`</div>
                    </div>
                    
                    <div class="ammcntpgttlsfldc">
                        <div class="ammcntpgttlsfldh">Total Spent</div>
                        <div class="ammcntpgttlsfldtxt" data-name="sp">`+t.sp+`</div>
                    </div>

                    <div class="ammcnthldfld reachfld"></div>
                </div>
            </div>
        `
    },
    ammtab:function(e){
        $('.amtabbtn').removeClass('activeamm');
        $(e).addClass('activeamm');
        am.a =  $(e)[0].dataset.name;

        switch(  am.a  ){
            case 'overview':
                return $('.ammcnthld').html(am.q()), setTimeout(function(){ am.o() },50), $('.adsmcrtbtninn').css('display','')
            case 'history': 
                return
            case 'payments':
                $('.ammcnthld').html( am.pmt() ), $('.adsmcrtbtninn').css('display','none'), setTimeout(function(){
                    am.rpmt();
                    $('.adpmtbtn').on('click',function(e){  am.edtsve(e.target)  });
                },50)
                return
        }
    },
    o:function(){
        var t = am.tx;
        var b = JSON.parse(sessionStorage.getItem('am'));
        var a = function(d,k){
            var as = (d.status)?'Active':'Inactive';
            var ass = (d.status)?'adactive':'adinactive';
            var ab = (!d.status)?'disabled':'';
            var abss = (!d.status)?'addisabled':'';
            var abt = (!d.status)?'Ad Stopped':'Stop Ad';

            
            return`
            <div class="amad" data-id="`+k+`" onclick="">
                <div class="amadin" data-id="`+k+`">
                    <div class="amadinc">
                        <div class="amadinciconc"><img class="amadincicon" src="./../../assets/show.png" data-id="`+k+`"></div>
                        <div class="adfld" data-id="`+k+`">`+d.creative.title+`</div>
                        <div class="adfld `+ass+`" data-id="`+k+`">`+as+`</div>
                        <div class="adfld" data-id="`+k+`">$`+Number(parseFloat(d.creative.budget).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2})+`</div>
                        <div class="adfld" data-id="`+k+`">`+new Date(d.timestamp).toDateString()+`</div>
                        <div class="adfld" data-id="`+k+`">`+new Date(d.creative.end).toDateString()+`</div>
                        <div class="adfld" data-id="`+k+`">`+Number(parseFloat(d.impressions.clicks).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})+`</div>
                        <div class="adfld" data-id="`+k+`">`+Number(parseFloat(d.impressions.views).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 0})+`</div>
                        <div class="adfld" data-id="`+k+`">`+Number(parseFloat(d.spent).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2})+`</div>
                        <div class="amadinciconc" data-id="`+k+`"><button class="stopad `+abss+`" `+ab+` data-id="`+k+`">`+abt+`</button></div>
                        <div class="amadinciconc" data-id="`+k+`"><img title="Delete Ad" class="amadincicon deletead" data-name="deletead" src="./../../assets/icons/delad.png"></div>
                    </div>
                </div>
            </div>`
        };

        // clear:
        $('.amad').remove();

        // handlers:
        var s = function(e){
            var i = e.target.dataset.id;
            am.jq.c(t, {id:i,t:'S',u:b.a,p:b.b}, function(d){alert('Ad Stopped Succesfully!');  am.d[i].status = false; am.o() });
        };
        var dl = function(e){
            var i = e.target.dataset.id;
            am.jq.c(t, {id:i,t:'D',u:b.a,p:b.b}, function(d){alert('Ad Deleted Succesfully!');  am.o() });
        };
        var p = function(e){
            var i = e.target.dataset.id;
            var ad = am.d[i];
            var pm = am.prv(ad);
            $(`.root`).append(pm);
            setTimeout(function(){     $('.closeadcrtbtn').on('click',function(e){ $('.createadsp').remove() })     },50)
        };


        _.each(am.d, function(y,z){
            $(`.ammcntpg`).append(a(y,z));
            setTimeout(function(){
                $(`.stopad[data-id="`+z+`"]`).on('click', s);
                $(`.deletead[data-id="`+z+`"]`).on('click', dl);
                $(`.amadincicon[data-id="`+z+`"]`).on('click', p);
            },5)
        })
    },
    crt:function(e){
        var m = am.pm;

        return $(`.root`).append(m), setTimeout(function(){     $('.closeadcrtbtn').on('click',function(e){ $('.createads').remove() })     },50)
    },
    datachange:function(param){
            var data = $(param)[0].dataset;
    
            switch(data.name){
                // Business Name
                case 'businessname':
                    am.State.ad.d.name = $(`input[data-name="${data.name}"]`).val()
                    return 
                // Email
                case 'emailname':
                    am.State.ad.d.e = $(`input[data-name="${data.name}"]`).val()
                    return 
                // Phone
                case 'phone':
                    am.State.ad.d.p = $(`input[data-name="${data.name}"]`).val()
                    return 
                // Country
                case 'country':
                    am.State.ad.d.c = $(`input[data-name="${data.name}"]`).val()
                    return 
                // Title
                case 'title':
                    am.State.ad.c.t = $(`input[data-name="${data.name}"]`).val();
                    $('.adtextheader').text(  $(`input[data-name="${data.name}"]`).val()  );
                    return 
                // Description
                case 'description':
                    am.State.ad.c.dsc = $(`input[data-name="${data.name}"]`).val();
                    $('.adtextdescription').text(  $(`input[data-name="${data.name}"]`).val()  );
                    return 
                // Budget
                case 'budget':
                    am.State.ad.c.bdt = $(`input[data-name="${data.name}"]`).val()
                    return 
                // Artwork
                case 'artwork':
                    var file = $(`input[data-name="${data.name}"]`)[0].files[0];
                    // Set to State
                    am.State.ad.c.img = file;
                    // Add art to preview
                    $(`.adimage`).attr('src', URL.createObjectURL(file));
                    $('div.creativedetailinput').text( file.name )
                    return 
                // Link
                case 'link':
                    am.State.ad.c.btnlnk = $(`input[data-name="${data.name}"]`).val()
                    return 
                // End Date
                case 'end':
                     am.State.ad.c.e = new Date().getTime (  $(`input[data-name="${data.name}"]`).val()  );
                    return 
                // button Type
                case 'buttontype':
                     am.State.ad.c.btn = $(`select[data-name="${data.name}"]`).val();
                     $('.adcalltoaction').text( $(`select[data-name="${data.name}"]`).val() )
                    return 
            }
    },
    artclck:function(){
        $('.artwork ').click()
    },
    submit: function(){
            var nme = $('.businessname').val();     var eml = $('.emailname').val();            var p = $('.phone').val();              var c = $('.country').val();
            var ttl = $('.title').val();            var dsc = $('.description').val();          var lnk = $('.link').val();             var btn = $('.buttontype').val();
            var bdg = $('.budget').val();           var img = $('.artwork')[0].files[0];        var e = $('.end').val();
    
                
            if( nme && p && eml && c && ttl && dsc && lnk && btn && bdg && img && e ){
                var cnfm = confirm('Upload starting!');
                if(cnfm){
                    // UO:
                    var ad = {nme, p, ttl, lnk, bdg, e, eml, c, dsc, btn, img};
                    // GU:
                    var a = JSON.parse(sessionStorage.getItem('am'));
                    // U:
                    var t = am.tx;
                    // P2S:
                    var y = new FormData();
                    y.append('img',img);       y.append('p',a.b);                       y.append('u',a.a);                              y.append('t','C');
                    y.append('nme',nme);     y.append('eml',eml);                       y.append('ttl',ttl);                            y.append('lnk',lnk);
                    y.append('ph',p);         y.append('c',c);                          y.append('dsc',dsc);                            y.append('btn',btn);
                    y.append('bdg',bdg);     y.append('e',e);
            
                    $.ajax({
                        type: 'post',
                        url: t,
                        data: y, // important
                        contentType: false, // important
                        processData: false, // important
                        success: function (data) {
                            return false;
                        }
                    })           
                }
            }else{
                alert('Ensure all fields are not empty!')
            }
    },
    adreset:function(){
        am.State.ad = {
            ad:{
                c:{
                    name:'',
                    e:'',
                    p:'',
                    c:'',
                },
                d:{
                    t:'',
                    dsc:'',
                    bdt:'',
                    img:'',
                    btnlnk:'',
                    e:'',
                    d:'',
                },
                id:''
            }
        };
        $('.businessname').val('');       $('.emailname').val('');          $('.phone').val('');                $('.country').val('');              $('.title').val('');        $('.description').val('');    $('.link').val('');               $('.buttontype').val('');           $('.budget').val('');               $('.artwork').val('');        $('.end').val('');
    },
    pmt:function(){
        const d = am.bi;
         
        return `
            <div class="adpayments">
                <div class="adpaymentsinn">
                    <div class="adpynmtsleft" data-name="adpynmtsleft">
                        <div class="adpynmtsleftinn" data-name="adpynmtsleftinn" >
                            <div class="adpynmtsleftinnh"><h1 class="adpynmtsleftinnhdr">Payment Details</h1></div>
                            <div class="adpynmtsleftinnt">
                                <div class="adlftpdescription">
                                    <p class="adlftpdescriptionp">
                                        Your payment details that we will use to bill your account upon ad spend.
                                        We only support Ecocash (Econet) & One Wallet (Net One).
                                    </p>
                                </div>
                                <div class="adpfieldcont">
                                    <div class="adlftperscnt" data-name="adlftperscnt">
                                        <label class="adlftperslbl" data-name="adplabel">Name on Account</label>
                                        <input class="adlftperscntfld adfldsc" placeholder="${d.a}" data-name="accname" disabled/>
                                    </div>
                                    <div class="adlftperscnt" data-name="adlftperscnt">
                                        <label class="adlftperslbl" data-name="adplabel" >Account Number</label>
                                        <input class="adlftperscntfld adfldsc" placeholder="${d.b}" data-name="accnumber" disabled/>
                                    </div>
                                </div>
                            </div>
                            <div class="adpmtbtncnt">
                                <button class="adpmtbtn adpmtbtnedit" data-name="adpmtbtnedit" >Edit Details</button>
                                <button class="adpmtbtn adpmtbtnsave" data-name="adpmtbtnsave" >Save</button>
                            </div>
                        </div>
                    </div>
                    <div class="adpynmtsright" data-name="adpynmtsright">
                        <div class="adpynmtsrightinn" data-name="adpynmtsrightinn">
                            <div class="adpynmtsrightinnh">
                                <div class="adpynmtsrightinnhr">
                                    <h1 class="adpynmtslrightinnhdr">Billing History</h1>
                                    <p class="adlftpdescriptionph">
                                        A list of all your amounts we have charged your payment method for ad spend.
                                    </p>
                                </div>
                                <div class="adpynmtsrightinnhl">
                                    <div class="adlftpdescriptionphlr">
                                        <h1 class="adpynmtslrightinnhdr">Account Balance</h1>
                                        <p class="adlftpdescriptionph">Ad spend not paid</p>
                                    </div>
                                    <div class="adlftpdescriptionphll">Loading...</div>
                                </div>
                            </div>
                            <div class="adpynmtslrightinnbody">
                                <div class="adpblnglgnd" data-name="adpblnglgnd">
                                    <div class="adpblgnitm"></div>
                                    <div class="adpblgnitm">Date</div>
                                    <div class="adpblgnitm">Transaction ID</div>
                                    <div class="adpblgnitm">Amount</div>
                                    <div class="adpblgnitm">Payment Method</div>
                                </div>
                                <div class="adpblngcont" data-name="adpblngcont">
                                
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `
    },
    rpmt:function(){
        var ads = am.b;
        var c = {a:'adbd', b:'adbl'};
        var cstate = true;
        
        _.each(ads, function(a,b){
            if(a.id){
                var cls = (cstate)? c.a:c.b;
                cstate = !cstate;
                $('.adpblngcont').append( `
                    <div class="adblngitem `+cls+`" data-name="`+cstate+`">
                        <div class="adblngitemt" data-name="plchld"></div>
                        <div class="adblngitemt" data-name="date">`+a.date+`</div>
                        <div class="adblngitemt" data-name="date">`+a.id+`</div>
                        <div class="adblngitemt" data-name="date">$`+a.amount+`</div>
                        <div class="adblngitemt" data-name="date">`+a.method+`</div>
                    </div>
                `)
            }
        });

        var bb = (am.bb)? am.bb:0.00;

        $('.adlftpdescriptionphll').text('$'+Number(parseFloat(bb).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2}));
    },
    edtsve:function(e){
        var b = $(e)[0].dataset.name;
        switch(b){
            case 'adpmtbtnedit':
                $('.adfldsc').each(function(){ 
                    $(this).prop("disabled", false); 
                });

                am.s = true;

                $('.adfldsc').addClass('adfldscactive');

                return 
            case 'adpmtbtnsave':
                var usr = JSON.parse(sessionStorage.getItem('am') );
                var s = {
                    a:$('.adlftperscntfld[data-name="accname"]').val(),
                    b:$('.adlftperscntfld[data-name="accnumber"]').val(),
                    c:'Ecocash'
                };

                (s.a.length>5 && s.b.length==11)? (function(){
                    $('.adfldsc').each(function(){ 
                        $(this).prop("disabled", 'disabled') 
                    });

                    $('.adfldsc').removeClass('adfldscactive');


                    $(`.adlftperscntfld[data-name="accname"]`).attr('placeholder', $('.adlftperscntfld[data-name="accname"]').val())
                    $(`.adlftperscntfld[data-name="accnumber"]`).attr('placeholder', $('.adlftperscntfld[data-name="accnumber"]').val())


                    var t = am.tx;
                    
                    am.jq.c(t, {u:usr.a,p:usr.b,d:s,t:'P'}, function(d){
                        alert('Payment Successfully Updated!');
                    })

                    am.s = false;

                })() : (
                    $('.adfldsc').each(function(){  $(this).prop("disabled", 'disabled')   }),

                    $('.adfldsc').removeClass('adfldscactive')
                );
        };
        
    },
    prv:function(d){
        return `
            <div class="createadsp" data-name="createads">
                <div class="previewadp" data-name="previewpane">
                    <div class="prevadheaderp" data-name="prevadheader">Preview Ad</div> 
                    <div class="" data-name="" style="display: grid;place-content: center; transform: scale(0.9);">
                        <div class="largeadp" data-name="largead" data-type="ad">
                            <div class="adcontentholder" data-name="adcontentholder">
                                <div class="sponsoredcontainer" data-name="sponsoredcontainer">
                                    <div class="sponsoredicon" data-name="sponsoredicon">i</div>
                                    <div class="sponsoredtext" data-name="sponsoredtext">Sponsored</div>
                                </div>
                                <div class="adimagecontainer" data-name="adimagecontainer">
                                    <img src="`+d.creative.image+`" class="adimage" data-name="adimage">
                                </div>
                                <div class="fsa_adtextcontainer" data-name="sponsoredcontainer">
                                    <div class="adtextcontent" data-name="adtextcontent">
                                        <div class="adtextheader" data-name="adtextheader">`+d.creative.title+`</div>
                                        <div class="adtextdescription" data-name="adtextdescription">`+d.creative.descrition+`</div>
                                    </div>
                                    <a class="adbtnlink" href="`+d.creative.buttonLink+`" target="_blank">
                                        <div class="adcalltoaction" data-name="adcalltoaction">Button type</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="closeadcrt" data-name="closeadcrt">
                    <button class="closeadcrtbtn" data-name="closeadcrtbtn">Close</button>
                </div>
                <input type="file" class="artwork " data-name="artwork" placeholder="artwork number" onchange="am.datachange(this)">
            </div>
        `;
    }
}


