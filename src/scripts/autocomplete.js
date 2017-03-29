$("#recherche").autocomplete({
  source :
})

function getVilles(commune){
  $.ajax({
    url: "http://infoweb/~e155631p/miniproj_clientweb/commune.php",
    type : 'GET',
    dataType : 'json',
    data: 'commune='+commune.val(),

    success: function(codeJSONSucces, statut){
      return codeJSONSucces;
    }
  })
}
