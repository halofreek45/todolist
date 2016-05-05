$(function(){
    var APPLICATION_ID = "2990FB08-878B-34F0-FFD2-41F20EAC4200",
        SECRET_KEY = "F1D21139-75B1-0776-FF22-7C2F4CF2EB00",
        VERSION = "v1";
    
  Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
  
  if(Backendless.UserService.isValidLogin()){
            
      //userLoggedIn(Backendless.LocalCache.get("current-user-id"));
      //
      
  } 
  else
  {
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
  }
  
  $(document).on('submit', '.form-signin', function(event){
      event.preventDefault();
      
      var data = $(this).serializeArray(),
      email = data[0].value,
      password = data[1].value;
      Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError2));
      
  });
  
  
  $(document).on('click', '.add-blog', function()
  {
       var addBlogScript = $("#add-blog-template").html();
  var addBlogTemplate = Handlebars.compile(addBlogScript);
  
  
  $('.main-container').html(addBlogTemplate);
   tinymce.init({ selector:'textarea', plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter align bnb nb bn nbb nnb nbnb  nb  bn nnbbnbnn bn nbn b bbnbnnb nb nb nnb n bnbnbnright alignjustify | bullist numlist outdent indent | link image" }); });

  
  
  $(document).on('submit', '.form-add-blog', function (event)
  {
  event.preventDefault();
  var data = $(this).serializeArray(),
  title = data[0].value,
  content = data[1].value;
  if(content === "" || title === "")
  {
  Materialize.toast("Please fill out Content and Title to submit", 1000);  
  }
  else
  {
      var dataStore = Backendless.Persistence.of(Posts);
  
  var postObject = new Posts({
      title: title,
      content: content,
      authorEmail: Backendless.UserService.getCurrentUser().email});
  Materialize.toast("Your post has been Sent! Go to the Main page to see it", 1000);
      }
  
  
  dataStore.save(postObject);
  
  this.title.value = "";
  this.content.value = "";
  });
  
     $(document).on('click', '.logout', function (){
         Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
         
         var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
     });
  
  });
function Posts(args){
    //this.content.name = args.title;
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
     
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user, email){
    console.log("user Logged in!");
    var userData;
    if(typeof user === "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
        
    }
    else
    {
        userData = user;
    }
    Materialize.toast("Thank you for logging in as " + Backendless.UserService.getCurrentUser().email, 2000);
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}
function LoggedOut(){
    console.log('User Logged out');
}
function gotError(error){
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
}
function gotError2(error){
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
Materialize.toast("Incorrect Username or Password");
};
 Handlebars.registerHelper('poststoday',function () {
        var ALPHA = 0;
        var today = (new Date).getTime() - (86400000);
        var query = {condition: "created >= " + today};
        var Today1 = Backendless.Data.of( Posts ).find( query );
        console.log(Today1);
        console.log(today);
        return Today1.data.length;
    });
        var blogScriptB = $("#poststoday-template").html();
    var blogTemplateB = Handlebars.compile(blogScriptB);
    var blogHTMLB =  blogTemplateB(wrapper);
    
    $('.badge').html(blogHTMLB);
    