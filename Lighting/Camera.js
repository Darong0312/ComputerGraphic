// from James Kohl
class Camera {
    constructor(){
      this.type = "camera";
      this.eye = new Vector3( [0,2,-5] );    // point in space
      this.at = new Vector3( [0,0,0] );    // this is a point space
      this.up = new Vector3( [0,1,0] );
      this.speed = 0.2;
    }
    moveForwards(mod=0){
        var f = new Vector3;            // f = at - eye
        f.set(this.at);                 //
        f.sub(this.eye);                //
        f.normalize();                  // f = f.noramlize()
        f.mul(this.speed + mod);        // adjusts the speed
        this.eye.add(f);                // eye = eye + f
        this.at.add(f);                 // at = at + f
    }
    moveBackwards(mod=0){
        var b = new Vector3;    // b = eye - at
        b.set(this.eye);
        b.sub(this.at);
        b.normalize();
        b.mul(this.speed + mod);
        this.at.add(b);
        this.eye.add(b);
    }
    moveLeft(){
        var l = new Vector3;    // l = at - eye
        l.set(this.at);
        l.sub(this.eye);
        l.normalize();
        l.mul(this.speed);
        var s = Vector3.cross(this.up, l);
        this.at.add(s);
        this.eye.add(s);
    }
    moveRight(){
        var r = new Vector3;    // l = eye - at
        r.set(this.eye);
        r.sub(this.at);
        r.normalize();
        r.mul(this.speed);
        var s = Vector3.cross(this.up, r);
        this.at.add(s);
        this.eye.add(s);
    }
    panLeft(mod=1){
        var pl = new Vector3;
        pl.set(this.at);
        pl.sub(this.eye);
        let rotationMatrix = new Matrix4();
		rotationMatrix.setIdentity();
		rotationMatrix.setRotate(1 * mod, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
		// Get the vec3 translation of Matrix4 Rotation Matrix
		let d3D = rotationMatrix.multiplyVector3(pl);
		this.at = d3D.add(this.eye);
    }
    panRight(mod=1){
        var pr = new Vector3;
        pr.set(this.at);
        pr.sub(this.eye);
        let rotationMatrix = new Matrix4();
		rotationMatrix.setIdentity();
		rotationMatrix.setRotate(-1 * mod, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
		// Get the vec3 translation of Matrix4 Rotation Matrix
		let d3D = rotationMatrix.multiplyVector3(pr);
		this.at = d3D.add(this.eye);
    }
    
}