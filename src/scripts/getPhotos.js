$(document).ready(function(){

  //quand on click sur "b" ca affiche les photos
  $("#button").on("click", function(){

    //ca marche pas vraiment, si le champ est vide ca fait pas la requete, mais si on met que des espaces ca le fait quand meme
    if($("#recherche").val().replace(" ", "") == ""){
      console.log("pas content");
    } else {
      var url = 'http://api.flickr.com/services/feeds/photos_public.gne';
      var data = 'tagmode=any&format=json&tags='+ $("#recherche").val().replace(" ", "+");


      $.ajax({
        url: url,
        type:'GET',
        data: data, //changer le tag en fonction de la recherche
        dataType:'jsonp',
        jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback



        success:function(data){
          console.log(data);

          //reset des images déja présentes
          $("#photo_vue").html("");
          $("#photo_table").html("");

          //data = objet avec json de toutes les photos
          //item = 1 objet de type photo
          $.each(data.items, function(i,item){
            console.log(item.media.m);

            //ajout de la photo
            $("<img/>").attr("src", item.media.m).appendTo("#photo_vue");
            $("<img/>").attr("src", item.media.m).appendTo("#photo_table");

            //la limite de photo, 20 max <-- changer avec le "spinner"
            var nb = $("#spinner").val()
            if ( i == nb-1 ) return false ;
          });
        },

        error: function(resultat,statut,erreur){
          alert("erreur");
        },

      });//fin du ajax

    }//fin du else

  });

})
