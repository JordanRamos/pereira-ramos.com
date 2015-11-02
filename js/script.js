/*!
 * Sport-Serie (http://sport-serie.com)
 * Copyright 2015 PEREIRA-RAMOS, Inc.
 */

/**
* Bouton concernant la navBar
*/
function closeAll(pPage) {
    $("#home").slideUp(500);
    $("#project").slideUp(500);
    $("#skill").slideUp(500);
    $("#info").slideUp(500);
}

$(".btnHome").click(function() {
    closeAll();
    setTimeout(goToPage, 500, "index");
});

$(".btnProject").click(function() {
    closeAll();
    setTimeout(goToPage, 500, "project");
});

$(".btnSkill").click(function() {
    closeAll();
    setTimeout(goToPage, 500, "skill");
});

$(".btnInfo").click(function() {
    closeAll();
    setTimeout(goToPage, 500, "info");
});

function goToPage(pPage) {
    window.location = pPage + ".html";
}