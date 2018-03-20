var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
var analyser = audioCtx.createAnalyser();

var overall_position = 0;

var audioElement = document.getElementById("music");
var source = context.createMediaElementSource(audioElement);
source.connect(context.destination);


  // Success callback
  function(stream) {
    console.log("ok");
    source = audioCtx.createMediaStreamSource(stream);

    var lowpass = audioCtx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 80; //assume low
    //lowpass.frequency.value = 1000;
    lowpass.Q.value = 1;

    var highpass = audioCtx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 20;
    //highpass.frequency.value = 200;
    highpass.Q.value = 1;

    var proc = audioCtx.createScriptProcessor(1024, 1, 1);

    source.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(analyser);
    analyser.connect(proc);

    proc.connect(audioCtx.destination);
    proc.onaudioprocess = foo2;


  }
).catch(function(err) {
  /* handle the error */
  console.log(err);
});

var thesleep = 0;

function foo2() {
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount; // half the FFT value
    var dataArray = new Uint8Array(bufferLength); // create an array to store the data
    analyser.getByteFrequencyData(dataArray);
    var max = 0;
//console.log(bufferLength);
    for(var i = 0; i < bufferLength; i++) {
       var volume = Math.abs(dataArray[i]);
       if (!max || (volume > max.volume)) {
          var pos = Math.round(i/2048);
//          console.log(pos);
          max = {
            position: i,
            volume: volume
          };
       } 
    }

    var secs = (max.position)/2048 + overall_position;
    overall_position = overall_position + bufferLength/2048;
    if(max.volume > 100){
//console.log("thesleep "+thesleep);
     if(thesleep == 0){
       console.log(secs+" "+max.volume);
       socket.emit('i am client', {data: 'hit'});

       var div = $('<div/>', {
         class: 'circle',
         css: {'top': "200px"}
       }).appendTo('#container');

       $(div).animate({
         left: '1500'
        }, 2500, "linear", function() {
         $(this).hide({},50,"linear",
          function(){
          });
      });
     }else{ // wait
     }
       if(thesleep > 10){
         thesleep = 0;
       }else{
         thesleep = thesleep + 1;
       }

    }
}

