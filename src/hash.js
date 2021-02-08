var str = "Aravind eats apples everyday to pass";
function hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
}

function hash64(str) {
    var h1 = hashFnv32a(str,true,"");  // returns 32 bit (as 8 byte hex string)
    return h1 + hashFnv32a(h1 + str, true,"");  // 64 bit (as 16 byte hex string)
}

  //console.log(hash64(str,true,""));
  var random = (Math.floor(Math.random() * 4000)).toString();
  console.log(random);