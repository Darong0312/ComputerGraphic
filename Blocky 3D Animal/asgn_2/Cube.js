class Cube{

    constructor(){
        this.type = 'cube';
        // this.position = [0.0,0.0,0.0];
        this.color = [1.0,1.0,1.0,1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
    }
  
    render(){
        var rgba = this.color;
  
        // // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0]*1.1, rgba[1]*1.1, rgba[2]*1.1, rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix,false,this.matrix.elements);

        // front
        drawTriangle3D( [0,0,0, 1,1,0, 1,0,0] );
        drawTriangle3D( [0,0,0, 0,1,0, 1,1,0] );
        
        // // // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0]*1.1, rgba[1]*1.1, rgba[2]*1.1, rgba[3]);

        // //back
        drawTriangle3D( [0,0,1, 1,1,1, 1,0,1] );
        drawTriangle3D( [0,0,1, 0,1,1, 1,1,1] );

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]*0.9);

        // top of the cube
        drawTriangle3D( [0,1,0, 0,1,1, 1,1,1] );
        drawTriangle3D( [0,1,0, 1,1,1, 1,1,0] );

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

        // bottom
        drawTriangle3D( [0,0,0, 0,0,1, 1,0,1] );
        drawTriangle3D( [0,0,0, 1,0,1, 1,0,0] );

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

        // left
        drawTriangle3D( [0,1,0, 0,0,1, 0,1,1] );
        drawTriangle3D( [0,0,0, 0,1,0, 0,0,1] );

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

        // right
        drawTriangle3D( [1,0,1, 1,1,0, 1,0,0] );
        drawTriangle3D( [1,1,1, 1,1,0, 1,0,1] );

        
    }
  
}

  