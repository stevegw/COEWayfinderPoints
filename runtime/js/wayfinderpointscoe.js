

class Wayfinderpointscoe {

    vuforiaScope;
    actionid;
    data;
    modelx;
    modely;
    modelz;
    modelrx;
    modelry;
    modelrz;
    modelscale;
    modelbounds;
    width;
    height;

    //scope,scope.incomingdataField , scope.actionidField , scope.modelxField ,scope.modelyField ,scope.modelzField , scope.modelrxField ,scope.modelryField ,scope.modelrzField , scope.modelscaleField , scope.modelboundsField ,   scope.widthField, scope.heightField 
    constructor(vuforiaScope, data, actionid, modelx, modely, modelz, modelrx, modelry, modelrz, modelscale , modelbounds,   width, height) {

        // Not using the topoffset, leftoffset yet
        this.vuforiaScope  = vuforiaScope;
        this.data = data;
        this.actionid = actionid;
        this.modelx = modelx;
        this.modely = modely;
        this.modelz = modelz;
        this.modelrx = modelrx;
        this.modelry = modelry;
        this.modelrz = modelrz;
        this.modelscale = modelscale;
        this.modelbounds = modelbounds;
        this.width = width;
        this.height = height;

       
    }

    doAction = function () {
         if (this.actionid == 'BoundingBoxWaypoint') {
            this.boundingBoxWaypoint();
        }
        
        else {
            // add more functions here with else if 
        
        }

    }

    // ------------------------------------------------------------------
    // transform bounding box info to match transform of model (translation, rotation, scale) 
    // ------------------------------------------------------------------

    transformLocationCoordinates = function(x,y,z,offsetx,offsety,offsetz,offsetrx,offsetry,offsetrz,scale){
        let xaxis = [1,0,0];
        let yaxis = [0,1,0];
        let zaxis = [0,0,1];
    
        let origxyz = new Vector4().Set4(x,y,z,1); 
        let deg2radFac = Math.PI/180.0;
    
        let mx = new Matrix4();
        //let transMxyz = mx.Scale(scale,scale,scale).Rotate(xaxis, -offsetrx*deg2radFac).Rotate(yaxis, -offsetry*deg2radFac).Rotate(zaxis, -offsetrz*deg2radFac).Translate(offsetx,offsety,offsetz);
        let transMxyz = mx.Scale(scale,scale,scale).Rotate(xaxis, -offsetrx*deg2radFac).Rotate(yaxis, -offsetry*deg2radFac).Rotate(zaxis, -offsetrz*deg2radFac).Translate(offsetx,offsety,offsetz);
        
        return origxyz.Transform(transMxyz);
    
    }

    boundingBoxWaypoint(   ) {

        
        let modelOffsetx = this.modelx;
        let modelOffsety = this.modely;
        let modelOffsetz = this.modelz;
        let modelOffsetrx = this.modelrx;
        let modelOffsetry = this.modelry;
        let modelOffsetrz = this.modelrz;
        let modelOffsetscale = this.modelscale;
        let data  = this.data;


    //  Assuming incoming data looks like this [{"model":"myModel","path":"/2788/2359/927/53/66/580"}]
    //  We can get the Model Bounds
        

        let modelName =  data.model;
        let path = data.path;
        try {
        
          PTC.Metadata.fromId(modelName).then( (metadata) => {
            var bounds = metadata.get(path).getProp("Model Bounds");

            // Model Bounds "-2.1935341 0.7236265 0.5797631 0.8845805 2.2238839 0.96487"
    

            let waypointLabel = "";
            let boundsArray = bounds.split(" ");
        
            let x = ( Math.abs(boundsArray[0]) + Math.abs(boundsArray[3])) / 2.0;
            let y = ( Math.abs(boundsArray[1]) + Math.abs(boundsArray[4])) / 2.0;
            let z = ( Math.abs(boundsArray[2]) + Math.abs(boundsArray[5])) / 2.0;
        
            let transFormedxyz = transformLocationCoordinates(x,y,z,modelOffsetx,modelOffsety,modelOffsetz,modelOffsetrx,modelOffsetry,modelOffsetrz,modelOffsetscale);
        
            let xloc = transFormedxyz.v[0];
            let yloc = transFormedxyz.v[1];
            let zloc = transFormedxyz.v[2];
        
            // [{"model":"model-tml","path":"/1/0/0/17","Model Bounds":"-2.1935341 0.7236265 0.5797631 0.8845805 2.2238839 0.96487"}]
            let position =  [{"position": { "x":  xloc , "y":  yloc, "z": zloc } , "gaze": { "x": 0 , "y": 0, "z":-1},"up":{ "x": 0 , "y": 1, "z":0} , "eventRadius": "0.1", "wayfinderDisplayBoundary": 1.0 , "label":waypointLabel} ];
            this.vuforiaScope.outgoingdataField = position ; 



          }); 

        } catch (ex) {
          console.log("Exception from getBoundingBox" + ex);
        }
      }

}










