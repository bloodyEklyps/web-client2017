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
          var html = "<thead><td>Image</td><td>Titre</td><td>Date</td><td>Description</td></thead>"

          $.each(data.items, function(i,item){
            //console.log(item.media.m);
            var date = item.date_taken;
            var titre = item.title;
            var desc = item.description;
            var img = "<img src="+item.media.m+"/>";

            var tabDateHeure = date.split("T");
            var tabDate = tabDateHeure[0].split("-");
            var jour = parseInt(tabDate[2]);
            var mois = parseInt(tabDate[1]);
            var annee = parseInt(tabDate[0]);

            var jourForm = $("#jour").val();
            var moisForm = $("#mois").val();
            var anneeForm = $("#annee").val();

            console.log(moisForm);

            //console.log("date=" + tabDate);

            //si la date est trop vielle on ajoute pas
            if(annee > anneeForm){
              //ajout de la photo sur la vue photo
              $("<img/>").attr("src", item.media.m).appendTo("#photo_vue");
              $("</br>").appendTo("#photo_vue");

              //ajout de la photo sur la vue table
              html += "<td>"+img+"</td>";
              html += "<td>"+titre+"</td>";
              html += "<td>"+jour+"/"+mois+"/"+annee+"</td>";
              html += "<td>"+desc+"</td></tr>";

            } else if(annee == anneeForm){
                if(mois > moisForm){
                  //ajout de la photo sur la vue photo
                  $("<img/>").attr("src", item.media.m).appendTo("#photo_vue");
                  $("</br>").appendTo("#photo_vue");

                  //ajout de la photo sur la vue table
                  html += "<td>"+img+"</td>";
                  html += "<td>"+titre+"</td>";
                  html += "<td>"+jour+"/"+mois+"/"+annee+"</td>";
                  html += "<td>"+desc+"</td></tr>";
                } else if(mois == moisForm){
                  if(jour >= jourForm){
                    //ajout de la photo sur la vue photo
                    $("<img/>").attr("src", item.media.m).appendTo("#photo_vue");
                    $("</br>").appendTo("#photo_vue");

                    //ajout de la photo sur la vue table
                    html += "<td>"+img+"</td>";
                    html += "<td>"+titre+"</td>";
                    html += "<td>"+jour+"/"+mois+"/"+annee+"</td>";
                    html += "<td>"+desc+"</td></tr>";
                  } else {
                    i--;
                  }//fin 1er else jour
                } else {
                  i--
                }//fin 2eme else mois
              } else {
                i--;
              } //fin 3eme else annee

            //la limite de photo, 20 max <-- changer avec le "spinner"
            var nb = $("#spinner").val();
            if ( i == nb-1 ) return false ;
          });//fin du each

          $("#table").html(html);
        },

        error: function(resultat,statut,erreur){
          alert("erreur");
        },

      });//fin du ajax

    }//fin du else

  });

})
