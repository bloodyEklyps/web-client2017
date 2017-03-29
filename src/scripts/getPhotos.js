
$(document).ready(function(){

  //quand on click sur "b" ca affiche les photos
  $("#button").on("click", function(){

    $.ajax({
      url:'http://api.flickr.com/services/feeds/photos_public.gne',
      type:'GET',
      dataType:'jsonp',
      jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
      data:'tags=nantes&tagmode=any&format=json', //changer le tag en fonction de la recherche


      success:function(data){
        console.log(data);
        //data = objet avec json de toutes les photos
        //item = 1 objet de type photo
        $.each(data.items, function(i,item){
          console.log(item.media.m);

          //ajout de la photo
          $("<img/>").attr("src", item.media.m).appendTo("#test_photo");

          //la limite de photo, 20 max <-- changer avec le "spinner"
          if ( i == 5 ) return false ;
        });
      },

      error: function(resultat,statut,erreur){
        alert("erreur");
      },

    });

  });

})
