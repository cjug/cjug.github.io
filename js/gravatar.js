function gravatar( email, size ) {
    var trimmed = email.toLowerCase().trim();
    var hash = md5(trimmed);
    console.log("https://www.gravatar.com/avatar/" + hash + "?size="+size + "&dt=" + new Date().getTime());
    return "https://www.gravatar.com/avatar/" + hash + "?size="+size + "&dt=" + new Date().getTime();
}