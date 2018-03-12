var images = [{
  img: "1.jpg",
  en_name: "\"Blossoming Almond Tree\" 1890 Vincent van Gogh",
  jp_name: "Vincent van Gogh 『花咲くアーモンドの木の枝』(1890)",
  en_text: "Van Gogh is a Dutch artist with a very sad fate. During his short life he managed everything and at the same time nothing. During the creative path, he could not earn respect from his colleagues, customers, and remained not in demand until the end of his days. But after the death of Van Gogh won recognition and fame. He became famous throughout the world as an impressionist, although he didn't recognize himself as impressionist while he was alive..  \"Flowering branches of almonds\" (Almond tree in bloom) was one of his last works. The artist wrote it in the winter of 1890, after his brother Theo told him about the birth of his nephew.  The picture is a symbol and carries a deep subtext. The almond branches bloom very early and, according to the author's intention, they signify the beginning of a new life.",
  jp_text: "ヴァン・ゴッホは非常に悲しい運命のオランダのアーティストです。彼は短い命の中、すべてを管理し、同時に何も管理しなかった。彼は創作人生のなかで、同僚や顧客からの尊敬を得ることができませんでした。しかし、ゴッホの死後、彼の名声がひろまることになったのです。彼は印象派の画家として世界中で有名になりましたが、生前の彼は自身を印象派として認識していませんでした。   『花咲くアーモンドの木の枝』（1890）は、彼の最後の作品の1つでした。弟テオが、甥の誕生についてゴッホに話し、1890年の冬にその絵を描きました。  絵はシンボルであり、比喩的な意味を含んでいます。アーモンドの枝はとても早くに開花し、ゴッホの意図によれば、枝は新しい人生の始まりを意味するといいます。"
},
{
  img: "2.jpg",
  en_name: "\"The Prison Courtyard\" Author: Van Gogh Date of creation: 1890",
  jp_name: " \“刑務所の中庭\" 著者：Van Gogh 作成日：1890",
  en_text: "There is something symbolic about the fact that \" The Prison Courtyard \", one of his most piercing creations, Van Gogh wrote in the hospital, where he first fell due to the onset of mental illness. Moreover, if you look closely, you can clearly see that the central character of the painting is endowed with features of the artist.  Despite the use of pure shades of blue, green and violet inks, the color of the canvas seems gloomy, and the prisoners moving around in circles seem to say that there is no way out of the impasse where life is like a vicious circle.",
  jp_text: "ヴァン・ゴッホの最も鋭い創作のひとつである「刑務所の中庭」は、精神病の発症により入院していた病院で描いたという象徴的なものです。さらに、詳細に絵をみてみると、中心の人物はゴッホ本人の特徴が表れているといえます。  青、緑、紫の絵具の純粋な色合いを使用しているにもかかわらず、キャンバスの色は暗い印象です。囚人たちは、人生の悪循環のような難局から抜けだせないということを訴えているように思えます。"
},
{
  img: "3.jpg",
  en_name: "\"Starry Night\" 1889",
  jp_name: "『星月夜』（1889)",
  en_text: "Unlike most of the artist's paintings, \"Starry Night\" was written from memory. Van Gogh was at that time in the hospital Saint-Remy, tormented by bouts of insanity.",
  jp_text: " ほとんどのアーティストの絵画とは異なり、『星月夜』（1889）は記憶によって描かれました。 ヴァン・ゴッホは当時、サンレミーの病院で狂気の発作で苦しんでいました。"
}
];

function getHtmlForAbout(index, lang){
  var res = "<H1>"+images[index][lang+"_name"]+"</H1>";
  res+= "<p>"+images[index][lang+"_text"]+"</p>";
  return res;
}

var langs = ["en", "jp"];

$(document).ready(function(){
  var current_index = -1;
  var lang_index = 0;
  var table_area = $("#table_area");
  table_area.resizable();
  table_area.draggable();
  table_area.click(function(event){
    var origEvent = event.originalEvent;
    clicked_on(origEvent.x, origEvent.y);
  });

  try{
    // var socket = new WebSocket("ws://localhost:8000");
    //
    // socket.onerror = function(error){
    //   throw new Error("Websocket error "+error);
    // };
    //
    // socket.onmessage = function(event) {
    //   var data = JSON.parse(event.data);
    //   if(data.type=="touch"){
    //     var parent_element = table_area[0];
    //     var x_touch = parent_element.offsetLeft + (parent_element.offsetWidth*parseFloat(data.x));
    //     var y_touch = parent_element.offsetTop + (parent_element.offsetHeight*parseFloat(data.y));
    //     touch_on_point(x_touch, y_touch);
    //   }
    // };
  }catch(e){
    console.error(e);
  }

  function touch_on_point(x, y){
    var touch_div = document.createElement("div");
    touch_div.classList.add("touch_point");
    touch_div.style.left = x+"px";
    touch_div.style.top =  y+"px";
    document.getElementsByTagName("body")[0].appendChild(touch_div);
    $(touch_div).fadeOut(1000, function(){
      $(this).remove();
    });
    clicked_on(x,y);
  }

  function clicked_on(x, y){
    var elements = document.elementsFromPoint(x,y);
    var clicked_element = elements[0];//No, but yes
    $(clicked_element).click();
  }

  function show_image(i){
    current_index = -1;
    $("#text").fadeOut(1000, function(){
      var element = table_area[0];
      element.style["background-image"] = "url(img/"+images[i].img+")";
      element.style["background-repeat"] = "no-repeat";
      element.style["background-position"] = "top";
      element.style["background-size"] = "contain";
      $("#text").hide();
      var text = getHtmlForAbout(i, langs[lang_index]);
      $("#text").html(text);
    });
    setTimeout(function(){
      $("#text").fadeIn(2000, function(){
        current_index = i;
      });
    },5000)
  }

  function next_image(){
    if(current_index<0){
      return;
    }
    current_index++;
    if(current_index>=images.length){
      current_index = 0;
    }
    show_image(current_index);
  }

  function previous_image(){
    if(current_index<0){
      return;
    }
    current_index--;
    if(current_index<0){
      current_index = images.length-1;
    }
    show_image(current_index);
  }

  function next_lang(){
    if(current_index<0){
      return;
    }
    lang_index++;
    if(lang_index>=langs.length){
      lang_index=0;
    }
    show_image(current_index);
  }

  $("#next_image").click(next_image);
  $("#prev_image").click(previous_image);
  $("#text").click(next_lang);

  show_image(0);


});
