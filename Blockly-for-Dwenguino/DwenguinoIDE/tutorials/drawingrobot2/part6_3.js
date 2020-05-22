/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_6_3 = {
    category: "drawingrobot2",
    targets: new Array(3).fill(tutorialTargets.difficultyMenu),
    placements: new Array(3).fill("bottom"),
    nrOfSteps: 3,
    xOffsets: new Array(3).fill(0),
    yOffsets: new Array(3).fill(0),
    steps: [],
    i18n: {
      nextBtn: MSG.tutorials.next,
      prevBtn: MSG.tutorials.previous,
      doneBtn: MSG.tutorials.done,
      skipBtn: MSG.tutorials.skip,
      closeTooltip: MSG.tutorials.close,
    },
    // Create the steps array dynamically by using the different arrays
    initSteps: function(){
      this.targets[2] = tutorialTargets.saveButton;
      this.placements[2] = "bottom";
      this.xOffsets[2] = -320;
      this.yOffsets[2] = 0;

      for (var i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part6_3'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part6_3'].stepContents[i],
          target: this.targets[i],
          placement: this.placements[i],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[i],
          yOffset: this.yOffsets[i],
        });
      }
    },
    id: "part6_3",
    label: MSG.tutorials.drawingrobot['part6_3'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');
      
      // show an example image
      if($('#tutorial_example_close')[0]){
        $('#tutorial_example_img').attr("src","./DwenguinoIDE/img/tutorials/drawingrobot/6_2.png");
      } else {
        var div = '<div id="tutorial_example" class="hopscotch-bubble animated draggable" style="top: 348px; left: 500px; position: absolute;">'
        + '<div class="hopscotch-bubble-container" style="width: 400px; padding: 15px;">'
        + '  <div>'
        + '    <h3 class="hopscotch-title">' + MSG.example + '</h3>'
        + '    <div class="hopscotch-content">'
        + '      <img id="tutorial_example_img" class="tutorial tutorial_img_txt tutorial_img" src="./DwenguinoIDE/img/tutorials/drawingrobot/6_2.png">'
        + '    </div>'
        + '  </div>'
        + '  <button id="tutorial_example_close" class="hopscotch-bubble-close">Sluiten</button>'
        + '</div>'
        + '</div>';

        $(div).appendTo("#db_body");
      }

      $('#tutorial_example_close').click(function() {
        $("#tutorial_example").remove();
      });
    },
    onEnd: function(){
      $("#tutorial_example").remove();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId+ ",xml:"+JSON.stringify(xml.innerHTML)));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
      
      
      // ---FOR TESTING---
      // if(curr === 1){
      //     hopscotch.showStep(2);
      // }
      // -------


      if(curr === 1){
        drawingrobotTutorialChecks.checkExercise6_3_1();
      }

    },
    onClose: function(){
      $("#tutorial_example").remove();
    },

    onPrev: function(){
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
      console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
    },
    
    onShow: function(){        
      var curr = hopscotch.getCurrStepNum();
      $('div.hopscotch-bubble .hopscotch-bubble-arrow-container.up').css('left','325px');
      if(curr !== 2){
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      }
    },
};


