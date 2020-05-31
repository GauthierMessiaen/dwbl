/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_6_2 = {
    category: "drawingrobot2",
    targets: [
      tutorialTargets.difficultyMenu,
    ],
    placements: [
      "bottom",
    ],
    nrOfSteps: 8,
    xOffsets: [
      0,
    ],
    yOffsets: [
      0,
    ],
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
      //initialize multiple choice questions
      // Question 1
      var question1Text = MSG.tutorials.drawingrobot['part6_2'].questions[0];
      var answer1_a = new TutorialAnswer(0,MSG.tutorials.drawingrobot['part6_2'].answers[0]);
      var answer1_b = new TutorialAnswer(1,MSG.tutorials.drawingrobot['part6_2'].answers[1]);
      var answer1_c = new TutorialAnswer(2,MSG.tutorials.drawingrobot['part6_2'].answers[2]);
      var answer1_d = new TutorialAnswer(3,MSG.tutorials.drawingrobot['part6_2'].answers[3]);
      var answers = [answer1_a, answer1_b, answer1_c, answer1_d];
      question1 = new TutorialMultipleChoiceQuestion("q1", question1Text, answers, answer1_c);
      MSG.tutorials.drawingrobot['part6_2'].stepContents2[1] = question1.getHtml();
      // Question 2
      var question2Text = MSG.tutorials.drawingrobot['part6_2'].questions[1];
      question2 = new TutorialMultipleChoiceQuestion("q2", question2Text, answers, answer1_a);
      MSG.tutorials.drawingrobot['part6_2'].stepContents2[3] = question2.getHtml();
      // Question 3
      var question3Text = MSG.tutorials.drawingrobot['part6_2'].questions[2];
      question3 = new TutorialMultipleChoiceQuestion("q3", question3Text, answers, answer1_b);
      MSG.tutorials.drawingrobot['part6_2'].stepContents2[5] = question3.getHtml();

      var i;
      for (i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part6_2'].stepTitles2[i],
          content: MSG.tutorials.drawingrobot['part6_2'].stepContents2[i],
          target: this.targets[0],
          placement: this.placements[0],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[0],
          yOffset: this.yOffsets[0],
        });
      }
    },
    id: "v2_part6_2",
    label: MSG.tutorials.drawingrobot['part6_2'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');

      var cats = ["catText","catSocialRobot","catComments","catDwenguino"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = [];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, false,false);

    },
    onEnd: function(){
      $("#tutorial_example").remove();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.setDifficultyLevel(0);
      var data = {
        tutorialname: DwenguinoBlockly.tutorialIdSetting,
        xml: xml.innerHTML,
      }
      data = JSON.stringify(data);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", data));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var data = {
        tutorialname: DwenguinoBlockly.tutorialIdSetting,
        step: curr,
        xml: xml.innerHTML,
      }
      data = JSON.stringify(data);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", data ));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
      
      
    //   // ---FOR TESTING---
    //   if(curr === 1){
    //       hopscotch.showStep(5);
    //   }// -------

      if(curr === 2){
        drawingrobotTutorialChecks.checkAnswer(question1);
      }
      if(curr === 4){
        drawingrobotTutorialChecks.checkAnswer(question2);
      }
      if(curr === 6){
        drawingrobotTutorialChecks.checkAnswer(question3);
      }

      if(curr === 7){
        // show an example image
        if($('#tutorial_example_close')[0]){
          $('#tutorial_example_img').attr("src","./DwenguinoIDE/img/tutorials/drawingrobot/6_1.png");
        } else {
          var div = '<div id="tutorial_example" class="hopscotch-bubble animated draggable" style="top: 348px; left: 500px; position: absolute;">'
          + '<div class="hopscotch-bubble-container" style="width: 400px; padding: 15px;">'
          + '  <div>'
          + '    <h3 class="hopscotch-title">' + MSG.example + '</h3>'
          + '    <div class="hopscotch-content">'
          + '      <img id="tutorial_example_img" class="tutorial tutorial_img_txt tutorial_img" src="./DwenguinoIDE/img/tutorials/drawingrobot/6_1.png">'
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
      }
      if(curr === 8){
        drawingrobotTutorialChecks.checkExercise6_2_1();
      }
    },

    onPrev: function(){
      var curr = hopscotch.getCurrStepNum();
      var data = {
        tutorialname: DwenguinoBlockly.tutorialIdSetting,
        step: curr,
      }
      data = JSON.stringify(data);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", data ));
      // console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));

    },

    onClose: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
      $("#tutorial_example").remove();
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    
    onShow: function(){        
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');

        if( curr === 1 || curr === 3 || curr === 5 ){
          $("#myform")[0].lastChild.remove();
        }
    },
};


