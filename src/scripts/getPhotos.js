$(document).ready(function(){

  //au click sur un image
  /*$("#photo_vue").click(function() {
    //on ouvre la fenêtre modale
    $("#dialog1").dialog("open");
  });*/


  //quand on click sur le bouton ca affiche les photos tout bien, tout en ordre
  $("#button").on("click", function(){

    //ca marche pas vraiment vu que si on met que des espaces ca fait la requete
    //mais ca mrche si le champ est vide
    if($("#recherche").val().replace(" ", "") == ""){
      console.log("champ vide");
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
          //reset des images déja présentes
          $("#photo_vue").html("");
          $("#photo_table").html("");

          //data = objet avec json de toutes les photos
          //item = 1 objet de type photo
          var html = "<thead><td>Image</td><td>Titre</td><td>Date</td><td>Description</td></thead>";

          $.each(data.items, function(i,item){

            //on récupère toutes les données dont on a besoin
            //depuis le json
            var date = item.date_taken;
            var titre = item.title;
            var desc = item.description;
            var img = "<img src="+item.media.m+"/>";

            //on reformate la date pour les comparaison
            var tabDateHeure = date.split("T");
            var tabDate = tabDateHeure[0].split("-");
            var jour = parseInt(tabDate[2]);
            var mois = parseInt(tabDate[1]);
            var annee = parseInt(tabDate[0]);

            //on récupère la date des formulaires
            var jourForm = $("#jour").val();
            var moisForm = $("#mois").val();
            var anneeForm = $("#annee").val();

            //pour le detail de la vue photo (fenetre modale)
            var details = "<table><tr><td>Titre : "+titre+"</td><td>"+img+"</td><td>Prise le : "+jour+"/"+mois+"/"+annee+"</td>";
            details +="<td>Description : </br>"+desc+"</td></table>";

            //si la date est trop vielle on ajoute pas
            if(annee > anneeForm){
              //ajout de la photo sur la vue photo
              $("<img/>").attr("src", item.media.m).attr("id", i).appendTo("#photo_vue");
              $("<div>").attr("id", "dialog"+i).attr("title", "Détails").html(details).appendTo("#dialog");
              $("#dialog"+i).dialog({autoOpen: false});
              $("</br>").appendTo("#photo_vue");

              //ajout de la photo sur la vue table
              html += "<td>"+img+"</td>";
              html += "<td>"+titre+"</td>";
              html += "<td>"+jour+"/"+mois+"/"+annee+"</td>";
              html += "<td>"+desc+"</td></tr>";

            } else if(annee == anneeForm){
                if(mois > moisForm){
                    //ajout photo ici
                } else if(mois == moisForm){
                  if(jour >= jourForm){
                    //ajout photo ici
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

    }//fin du else (champ vide)

  });//fin du onclick sur le bouton

});//fin document.ready
