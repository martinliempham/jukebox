//SEARCH 


$(document).ready(function(){

    SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'

  });
    var output=$('#output');
    var songName = " ";
    var songlist = []
    var poster = ("artwork_url")
  function SoundCloud (title,link_url,id){
   this.title= title;
   this.link_url=link_url;
   this.id= id;
   this.render=function (){
     output.append($(`
       <li id=${this.id}>${this.title}<a href=${this.link_url}></li>
       `))}
   //ADD THIS LITTLE BIT TO THE LIST PART OF POSTER ARTIST ETC//
  }
  // (`<a href="link_url">Home</a>`)

  $("input:text").keyup(function(){
    songName = $("input:text").val()
  });

  $("input:submit").click(function(){
    $.ajax({
      url: "https://api.soundcloud.com/tracks?q=" + songName  +
      "&format=json&client_id=fd4e76fc67798bfa742089ed619084a6",
      success: function(response){
        console.log("Anything?:",response);
        
        for (var i = 0; i < response.length; i++) {
          $(".title").html(response.Title); 
            console.log($(".title").append(`${response[i].title}`)); 
          
          $(".poster").attr("src", response[0].artwork_url);
          $(".poster").html(`<a href="${response[0].permalink_url}"><img src="${response[0].artwork_url}"/></a>"`);
            console.log($(".poster"), response[0].artwork_url);
          
          $(".artists").html(response.Artists);
          $(".artists").html(`<a href="${response[0].permalink_url}"><"artists"${response[0].artists}/></a>"`);
            console.log($(".artists").append(`${response[i].artists}`)); 

          $(".description").html(response.Description);
            console.log($(".description").append(`${response[i].description}`)); 

          $(".genre").html(response.Genre);
             console.log($(".genre").append(`${response[i].genre}`)); 

       
       
        }

        songlist=response
        // this is to test
        for(var i=0;i<response.length;i++){
        var mySong=new SoundCloud(response[i].title,response[i].link_url,response[i].id)
        mySong.render()}
      },
      error: function(error){
        $('#error').text('song not found')
      }

    })


});

  // SC.initialize({
  //   client_id: 'fd4e76fc67798bfa742089ed619084a6'

  // });

//JUKEBOX

function Jukebox(playing) {
  this.isPlaying = playing;
  this.player = false;
  let audio = $("#audio1").get(0);
  var songName = $("audio[name]")
  var tracks = [" "];
  var trackNum = 0;
  $('#audio1').attr('src', tracks[trackNum]);

//BUTTONS
  this.playIt = function() {
    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
    } else {
       SC.stream('/tracks/'+songlist[0].id).then(function(player){
        player.play();
        audio=player
      });
      this.isPlaying = true;
    }
  }

  this.stopIt = function(player) {
    audio.pause();
    audio.currentTime = 0;
  }

  this.loadNext = function() {
    if(trackNum == tracks.length+1){
      $('#audio1').attr('src', tracks[trackNum])
      audio.play();
    }else{
      trackNum++;
      $('#audio1').attr('src', tracks[trackNum]);
      console.log(trackNum);
      audio.play();
    }
  }

  this.loadPrev = function() {
    if(trackNum==0){
      $('#audio1').attr('src', tracks[0]);
      audio.play();
    }else{
      trackNum--;
      $('#audio1').attr('src', tracks[trackNum]);
      console.log(trackNum);
      audio.play();
    }
  }

  this.addSong = function() {
   path = $("#addSong").val();
   tracks.push(path);
   console.log(tracks);
 }

 this.soundSong = function() {

 }
}

juke = new Jukebox(true);


$("#playBtn").click(function(){
  juke.playIt()
})
$("#stopBtn").click(function(){
  juke.stopIt()
})
$("#prevBtn").click(function(){
  juke.loadPrev()
})
$("#nextBtn").click(function(){
  juke.loadNext()
})

});