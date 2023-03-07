

  // When making changes to either the design or ng files you will need to stop and start the Vuforia Studio service
  // Changes to your implemenation file in this case called widgetcoe.js you only need to start preview again



class Widgetcoe {

    actionBuilder;
    vuforiaScope;
    data;
    actionid;
    width;
    height;

    constructor(vuforiaScope, data,  actionid, width, height) {

        // Not using the topoffset, leftoffset yet
        this.vuforiaScope  = vuforiaScope;
        this.data = data;
        this.actionid = actionid;
        this.width = width;
        this.height = height;
        this.actionBuilder = new ActionBuilder();
       
    }

    doAction = function () {
        if (this.actionid == 'WorkInstructionDialog') {
            let wiDialogURL = this.actionBuilder.createWorkInstructionDialogURL( this.data, "Information", this.width, this.height,"bottom", 'arial' , 20, 'arial' , 16);
            this.vuforiaScope.outgoingdataField = wiDialogURL;
            this.vuforiaScope.$parent.fireEvent('completed');
            this.vuforiaScope.$parent.$applyAsync();

        } else {
            // add more functions here with else if 
        
        }

    }
}

class ActionBuilder {

    createWorkInstructionDialogURL = function ( WorkInstructionText, HeaderText, DialogWidth, DialogHeight, LeaderLine, HeaderFont, HeaderFontSize, BodyFont, BodyFontSize) {

        var textcanvas = document.createElement('canvas');
        var ctxtext = textcanvas.getContext("2d");

        if ((LeaderLine.toUpperCase() == 'NONE') || (LeaderLine.toUpperCase() == 'BOTTOM')) {

            if (LeaderLine.toUpperCase() == 'NONE') {

                textcanvas.width = DialogWidth;
                textcanvas.height = DialogHeight;

            } else if (LeaderLine.toUpperCase() == 'BOTTOM') {

                textcanvas.width = DialogWidth;
                textcanvas.height = DialogHeight * 2;

            }

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(0, 0, DialogWidth, DialogHeight);
            ctxtext.fillRect(0, 0, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(0, 0, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(0, 0, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 10, ((DialogHeight * 0.25) / 2), (DialogWidth - 20), 18);

            //WorkInstruction Text
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 10, ((DialogHeight * 0.25) + 20), (DialogWidth - 20), 18);

            if (LeaderLine.toUpperCase() == 'BOTTOM') {

                //Create Bottom Leaderline
                ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
                ctxtext.beginPath();
                ctxtext.moveTo((DialogWidth / 2), DialogHeight);
                ctxtext.lineTo((DialogWidth / 2), (DialogHeight + 75));
                ctxtext.stroke();

                ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
                ctxtext.clearRect((DialogWidth / 2) - 10, (DialogHeight + 75), 20, 20);
                ctxtext.fillRect((DialogWidth / 2) - 10, (DialogHeight + 75), 20, 20);

            }

        } else if (LeaderLine.toUpperCase() == 'LEFT') {

            textcanvas.width = DialogWidth * 2;
            textcanvas.height = DialogHeight;

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(95, 0, DialogWidth, DialogHeight);
            ctxtext.fillRect(95, 0, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(95, 0, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(95, 0, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 105, ((DialogHeight * 0.25) / 2), (DialogWidth - 20), 18);

            //WorkInstruction Text  
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 105, ((DialogHeight * 0.25) + 20), (DialogWidth - 20), 18);

            //Create Left Leaderline
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.beginPath();
            ctxtext.moveTo(0, (DialogHeight / 2));
            ctxtext.lineTo(95, (DialogHeight / 2));
            ctxtext.stroke();

            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.clearRect(0, ((DialogHeight / 2) - 10), 20, 20);
            ctxtext.fillRect(0, ((DialogHeight / 2) - 10), 20, 20);

        } else if (LeaderLine.toUpperCase() == 'RIGHT') {

            textcanvas.width = DialogWidth * 2;
            textcanvas.height = DialogHeight;

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(0, 0, DialogWidth, DialogHeight);
            ctxtext.fillRect(0, 0, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(0, 0, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(0, 0, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 10, ((DialogHeight * 0.25) / 2), (DialogWidth - 20), 18);

            //WorkInstruction Text  
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 10, ((DialogHeight * 0.25) + 20), (DialogWidth - 20), 18);

            //Create Right Leaderline
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.beginPath();
            ctxtext.moveTo(DialogWidth, (DialogHeight / 2));
            ctxtext.lineTo((DialogWidth + 95), (DialogHeight / 2));
            ctxtext.stroke();

            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.clearRect(((DialogWidth + 95) - 20), ((DialogHeight / 2) - 10), 20, 20);
            ctxtext.fillRect(((DialogWidth + 95) - 20), ((DialogHeight / 2) - 10), 20, 20);

        } else if (LeaderLine.toUpperCase() == 'TOP') {

            textcanvas.width = DialogWidth;
            textcanvas.height = DialogHeight * 2;

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(0, 95, DialogWidth, DialogHeight);
            ctxtext.fillRect(0, 95, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(0, 95, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(0, 95, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 10, (95 + ((DialogHeight * 0.25) / 2)), (DialogWidth - 20), 18);

            //WorkInstruction Text
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 10, (95 + ((DialogHeight * 0.25) + 20)), (DialogWidth - 20), 18);

            //Create Bottom Leaderline
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.beginPath();
            ctxtext.moveTo((DialogWidth / 2), 20);
            ctxtext.lineTo((DialogWidth / 2), 95);
            ctxtext.stroke();
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.clearRect((DialogWidth / 2) - 10, 0, 20, 20);
            ctxtext.fillRect((DialogWidth / 2) - 10, 0, 20, 20);

        }

        function wrapText(context, text, x, y, maxWidth, lineHeight) {
            var words = text.split(' '),
                line = '',
                lineCount = 0,
                i,
                test,
                metrics;
            for (i = 0; i < words.length; i++) {
                test = words[i];
                metrics = context.measureText(test);
                while (metrics.width > maxWidth) {
                    // Determine how much of the word will fit
                    test = test.substring(0, test.length - 1);
                    metrics = context.measureText(test);
                }
                if (words[i] != test) {
                    words.splice(i + 1, 0, words[i].substr(test.length))
                    words[i] = test;
                }
                test = line + words[i] + ' ';
                metrics = context.measureText(test);
                if (metrics.width > maxWidth && i > 0) {
                    context.fillText(line, x, y);
                    line = words[i] + ' ';
                    y += lineHeight;
                    lineCount++;
                } else {
                    line = test;
                }
            }
            ctxtext.fillText(line, x, y);
        }

       return  textcanvas.toDataURL();

    }










}





