// ==UserScript==
// @name         Ember "QuickFacts"
// @version      0.1
// @author       Lucas
// @match        https://www.betterdoc.org/backstage/new/inquiries/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

var lastLocation = location.href;

function make_label_data(label, data) {
    return '<div class="row-5"><span class="label clear-row">'+label+':</span><span class="data">'+data+'</span></div>';  // // label multiline
}

function find_data(container, label) {
    return container.find("span:contains('"+label+"')").parent().find("span[class='data']").html();
}

function insertQuickFacts() {
    //console.log('inquiry ready');
    var el_patient = $("div[class='inquiry-patient-data'] > div[class~='content-box']");
    var el_details = $("#basic-details");
    var el_inqdetails = $("button:contains('Inquiry details')").closest('div').find("div[class~='content-box']");  // find closest ancestor

    var patient_name = find_data(el_patient, 'Name:');
    var ambassador = find_data(el_details, 'ambassador:');
    var insurance = find_data(el_patient, 'Insurance:');
    var lastContact = $("div[class~='history'] > ul[class='entries'] > li:first").html().substring(0, 400);
    var diagnosis = find_data(el_inqdetails, 'Diagnosis:');
    var voucher = find_data(el_details, 'Voucher:');
    var koerbchen = find_data(el_details, 'Status:');

    //console.log($("button:contains('Inquiry details')").closest('div'));
    console.log(el_inqdetails);
    $("div[class~='column-3'] > div[class~='column-content'] > div:first").before("<div class='ember-view'><h3 class='ember-view'>Quick Facts</h3><div class='content-box bordered'>" +
        "<div class='half-size'>" +
            make_label_data('Körbchen', koerbchen) +
            make_label_data('Name', patient_name) +
            make_label_data('Diagnose', diagnosis) +
            make_label_data('Ambassador', ambassador) +
            make_label_data('Befunde', '') +
        "</div> <div class='half-size'>" +
            make_label_data('Versicherung', insurance) +
            make_label_data('Voucher', voucher) +
            make_label_data('weitere Anfragen', '') +
            make_label_data('letzte TVB', '') +
            make_label_data('Patient Einschätzung', '') +
        "</div> <div class=''>" +
            "<span class='label clear-row'>letzter Kontakt:</span><span class='data'>"+lastContact+"</span>" +
        "</div></div></div>" );
}

(function() {
    'use strict';

    var refreshIntervalId = setInterval(function(){
        if ($("button:contains('History')").length !== 0) {  // if inquiry page is ready (for first loading of Ember) seems a bit clunky no that refresh is continously running
            //clearInterval(refreshIntervalId);  // stop trying to find ready page

            if (location == lastLocation) {  // no URL change, so no action needed
                return;
            }
            console.log('loc change');
            lastLocation=location.href;

            insertQuickFacts();

            return;
        }
    }, 2500);
})();
