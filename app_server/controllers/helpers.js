module.exports._showError = function (req, res, status,categories){
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
      title = status + ", something's gone wrong";
      content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        categories:categories,
        title : title,
        content : content
    });
};