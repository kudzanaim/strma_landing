
var myPayments = {
    markUp: function(){
        var output = `
            <div class="">  
                <div class="payments_main_container">
                    <div class="main_container"></div>
                    <div class="payment_support_cont"></div>  
                </div>             
            </div>
        `;
        return output
    },
    render: function(){
        // i. Get HTML Page
        var pageHTML = myPayments.markUp();
        // ii. get all containers
        var current_data = State.user.payments.current;
        var current_paymnts = myPayments.current_payments( current_data );
        // iii. render all containers
        const render_all = function(){
            f_as.database().ref(`metrics/`+State.user.id+`/due`).once("value").then(function(x){
                var R = (x.val())? (0.0004 * parseFloat(x.val())).toFixed(2) : '0.00';
                
                var payment_module = myPayments.payoutmod(R);
                // a. render main container
                $(".root").html( pageHTML);
                // b. render sub-containers
                $(".main_container").html( current_paymnts);
                $(".payment_support_cont").html( payment_module);
                // Render Payments
                myPayments.renderPayments(Object.values(State.user.invoices))

                alert(`We will start issuing royalty payments on April 2021. As part of our App launch, we ofered users 60days of free listening, to popularize the concept of streaming and paying for music in Zimbabwe.`)
                    
            })
        }
        return render_all()
    },
    current_payments: function(data){
        var output = `
        <div class="currentPaymentSettings">
            <h1 class="payment_header"> Current Payment Settings </h1>
            <div class="lineStyler">
                <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
            </div>
            <div class="current-data"> 
                <div class="user_data_item">    <div class="currnt-user-key">First Name</div>     <div class="">`+data.firstName+`</div>                  </div>
                <div class="user_data_item">    <div class="currnt-user-key">Last Name</div>     <div class="">`+data.lastName+`</div>                    </div>
                <div class="user_data_item">    <div class="currnt-user-key">Phone Number</div>     <div class="">+263 - 0`+data.phoneNumber+`</div>              </div>
                <div class="user_data_item">    <div class="currnt-user-key">Payment Facility</div>     <div class="">`+data.paymentService+`</div>      </div>
            </div>
            <div class="btn_cont_paymnt">
                <div class="edit_pymnt_btn upload_button ripple" onclick="edit_payment_click()">Edit Payment Details</div>
            </div>
        </div>
        `;
        return output
    },
    edit_payments: function(){
        var output = `
        <div class="editPaymentSettings">
            <h1 class="payment_header">Edit Payment Details</h1>
            <div class="lineStyler">
                <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
            </div>

            <div class="paymentData"> 
                <div class="paymentData-field">
                    <label class="paymentData-label">First name</label>
                    <input class="upload_field first_name" placeholder="First Name" >
                </div>
                <div class="paymentData-field">
                    <label class="paymentData-label">Last name</label>
                    <input class="upload_field last_name" placeholder="Last Name" >
                </div>
                <div class="paymentData-field">
                    <label class="paymentData-label">Cellphone</label>
                    <input class="upload_field phone_number" placeholder="Cell Phone Number" >
                </div>
                <div class="paymentData-field">
                    <label class="paymentData-label">ID number</label>
                    <input class="upload_field national_id" placeholder="National ID Number" >
                </div>
                <div class="paymentData-field">
                    <label class="paymentData-label">Payment Provider</label>
                    <select class="payment_facility">
                        <option value="">Select Payment Service</option>
                        <option value="ecocash">Eco Cash</option>
                        <option value="onewallet">One Wallet</option>
                        <option value="telecash">Telecash</option>
                    </select>
                </div>
            </div>
            
            <div class="btn_cont_paymnt">   
                <div class="save_pymnt_btn upload_button" onclick="current_payment_click()">Save Details</div>
                <div class="cancel_pymnt_btn" onclick="closepytedit()">Cancel</div>
            </div>
        </div>
        `;
        return output
    },
    payment_support: function(){
        var output = `
            <div class="payment_support">
                <h1 class="payment_header">How to get Paid.</h1>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>

                <div class="payment_support_info"> 
                    <p class="support_para">
                    In order to receive payments for your music, you must have the completed the following
                    steps.
                    </p>
                    <ol class="support_ol">
                        <li>Registered & working account with either EcoCash/One Wallet/Telecash</li>
                        <li>Must provide a valid National ID number</li>
                        <li>Provide the cellphone number associated with the mobile payment service
                        you are registered with.
                        </li>
                    </ol>
                    <div class="mobile-wallet-providers">
                        <h3 class="providers-header">Accepted Mobile Wallet Providers</h3>
                        <div class="providers-logo">
                            <img class="logo-item-pr" src="/assets/icon/ecocash.png">
                            <img class="logo-item-pr" src="/assets/icon/telecash.png">
                            <img class="logo-item-pr" src="/assets/icon/onewallet.png">
                        </div>
                    </div>
                </div>
                
            </div> 
        `;
        return output
    },
    render_edit_or_current_paymnts: function(type_){
         switch(type_){
            // Edit Widget
            case "edit":
                var edit_paymnts = myPayments.edit_payments();
                return $(".main_container").html( edit_paymnts)

            // Current Widget
            case "current":
                var current_data = State.user.payments.current;
                var current_paymnts = myPayments.current_payments(current_data);
                return $(".main_container").html( current_paymnts)
         }
    },
    payoutmod:function(amount=`0.00`){
        var buttonState = (parseInt(amount)<5)? "disabled":'';
        var classState = (parseInt(amount)<5)? "payoutreleasebtn":'';
        var date = myPayments.days[new Date().getDay()] +" 01 "+ myPayments.month[new Date().getMonth()+1] + " "+ new Date().getFullYear();
        var paybutton = `<button `+buttonState+` class="payoutreleasebtn `+classState+`" onclick="mp()">Realese Payment</button>`;
        var dateelement = `<div class="payoutnextpay">Next Payout: `+date+`</div>`;

        return `
        <div class="payoutmod">
            <div class="payoutmodinn">
                <div class="payouttop">
                    <div class="payouttopinn">
                        <div class="payouttopleft">
                            <div class="payouttopleftinn">
                                
                            </div>                    
                        </div>
                        <div class="payouttopright">
                            <div class="payouttoprightinn">
                                <div class="payouthdrlabel">Royalties Earned</div>
                                <div class="payoutbalance">$`+amount+`</div>
                                <div class="payoutnextpay">Payouts will start April 1st 2021</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="payouthistoryhdr">
                    <div class="payouthistoryhdrinn">Payments History</div>
                </div>
                <div class="payoutbottom">
                    <div class="payoutbottombody">
                    
                    </div>
                </div>
            </div>
        </div>
        `
    },
    payitem: function(payment){
        return `
            <div class="payitem" data-id="`+payment["id"]+`">
                <div class="payiteminn">
                    <div class="payiteminnleft">
                        <div class="paymentrecptamount">$`+payment["amount"]+` USD</div>
                        <div class="paymentrecptdate">`+new Date(payment["timeStamp"]).toDateString()+`</div>
                    </div>
                    <div class="payiteminnright">
                        <div class="paymentrecpttype">`+payment["type"]+`</div>
                    </div>
                </div>
            </div>
        `
    },
    renderPayments: function(payments=[]){
        if(payments.length>0){
            for(p of payments){
                var payitem = this.payitem(p)
                $(".payoutbottombody").append(payitem);
            }
        }
        else{
            $(".payoutbottombody").html(`
                <div class="nopayments">
                    <div class="nopaymentshdr">You have no Payouts to show</div>
                </div>
            `);
        }
    },
    mp:function(){
        axios.post(`https://data.strma.app/payartist/`+ State.user.id +``)
    },
    days:{
        0:'Sun',
        1:'Mon',
        2:'Tue',
        3:'Wed',
        4:'Thur',
        5:'Fri',
        6:'Sat'
    },
    month:{
        0:'Jan',
        1:'Feb',
        2:'Mar',
        3:'Apr',
        4:'May',
        5:'Jun',
        6:'Jul',
        7:'Aug',
        8:'Sep',
        9:'Oct',
        10:'Nov',
        11:'Dec',
    }
}

window.mp = function(){
     
};

window.closepytedit = function(){
    $(".navActive").click();
    $(".active_mobile_navbutton").click();
};

window.edit_payment_click = function(){
    myPayments.render_edit_or_current_paymnts("edit")
}

window.current_payment_click = function(){
    // i. Get values from form
    var first_name = $(".first_name").val();                var last_name = $(".last_name").val();
    var phone_number = $(".phone_number").val();            var personal_id = $(".national_id").val();
    var payment_service = $(".payment_facility").val();

    // ii. Update State Object
    State.user.payments.current.firstName = first_name;
    State.user.payments.current.lastName = last_name;
    State.user.payments.current.paymentService = payment_service;
    State.user.payments.current.personalID = personal_id;
    State.user.payments.current.phoneNumber = phone_number

    // iii. render current data view
    myPayments.render_edit_or_current_paymnts("current");

    // v. Push activity to State
    State.addActivity("payment")
}

window.myPayments = myPayments;




 