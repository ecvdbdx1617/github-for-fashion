   "use strict";

    // basic auth
    var gh = new GitHub({
		token: '18b2ba6267adb5d9ca7fe534086aa68bcb023bae'
    });

    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    me.listNotifications(function(err, notifications) {
        // do some stuff
    });

    var clayreimann = gh.getUser('clayreimann');
    clayreimann.listStarredRepos(function(err, repos) {
        console.log(repos);
    });






