$(document).ready(function(){
$('#recherche').autocomplete({
        source : function(requete, reponse){ // les deux arguments représentent les données nécessaires au plugin
            $.ajax({
                url:'http://infoweb-ens/~jacquin-c/codePostal/commune.php',
                type:'GET',
                dataType:'json',
                data : 'commune='+$('#recherche').val(),
                success : function(donnee){
                    reponse($.map(donnee, function(objet){
                        return objet.Ville; // on retourne cette forme de suggestion
                }));
                }
            });
        }
    });
});
