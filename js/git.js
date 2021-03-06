jQuery.githubUser = function(username, callback) {
    jQuery.getJSON("https://api.github.com/users/" + username  + "/repos");
  }
  
jQuery.fn.loadRepositories = function(username) {
    //this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
  
    var target = this;
    $.githubUser(username, function(data) {
      var repos = data;
      sortByNumberOfWatchers(repos);
      var list = $('<ul>');
      target.empty().append(list);
      $(repos).each(function() {
        list.append('<dt><a href="'+ this.url +'">' + this.name + '</a></dt>');
        list.append('<dd>' + this.description + '</dd>');
      });
      console.log(data);
    });
  
    function sortByNumberOfWatchers(repos) {
      repos.sort(function(a,b) {
        return b.watchers - a.watchers;
      });
    }
};