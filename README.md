# web-client2017
mini-projet de fin de s4



utiliser $( ".selector" ).tabs( "load", "#foo" ); pour changer d'onglet





format de la requete avec la méthode getPhoto (la méthode qui nous intéresse si j'ai bien compris)

-------------------

https://www.flickr.com/services/api/render
?method=flickr.galleries.getPhotos

&api_key=79b0d968c81ad7b36523226844a4d110

&gallery_id=aa

&extras=aa --> facultatif

&per_page=aa --> facultatif

&page=aa --> facultatif

&format=json

&nojsoncallback=1

&api_sig=36a9a5116a0c3a58cdbcf7b8c91a761d

------------------

format de la requete ajax pour les photo?

------------------


<script> $.ajax({
url:'http://api.flickr.com/services/feeds/photos_public.gne',
type:'GET',
dataType:'jsonp',
jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
data:'tags=nantes&tagmode=any&format=json',
success:function(data){
$.each(data.items, function(i,item){
            $("<img/>").attr("src", item.media.m).appendTo("#images");
            if ( i == 6 ) return false ; });
          },
error: function(resultat,statut,erreur){
alert("erreur");},
 });
</script>
