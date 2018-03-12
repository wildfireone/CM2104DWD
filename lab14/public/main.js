/**
 * @Author: John Isaacs <john>
 * @Date:   12-Mar-182018
 * @Filename: main.js
 * @Last modified by:   john
 * @Last modified time: 12-Mar-182018
 */

 $(function() {
   // when page ready
   //ask for json from our twitter JSON
   $.getJSON( "/tweetsjson", function( data ) {
     console.log(data);

     for(var t=0; t<data.length;t++){
       var tweetoutput = "<div>";
       tweetoutput +="<h2>"+data[i].name+"</h2>";
       tweetoutput +="<p>"+data[i].text+"</p>";
       tweetoutput +="</div>";
       $('#tweetsdisplay').append(tweetoutput);
     }

   });
 });
