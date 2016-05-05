$(function () {

    var APPLICATION_ID = "9D03ABA6-8428-23D8-FF50-FC8AC142DA00",
            SECRET_KEY = "90ECF325-594B-7C49-FF6E-9AC099B29200",
            VERSION = "v1";
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION)
    //Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
    if(Backendless.UserService.isValidLogin())
    {
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    var UserScript = $("#UserStateTrue").html();
    var UserTemplate = Handlebars.compile(UserScript);
    var UserHTML = UserTemplate(wrapper);

    $('.link-container').html(UserHTML);
    console.log("UserLoggedIn");
    }
    else
    {
        
var UserScript = $("#UserStateFalse").html();
    var UserTemplate = Handlebars.compile(UserScript);
    var UserHTML = UserTemplate(wrapper);

    $('.link-container').html(UserHTML);
    console.log("User is not logged in");
    }
    var dataQuery = {condition: "ownerId ='" + Backendless.LocalCache.get("current-user-id")+" ' "};
    var postCollection = Backendless.Persistence.of(Posts).find(dataQuery);    

    var wrapper = {
        posts: postCollection.data
    };
/*    Handlebars.registerHelper('UserState', function ()
   {
        if (Backendless.UserService.isValidLogin())
        {
            return true;

            userLoggedIn(Backendless.LocalCache.get("current-user-id"));
        }
        else
        {
            return false;
        }
    });*/
    

    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200 // Transition out duration
                // ready: function() { alert('Ready'); }, // Callback for Modal open
                // complete: function() { alert('Closed'); } // Callback for Modal close
    }
    );
    $('.modal-trigger2').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200 // Transition out duration
                // ready: function() { alert('Ready'); }, // Callback for Modal open
                // complete: function() { alert('Closed'); } // Callback for Modal close
    }
    );


    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("dddd, MMMM ,Do YYYY");
    });

    var postScript = $("#post-template").html();
    var postTemplate = Handlebars.compile(postScript);
    var postHTML = postTemplate(wrapper);

    $('.main-container').html(postHTML);
    $(document).on('submit', '.form-signin', function (event) {
        event.preventDefault();

        var data = $(this).serializeArray(),
                email = data[0].value,
                password = data[1].value;
        Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError2));
if(Backendless.UserService.isValidLogin())
    {
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    var UserScript = $("#UserStateTrue").html();
    var UserTemplate = Handlebars.compile(UserScript);
    var UserHTML = UserTemplate(wrapper);

    $('.link-container').html(UserHTML);
    console.log("UserLoggedIn");
    }
    else
    {
        
var UserScript = $("#UserStateFalse").html();
    var UserTemplate = Handlebars.compile(UserScript);
    var UserHTML = UserTemplate(wrapper);

    $('.link-container').html(UserHTML);
    console.log("User is not logged in");
    }
   
    });

    /*    $(document).on('submit', '.logout', function ()
     {
     location.reload();
     });
     */
    $(document).on('submit', '.add-post', function (event)
    {

        event.preventDefault();
        var data = $(this).serializeArray(),
                title = data[0].value,
                content = data[1].value;
        if (content === "" || title === "")
        {
            Materialize.toast("Please fill out a task before posting it", 1000);
        }
        else
        {
            var dataStore = Backendless.Persistence.of(Posts);
            var postObject = new Posts({
                title: title,
                content: content
            });
            Materialize.toast("Reload the page to see your new task", 1000);
            location.reload();
        }


        dataStore.save(postObject);

        this.title.value = "";
        this.content.value = "";
    });
$(document).on('click', '.logout', function (){
    Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
    if(Backendless.UserService.isValidLogin())
    {
        Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    var UserScript = $("#UserStateTrue").html();
    var UserTemplate = Handlebars.compile(UserScript);
    var UserHTML = UserTemplate(wrapper);

    $('.link-container').html(UserHTML);
    console.log("UserLoggedIn");
    }
    else
    {
        
var UserScript = $("#UserStateFalse").html();
    var UserTemplate = Handlebars.compile(UserScript);
    var UserHTML = UserTemplate(wrapper);

    $('.link-container').html(UserHTML);
    console.log("User is not logged in");
    }     
    
      location.reload();   
        
     });
});
function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.authorEmail = args.authorEmail || "";
    this.content = args.content || "";
    this.completed = args.completed || "";
}
function userLoggedIn(user, email) {
    console.log("user Logged in!");
    var userData;
    if (typeof user === "string") {
        userData = Backendless.Data.of(Backendless.User).findById(user);
    }
    else
    {
        userData = user;
    }
    Materialize.toast("Thank you for logging in as " + Backendless.UserService.getCurrentUser().email, 2000);
}
function gotError2(error) {
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
    Materialize.toast("Incorrect Username or Password");
}
;
$(document).on('click', '.deleteC', function (event) {
    Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
    location.reload();
});
$(document).on('click', '.done',  function(event)
{
   var done=
           Backendless.Persistence.of(Posts).findById(event.target.attributes.data.nodeValue);
   done["DoneOrNot"]= true;//false = !true
   var postsCollection = Backendless.Persistence.of(Posts)
   postsCollection.save(done);
   location.reload();
});
function LoggedOut(){
    console.log('User Logged out');
}
function gotError(error){
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
}

//Create Helper Check if logged in return true of false inside template 1 template logged out = login other template = 