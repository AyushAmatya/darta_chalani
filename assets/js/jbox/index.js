$(document).ready(function(){
    new jBox('Modal', {
        width: 300,
        height: 100,
        attach: '#amount',
        title: 'Esewa Payment',
        content: '<i>You have already paid the Amount!</i>'
      });
      new jBox('Modal', {
        width: 400,
        height: 150,
        attach: '.admitCard',
        title: 'Your Application is not approved yet.',
        content: '<i>Please check remark in status section and provide all requested information or wait to get approved! if you are facing any other issues then please email to <b>info@noc.org.np</b></i>'
      });
      new jBox('Modal', {
        width: 350,
        height: 150,
        attach: '.age_apply',
        title: 'Age limit.',
        content: '<i>You cannot apply to this vacancy! </br> <b>Issues might be:</b> </br> Age limit exceed </br> Note: Disable and Female have limit of 40 yrs till date.  </i>'
      });

});
