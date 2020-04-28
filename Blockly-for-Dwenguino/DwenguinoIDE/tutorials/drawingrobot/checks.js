var drawingrobotTutorialChecks = {

  //Check if simulation pane is open
  simulationPaneOpen: function(){
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    
    if($("#db_infopane").width() === 0){ 
      hopscotch.showStep(curr-1);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckFailed", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
    }
  },
  //Check if drawing robot scenario is open
  drawingPaneOpen: function(){
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

    if(!$("#sim_scenario_drawingrobot").prop("checked")){
      hopscotch.showStep(curr-1);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckFailed", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
    }
  },

  //Check if there are blocks present in the "loop" block
  loop: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var loop = false;
    var statements = xml.getElementsByTagName("statement");
    for(var i = 0; i < statements.length; i++){
      if(statements[i].getAttribute("name") === "LOOP"){
        loop = true;
      }
    }

    return loop;
  },

  failed: function() {
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

    hopscotch.showStep(curr-1);
    $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
    $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);

    
    DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckFailed", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
  },

  clear: function() {
    var xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="5U$4`B]FOId3$9a6~|wl" x="10" y="10"/></xml>'
    DwenguinoBlockly.loadFileXmlIntoWorkspace(xml);
  },

  // ---------- Part 1_1 ----------
  rectangleAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    var blocks = xml.getElementsByTagName("block");

    if(blocks[0].firstChild === null || blocks[0].firstChild.firstChild === null){
      hopscotch.showStep(4); 
    } else if(blocks[0].firstChild.getAttribute("name") !== "SETUP"){
      hopscotch.showStep(5);
    } else if (blocks[0].firstChild.firstChild.getAttribute("type") !== "drawingrobot_rectangle"){
      hopscotch.showStep(6);
    } else {
      hopscotch.showStep(7);
    }
  },

  circleAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    var blocks = xml.getElementsByTagName("block");


    if(blocks[0].firstChild === null || blocks[0].firstChild.firstChild === null){ // No blocks used
      hopscotch.showStep(10); 
    } else if(blocks[0].firstChild.getAttribute("name") !== "SETUP"){ //Blocks not in "setup"
      hopscotch.showStep(11);
    } else {
      var c = 0;
      for(var i = 0; i < blocks.length; i++){
        if(blocks[i].getAttribute("type") === "drawingrobot_rectangle"){ //rectangle blokck found
          hopscotch.showStep(12);
        } else if(blocks[i].getAttribute("type") === "drawingrobot_circle"){ //circle block found
          c++;
        }
      }

      if(c === 1) {
        console.log("yay");
        hopscotch.showStep(13); 
      } else {
        console.log("nay")
        hopscotch.showStep(12); 
      }
    }
  },

  // ---------- Part 1_2---------- 
  checkExercise1: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    var blocks = xml.getElementsByTagName("block");


    var loop = false;
    var statements = xml.getElementsByTagName("statement");
    for(var i = 0; i < statements.length; i++){
        if(statements[i].getAttribute("name") === "LOOP"){
            loop = true;
        }
    }

    var r = 0;
    var c = 0;
    for(var i = 0; i < blocks.length; i++){
      if(blocks[i].getAttribute("type") === "drawingrobot_rectangle"){
        r++;
      } else if(blocks[i].getAttribute("type") === "drawingrobot_circle"){
        c++;
      }
    }

    if(c === 1 && r === 1 && !loop) {
      hopscotch.showStep(2); 
    } else {
      hopscotch.showStep(1); 
    }
  },

  // ---------- Part 2_1 ----------
  moveAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();

    // check if: 2 move blocks added
    var blocks = xml.getElementsByTagName("block");
    var m = 0;
    for(var i = 0; i < blocks.length; i++){
      if(blocks[i].getAttribute("type") === "drawingrobot_move"){
        m++;
      }
    }

    //check if: 2 different directions
    var directions = [];
    var fields = xml.getElementsByTagName("field");
    for(var i = 0; i < fields.length; i++){
      if( fields[i].getAttribute("name") === "direction"){
        directions.push(fields[i].innerHTML);
      }
    }
    var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
    var duplicates = findDuplicates(directions);

    if(duplicates.length > 0){
      failed = true;
    }


    if(m !== 2 || failed){
      hopscotch.prevStep();
      $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
      $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);
    }
  },

  lineAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();

    // check if: 3 line blocks are added (and no other blocks)
    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      }
      if(type !== "setup_loop_structure" && type !== "drawingrobot_line" && type !== "math_number" && type !== "drawingrobot_color"){ //only allow these blocks
        failed = true;
      }
    }

    // check if: the correct coodinates are used
    if(!failed){
      var points = [];
      var c1 = 0;
      var c2 = 0;
      var fields = xml.getElementsByTagName("field");
      for(var i = 0; i < fields.length; i++){
        if(fields[i].getAttribute("name") === "NUM"){
          if(c1 % 2 === 0){
            points.push([fields[i].innerHTML,0]);
          } else {
            points[c2][1] = fields[i].innerHTML;
            c2++;
          }
          c1++;
        }
      }
      if(points.length === 3){
        (points[0][0] != '190') && (failed = true);
        (points[0][1] != '100') && (failed = true);

        (points[1][0] != '250') && (failed = true);
        (points[1][1] != '100') && (failed = true);

        (points[2][0] != '190') && (failed = true);
        (points[2][1] != '40') && (failed = true);
      } else {
        failed = true;
      }
      
    }


    if( l !== 3 || failed) {
      hopscotch.prevStep();
      $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
      $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);
    }
  },

  upDownAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();

    // check if: 3 line blocks added (and no other blocks)
    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    var l1 = 0;
    var l2 = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      } else if(type === "drawingrobot_lift_stylus"){
        l1++;
      } else if(type === "drawingrobot_lower_stylus"){
        l2++;
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_color"){ //only allow these other blocks
        failed = true;
      }
    }

    if( l !== 3 || l1 !== 1 || l2 !== 1 || failed) {
      console.log(l + " - " + l1 + " - " + l2 + " - " + failed);
      hopscotch.prevStep();
      $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
      $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);
    }
  },


  // ---------- Part 2_1 ---------- 
  checkExercise2_1: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();


    // check if: the correct blocks are used
    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    var m = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      } else if(type === "drawingrobot_move"){
        m++;
      }else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_color"){
        failed = true;
      }
    }


    if( l === 0 || m === 0 || l + m !== 4 || failed){
      hopscotch.prevStep();
      $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
      $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);
    }
  },
  checkExercise2_2: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();


    // check if: the correct blocks are used
    var blocks = xml.getElementsByTagName("block");
    var counter = 0;
    var l1 =0;
    var l2 =0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_move" && type !== "drawingrobot_line" && type !== "drawingrobot_lift_stylus" && type !== "drawingrobot_lower_stylus" && type !== "drawingrobot_rectangle" && type !== "drawingrobot_circle" && type !== "drawingrobot_color"){
        failed = true;
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_lift_stylus" && type !== "drawingrobot_lower_stylus"){
        counter++;
      } else if(type === "drawingrobot_lift_stylus"){
        l1++;
      } else if(type === "drawingrobot_lower_stylus"){
        l2++;
      }
    }


    if( failed || counter < 4 || l1 < 1 || l2 < 1){
      drawingrobotTutorialChecks.failed();
    }


  },


  // ---------- Part 3_2 ----------
  fillExercise3_2_1: function() {
    var xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="=At@k+au|yV[qW7du(|1" x="-131" y="268"><statement name="SETUP"><block type="drawingrobot_move" id="GzS-o9B_@;$cyQd)LvE|"><field name="direction">1</field><value name="amount"><block type="math_number" id="EfF9k|B3X$1UoM-@5pj#"><field name="NUM">40</field></block></value><next><block type="drawingrobot_line" id=",$FiKb!K0s/@-fB^A9uy"><value name="x"><block type="math_number" id="Yr)qikt%A1%Ywc??|5a-"><field name="NUM">230</field></block></value><value name="y"><block type="math_number" id=")lL`Nk3+p@QzEPU@|9t_"><field name="NUM">30</field></block></value><next><block type="drawingrobot_move" id="?%PfW26Wf.92kRjb+3M_"><field name="direction">2</field><value name="amount"><block type="math_number" id="G5-{`lFDerk*io#+(#Y:"><field name="NUM">40</field></block></value></block></next></block></next></block></statement></block></xml>';

    DwenguinoBlockly.loadFileXmlIntoWorkspace(xml);
  },

  checkExercise3_2: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();



    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    var m = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      } else if(type === "drawingrobot_move"){
        m++;
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_color"){
        failed = true;
      }
    }
    
    //Only move in each direction once
    var lineDirection = [0,0,0,0];
    var fields = xml.getElementsByTagName("field");
    for(var i = 0; i < fields.length; i++){
      var name = fields[i].getAttribute("name");
      if(name === "direction"){
        var direction = fields[i].innerHTML;
        if(lineDirection[direction] === 0){
          lineDirection[direction]++;
        } else {
          failed = true;
        }
      }
    }


    //draw line to correct points
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        var x = blocks[i].children[0].textContent;
        var y = blocks[i].children[1].textContent;
        console.log(x,y);
        if( (x != 230 || y != 40) && (x != 230 || y != 80) && (x != 190 || y != 40) && (x != 190 || y != 80)){
          failed = true;
        }
      } 
    }

    // check if 4 blocks are used
    if( (l + m !== 4) ){
      failed = true;
    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },



    // ---------- Part 4_1 ----------
    checkExercise4_1_allowed_blocks: function(xml) {
      var list = ["setup_loop_structure",
                  "variables_declare_set_int",
                  "char_type",
                  "drawingrobot_rectangle",
                  "variables_get_int",
                  "math_arithmetic",
                  "math_number",
                  "drawingrobot_color"]
      var failed = false;
      var blocks = xml.getElementsByTagName("block");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        if (!list.includes(type)) {
          console.log(type);
          failed = true;
        }
        // if(type !== "setup_loop_structure" && type !== "variables_declare_set_int" && type !== "char_type" && type !== "drawingrobot_rectangle" && type !== "variables_get_int" && type !== "math_arithmetic"){
        //   failed = true;
        // }
      }

      return failed;
    },

    checkExercise4_1_variable: function(xml) {
      var failed = false;
      var blocks = xml.getElementsByTagName("variable");
      if(blocks !== undefined && blocks.length != 1){
        failed = true;
      } else {
        var type = blocks[0].getAttribute("type");
        // check if: variable has correct type
        if(type !== "Number"){
          failed = true;
        }
        // check if: variable has correct name
        if(blocks[0].innerHTML.toLowerCase() !== "lengte" ){
          failed = true;
        }
      }

      return failed;
    },

    checkNext: function(xml, type, nr) {
      var failed = false;
      var blocks = xml.getElementsByTagName("block");
      var counter = 0;
      for(var i = 0; i < blocks.length; i++){
        var attr = blocks[i].getAttribute("type");
        if(attr === type){
          counter++;
          if(counter === nr){
            if (blocks[i].lastElementChild.nodeName.toLowerCase() !== "next"){
              failed = true;
            }
          }
        }
      }

      return failed;
    },

    checkExercise4_1_1: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

      //check if: blocks are in loop -> only "Setup" is allowed here
      var failed = drawingrobotTutorialChecks.loop();
      // check if: the correct blocks are used
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
      }
      // check if: variable has correct name/type
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
      }

      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },

    checkExercise4_1_2: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
      }
      //--

      //check if: There is a number and it's 30
      var found = 0;
      var blocks = xml.getElementsByTagName("block");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        if(type === "char_type"){
          found = 1;
          if(blocks[i].textContent != '30'){
            failed = true;
          }
        }
      }
      failed = (found === 1 ? failed: true);
  
      if( failed ){
        hopscotch.prevStep();
        $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
        $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);
      }
  
  
    },

    checkExercise4_1_3: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
      }
      //--

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },

    checkExercise4_1_4: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
      }
      //--

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
      }

      // check if: Variable is used in rectangle
      found = 0;
      var blocks = xml.getElementsByTagName("field");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("variabletype");
        if(type === "Number"){
          if(blocks[i].textContent.toLowerCase() === "lengte"){
            found++;
          } else {
            failed = true;
          }
        }
      }
      failed = (found === 3 ? failed: true);

      // check if: Variable is used in rectangle (extra check)
      found = 0;
      var blocks = xml.getElementsByTagName("block");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        if(type === "variables_get_int"){
          found++;
        }
      }
      failed = (found === 2 ? failed: true);
      
      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },

    checkExercise4_1_5: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
      }
      //--

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
        // console.log("variable -> next");
      }

      // check if: rectangle is drawn before variable is changed
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"drawingrobot_rectangle",1);
        // console.log("rectangle -> next");
      }
      // console.log(failed);

      // check if: All the blocks are correct
      var blocks = xml.getElementsByTagName("block");
      var block_var = 0;
      var block_rect = 0;
      var block_length = 0;
      var block_nr = 0;
      var block_plus = 0;
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        switch(type) {
          case "variables_declare_set_int": // block: set variable
            block_var++;
            break;
          case "char_type": // block: number
            if(blocks[i].textContent == "20" || blocks[i].textContent == "30"){
              block_nr++;
            } else {
              failed = true;
              // console.log("nr");
            }
            break;
          case "drawingrobot_rectangle": // block: draw rectangle
            if(blocks[i].children[0].firstChild.getAttribute('type') === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute('type') === "variables_get_int"){
              block_rect++;
            } else {
              failed = true;
              // console.log("rect");
            }
            break;
          case "variables_get_int": // block: variable
            // check if: variable is a number
            // check if: variable is called lengte
            console.log(blocks[i]);
            console.log(blocks[i].firstChild.getAttribute("variabletype"));
            console.log(blocks[i].firstChild.textContent.toLowerCase());
            if(blocks[i].firstChild.textContent.toLowerCase() === "lengte" && blocks[i].firstChild.getAttribute("variabletype") === "Number"){
              block_length++;
            } else {
              failed = true;
              // console.log("var");
            }
            break;
          case "math_arithmetic": // block: ... + ...
            var checkAdd = false;
            var checkVarPlusValue = false;
            var checkValuePlusVar = false;

            // check if: ... + ... block is added
            if(blocks[i].firstChild.textContent === "ADD") {
              checkAdd = true;
            }

            //check if: lengte + value
            if(blocks[7].children[1].firstChild.getAttribute("type") === "variables_get_int" && blocks[7].children[2].firstChild.getAttribute("type") === "char_type") {
              checkVarPlusValue = true;
            }
            //check if: value + lengte
            if(blocks[7].children[2].firstChild.getAttribute("type") === "variables_get_int" && blocks[7].children[1].firstChild.getAttribute("type") === "char_type") {
              checkValuePlusVar = true;
            }

            if(checkAdd && (checkValuePlusVar || checkVarPlusValue)){
              block_plus++;
            } else {
              failed = true;
              // console.log("+");
            }
            break;
        }
      }
      
      if( block_var !== 2 || block_rect !== 1 || block_length !== 3 || block_nr !== 2 || block_plus !== 1){
        failed = true;
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },

    checkExercise4_1_6: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
      }
      //--

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
        // console.log("variable -> next");
      }

      // check if: rectangle is drawn before variable is changed
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"drawingrobot_rectangle",1);
        // console.log("rectangle -> next");
      }

      // check if: variable is changed before second rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",2);
        // console.log("rectangle -> next");
      }
      // console.log(failed);
      
      // check if: All the blocks are correct
      var blocks = xml.getElementsByTagName("block");
      var block_var = 0;
      var block_rect = 0;
      var block_length = 0;
      var block_nr = 0;
      var block_plus = 0;
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        switch(type) {
          case "variables_declare_set_int": // block: set variable
            block_var++;
            break;
          case "char_type": // block: number
            if(blocks[i].textContent == "20" || blocks[i].textContent == "30"){
              block_nr++;
            } else {
              failed = true;
              // console.log("nr");
            }
            break;
          case "drawingrobot_rectangle": // block: draw rectangle
            if(blocks[i].children[0].firstChild.getAttribute('type') === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute('type') === "variables_get_int"){
              block_rect++;
            } else {
              failed = true;
              // console.log("rect");
            }
            break;
          case "variables_get_int": // block: variable
            // check if: variable is a number
            // check if: variable is called lengte
            // console.log(blocks[i]);
            // console.log(blocks[i].firstChild.getAttribute("variabletype"));
            // console.log(blocks[i].firstChild.textContent.toLowerCase());
            if(blocks[i].firstChild.textContent.toLowerCase() === "lengte" && blocks[i].firstChild.getAttribute("variabletype") === "Number"){
              block_length++;
            } else {
              failed = true;
              // console.log("var");
            }
            break;
          case "math_arithmetic": // block: ... + ...
            var checkAdd = false;
            var checkVarPlusValue = false;
            var checkValuePlusVar = false;

            // check if: ... + ... block is added
            if(blocks[i].firstChild.textContent === "ADD") {
              checkAdd = true;
            }

            //check if: lengte + value
            if(blocks[i].children[1].firstChild.getAttribute("type") === "variables_get_int" && blocks[i].children[2].firstChild.getAttribute("type") === "char_type") {
              checkVarPlusValue = true;
            }
            //check if: value + lengte
            if(blocks[i].children[2].firstChild.getAttribute("type") === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute("type") === "char_type") {
              checkValuePlusVar = true;
            }

            if(checkAdd && (checkValuePlusVar || checkVarPlusValue)){
              block_plus++;
            } else {
              failed = true;
              // console.log("+");
            }
            break;
        }
      }
      
      if( block_var !== 2 || block_rect !== 2 || block_length !== 5 || block_nr !== 2 || block_plus !== 1){
        failed = true;
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },

  // ---------- Part 4_2 ----------
    checkExercise4_2: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);
      
      var failed = false;

      // check if: 3 variables are used and have the correct name
      var blocks = xml.getElementsByTagName("variable");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        if(type !== "Number"){
          failed = true;
          // console.log("var not nr");
        }
        var answers = ["a","b","c"];
        if(!answers.includes(blocks[i].innerHTML.toLowerCase()) ){
          failed = true;
          // console.log("var names");
        }
      }
      
      var blocks = xml.getElementsByTagName("block");
      var block_var = 0;    // nr of declare variable blocks
      var block_nr = 0;     //nr of Number blocks
      var block_a = 0;      //nr of a blocks
      var block_b = 0;      //nr of b blocks
      var block_c = 0;      //nr of c blocks
      var block_mult = 0;   //nr of ... x ... blocks
      var block_minus = 0;  //nr of ... - ... blocks
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        switch(type) {
          case "variables_declare_set_int": // block: set variable
            block_var++;
            break;
          case "char_type": // block: number
            block_nr++;
            break;
          case "variables_get_int": // block: use variable
            if(blocks[i].firstChild.textContent.toLowerCase() === "a"){
              block_a++;
            } else  if(blocks[i].firstChild.textContent.toLowerCase() === "b"){
              block_b++;
            } else  if(blocks[i].firstChild.textContent.toLowerCase() === "c"){
              block_c++;
            }
            break;
          case "math_arithmetic": // block: ... -|x ...
            if(blocks[i].firstChild.textContent === "MINUS") {
              block_minus++;
              var left = blocks[i].children[1].firstChild.textContent;
              var right = blocks[4].children[2].firstChild.textContent;
              if(left !== "a" || right !== "10"){
                failed = true;
                // console.log(" a - 10");
              }
            }

            if(blocks[i].firstChild.textContent === "MULTIPLY") {
              block_mult++;
              var left = blocks[i].children[1].firstChild.textContent;
              var right = blocks[i].children[2].firstChild.textContent;
              if((left !== "a" || right !== "b") && (left !== "b" || right !== "a")){
                failed = true;
                // console.log(left + " x " + right);
              }
            }
            break;
        }
      }
      if(blocks.length <= 11) {
        failed = true;
        // console.log("not enough blocks");
      }

      if( block_var < 3 || block_nr < 2 || block_mult < 1 || block_minus < 1 || block_a < 3 || block_b < 2 || block_c < 1){
        failed = true;
        // console.log("nr of certain blocks");
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },



  // ---------- Part 5_1 ----------
  checkExercise5_1_allowed_blocks: ["setup_loop_structure",
                                    "variables_declare_set_int",
                                    "char_type",
                                    "controls_if",
                                    "logic_compare",
                                    "drawingrobot_circle",
                                    "drawingrobot_rectangle",
                                    "variables_get_int",
                                    "math_number",
                                    "drawingrobot_color"
                                  ],
  checkExercise5_1_1: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    
    var failed = drawingrobotTutorialChecks.loop();
  
    var counter = [0,0,0];
    var blocks = xml.getElementsByTagName("block");
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");

      // check if: all used block types are allowed
      if (!drawingrobotTutorialChecks.checkExercise5_1_allowed_blocks.includes(type)) {
        console.log(type + " block not allowed");
        failed = true;
      }
      
      if(type === "controls_if" && blocks[i].firstChild.getAttribute("else") === "1"){
        counter[0]++;
      } else if (type === "variables_declare_set_int") {
        counter[1]++;
      } else if (type === "char_type" && blocks[i].textContent === "0") {
        counter[2]++;
      }
    }
    
    if(counter[0] < 1 || counter[1] < 1 || counter[2] < 1){
      console.log("min blocks");
      failed = true;
    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }

  },

  checkExercise5_1_2: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;

    var counter = [0,0,0,0];
    var blocks = xml.getElementsByTagName("block");
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      // check if: all used block types are allowed
      if (!drawingrobotTutorialChecks.checkExercise5_1_allowed_blocks.includes(type)) {
        console.log(type + " block not allowed");
        failed = true;
      }
      
      if(type === "controls_if" && blocks[i].firstChild.getAttribute("else") === "1"){
        counter[0]++;
        // check if controls_if has a compare block in if statement
        var ifeq = (blocks[i].children[1] !== undefined && blocks[i].children[1].firstChild.getAttribute("type") === "logic_compare");
        if(!ifeq){
          failed = true;
        }
      } else if (type === "variables_declare_set_int") {
        counter[1]++;
      } else if (type === "char_type" && blocks[i].textContent === "0") {
        counter[2]++;
      } else if (type === "logic_compare" && blocks[i].firstChild.textContent === "EQ"){
        counter[3]++;
      }
    }
    
    if(counter[0] < 1 || counter[1] < 1 || counter[2] < 1 || counter[3] < 1){
      // console.log("min blocks");
      failed = true;
    }

    
    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

  checkExercise5_1_3: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;

    var counter = [0,0,0,0,0,0]; // 0:if, 1:var, 2:nr, 3:=, 4:rectangle, 5:circle 
    var blocks = xml.getElementsByTagName("block");
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      // check if: all used block types are allowed
      if (!drawingrobotTutorialChecks.checkExercise5_1_allowed_blocks.includes(type)) {
        console.log(type + " block not allowed");
        failed = true;
      }
      
      if(type === "controls_if" && blocks[i].firstChild.getAttribute("else") === "1"){
        counter[0]++;
        // check if: controls_if has a compare block in "if"
        var ifeq = (blocks[i].children[1] !== undefined && blocks[i].children[1].firstChild.getAttribute("type") === "logic_compare");
        // check if: controls_if has a rectangle block in "do"
        var rectangle = (blocks[i].children[2] !== undefined && blocks[i].children[2].firstChild.getAttribute("type") === "drawingrobot_rectangle");
        // check if: controls_if has a circle block in "else"
        var circle = (blocks[i].children[3] !== undefined && blocks[i].children[3].firstChild.getAttribute("type") === "drawingrobot_circle");

        if(!ifeq || !rectangle || !circle){
          failed = true;
        }

      } else if (type === "variables_declare_set_int") {
        counter[1]++;
      } else if (type === "char_type") {
        counter[2]++;
      } else if (type === "logic_compare"){
        var eq = (blocks[i].firstChild.textContent === "EQ"); // ... = ... (not <,>,...)
        var compare1 = false;
        var compare2 = false;

        // left = right
        if(blocks[i].children[1] !== undefined && blocks[i].children[1].firstChild !== undefined){
          var left = blocks[i].children[1].firstChild.getAttribute("type"); 
        } else {
          failed = true;
        }
        if(blocks[i].children[2] !== undefined && blocks[i].children[2].firstChild !== undefined){
          var right = blocks[i].children[2].firstChild.getAttribute("type");
        } else {
          failed = true;
        }
        
        if(!failed){
          compare1 = (left === "variables_get_int" && right === "char_type" && blocks[i].children[2].firstChild.textContent === "0");
          compare2 = (right === "variables_get_int" && left === "char_type" && blocks[i].children[1].firstChild.textContent === "0");
  
          if(!eq || (!compare1 && !compare2)){
            failed = true;
          }
        }
        
        counter[3]++;
      } else if(type === "drawingrobot_rectangle") {
        counter[4]++;
      } else if (type === "drawingrobot_circle") {
        counter[5]++;
      }
    }
    
    if(counter[0] < 1 || counter[1] < 1 || counter[2] < 2 || counter[3] < 1 || counter[4] < 1 || counter[5] < 1){
      // console.log("min blocks");
      failed = true;
    }

    
    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },


// ---------- Part 6_1 ----------
// -- for loop --
  checkExercise6_1_1: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = drawingrobotTutorialChecks.loop();

    // check if: var i
    if ($(xml).find("field[name='VAR']").text() !== "i"){
      failed = true;
    }

    // check if: from 0
    if ($(xml).find("value[name='FROM']").text() !== "0"){
      failed = true;
    }

    // check if: to 4
    if ($(xml).find("value[name='TO']").text() !== "4"){
      failed = true;
    }

    // check if: by 1
    if ($(xml).find("value[name='BY']").text() !== "1"){
      failed = true;
    }


    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

  checkExercise6_1_2: function() {
    // do previous checks
    drawingrobotTutorialChecks.checkExercise6_1_1();
    // If the previous steps where incorrect, then this function doesn't need to run anymore
    if(hopscotch.getCurrStepNum() !== 6){
      return;
    }

    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    
    var failed = false;

    // moves = find all the "drawingrobot_move" blocks
    var moves = $(xml).find("block[type='drawingrobot_move']");
    // moves = find all the "drawingrobot_move" blocks
    var s = $(xml).find("statement[name='DO']")[0];


    // check if: 2 move blocks are added
    if (moves.length !== 2 ){
      failed = true;
    }

    // check if: all the move blocks are in the loop
    moves.each(function(){
      var self = this;
      while ( self.parentNode !== null && self !== s) {
          self = self.parentNode;
      }
      if( self !== s){
          failed = true;
      }
    });

    if( !failed ){
      // check if: first move direction is 3 (right)
      if ($(moves).find("field[name='direction']")[0].textContent !== "3") {
        failed = true;
      }
      // check if: first move direction is 1 (down)
      if ($(moves).find("field[name='direction']")[1].textContent !== "1") {
        failed = true;
      }

      // check if: first move amount is 20
      if ($(moves).find("field[name='NUM']")[0].textContent !== "20") {
        failed = true;
      }
      // check if: first move amount is 20
      if ($(moves).find("field[name='NUM']")[1].textContent !== "20") {
        failed = true;
      }
    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },
  // -- infinite loop --
  checkExercise6_1_3: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;

    //check if: circle in SETUP
    if ($(xml).find("statement[name='SETUP']").find("block[type='drawingrobot_circle']").length !== 1){
      failed = true;
    }

    //check if: rectangle in LOOP
    if ($(xml).find("statement[name='LOOP']").find("block[type='drawingrobot_rectangle']").length !== 1){
      failed = true;
    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

// -- while loop --
  checkExercise6_1_4: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;

    // check if: variable names are "x" and "y"
    var var1 = $($(xml).find("block[type='variables_declare_set_int']").find("field[variabletype='Number']")[0]).text();
    var var2 = $($(xml).find("block[type='variables_declare_set_int']").find("field[variabletype='Number']")[1]).text();
    var1 = var1.toLowerCase();
    var2 = var2.toLowerCase();
    if ( (var1 !== "x" || var2 !== "y") && (var2 !== "x" || var1 !== "y") ) {
      failed = true;
    }

    // check if: variable values are "190" and "40" for "x" and "y"
    var nr1 = $($(xml).find("field[name='BITMASK']")[0]).text();
    var nr2 = $($(xml).find("field[name='BITMASK']")[1]).text();
    if( (var1 === "x" && nr1 !== "190") || (var2 === "x" && nr2 !== "190")){
      failed = true;
    }
    if( (var1 === "y" && nr1 !== "40") || (var2 === "y" && nr2 !== "40")){
      failed = true;
    }

    // check if: while loop is added
    var loop = $(xml).find("block[type='controls_whileUntil']");
    if( loop.length !== 1) {
      failed = true;
    }
    if( loop.find("field[name='MODE']").text() !== "WHILE"){
      failed = true;
    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

  checkExercise6_1_5: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;

    // Get the 'loop' block
    var loop = $(xml).find("block[type='controls_whileUntil']")[0];
    // Get the 'draw line' block
    var line = $(loop).find("block[type='drawingrobot_line']")[0];
    // Get the 'next' block, save it in a variable and remove it from line -> when searching in line, we don't want to also search in next
    var next = $(line).find("next")[0];
    $(next).remove()

    // check if: draw line is filled in with x and y
    if( $(line).find("field[variabletype='Number']").text().toLowerCase() !== "xy") {
      failed = true;
    }


    var vars = $(next).find("block[type='variables_declare_set_int']");
    // check if: 2 variables are replaced
    if(vars.length !== 2){
      failed = true;
    }

    // check if: the 2 variables are x and y
    // check if: the '... + ...' block is used
    vars.each( function() {
      $(this).find("next").remove();
      
      // check if: the 2 variables are x and y
      var varName = $($(this).find("field[variabletype='Number']")[0]).text().toLowerCase();
      if(varName !== "x" && varName !== "y") {
        failed = true;
      }

      // check if: the '... + ...' block is used
      if ( $($(this).find("block[type='math_arithmetic']")[0]).find("field[name='OP']").text() !== "ADD" ){
        failed = true;
      }

      // check if: the variable names are correct and the number >= 5
      var varName2 = $(this).find("value[name='A']").find("field[name='VAR']").text()
      var nr = $($(this).find("field[name='BITMASK']")[0]).text();
      if( varName !== varName2 || Number(nr) < 5){
        failed = true;
      }
    });

    


    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

  checkExercise6_1_6: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;
    
    // Get the 'loop' block
    var loop = $(xml).find("block[type='controls_whileUntil']")[0];
    // Get the '... AND ...' block
    var logic = $(loop).find("value[name='BOOL']").find("block[type='logic_operation']");
    
    // check if: the block exists and if it's an 'AND' block
    if(logic.length !== 1 || logic.find("field[name='OP']").text() !== "AND"){
      failed = true;
    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

  checkExercise6_1_7: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);

    var failed = false;

    var logic = $(xml).find("block[type='logic_operation']")[0];
    
    var compare = $(logic).find("block[type='logic_compare']")
    // check if: 2 compare blocks are added
    if( logic.children.length !== 3 || compare.length !== 2){
      failed = true;
    }
    
    compare.each( function() {
      // check if: the 2 compare blocks are added left and right of the '...AND...' block
      if( this.parentNode === null || this.parentNode.parentNode === null || this.parentNode.parentNode.getAttribute("type") !== "logic_operation"){
        failed = true;
      }

      // check if: all compare blocks are '<'
      if($(this).find("field[name='OP']").text() !== "LT"){
        failed = true;
      }
    });

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },

  checkExercise6_1_8: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    var failed = false;

    // Get the first equation/compare block (... < ...)
    var equation = $($(xml).find("block[type='logic_operation']")[0].children[1]).find("block[type='logic_compare']")[0];
    if(equation === undefined){
      failed = true;
    }
    // check if: Left and right of '<' are filled in
    if(equation.children.length !== 3){
      failed = true;
    }

    if(!failed){
      // check if: left = x
      if( $(equation.children[1]).find("field[variabletype='Number']").text().toLowerCase() !== "x") {
        failed = true;
      }

      // check if: right = 360
      if( $(equation.children[2]).find("field[name='BITMASK']").text() !== "380") {
        failed = true;
      }

    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }

  },

  checkExercise6_1_9: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // console.log(xml);
    var failed = false;

    // Get the first equation/compare block (... < ...)
    var equation = $($(xml).find("block[type='logic_operation']")[0].children[2]).find("block[type='logic_compare']")[0];
    if(equation === undefined){
      failed = true;
    }
    // check if: Left and right of '<' are filled in
    if(equation.children.length !== 3){
      failed = true;
    }

    if(!failed){
      // check if: left = x
      if( $(equation.children[1]).find("field[variabletype='Number']").text().toLowerCase() !== "y") {
        failed = true;
      }

      // check if: right = 360
      if( $(equation.children[2]).find("field[name='BITMASK']").text() !== "270") {
        failed = true;
      }

    }

    if( failed ){
      drawingrobotTutorialChecks.failed();
    }
  },




  // ---------- Part 6_2 ----------
    checkExercise6_2_1: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // console.log(xml);
      var failed = drawingrobotTutorialChecks.loop();

      //statistics
      var stat_loop_for_nr = 0;
      var stat_loop_while_nr = 0;
      var stat_move_nr = 0;
      var stat_move_directions_nr = [0,0,0,0];

      // check if: at least 1 'lifts stylus' blok
      // check if: 'draw line' blok hangs below 'lift stylus' blok
      var lift = $(xml).find("block[type='drawingrobot_lift_stylus']" || lift[0].firstChild === null || lift[0].firstChild.firstChild === null || lift[0].firstChild.firstChild.getAttribute("type") !== "drawingrobot_line");
      if ( lift.length < 1 ){
        failed = true;
      }
      // check if: at least 1 'lower stylus' blok
      // check if: 'lower stylus' blok hangs below 'draw line' blok
      var lower = $(xml).find("block[type='drawingrobot_lower_stylus']");
      if ( lower.length < 1 || lower[0].parentNode === null || lower[0].parentNode.parentNode === null || lower[0].parentNode.parentNode.getAttribute("type") !== "drawingrobot_line"){
        failed = true;
      }

      //check if: draw line to (110,200) exists
      var line = $(xml).find("block[type='drawingrobot_line']")[0]
      if ($(line).find("value[name='x']").find("field[name='NUM']").text() !== "110" || $(line).find("value[name='y']").find("field[name='NUM']").text() !== "200") {
        failed = true;
      }
      
      // find the loop
      var loop_for = $(xml).find("block[type='controls_for']");
      var loop_while = $(xml).find("block[type='controls_whileUntil']");

      // check if: at least 1 loop and max 2 loops are used
      stat_loop_for_nr = loop_for.length;
      stat_loop_while_nr = loop_while.length;
      if( (stat_loop_for_nr < 1 && stat_loop_while_nr < 1) || (stat_loop_for_nr + stat_loop_while_nr > 2) ){
        failed = true;
      }
      var code;
      // checks for 'for' loop
      var nrOfSteps = 9;
      if( stat_loop_for_nr + stat_loop_while_nr === 2){
        nrOfSteps = 4;
      }

      if(stat_loop_for_nr > 0){
        var from = Number(loop_for.find("value[name='FROM']").text());
        var to = Number(loop_for.find("value[name='TO']").text());
        var by = Number(loop_for.find("value[name='BY']").text());

        // check if: the loop in the program runs nrOfStep+1 times
        if( ((to-from) / by ) !== nrOfSteps){
          failed = true;
        }

        code = loop_for.find("statement[name='DO']")
      }
      // checks for 'while' loop
      if(stat_loop_while_nr > 0){


      }
      if(!failed){
        //check if: there are at least 3 move blocks
        stat_move_nr = code.find("block[type='drawingrobot_move']").length;
        if( stat_move_nr < 3){
          failed = true;
        }

        //check if: There is at least 1 move block in every necessary direction (up,left,right = 0,2,3)
        code.find("block[type='drawingrobot_move']").each( function() {
          var dir = Number($(this).find("field[name='direction']")[0].textContent);
          stat_move_directions_nr[dir]++;

          var amount = Number($(this).find("field[name='NUM']")[0].textContent);
          if(amount !== 10){
            failed = true;
          }
        });
        if(stat_move_directions_nr[0] < 1 || stat_move_directions_nr[2] < 1 || stat_move_directions_nr[3] < 1){
          failed = true;
        }

        // check if: IF statement is present, but only when 1 loop is used
        if(nrOfSteps === 9){
          if ( code.find("block[type='controls_if']").length > 1) {
            failed = true;
          }
        }
      }


      console.log("---- STATISTICS ----");
      console.log("nr of FOR loops: " + stat_loop_for_nr);
      console.log("nr of WHILE loops: " + stat_loop_while_nr);
      console.log("nr of MOVE blocks: " + stat_move_nr);
      console.log("nr of MOVE blocks UP: " + stat_move_directions_nr[0]);
      console.log("nr of MOVE blocks DOWN: " + stat_move_directions_nr[1]);
      console.log("nr of MOVE blocks LEFT: " + stat_move_directions_nr[2]);
      console.log("nr of MOVE blocks RIGHT: " + stat_move_directions_nr[3]);
      console.log("--------------------");

      if( failed ){
        drawingrobotTutorialChecks.failed();
      }
    },
  
}