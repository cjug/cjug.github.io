function gravatar( email, size ) {
    var trimmed = email.toLowerCase().trim();
    var hash = md5(trimmed);
    return "https://www.gravatar.com/avatar/" + hash + "?size="+size + "&dt=" + new Date().getTime();
}