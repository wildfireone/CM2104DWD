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

   });
 });
