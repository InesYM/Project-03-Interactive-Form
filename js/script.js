/*
//DOCUMENT READY
      //Place the document in a ready state to be manipulated safely.
      //$(document).ready(function(){   
        //https://learn.jquery.com/using-jquery-core/document-ready/
  //FOCUS
      //Set focus on the name ID.
        //https://api.jquery.com/focus/  
          //pound sign is looking for the id attribute value
          //<input type="text" id="name" name="user_name">
  //OTHER 
      //First Hide the other title element input: $('#other-title').hide();
              //https://www.w3schools.com/jquery/eff_hide.asp
      //On the drop down menu 'Job Role' add another role, name it 'Other'
          //Create a if else conditional statement 
              //https://www.w3schools.com/js/js_if_else.asp
          //Create an event listener on change 
              //https://api.jquery.com/change/#change-handler
              //$('#title').on('change', (e) => {
          //Use the .val() method on the event target
              //https://api.jquery.com/val/#val
          //Use the hide or show the Other title if selected 
              //https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_show_hide
          //IMPORTANT to Add input in index.html adding text to the placeholder
              //https://www.w3schools.com/jquery/event_change.asp 
              //<input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">
*/

$(document).ready(function(){                     
  $('#name').focus();                            //FOCUS 
  $('#other-title').hide();                       //OTHER         
  $('#title').on('change', (e) => {
    if ($(e.target).val() == 'other') {           //The value selected in the drop down is shown or hidden depending upon the value of the selection. 
        $('#other-title').show();
      } 
      else {
          $('#other-title').hide();
      }
    });

/*//T-SHIRT Section
    //The T-Shirt Section selects the available colors by theme
        //$("#design").find('option').first().hide();
            //Hide the “Select Theme” `option` element in the “Design” menu
            //Reference the index.html for the id <select id="design" name="user_design">
            //Search by id 'design', then find the design options, then the first item is hidden 
        //$("#color option:first").before('<option selected="selected" value="none">Please select a T-shirt theme</option>');
            // https://stackoverflow.com/questions/1414276/how-to-make-the-first-option-of-select-selected-with-jquery?rq=1
            //Add a new option to the top of the option list
            //This will make the selected option read “Please select a T-shirt theme”.
        // $('#color').find('option:not(:eq(0))').hide();
            //Hide the options in the “Color” drop down menu excepting the first.
            //('option:not(:eq(0))') - we are looking for all the elements with the name option but not at index 0 (eq(0))
        //$('#design').on('change', function(){
            //We start the event listener
                //
                //<select id="color"> */

  $('#design').find('option').first().hide();     
  $('#color option:first').before('<option selected="selected" value="none">Please select a T-shirt theme</option>');
  $('#color').find('option:not(:eq(0))').hide();
  $('#design').on('change', function(){
      
    //T-Shirt section extra credit
    $('#color').show();
    $('#colors-js-puns label').show();
    
    //Get the selected option in the select #design, 
    //then get its value attribute js puns & heart js
    const choice = $('#design option:selected').attr("value");
    if (choice == 'js puns') {
          //remove the Please select a T-shirt theme
          $('#color option[value="none"]').remove();
          //we are showing any option whose innertext contains JS Puns
          $('#color option:contains("JS Puns")').show();
          //deselect all elements associated with JS Shirt only (cleanup)
          //set selected attribute to false for deselection 
          $('#color option:contains("JS shirt only")').attr('selected', false);
          //Now we hide JS shirt only
          $('#color option:contains("JS shirt only")').hide();
          //set the first JS Puns option to be selected
          //setting the selected attribute to selected will highlight it
          $('#color option:contains("JS Puns")').first().attr('selected', 'selected');
      }
      else if (choice == 'heart js') {
          //remove the none option, hide and deselect the 'JS Puns' group, show and select the first option of the 'JS shirt only' group
          $('#color option[value="none"]').remove();
          $('#color option:contains("JS Puns")').hide();
          $('#color option:contains("JS Puns")').attr('selected', false);
          $('#color option:contains("JS shirt only")').show();
          $('#color option:contains("JS shirt only")').first().attr('selected', 'selected');
        }
        //failsafe: if neither choice was somehow made restore the starting state of the #color dropdown
        else {
            $("#color option:first").before('<option selected="selected" value="none">Please select a T-shirt theme</option>');
            $('#color option:contains("JS Puns")').hide();
            $('#color option:contains("JS shirt only")').hide();
            $('#color option:contains("JS Puns")').attr('selected', false);
            $('#color option:contains("JS shirt only")').attr('selected', false);
        }
    });
    //T-Shirt SECTION EXTRA CREDIT
    $('#color').hide();
    $('#colors-js-puns label').hide(); 

//ACTIVITY Section
    //Generate a new div element and append to the element with the activities class
    // Create with DOM https://www.w3schools.com/jquery/jquery_dom_add.asp

  const $activityCostDiv = $("<div></div>");
  $(".activities").append($activityCostDiv);      //Append the new element
  let activityCostAmt = 0.0;                     //Start the activityCostAmt at 0

  //Create event listener for the click action on the element with the activities class
  $(".activities").click((e) => {
      //if the clicked element was a checkbox proceed otherwise ignore the click (no else)
    //Updating and displaying the total activity cost part 1
      const $wasClicked = $(e.target);       
       if ($wasClicked.attr("type") == "checkbox")
       {
           //bring back the parent's text (the label of the checkbox) 
           //<label><input type="checkbox" name="all"> Main Conference — $200</label>
           const checkboxLblText = $wasClicked.parent().text();
           //brings back the position of the dollar sign in the label string
           const indexOfDollarSign = checkboxLblText.indexOf("$");
           //bring back the substring after the $ sign 
           const dollarStr = checkboxLblText.slice(indexOfDollarSign + 1);
           //parse the string as an integer
           const intDollar = parseInt(dollarStr);
  
    //Updating and displaying the total activity cost part 2
           let wasChecked = false;
           //
           if ($wasClicked.is(':checked')) {
               //remove validation message if something was now checked
               hideInputValidationError("#errActivity");

               //do something when checked
               //activityCostAmt = activityCostAmt + intDollar;
               activityCostAmt += intDollar;
               wasChecked = true;
           } 
           else {
               //do something when unchecked
               activityCostAmt -= intDollar;
           }
  
           $activityCostDiv.text("Total: $" + activityCostAmt);
  
           if ($wasClicked.attr("name") != "all")
           {
               const dayTimeSubstr = getTimestampStr($wasClicked);
               const $allCheckboxes = $(".activities input");
  
    //Disabling conflicting activities part 1 
               for (let i = 0; i < $allCheckboxes.length; i+=1)
               {
                   const $curCheckbox = $allCheckboxes.eq(i);
                   if ($curCheckbox.attr("name") != "all" && $curCheckbox.attr("name") != $wasClicked.attr("name") && isTimestampConflicting(dayTimeSubstr, getTimestampStr($curCheckbox)))
                   {
                       $curCheckbox.attr("disabled", wasChecked);
                   }
               }
           }
       }
  });


  
  //Disabling conflicting activities part 2
    //



//Payment Section
  //
//Form Validation and Validation Messages
  //
  const getTimestampStr = (chkBox) => {
    const chkBoxStr = chkBox.parent().text();
    const emDashLoc = chkBoxStr.indexOf("—");
    const commaLoc = chkBoxStr.indexOf(",");
    const dayTimeSubstr = chkBoxStr.slice(emDashLoc + 2, commaLoc);

    return dayTimeSubstr;
}

const DetermineTwentyFourHour = (curHour, hourStr) => {
    if (hourStr == "12am")
    {
        return 0;
    }
    else if (hourStr == "12pm")
    {
        return 12;
    }
    else if (hourStr.indexOf("pm")!= -1)
    {
        return curHour + 12;
    }
    else
    {
        return curHour;
    }
}

const isTimestampConflicting = (leftTimestamp, rightTimestamp) => {
    const leftSpaceLoc = leftTimestamp.indexOf(" ");
    const rightSpaceLoc = rightTimestamp.indexOf(" ");

    const leftDay = leftTimestamp.slice(0, leftSpaceLoc);
    const rightDay = rightTimestamp.slice(0, rightSpaceLoc);

    if (leftDay != rightDay)
    {
        return false;
    }

    const leftTime = leftTimestamp.slice(leftSpaceLoc+1);
    const rightTime = rightTimestamp.slice(rightSpaceLoc+1);

    const leftDivide = leftTime.indexOf("-");
    const rightDivide = rightTime.indexOf("-");

    const leftStartTime = leftTime.slice(0, leftDivide);
    const rightStartTime = rightTime.slice(0, rightDivide);

    const leftEndTime = leftTime.slice(leftDivide+1);
    const rightEndTime = rightTime.slice(rightDivide+1);

    let leftTimeStartHr = parseInt(leftStartTime.slice(0, leftStartTime.length-1));
    let rightTimeStartHr = parseInt(rightStartTime.slice(0, rightStartTime.length-1));

    let leftTimeEndHr = parseInt(leftEndTime.slice(0, leftEndTime.length-1));
    let rightTimeEndHr = parseInt(rightEndTime.slice(0, rightEndTime.length-1));

    leftTimeStartHr = DetermineTwentyFourHour(leftTimeStartHr, leftStartTime);
    leftTimeEndHr = DetermineTwentyFourHour(leftTimeEndHr, leftEndTime);
    rightTimeStartHr = DetermineTwentyFourHour(rightTimeStartHr, rightStartTime);
    rightTimeEndHr = DetermineTwentyFourHour(rightTimeEndHr, rightEndTime);

    //https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-two-integer-ranges-for-overlap

    return (leftTimeStartHr <= rightTimeEndHr) && (rightTimeStartHr <= leftTimeEndHr);
}

const hideInputValidationError = (errIDName) =>
{
    const $targetEle = $(errIDName);

    if ($targetEle.length > 0)
    {
        $targetEle.remove();
    }
}

const showInputValidationError = (queryString, errIDName, displayText, paddingBottom) =>
{
    const $mesgTarget = $(queryString);
    const $errMesgEle = $('<div id="' + errIDName + '" style="color: red; font-weight: bold; padding-bottom:' + paddingBottom + 'px;"></div>').text(displayText);
    $mesgTarget.before($errMesgEle);
}

/////////////////////////////////////////// Payment Section

const $paymentSectionHome = $("fieldset").last();
const $paymentTypeSections = $paymentSectionHome.find("div");
const $ccSection = $paymentTypeSections.eq(0);
const $paypalSection = $paymentTypeSections.eq(4);
const $bitcoinSection = $paymentTypeSections.eq(5);

$ccSection.hide();
$paypalSection.hide();
$bitcoinSection.hide();

const reactToPaymentType = (paymentTypeVal) => {
  //remove validation error: user has now elected a payment type
  hideInputValidationError("#err-payment");
  if (paymentTypeVal == 'credit card') {
  $ccSection.show();
  $paypalSection.hide();
  $bitcoinSection.hide();
  }
  else if (paymentTypeVal == 'paypal') {
    $ccSection.hide();
    $paypalSection.show();
    $bitcoinSection.hide();
  }
  else {
    $ccSection.hide();
    $paypalSection.hide();
    $bitcoinSection.show();
  }
}

$("#payment option").first().hide();

$("#payment").on("change", (e) =>
{
  reactToPaymentType($(e.target).val());
});

const $paymentSelect = $('#payment option[value="credit card"]');
$paymentSelect.attr('selected', 'selected');
reactToPaymentType('credit card');

//////////////////////////////////VALIDATION
const validationAllPageFormElements = () => {
  let retVal = true;
  if (!validationNameInput())
  {
    retVal = false;
  }
  if (!validationEmailInput())
  {
    retVal = false;
  }
  if (!validationActivitySection())
  {
    retVal = false;
  }
  if (!validationCreditCardInformation())
  {
    retVal = false;
  }

  return retVal;
}

const validationNameInput = () => {
  hideInputValidationError("#errName");
  if ($('#name').val() != "")
  {
    return true;
  }
  else
  {
    showInputValidationError("#name", "errName", "Name field must not be empty.", 0);
    return false;
  }
}

const validationEmailInput = () => {
    hideInputValidationError("#errEmail");
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test($('#mail').val()))
    {
      return true;
    }
    else
    {
      showInputValidationError("#mail", "errEmail", "Email address is improperly formatted.", 0);
      return false;
    }
}

const validationActivitySection = () => {
  hideInputValidationError("#errActivity");
    let gotOne = false;
    const $allCheckboxes = $(".activities input");

    for (let i = 0; i < $allCheckboxes.length; i+=1)
    {
        const $curCheckbox = $allCheckboxes.eq(i);
        if ($curCheckbox.is(':checked'))
        {
            gotOne = true;
        }
    }

if (gotOne)
  {
    return true;
  }
  else
  {
    showInputValidationError(".activities label:first", "errActivity", "At least one activity must be selected.", 30);
    return false;
  }
}

const validationCreditCardInformation = () => {
  hideInputValidationError("#err-cc-num");
  hideInputValidationError("#err-zip");
  hideInputValidationError("#err-cvv");
  hideInputValidationError("#err-payment");

  const paymentTypeVal = $("#payment").val();
  if (paymentTypeVal == "select_method")
  {
    showInputValidationError("button", "err-payment", "Payment choice must be made.", 0);
  }
  else if (paymentTypeVal == 'credit card')
  {
      let retVal = true;
      if (!validationCreditCardNumber())
      {
        retVal = false;
      }
      if (!validationCreditCardZipCode())
      {
        retVal = false;
      }
      if (!validationCreditCardCVV())
      {
        retVal = false;
      }

      return retVal;

  }
  else
  {
    return true;
  }
}

const validationCreditCardNumber = () => {
  const validSizeMin = 13;
  const validSizeMax = 16;

  const ccNumberVal = $('#cc-num').val();
  const ccNumberValSize = ccNumberVal.length;

  const digitRegEx = /^(\d)+$/;

  if (ccNumberValSize >= validSizeMin && ccNumberValSize <= validSizeMax && digitRegEx.test(ccNumberVal))
  {
    return true;
  }
  else if (ccNumberValSize == 0) //empty text box
  {
    showInputValidationError("#cc-num", "err-cc-num", "Credit card number cannot be empty.", 0);
    return false;
  }
  else if (!digitRegEx.test(ccNumberVal)) //nondigit characters
  {
    showInputValidationError("#cc-num", "err-cc-num", "Credit card number must be only digits.", 0);
    return false;
  }
  else //wrong size
  {
    showInputValidationError("#cc-num", "err-cc-num", "Credit card number must be between 13 and 16 digits.", 0);
    return false;
  }
}

const validationCreditCardZipCode = () => {
  const validSize = 5;

  const ccZipVal = $('#zip').val();
  const ccZipValSize = ccZipVal.length;

  const digitRegEx = /^(\d)+$/;

  if (ccZipValSize == validSize && digitRegEx.test(ccZipVal))
  {
    return true;
  }
  else if (ccZipValSize == 0) //empty
  {
    showInputValidationError("#zip", "err-zip", "Credit card ZIP code cannot be empty.", 0);
    return false;
  }
  else if (!digitRegEx.test(ccZipVal)) //non-digit characters
  {
    showInputValidationError("#zip", "err-zip", "Credit card ZIP code must be only digits.", 0);
    return false;
  }
  else  //wrong length
  {
    showInputValidationError("#zip", "err-zip", "Credit card ZIP code must be exactly 5 digits.", 0);
    return false;
  }
}

const validationCreditCardCVV = () => {
  const validSize = 3;

  const ccCVVVal = $('#cvv').val();
  const ccCVVValSize = ccCVVVal.length;

  const digitRegEx = /^(\d)+$/;

  if (ccCVVValSize == validSize && digitRegEx.test(ccCVVVal))
  {
    return true;
  }
  else if (ccCVVValSize == 0) //empty
  {
    showInputValidationError("#cvv", "err-cvv", "Credit card CVV code cannot be empty.", 0);
    return false;
  }
  else if (!digitRegEx.test(ccCVVVal)) //non-digit entries
  {
    showInputValidationError("#cvv", "err-cvv", "Credit card CVV code must be only digits.", 0);
    return false;
  }
  else  //wrong length
  {
    showInputValidationError("#cvv", "err-cvv", "Credit card CVV code must be exactly 3 digits.", 0);
    return false;
  }

}

$("form").submit((e) => {
e.preventDefault();

if (validationAllPageFormElements())
{
  //validators succeeded; proceeding with the POST
  //This would normally be called here
  //$("form")[0].submit();
  
  //instead we will refresh the page
  location.reload();
}

});

$("#name").on("keyup", () => {
  validationNameInput();
});

$("#mail").on("keyup", () => {
  validationEmailInput();
});

$("#cc-num").on("keyup", () => {
  hideInputValidationError("#err-cc-num");
  validationCreditCardNumber();
});

$("#zip").on("keyup", () => {
  hideInputValidationError("#err-zip");
  validationCreditCardZipCode();
});

$("#cvv").on("keyup", () => {
  hideInputValidationError("#err-cvv");
  validationCreditCardCVV();
});




  //THE END



});