var agreement = {
    markup: function(){
        var mobile = `
            <label for="i_agree">I accept and agree to the terms of this partnership.</label>
            <input type="checkbox" id="i_agree" name="scales" >
        `;
        var desktop = `
            <input type="checkbox" id="i_agree" name="scales" >
            <label for="i_agree">I accept and agree to the terms of this partnership.</label>
        `;

        var output = ( $(document)[0].body.clientWidth < 600)? mobile : desktop;
        return `
            <div class="_agreement_cont_">
                <div class="agreement">
                    <div class="hdr_aggr">Distribution Partnership Agreement</div>
                    <div class="content_aggr_holder">
                        `+this.aggrement_text()+`
                    </div>
                    <div class="button_aggr_cont">
                        <div class="radio_container_aggr">
                            `+ output +`
                        </div>
                        <button class="complete_aggrmnt_btn" onclick="completeaggr()">Complete Sign Up</button>
                    </div>
                </div>
            </div>
        `
    },
    aggrement_text: function(username){
        return `
            This is an agreement between "`+username+`"(the artist) and Strma Music (the distributor), to allow Strma to market market the artists music library uploaded onto Strma's
            database by the artist or their record labels. The artist agrees that Strma will make monthly payouts to the artist, for royalties earned from music streams on its music website
            and mobile application.
            <br>
            <br>
            The artist agrees to allowing Strma to collect and deliver metrics on song plays on a weekly basis. Strma guarantees that it will not sell the artists music to 3rd parties without
            the artists consent and approval on the proposed relationship. 
            <br>
            <br>
            The artist accepts to receive monthly payments in their chosen E-Wallet service within the limits of available service offered by Strma (Ecocash, OneWallet, TeleCash). Payments to 
            the artist will be made in US dollars. If artist does not provide payout details as requested, the payment will be witheld by Strma until the artist provides adequate details. The artist 
            accepts to only upload music that he/she is featured in. Failure to do so, can/will result in immidiate termination. If any money was earned whilst fraudulent music uploads, the uploader 
            will be reported for piracy, and required to pay back all funds earned from that content, and might face further legal action. Strma takes this matter seriously and encourages the artist/uploader 
            to hold this issue highly in-order to help Strma maintain the integrity of platform.
            <br>
            <br>
            This agreement supersedes all prior negotiations and proposals, written or otherwise, relating to the subject matter. This agreement outlays the terms of the relationship between the artist, 
            `+username+`, and Strma. This agreement is open for revision in the future but will only be put into action upon the accpetance and approval of the updated terms by the artist.
        `;
    },
    render: function(){
        // Toggle login buttons
        $(".nav_item_login").css("display", "none");
        var markup = this.markup();
        return $(".loginRoot").html(markup)
    },
    done:function(){
        // Remove Aggrement Page
        $("._agreement_cont_").remove();
        
        return Login.registerUser(),  $(".nav_item_login").css("display", "");
    }
}

var completeaggr = function(){
    return agreement.done()
}