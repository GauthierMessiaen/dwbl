/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_5_1 = {
    category: "drawingrobot2",
    targets: new Array(18).fill(tutorialTargets.difficultyMenu),
    placements: new Array(18).fill("bottom"),
    nrOfSteps: 18,
    xOffsets: new Array(18).fill(0),
    yOffsets: new Array(18).fill(0),
    steps: [],
    i18n: {
      nextBtn: MSG.tutorials.next,
      prevBtn: MSG.tutorials.previous,
      doneBtn: MSG.tutorials.done,
      skipBtn: MSG.tutorials.skip,
      closeTooltip: MSG.tutorials.close,
    },
    question1: [],
    question2: [],
    question3: [],
    // Create the steps array dynamically by using the different arrays
    initSteps: function(){
      // Step 12 points to buttons on simuator
      this.targets[12] = tutorialTargets.simulatorButtons;
      this.placements[12] = "left";
      this.xOffsets[12] = 0;
      this.yOffsets[12] = 0;

      //initialize multiple choice questions
      // Question 1
      var question1Text = MSG.tutorials.drawingrobot['part5_1'].questions[0];
      var answer1_a = new TutorialAnswer(0,MSG.tutorials.drawingrobot['part5_1'].answers[0]);
      var answer1_b = new TutorialAnswer(1,MSG.tutorials.drawingrobot['part5_1'].answers[1]);
      var answer1_c = new TutorialAnswer(2,MSG.tutorials.drawingrobot['part5_1'].answers[2]);
      var answers1 = [answer1_a, answer1_b, answer1_c];
      question1 = new TutorialMultipleChoiceQuestion("q1", question1Text, answers1, answer1_a);
      MSG.tutorials.drawingrobot['part5_1'].stepContents2[5] = question1.getHtml();
      // Question 2
      var question2Text = MSG.tutorials.drawingrobot['part5_1'].questions[1];
      question2 = new TutorialMultipleChoiceQuestion("q2", question2Text, answers1, answer1_b);
      MSG.tutorials.drawingrobot['part5_1'].stepContents2[6] = question2.getHtml();
      // Question 3
      var question3Text = MSG.tutorials.drawingrobot['part5_1'].questions[2];
      var answer3_a = new TutorialAnswer(3,MSG.tutorials.drawingrobot['part5_1'].answers[3]);
      var answer3_b = new TutorialAnswer(4,MSG.tutorials.drawingrobot['part5_1'].answers[4]);
      var answer3_c = new TutorialAnswer(5,MSG.tutorials.drawingrobot['part5_1'].answers[5]);
      var answer3_d = new TutorialAnswer(6,MSG.tutorials.drawingrobot['part5_1'].answers[6]);
      var answers3 = [answer1_c, answer3_a, answer3_b, answer3_c, answer3_d];
      question3 = new TutorialMultipleChoiceQuestion("q3", question3Text, answers3, answer3_b);
      MSG.tutorials.drawingrobot['part5_1'].stepContents2[13] = question3.getHtml();


      for (var i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part5_1'].stepTitles2[i],
          content: MSG.tutorials.drawingrobot['part5_1'].stepContents2[i],
          target: this.targets[i],
          placement: this.placements[i],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[i],
          yOffset: this.yOffsets[i],
        });
      }
    },
    id: "part5_1",
    label: MSG.tutorials.drawingrobot['part5_1'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');

      var cats = ["catDrawingRobot","catLogic","catVariables","catMath","catDwenguino"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = [];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, true,false);
    },
    onEnd: function(){
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

      // if(curr === 1){
      //   hopscotch.showStep(14);
      // }
      
      if(curr === 3){
        drawingrobotTutorialChecks.checkExercise5_1_1();
      }
      if(curr === 4){
        drawingrobotTutorialChecks.checkExercise5_1_2();
      }
      if(curr === 5){
        drawingrobotTutorialChecks.checkExercise5_1_3();
      }

      if(curr === 6){
        drawingrobotTutorialChecks.checkAnswer(question1);
      }
      if(curr === 7){
        drawingrobotTutorialChecks.checkAnswer(question2);
      }

      if(curr === 10){
        DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"><statement name="SETUP"><block type="controls_if" id="q7Dc6j`},M.2Q[]#e5q!"><mutation else="1"/><value name="IF0"><block type="logic_compare" id="?R!?@;S=4xiIi:C^t$QA"><field name="OP">EQ</field></block></value><statement name="DO0"><block type="drawingrobot_rectangle" id="8I,rhm}fM0dY?oK[^W9A"><value name="width"><block type="math_number" id="!,pLJ]`erF6R46unV%s["><field name="NUM">30</field></block></value><value name="height"><block type="math_number" id="}-L#:=,1aaG406r.FY]P"><field name="NUM">30</field></block></value></block></statement><statement name="ELSE"><block type="drawingrobot_circle" id="`XNxtk)cT35{#/p[6Xl^"><value name="radius"><block type="math_number" id="rOF;12!umZHRY*g~b?46"><field name="NUM">30</field></block></value></block></statement></block></statement></block></xml>');
      }

      if(curr === 11){
        drawingrobotTutorialChecks.checkExercise5_1_4();
      }
      if(curr === 12){
        drawingrobotTutorialChecks.checkExercise5_1_5();
      }

      if(curr === 14){
        drawingrobotTutorialChecks.checkAnswer(question3);
      }


      if(curr === 17){
        drawingrobotTutorialChecks.checkExercise5_1_6();
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
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    
    onShow: function(){
      var curr = hopscotch.getCurrStepNum();
      if(curr !== 12){   
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      }

      $("#sim_menu").show();
      $("#sim_scenarioTag").css("margin-top","0px"); 

      if( curr === 5 || curr === 6 || curr === 13 ){
        $("#myform")[0].lastChild.remove();
        $("#sim_menu").hide();
        $("#sim_scenarioTag").css("margin-top","60px"); 
      }
    },
};


